#!/usr/bin/env node
"use strict";

/**
 * Suíte do comando `padtec detect`.
 *
 * Os casos usam fixtures sintéticos criados em `os.tmpdir()` (prefixo
 * `padtec-fixture-`), removidos ao final mesmo quando algum caso lança
 * exceção. Cada caso cobre uma regra da árvore de decisão de variante, uma
 * capacidade da tabela do mestre, a pasta de saída, o conjunto de seções por
 * nível ou o contrato da CLI (códigos de saída, arquivos gravados, --json).
 *
 * Uso: node padtec-detect.test.js
 * Códigos de saída: 0 (tudo passou), 1 (algum caso falhou).
 */

const assert = require("assert");
const { spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  detect,
  renderReport,
  writeRunArtifacts,
  SCHEMA_VERSION,
  VARIANTS,
  CAPABILITIES,
  RUN_DIR,
  CONTEXT_FILE,
  REPORT_FILE,
} = require("./padtec-detect");

const CLI = path.join(__dirname, "..", "padtec.js");

const fixtureRoots = [];

function cleanupFixtures() {
  for (const root of fixtureRoots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

process.on("exit", cleanupFixtures);

/**
 * Cria uma árvore temporária a partir de um mapa `caminho relativo -> conteúdo`.
 * Chaves terminadas em `/` viram diretórios vazios; valores objeto viram JSON.
 */
function makeTree(spec) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "padtec-fixture-"));
  fixtureRoots.push(root);
  for (const [relPath, content] of Object.entries(spec)) {
    const fullPath = path.join(root, relPath);
    if (relPath.endsWith("/")) {
      fs.mkdirSync(fullPath, { recursive: true });
      continue;
    }
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    const data = typeof content === "string" ? content : JSON.stringify(content, null, 2);
    fs.writeFileSync(fullPath, data);
  }
  return root;
}

function pkg(dependencies, devDependencies) {
  const manifest = {};
  if (dependencies) manifest.dependencies = dependencies;
  if (devDependencies) manifest.devDependencies = devDependencies;
  return manifest;
}

function runCli(args, cwd) {
  return spawnSync(process.execPath, [CLI, ...args], { encoding: "utf8", cwd });
}

function countFixturesInTmp() {
  return fs
    .readdirSync(os.tmpdir())
    .filter((name) => name.startsWith("padtec-fixture-")).length;
}

const REQUIRED_FIELDS = [
  "schemaVersion",
  "padtecVersion",
  "projectRoot",
  "projectRootResolved",
  "outputDir",
  "level",
  "variant",
  "variantCandidates",
  "capabilities",
  "monorepo",
  "structuralPattern",
  "sections",
  "conditionalSections",
  "evidence",
  "warnings",
];

function assertContextShape(context) {
  for (const field of REQUIRED_FIELDS) {
    assert.ok(Object.prototype.hasOwnProperty.call(context, field), `campo obrigatório ausente: ${field}`);
  }
  assert.strictEqual(context.schemaVersion, SCHEMA_VERSION);
  assert.ok(context.variant === null || VARIANTS.includes(context.variant));
  assert.ok(Array.isArray(context.capabilities));
  for (const slug of context.capabilities) assert.ok(CAPABILITIES.includes(slug), `capacidade desconhecida: ${slug}`);
  assert.strictEqual(typeof context.monorepo.active, "boolean");
  assert.ok(Array.isArray(context.monorepo.apps));
  assert.ok(typeof context.structuralPattern.structuralPattern === "string");
  assert.ok(Array.isArray(context.structuralPattern.evidence));
  assert.ok(Array.isArray(context.structuralPattern.warnings));
  assert.ok(Array.isArray(context.evidence.variant.rules));
  for (const slug of CAPABILITIES) assert.ok(Array.isArray(context.evidence.capabilities[slug]));
  assert.ok(Array.isArray(context.evidence.outputDir.checked));
}

// ---------------------------------------------------------------------------
// Casos
// ---------------------------------------------------------------------------

function buildCases() {
  return [
    // ----- Variante: árvore de decisão (mestre iii.4) -----
    {
      label: "variante — iac: *.tf sem package.json",
      run() {
        const root = makeTree({
          "infra/main.tf": 'resource "azurerm_resource_group" "rg" {}\n',
          "infra/variables.tf": "variable \"env\" {}\n",
          "README.md": "",
        });
        const ctx = detect(root);
        assert.strictEqual(ctx.variant, "iac");
        assert.deepStrictEqual(ctx.variantCandidates, []);
        assert.strictEqual(ctx.evidence.variant.matchedRule, 1);
        assert.deepStrictEqual(
          ctx.evidence.variant.signals.iac.map((e) => e.file),
          ["infra/main.tf", "infra/variables.tf"]
        );
      },
    },
    {
      label: "variante — iac: *.bicep com package.json só de ferramentas (não aplicacional)",
      run() {
        const root = makeTree({
          "bicep/main.bicep": "targetScope = 'subscription'\n",
          "package.json": pkg(null, { prettier: "^3.0.0" }),
        });
        const ctx = detect(root);
        assert.strictEqual(ctx.variant, "iac");
        const manifest = ctx.evidence.variant.signals.applicationManifests[0];
        assert.strictEqual(manifest.aplicacional, false);
      },
    },
    {
      label: "variante — iac: playbook Ansible detectado por conteúdo",
      run() {
        const root = makeTree({
          "site.yml": "- hosts: web\n  become: true\n  tasks:\n    - name: instalar\n      apt: name=nginx\n",
        });
        const ctx = detect(root);
        assert.strictEqual(ctx.variant, "iac");
        assert.strictEqual(ctx.evidence.variant.signals.iac[0].signal, "playbook Ansible");
        assert.strictEqual(ctx.evidence.variant.signals.iac[0].line, 1);
      },
    },
    {
      label: "variante — frontend-site: next em devDependencies",
      run() {
        const root = makeTree({
          "package.json": pkg({ react: "^18.0.0" }, { next: "^14.0.0" }),
          "pages/index.tsx": "export default function Home() { return null; }\n",
        });
        const ctx = detect(root);
        assert.strictEqual(ctx.variant, "frontend-site");
        assert.strictEqual(ctx.evidence.variant.matchedRule, 2);
        assert.deepStrictEqual(ctx.evidence.variant.signals.frontend[0], {
          kind: "manifesto",
          signal: "next",
          file: "package.json",
          detail: "devDependencies: next ^14.0.0",
        });
        assert.ok(ctx.evidence.variant.signals.directories.includes("pages/"));
      },
    },
    {
      label: "variante — backend-api: @nestjs/core",
      run() {
        const root = makeTree({
          "package.json": pkg({ "@nestjs/core": "^10.0.0", "@nestjs/common": "^10.0.0" }),
          "src/main.ts": "",
        });
        const ctx = detect(root);
        assert.strictEqual(ctx.variant, "backend-api");
        assert.strictEqual(ctx.evidence.variant.matchedRule, 3);
        assert.strictEqual(ctx.evidence.variant.rules[1].matched, false);
        assert.match(ctx.evidence.variant.rules[1].reason, /nenhum package\.json com next/);
      },
    },
    {
      label: "variante — backend-api: requirements.txt com fastapi",
      run() {
        const root = makeTree({
          "requirements.txt": "fastapi==0.110.0\nuvicorn[standard]>=0.29\n# comentário\n",
          "app/main.py": "",
        });
        const ctx = detect(root);
        assert.strictEqual(ctx.variant, "backend-api");
        assert.strictEqual(ctx.evidence.variant.signals.backend[0].signal, "fastapi");
      },
    },
    {
      label: "variante — backend-api: pom.xml basta como manifesto backend não-JS",
      run() {
        const root = makeTree({
          "pom.xml": "<project><dependencies><dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-web</artifactId></dependency></dependencies></project>\n",
        });
        const ctx = detect(root);
        assert.strictEqual(ctx.variant, "backend-api");
      },
    },
    {
      label: "variante — full-stack-web: monorepo apps/web + apps/api",
      run() {
        const root = makeTree({
          "package.json": { name: "workspace", workspaces: ["apps/*"] },
          "apps/web/package.json": pkg({ react: "^18.0.0" }, { next: "^14.0.0" }),
          "apps/web/src/index.tsx": "",
          "apps/api/package.json": pkg({ express: "^4.19.0" }),
          "apps/api/src/index.js": "",
        });
        const ctx = detect(root);
        assert.strictEqual(ctx.variant, "full-stack-web");
        assert.strictEqual(ctx.evidence.variant.matchedRule, 4);
        assert.deepStrictEqual(ctx.monorepo, { active: true, apps: ["apps/api", "apps/web"] });
        assert.strictEqual(ctx.structuralPattern.structuralPattern, "monorepo-apps-e-pacotes");
        assert.strictEqual(ctx.structuralPattern.apps.length, 2);
        const files = ctx.evidence.variant.signals.frontend.map((e) => e.file);
        assert.ok(files.includes("apps/web/package.json"), "manifesto do app deve ser considerado");
      },
    },
    {
      label: "variante — full-stack-web: raiz única com next e @nestjs/core",
      run() {
        const root = makeTree({
          "package.json": pkg({ next: "^14.0.0", "@nestjs/core": "^10.0.0" }),
        });
        const ctx = detect(root);
        assert.strictEqual(ctx.variant, "full-stack-web");
        assert.strictEqual(ctx.monorepo.active, false);
      },
    },
    {
      label: "variante — automacao-script: scripts/ sem manifestos",
      run() {
        const root = makeTree({
          "scripts/backup.sh": "#!/bin/sh\necho ok\n",
          "scripts/rotacionar.ps1": "",
          "README.md": "",
        });
        const ctx = detect(root);
        assert.strictEqual(ctx.variant, "automacao-script");
        assert.strictEqual(ctx.evidence.variant.matchedRule, 5);
        assert.deepStrictEqual(ctx.evidence.variant.signals.scripts[0], {
          kind: "diretorio",
          signal: "scripts/",
          file: "scripts",
          detail: "2 arquivo(s)",
        });
      },
    },
    {
      label: "variante — automacao-script: um único arquivo executável na raiz",
      run() {
        const root = makeTree({ "sincronizar.py": "print('ok')\n", "README.md": "" });
        const ctx = detect(root);
        assert.strictEqual(ctx.variant, "automacao-script");
        assert.strictEqual(ctx.evidence.variant.signals.scripts[0].file, "sincronizar.py");
      },
    },
    {
      label: "variante — nenhuma regra casa: variant null com as cinco candidatas e aviso",
      run() {
        const root = makeTree({ "src/index.js": "console.log(1);\n", "README.md": "" });
        const ctx = detect(root);
        assert.strictEqual(ctx.variant, null);
        assert.deepStrictEqual(ctx.variantCandidates, [...VARIANTS]);
        assert.strictEqual(ctx.evidence.variant.matchedRule, null);
        assert.ok(ctx.evidence.variant.rules.every((r) => r.matched === false));
        assert.ok(ctx.warnings.some((w) => w.code === "VARIANTE_INDETERMINADA"));
      },
    },
    {
      label: "variante — package.json aplicacional sem framework não é automacao-script (mestre literal)",
      run() {
        const root = makeTree({
          "package.json": pkg({ commander: "^12.0.0" }),
          "bin/cli.js": "#!/usr/bin/env node\n",
        });
        const ctx = detect(root);
        assert.strictEqual(ctx.variant, null);
        assert.match(ctx.evidence.variant.rules[4].reason, /há manifesto de aplicação/);
      },
    },

    // ----- Capacidades (mestre iv) -----
    {
      label: "capacidade — banco-de-dados: typeorm + pasta migrations",
      run() {
        const root = makeTree({
          "package.json": pkg({ "@nestjs/core": "^10.0.0", typeorm: "^0.3.20" }),
          "src/migrations/1700000000000-Inicial.ts": "",
        });
        const ctx = detect(root);
        assert.deepStrictEqual(ctx.capabilities, ["banco-de-dados"]);
        const ev = ctx.evidence.capabilities["banco-de-dados"];
        assert.deepStrictEqual(ev[0], {
          kind: "manifesto",
          signal: "typeorm",
          file: "package.json",
          detail: "dependencies: typeorm ^0.3.20",
        });
        assert.deepStrictEqual(ev[1], { kind: "arquivo", signal: "pasta de migrations", file: "src/migrations" });
      },
    },
    {
      label: "capacidade — cache: ioredis",
      run() {
        const root = makeTree({ "package.json": pkg({ express: "^4.19.0", ioredis: "^5.4.0" }) });
        const ctx = detect(root);
        assert.deepStrictEqual(ctx.capabilities, ["cache"]);
        assert.strictEqual(ctx.evidence.capabilities.cache[0].signal, "ioredis");
      },
    },
    {
      label: "capacidade — filas-async: bullmq",
      run() {
        const root = makeTree({ "package.json": pkg({ express: "^4.19.0", bullmq: "^5.0.0" }) });
        const ctx = detect(root);
        assert.deepStrictEqual(ctx.capabilities, ["filas-async"]);
      },
    },
    {
      label: "capacidade — auth: passport",
      run() {
        const root = makeTree({ "package.json": pkg({ express: "^4.19.0", passport: "^0.7.0" }) });
        const ctx = detect(root);
        assert.deepStrictEqual(ctx.capabilities, ["auth"]);
      },
    },
    {
      label: "capacidade — jobs-agendados: @nestjs/schedule",
      run() {
        const root = makeTree({ "package.json": pkg({ "@nestjs/core": "^10.0.0", "@nestjs/schedule": "^4.0.0" }) });
        const ctx = detect(root);
        assert.deepStrictEqual(ctx.capabilities, ["jobs-agendados"]);
      },
    },
    {
      label: "capacidade — notificacoes: nodemailer",
      run() {
        const root = makeTree({ "package.json": pkg({ express: "^4.19.0", nodemailer: "^6.9.0" }) });
        const ctx = detect(root);
        assert.deepStrictEqual(ctx.capabilities, ["notificacoes"]);
      },
    },
    {
      label: "capacidade — storage: multer",
      run() {
        const root = makeTree({ "package.json": pkg({ express: "^4.19.0", multer: "^1.4.5" }) });
        const ctx = detect(root);
        assert.deepStrictEqual(ctx.capabilities, ["storage"]);
      },
    },
    {
      label: "capacidade — integracoes-externas: axios com baseURL em código, com arquivo e linha",
      run() {
        const root = makeTree({
          "package.json": pkg({ express: "^4.19.0", axios: "^1.7.0" }),
          "src/clientes/cep.js": 'const axios = require("axios");\n\nmodule.exports = axios.create({\n  baseURL: "https://cep.exemplo.invalid/v1",\n});\n',
        });
        const ctx = detect(root);
        assert.deepStrictEqual(ctx.capabilities, ["integracoes-externas"]);
        const ev = ctx.evidence.capabilities["integracoes-externas"];
        assert.strictEqual(ev[0].signal, "axios");
        const textual = ev.filter((e) => e.kind === "texto");
        assert.ok(textual.length >= 1);
        assert.strictEqual(textual[0].file, "src/clientes/cep.js");
        assert.ok([3, 4].includes(textual[0].line), `linha inesperada: ${textual[0].line}`);
        assert.ok(textual.some((e) => e.line === 4 && e.excerpt.includes("baseURL")));
      },
    },
    {
      label: "capacidade — multi-tenancy: só por busca textual (tenant resolver)",
      run() {
        const root = makeTree({
          "package.json": pkg({ "@nestjs/core": "^10.0.0" }),
          "src/tenancy/tenant.middleware.ts": "export class TenantMiddleware {}\n",
        });
        const ctx = detect(root);
        assert.deepStrictEqual(ctx.capabilities, ["multi-tenancy"]);
        const ev = ctx.evidence.capabilities["multi-tenancy"][0];
        assert.strictEqual(ev.kind, "texto");
        assert.strictEqual(ev.file, "src/tenancy/tenant.middleware.ts");
        assert.strictEqual(ev.line, 1);
      },
    },
    {
      label: "capacidade — SDK específico não duplica em integracoes-externas (@aws-sdk/client-s3 é storage)",
      run() {
        const root = makeTree({ "package.json": pkg({ express: "^4.19.0", "@aws-sdk/client-s3": "^3.0.0" }) });
        const ctx = detect(root);
        assert.deepStrictEqual(ctx.capabilities, ["storage"]);
      },
    },
    {
      label: "capacidade — manifestos dos apps de monorepo contam",
      run() {
        const root = makeTree({
          "package.json": "{}",
          "apps/web/package.json": pkg(null, { vite: "^5.0.0" }),
          "apps/api/package.json": pkg({ fastify: "^4.0.0", "@prisma/client": "^5.0.0" }),
          "apps/api/prisma/schema.prisma": "datasource db { provider = \"postgresql\" }\n",
        });
        const ctx = detect(root);
        assert.strictEqual(ctx.variant, "full-stack-web");
        assert.deepStrictEqual(ctx.capabilities, ["banco-de-dados"]);
        const files = ctx.evidence.capabilities["banco-de-dados"].map((e) => e.file);
        assert.ok(files.includes("apps/api/package.json"));
        assert.ok(files.includes("apps/api/prisma/schema.prisma"));
      },
    },
    {
      label: "capacidade — node_modules e .padtec são ignorados na busca",
      run() {
        const root = makeTree({
          "package.json": pkg({ express: "^4.19.0" }),
          "node_modules/lib/index.js": "export class TenantResolver {}\n",
          ".padtec/run/context.json": "{\"tenantId\": 1}\n",
          "dist/app.js": "@Cron('* * * * *')\n",
        });
        const ctx = detect(root);
        assert.deepStrictEqual(ctx.capabilities, []);
      },
    },
    {
      label: "capacidade — nenhuma: as nove listas de evidência existem vazias",
      run() {
        const root = makeTree({ "package.json": pkg({ express: "^4.19.0" }) });
        const ctx = detect(root);
        assert.deepStrictEqual(ctx.capabilities, []);
        for (const slug of CAPABILITIES) assert.deepStrictEqual(ctx.evidence.capabilities[slug], []);
      },
    },

    // ----- Pasta de saída (mestre iii.3) -----
    {
      label: "pasta de saída — documentation/ existente é detectada",
      run() {
        const root = makeTree({ "package.json": pkg({ express: "^4.19.0" }), "documentation/.keep": "" });
        const ctx = detect(root);
        assert.strictEqual(ctx.outputDir, "documentation/");
        assert.strictEqual(ctx.evidence.outputDir.source, "detectada");
        assert.strictEqual(ctx.evidence.outputDir.found, "documentation/");
        assert.deepStrictEqual(ctx.evidence.outputDir.checked, [
          { dir: "docs/", exists: false },
          { dir: "documentation/", exists: true },
          { dir: "documentacao/", exists: false },
        ]);
      },
    },
    {
      label: "pasta de saída — docs/ tem precedência sobre documentacao/",
      run() {
        const root = makeTree({ "docs/.keep": "", "documentacao/.keep": "" });
        const ctx = detect(root);
        assert.strictEqual(ctx.outputDir, "docs/");
      },
    },
    {
      label: "pasta de saída — nenhuma existe: docs/ como proposta",
      run() {
        const root = makeTree({ "package.json": pkg({ express: "^4.19.0" }) });
        const ctx = detect(root);
        assert.strictEqual(ctx.outputDir, "docs/");
        assert.strictEqual(ctx.evidence.outputDir.source, "padrao");
        assert.strictEqual(ctx.evidence.outputDir.found, null);
      },
    },
    {
      label: "pasta de saída — --saida sobrepõe a detecção",
      run() {
        const root = makeTree({ "documentation/.keep": "" });
        const ctx = detect(root, { outputDir: "wiki/tecnica" });
        assert.strictEqual(ctx.outputDir, "wiki/tecnica");
        assert.strictEqual(ctx.evidence.outputDir.source, "parametro");
        assert.strictEqual(ctx.evidence.outputDir.found, "documentation/");
      },
    },

    // ----- Seções por nível (mestre vi.2) -----
    {
      label: "seções — nível nulo: sections e conditionalSections vazios",
      run() {
        const root = makeTree({ "package.json": pkg({ express: "^4.19.0", ioredis: "^5.0.0" }) });
        const ctx = detect(root);
        assert.strictEqual(ctx.level, null);
        assert.deepStrictEqual(ctx.sections, []);
        assert.deepStrictEqual(ctx.conditionalSections, []);
      },
    },
    {
      label: "seções — L1: 01, 02, 03 e 13, sem condicionais mesmo com capacidade ativa",
      run() {
        const root = makeTree({ "package.json": pkg({ express: "^4.19.0", ioredis: "^5.0.0" }) });
        const ctx = detect(root, { level: "l1" });
        assert.strictEqual(ctx.level, "L1");
        assert.deepStrictEqual(ctx.sections.map((s) => s.slice(0, 2)), ["01", "02", "03", "13"]);
        assert.ok(ctx.sections.every((s) => /^\d{2}-[a-z0-9-]+\.md$/.test(s)));
        assert.deepStrictEqual(ctx.conditionalSections, []);
      },
    },
    {
      label: "seções — L2: 01 a 11 e 13, mais condicional-<slug>.md por capacidade",
      run() {
        const root = makeTree({ "package.json": pkg({ express: "^4.19.0", ioredis: "^5.0.0", passport: "^0.7.0" }) });
        const ctx = detect(root, { level: "L2" });
        assert.deepStrictEqual(
          ctx.sections.map((s) => s.slice(0, 2)),
          ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "13"]
        );
        assert.deepStrictEqual(ctx.conditionalSections, ["condicional-cache.md", "condicional-auth.md"]);
      },
    },
    {
      label: "seções — L3: 01 a 15",
      run() {
        const root = makeTree({ "package.json": pkg({ express: "^4.19.0" }) });
        const ctx = detect(root, { level: "L3" });
        assert.strictEqual(ctx.sections.length, 15);
        assert.strictEqual(ctx.sections[0], "01-visao-geral.md");
        assert.strictEqual(ctx.sections[14], "15-manutencao-da-documentacao.md");
      },
    },
    {
      label: "seções — nomes reais vêm de padtec/templates/nucleo/ do projeto destino quando existe",
      run() {
        const root = makeTree({
          "package.json": pkg({ express: "^4.19.0" }),
          "padtec/VERSION": "v9.9.9\n",
          "padtec/templates/nucleo/01-visao-geral.md": "",
          "padtec/templates/nucleo/02-arquitetura-renomeada.md": "",
          "padtec/templates/nucleo/03-stack-e-dependencias.md": "",
          "padtec/templates/nucleo/13-glossario.md": "",
        });
        const ctx = detect(root, { level: "L1" });
        assert.strictEqual(ctx.padtecVersion, "v9.9.9");
        assert.ok(ctx.sections.includes("02-arquitetura-renomeada.md"));
      },
    },
    {
      label: "biblioteca — nível inválido lança ERR_NIVEL_INVALIDO",
      run() {
        const root = makeTree({});
        assert.throws(() => detect(root, { level: "L4" }), (err) => err.code === "ERR_NIVEL_INVALIDO");
      },
    },
    {
      label: "biblioteca — raiz inválida lança ERR_PROJETO_INVALIDO",
      run() {
        const root = makeTree({ "arquivo.txt": "" });
        assert.throws(() => detect(path.join(root, "arquivo.txt")), (err) => err.code === "ERR_PROJETO_INVALIDO");
        assert.throws(() => detect(path.join(root, "nao-existe")), (err) => err.code === "ERR_PROJETO_INVALIDO");
      },
    },
    {
      label: "biblioteca — package.json inválido vira aviso, não erro",
      run() {
        const root = makeTree({ "package.json": "{ isto não é json" });
        const ctx = detect(root);
        assert.ok(ctx.warnings.some((w) => w.code === "MANIFESTO_INVALIDO" && w.path === "package.json"));
      },
    },
    {
      label: "biblioteca — padtecVersion é null sem padtec/VERSION e projectRoot preserva o caminho informado",
      run() {
        const root = makeTree({});
        const ctx = detect(root);
        assert.strictEqual(ctx.padtecVersion, null);
        assert.strictEqual(ctx.projectRoot, root);
        assert.strictEqual(ctx.projectRootResolved, path.resolve(root));
        assertContextShape(ctx);
      },
    },
    {
      label: "relatório — contém resumo, tabelas de evidência, avisos e frase de confirmação",
      run() {
        const root = makeTree({ "src/index.js": "" });
        const ctx = detect(root, { level: "L2" });
        const report = renderReport(ctx);
        assert.match(report, /^# Relatório de detecção/);
        assert.match(report, /\| Variante \| indeterminada \(candidatas:/);
        assert.match(report, /### Variante \(árvore de decisão do mestre, iii\.4\)/);
        assert.match(report, /### Capacidades \(tabela do mestre, iv\)/);
        assert.match(report, /## Avisos/);
        assert.match(report, /VARIANTE_INDETERMINADA/);
        assert.match(report, /O agente deve confirmá-las ao executar o prompt mestre/);
        assert.ok(!/[\u{1F300}-\u{1FAFF}]/u.test(report), "o relatório não deve conter emojis");
      },
    },
    {
      label: "gravação — writeRunArtifacts cria .padtec/run/ e sobrescreve em nova execução",
      run() {
        const root = makeTree({ "package.json": pkg({ express: "^4.19.0" }) });
        const first = detect(root, { level: "L1" });
        const paths = writeRunArtifacts(first, renderReport(first));
        assert.strictEqual(paths.contextPath, path.join(root, RUN_DIR, CONTEXT_FILE));
        assert.strictEqual(paths.reportPath, path.join(root, RUN_DIR, REPORT_FILE));
        const second = detect(root, { level: "L3" });
        writeRunArtifacts(second, renderReport(second));
        const saved = JSON.parse(fs.readFileSync(paths.contextPath, "utf8"));
        assert.strictEqual(saved.level, "L3");
        // A execução anterior gravada em .padtec/ não vira evidência.
        assert.deepStrictEqual(second.capabilities, []);
      },
    },

    // ----- CLI -----
    {
      label: "cli — detect --nivel L2 --json grava context.json válido com os campos obrigatórios e imprime JSON",
      run() {
        const root = makeTree({
          "package.json": pkg({ "@nestjs/core": "^10.0.0", typeorm: "^0.3.20", ioredis: "^5.4.0" }),
          "src/migrations/.keep": "",
          "documentation/.keep": "",
        });
        const res = runCli(["detect", root, "--nivel", "L2", "--json"]);
        assert.strictEqual(res.status, 0, res.stderr);
        const printed = JSON.parse(res.stdout);
        const saved = JSON.parse(fs.readFileSync(path.join(root, RUN_DIR, CONTEXT_FILE), "utf8"));
        assert.deepStrictEqual(printed, saved);
        assertContextShape(saved);
        assert.strictEqual(saved.level, "L2");
        assert.strictEqual(saved.variant, "backend-api");
        assert.strictEqual(saved.outputDir, "documentation/");
        assert.deepStrictEqual(saved.capabilities, ["banco-de-dados", "cache"]);
        assert.strictEqual(saved.sections.length, 12);
        assert.deepStrictEqual(saved.conditionalSections, ["condicional-banco-de-dados.md", "condicional-cache.md"]);
        assert.ok(fs.existsSync(path.join(root, RUN_DIR, REPORT_FILE)));
      },
    },
    {
      label: "cli — raiz padrão é o diretório atual e projectRoot registra '.'",
      run() {
        const root = makeTree({ "scripts/limpar.sh": "" });
        const res = runCli(["detect"], root);
        assert.strictEqual(res.status, 0, res.stderr);
        assert.match(res.stdout, /Detecção concluída: variante automacao-script/);
        const saved = JSON.parse(fs.readFileSync(path.join(root, RUN_DIR, CONTEXT_FILE), "utf8"));
        assert.strictEqual(saved.projectRoot, ".");
        assert.strictEqual(fs.realpathSync(saved.projectRootResolved), fs.realpathSync(root));
      },
    },
    {
      label: "cli — --saida sobrepõe a pasta de saída",
      run() {
        const root = makeTree({ "docs/.keep": "" });
        const res = runCli(["detect", root, "--saida", "documentacao/", "--json"]);
        assert.strictEqual(res.status, 0, res.stderr);
        assert.strictEqual(JSON.parse(res.stdout).outputDir, "documentacao/");
      },
    },
    {
      label: "cli — raiz inexistente encerra com código 2 e nada é gravado",
      run() {
        const root = makeTree({});
        const missing = path.join(root, "nao-existe");
        const res = runCli(["detect", missing]);
        assert.strictEqual(res.status, 2);
        assert.match(res.stderr, /Caminho inexistente/);
        assert.strictEqual(res.stdout, "");
        assert.ok(!fs.existsSync(path.join(missing, RUN_DIR)));
      },
    },
    {
      label: "cli — arquivo em vez de diretório encerra com código 2",
      run() {
        const root = makeTree({ "package.json": "{}" });
        const res = runCli(["detect", path.join(root, "package.json")]);
        assert.strictEqual(res.status, 2);
        assert.match(res.stderr, /não é um diretório/);
      },
    },
    {
      label: "cli — nível inválido, comando desconhecido e ausência de comando encerram com código 2",
      run() {
        const root = makeTree({});
        const invalidLevel = runCli(["detect", root, "--nivel", "L9"]);
        assert.strictEqual(invalidLevel.status, 2);
        assert.match(invalidLevel.stderr, /Nível inválido/);
        const unknown = runCli(["gerar", root]);
        assert.strictEqual(unknown.status, 2);
        assert.match(unknown.stderr, /comando desconhecido/);
        const none = runCli([]);
        assert.strictEqual(none.status, 2);
        assert.match(none.stderr, /^Uso: padtec detect/);
      },
    },
    {
      label: "cli — --help imprime o uso em stdout com código 0",
      run() {
        const res = runCli(["--help"]);
        assert.strictEqual(res.status, 0);
        assert.match(res.stdout, /^Uso: padtec detect/);
      },
    },
  ];
}

// ---------------------------------------------------------------------------
// Execução
// ---------------------------------------------------------------------------

function main() {
  const before = countFixturesInTmp();
  let failures = 0;
  let total = 0;

  try {
    for (const testCase of buildCases()) {
      total += 1;
      let pass = true;
      let detail = "";
      try {
        testCase.run();
      } catch (err) {
        pass = false;
        detail = ` -> ${err.message}`;
      }
      if (!pass) failures += 1;
      process.stdout.write(`${pass ? "OK  " : "FAIL"} ${testCase.label}${detail}\n`);
    }
  } finally {
    cleanupFixtures();
  }

  total += 1;
  if (countFixturesInTmp() === before) {
    process.stdout.write("OK   limpeza — nenhum fixture residual em os.tmpdir()\n");
  } else {
    failures += 1;
    process.stdout.write("FAIL limpeza — fixtures residuais em os.tmpdir()\n");
  }

  if (failures > 0) {
    process.stderr.write(`\n${failures} de ${total} caso(s) falharam.\n`);
    process.exitCode = 1;
    return;
  }
  process.stdout.write(`\nTodos os ${total} casos passaram.\n`);
}

main();

#!/usr/bin/env node
"use strict";

/**
 * Suíte de calibração do detector de `structuralPattern`.
 *
 * Os casos são fixtures sintéticos criados em diretório temporário, de modo
 * que a suíte roda em qualquer máquina sem depender de projetos externos.
 * Cada caso cobre um padrão estrutural ou uma regressão conhecida e verifica
 * não só `structuralPattern`, mas também `evidence`, `apps[]` e `warnings`.
 *
 * Para calibrar contra projetos reais sem versionar caminhos locais, aponte
 * a variável de ambiente `PADTEC_CALIBRACAO` para um arquivo JSON (por
 * convenção, `ferramentas/cli/calibracao.local.json`, já ignorado pelo git):
 *
 *   [ { "label": "...", "projectPath": "../../meu-projeto", "expected": "mvc-classico" } ]
 *
 * `projectPath` relativo é resolvido a partir do diretório do próprio JSON.
 * Arquivo inexistente ou inválido encerra a suíte com código de saída 2.
 *
 * Uso: node structural-pattern-detection.test.js
 * Códigos de saída: 0 (tudo passou), 1 (algum caso falhou), 2 (calibração
 * externa inválida).
 */

const assert = require("assert");
const { spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  detectStructuralPattern,
  STRUCTURAL_PATTERNS,
} = require("./structural-pattern-detection");

const DETECTOR = path.join(__dirname, "structural-pattern-detection.js");

// Limpeza das fixtures: registrada antes de qualquer criação, de modo que
// `process.exit()` ou uma exceção fora do `try/finally` não deixem resíduo
// em `os.tmpdir()`.
const fixtureRoots = [];
const permissionRestores = [];

function cleanupFixtures() {
  for (const dirPath of permissionRestores.splice(0)) {
    try {
      fs.chmodSync(dirPath, 0o755);
    } catch {
      // Se não deu para restaurar, o rmSync abaixo ainda tenta remover.
    }
  }
  for (const root of fixtureRoots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

process.on("exit", cleanupFixtures);

/**
 * Cria uma árvore temporária a partir de um mapa `caminho relativo -> conteúdo`.
 * Chaves terminadas em `/` viram diretórios vazios.
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
    fs.writeFileSync(fullPath, content);
  }
  return root;
}

/** Diretório real alcançável apenas através de um link simbólico. */
function makeSymlinkTree() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "padtec-fixture-"));
  fixtureRoots.push(root);
  const real = path.join(root, "modulos-reais");
  fs.mkdirSync(path.join(real, "usuarios"), { recursive: true });
  fs.mkdirSync(path.join(real, "cobranca"), { recursive: true });
  const projeto = path.join(root, "projeto");
  fs.mkdirSync(path.join(projeto, "src"), { recursive: true });
  fs.writeFileSync(path.join(projeto, "package.json"), "{}");
  fs.symlinkSync(real, path.join(projeto, "src", "modules"), "dir");
  return projeto;
}

/** Projeto modular com um diretório sem permissão de leitura. */
function makeAccessDeniedTree() {
  const root = makeTree({
    "package.json": "{}",
    "src/modules/usuarios/index.ts": "",
    "src/modules/cobranca/index.ts": "",
    "src/secreto/.keep": "",
  });
  const secreto = path.join(root, "src", "secreto");
  fs.chmodSync(secreto, 0o000);
  permissionRestores.push(secreto);
  return root;
}

const canTestPermissions =
  process.platform !== "win32" &&
  typeof process.getuid === "function" &&
  process.getuid() !== 0;

// ---------------------------------------------------------------------------
// Calibração externa
// ---------------------------------------------------------------------------

class CalibracaoInvalida extends Error {}

/**
 * Lê e valida o JSON apontado por `PADTEC_CALIBRACAO`. Exige um array de
 * objetos com `label` (string), `projectPath` (string, resolvido relativo ao
 * diretório do JSON) e `expected` (um dos padrões válidos).
 */
function loadCalibration(filePath) {
  const absolute = path.resolve(filePath);
  let raw;
  try {
    raw = fs.readFileSync(absolute, "utf8");
  } catch (err) {
    throw new CalibracaoInvalida(
      `não foi possível ler o arquivo de calibração (${err.code || err.message}).`
    );
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new CalibracaoInvalida(`o arquivo de calibração não é JSON válido (${err.message}).`);
  }

  if (!Array.isArray(parsed)) {
    throw new CalibracaoInvalida("o arquivo de calibração deve conter um array de casos.");
  }

  const baseDir = path.dirname(absolute);
  return parsed.map((item, i) => {
    const where = `caso de calibração #${i + 1}`;
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw new CalibracaoInvalida(`${where}: deve ser um objeto.`);
    }
    if (typeof item.label !== "string" || item.label.trim() === "") {
      throw new CalibracaoInvalida(`${where}: "label" deve ser uma string não vazia.`);
    }
    if (typeof item.projectPath !== "string" || item.projectPath.trim() === "") {
      throw new CalibracaoInvalida(`${where}: "projectPath" deve ser uma string não vazia.`);
    }
    if (!STRUCTURAL_PATTERNS.includes(item.expected)) {
      throw new CalibracaoInvalida(
        `${where}: "expected" deve ser um de ${STRUCTURAL_PATTERNS.join(", ")}.`
      );
    }
    return {
      label: `[externo] ${item.label}`,
      projectPath: path.resolve(baseDir, item.projectPath),
      expected: item.expected,
    };
  });
}

// ---------------------------------------------------------------------------
// Casos sintéticos
// ---------------------------------------------------------------------------

function buildCases() {
  const cases = [
    {
      label: "mvc-classico — camadas irmãs sob a mesma raiz de app (Laravel)",
      projectPath: makeTree({
        "composer.json": "{}",
        "app/Http/Controllers/UsuarioController.php": "",
        "app/Models/Usuario.php": "",
        "resources/views/home.blade.php": "",
      }),
      expected: "mvc-classico",
      verify(result) {
        // `resources/views` fica fora por não compartilhar o primeiro
        // segmento com `app/Http/Controllers` (limitação documentada).
        assert.deepStrictEqual(result.evidence, ["app/Http/Controllers", "app/Models"]);
        assert.strictEqual(result.apps, undefined);
      },
    },
    {
      label: "mvc-classico — solução com manifesto na raiz não vira dois apps",
      projectPath: makeTree({
        "Solucao.sln": "",
        "WebApp/WebApp.csproj": "",
        "WebApp/Controllers/HomeController.cs": "",
        "WebApp/Models/Usuario.cs": "",
        "WebApp/Views/Home/Index.cshtml": "",
        "WebApi/WebApi.csproj": "",
        "WebApi/Controllers/ApiController.cs": "",
      }),
      expected: "mvc-classico",
      verify(result) {
        assert.deepStrictEqual(result.evidence, [
          "WebApp/Controllers",
          "WebApp/Models",
          "WebApp/Views",
        ]);
      },
    },
    {
      label: "mvc-classico — nomes no singular e layout Java com sete níveis",
      projectPath: makeTree({
        "pom.xml": "",
        "src/main/java/com/empresa/app/controller/UsuarioController.java": "",
        "src/main/java/com/empresa/app/model/Usuario.java": "",
      }),
      expected: "mvc-classico",
      verify(result) {
        assert.deepStrictEqual(result.evidence, [
          "src/main/java/com/empresa/app/controller",
          "src/main/java/com/empresa/app/model",
        ]);
      },
    },
    {
      label: "mvc-classico — nomes em maiúsculas são reconhecidos e preservados na evidência",
      projectPath: makeTree({
        "package.json": "{}",
        "App/CONTROLLERS/home.js": "",
        "App/Models/user.js": "",
      }),
      expected: "mvc-classico",
      verify(result) {
        assert.deepStrictEqual(result.evidence, ["App/CONTROLLERS", "App/Models"]);
      },
    },
    {
      label: "modular-por-dominio — pasta modules com submódulos",
      projectPath: makeTree({
        "package.json": "{}",
        "src/modules/usuarios/usuarios.service.ts": "",
        "src/modules/cobranca/cobranca.service.ts": "",
      }),
      expected: "modular-por-dominio",
      verify(result) {
        assert.deepStrictEqual(result.evidence, ["src/modules"]);
      },
    },
    {
      label: "modular-por-dominio — vertical slice nomeada como features",
      projectPath: makeTree({
        "package.json": "{}",
        "src/features/checkout/index.ts": "",
        "src/features/catalogo/index.ts": "",
      }),
      expected: "modular-por-dominio",
      verify(result) {
        assert.deepStrictEqual(result.evidence, ["src/features"]);
      },
    },
    {
      label: "monorepo-apps-e-pacotes — wrapper apps/ e packages/",
      projectPath: makeTree({
        "package.json": "{}",
        "apps/web/package.json": "{}",
        "apps/api/package.json": "{}",
        "packages/ui/package.json": "{}",
      }),
      expected: "monorepo-apps-e-pacotes",
      verify(result) {
        assert.deepStrictEqual(result.evidence, ["apps/api", "apps/web", "packages/ui"]);
        assert.deepStrictEqual(
          result.apps.map((a) => a.path),
          ["apps/api", "apps/web", "packages/ui"]
        );
        for (const app of result.apps) {
          assert.strictEqual(app.structuralPattern, "indefinido");
          assert.deepStrictEqual(app.evidence, []);
        }
      },
    },
    {
      label: "monorepo-apps-e-pacotes — apps irmãos sem wrapper, sem manifesto na raiz",
      projectPath: makeTree({
        "README.md": "",
        "backend/package.json": "{}",
        "backend/src/index.ts": "",
        "frontend/package.json": "{}",
        "frontend/src/index.tsx": "",
      }),
      expected: "monorepo-apps-e-pacotes",
      verify(result) {
        assert.deepStrictEqual(result.evidence, ["backend", "frontend"]);
        assert.strictEqual(result.apps.length, 2);
      },
    },
    {
      label: "monorepo-apps-e-pacotes — somente packages/",
      projectPath: makeTree({
        "package.json": "{}",
        "packages/core/package.json": "{}",
        "packages/cli/package.json": "{}",
      }),
      expected: "monorepo-apps-e-pacotes",
      verify(result) {
        assert.deepStrictEqual(result.evidence, ["packages/cli", "packages/core"]);
        assert.deepStrictEqual(
          result.apps.map((a) => a.path),
          ["packages/cli", "packages/core"]
        );
      },
    },
    {
      label: "monorepo-apps-e-pacotes — app interno MVC é classificado em apps[]",
      projectPath: makeTree({
        "package.json": "{}",
        "apps/api/package.json": "{}",
        "apps/api/src/controllers/usuarios.js": "",
        "apps/api/src/models/usuario.js": "",
        "apps/web/package.json": "{}",
        "apps/web/src/index.tsx": "",
      }),
      expected: "monorepo-apps-e-pacotes",
      verify(result) {
        assert.deepStrictEqual(result.evidence, ["apps/api", "apps/web"]);
        assert.deepStrictEqual(result.apps, [
          {
            path: "apps/api",
            structuralPattern: "mvc-classico",
            evidence: ["src/controllers", "src/models"],
          },
          { path: "apps/web", structuralPattern: "indefinido", evidence: [] },
        ]);
      },
    },
    {
      label: "monorepo-apps-e-pacotes — app chamado storage dentro de apps/ não é descartado",
      projectPath: makeTree({
        "package.json": "{}",
        "apps/storage/package.json": "{}",
        "apps/web/package.json": "{}",
      }),
      expected: "monorepo-apps-e-pacotes",
      verify(result) {
        assert.deepStrictEqual(result.evidence, ["apps/storage", "apps/web"]);
      },
    },
    {
      label: "regressão — app único dentro de apps/ não deve ser monorepo",
      projectPath: makeTree({
        "package.json": "{}",
        "apps/web/package.json": "{}",
        "apps/web/src/modules/usuarios/index.ts": "",
        "apps/web/src/modules/cobranca/index.ts": "",
      }),
      expected: "modular-por-dominio",
      verify(result) {
        assert.deepStrictEqual(result.evidence, ["apps/web/src/modules"]);
        assert.strictEqual(result.apps, undefined);
      },
    },
    {
      label: "regressão — raiz com manifesto, um app em apps/ e pasta irmã com manifesto",
      projectPath: makeTree({
        "package.json": "{}",
        "apps/web/package.json": "{}",
        "tools/package.json": "{}",
      }),
      expected: "indefinido",
      verify(result) {
        assert.deepStrictEqual(result.evidence, []);
        assert.strictEqual(result.apps, undefined);
      },
    },
    {
      label: "regressão — Django com apps/ sem manifesto por app não é monorepo",
      projectPath: makeTree({
        "manage.py": "",
        "requirements.txt": "",
        "apps/users/models.py": "",
        "apps/users/views.py": "",
        "apps/billing/models.py": "",
        "apps/billing/views.py": "",
      }),
      expected: "indefinido",
      verify(result) {
        assert.deepStrictEqual(result.evidence, []);
        assert.strictEqual(result.apps, undefined);
      },
    },
    {
      label: "regressão — features/ do Cucumber não é modular",
      projectPath: makeTree({
        "package.json": "{}",
        "features/login.feature": "",
        "features/step_definitions/login.steps.js": "",
        "features/support/env.js": "",
      }),
      expected: "indefinido",
      verify(result) {
        assert.deepStrictEqual(result.evidence, []);
      },
    },
    {
      label: "regressão — contexts/ do React com um filho só não é modular",
      projectPath: makeTree({
        "package.json": "{}",
        "src/contexts/AuthContext.tsx": "",
        "src/contexts/theme/ThemeContext.tsx": "",
      }),
      expected: "indefinido",
      verify(result) {
        assert.deepStrictEqual(result.evidence, []);
      },
    },
    {
      label: "regressão — controllers e models não correlacionados não são MVC",
      projectPath: makeTree({
        "package.json": "{}",
        "api/controllers/rotas.js": "",
        "ml/models/pesos.bin": "",
      }),
      expected: "indefinido",
      verify(result) {
        assert.deepStrictEqual(result.evidence, []);
      },
    },
    {
      label: "regressão — pastas ignoradas (.apm, Build em maiúsculas) não geram evidência",
      projectPath: makeTree({
        "package.json": "{}",
        ".apm/modules/a/index.md": "",
        ".apm/modules/b/index.md": "",
        "Build/Controllers/x.js": "",
        "Build/Models/y.js": "",
      }),
      expected: "indefinido",
      verify(result) {
        assert.deepStrictEqual(result.evidence, []);
      },
    },
    {
      label: "indefinido — estrutura plana sem convenção reconhecível",
      projectPath: makeTree({
        "package.json": "{}",
        "src/index.ts": "",
        "src/common/util.ts": "",
      }),
      expected: "indefinido",
      verify(result) {
        assert.deepStrictEqual(result.evidence, []);
      },
    },
    {
      label: "indefinido — projeto vazio",
      projectPath: makeTree({}),
      expected: "indefinido",
      verify(result) {
        assert.deepStrictEqual(result, {
          structuralPattern: "indefinido",
          evidence: [],
          warnings: [],
        });
      },
    },
    {
      label: "regressão — diretório alcançado apenas via link simbólico",
      projectPath: makeSymlinkTree(),
      expected: "modular-por-dominio",
      verify(result) {
        assert.deepStrictEqual(result.evidence, ["src/modules"]);
      },
    },
  ];

  if (canTestPermissions) {
    cases.push({
      label: "avisos — diretório sem permissão vira warning em vez de erro silencioso",
      projectPath: makeAccessDeniedTree(),
      expected: "modular-por-dominio",
      verify(result) {
        assert.deepStrictEqual(result.evidence, ["src/modules"]);
        assert.strictEqual(result.warnings.length, 1);
        assert.strictEqual(result.warnings[0].path, "src/secreto");
        assert.ok(["EACCES", "EPERM"].includes(result.warnings[0].code));
      },
    });
  }

  return cases;
}

// ---------------------------------------------------------------------------
// Verificações do processo (CLI e calibração), fora do loop de casos
// ---------------------------------------------------------------------------

function runNode(args, env, cwd) {
  return spawnSync(process.execPath, args, {
    encoding: "utf8",
    env: { ...process.env, ...env },
    cwd,
  });
}

function buildProcessChecks() {
  const checks = [
    {
      label: "cli — caminho inexistente encerra com código 2 e mensagem em stderr",
      run() {
        const missing = path.join(makeTree({}), "nao-existe");
        const res = runNode([DETECTOR, missing]);
        assert.strictEqual(res.status, 2);
        assert.match(res.stderr, /Caminho inexistente/);
        assert.strictEqual(res.stdout, "");
      },
    },
    {
      label: "cli — arquivo em vez de diretório encerra com código 2",
      run() {
        const root = makeTree({ "package.json": "{}" });
        const res = runNode([DETECTOR, path.join(root, "package.json")]);
        assert.strictEqual(res.status, 2);
        assert.match(res.stderr, /não é um diretório/);
      },
    },
    {
      label: "cli — saída inclui projectRootInput e projectRoot absoluto",
      run() {
        const root = makeTree({ "package.json": "{}", "src/index.ts": "" });
        const res = runNode([DETECTOR, "."], undefined, root);
        assert.strictEqual(res.status, 0, res.stderr);
        const out = JSON.parse(res.stdout);
        assert.strictEqual(out.projectRootInput, ".");
        assert.strictEqual(path.isAbsolute(out.projectRoot), true);
        assert.strictEqual(fs.realpathSync(out.projectRoot), fs.realpathSync(root));
        assert.strictEqual(out.structuralPattern, "indefinido");
        assert.ok(STRUCTURAL_PATTERNS.includes(out.structuralPattern));
        assert.ok(Array.isArray(out.evidence));
        assert.ok(Array.isArray(out.warnings));
      },
    },
    {
      label: "biblioteca — caminho inválido lança erro com código ERR_PROJETO_INVALIDO",
      run() {
        const root = makeTree({ "package.json": "{}" });
        assert.throws(
          () => detectStructuralPattern(path.join(root, "package.json")),
          (err) => err.code === "ERR_PROJETO_INVALIDO"
        );
      },
    },
    {
      label: "calibração — JSON inválido encerra a suíte com código 2 e sem fixtures residuais",
      run() {
        const dir = makeTree({ "calibracao.json": "{ isto não é json" });
        const before = countFixturesInTmp();
        const res = runNode([__filename], {
          PADTEC_CALIBRACAO: path.join(dir, "calibracao.json"),
          PADTEC_TESTE_SEM_SUBPROCESSO: "1",
        });
        assert.strictEqual(res.status, 2, res.stdout + res.stderr);
        assert.match(res.stderr, /calibração/);
        assert.strictEqual(countFixturesInTmp(), before);
      },
    },
    {
      label: "calibração — arquivo inexistente encerra a suíte com código 2",
      run() {
        const dir = makeTree({});
        const res = runNode([__filename], {
          PADTEC_CALIBRACAO: path.join(dir, "nao-existe.json"),
          PADTEC_TESTE_SEM_SUBPROCESSO: "1",
        });
        assert.strictEqual(res.status, 2);
        assert.match(res.stderr, /ENOENT/);
      },
    },
    {
      label: "calibração — caso com expected fora do conjunto válido é rejeitado",
      run() {
        const dir = makeTree({
          "calibracao.json": JSON.stringify([
            { label: "x", projectPath: ".", expected: "hexagonal" },
          ]),
        });
        const res = runNode([__filename], {
          PADTEC_CALIBRACAO: path.join(dir, "calibracao.json"),
          PADTEC_TESTE_SEM_SUBPROCESSO: "1",
        });
        assert.strictEqual(res.status, 2);
        assert.match(res.stderr, /"expected"/);
      },
    },
    {
      label: "calibração — projectPath relativo é resolvido a partir do diretório do JSON",
      run() {
        const dir = makeTree({
          "calibracao.json": JSON.stringify([
            { label: "projeto ao lado", projectPath: "./projeto", expected: "modular-por-dominio" },
          ]),
          "projeto/package.json": "{}",
          "projeto/src/modules/a/index.ts": "",
          "projeto/src/modules/b/index.ts": "",
        });
        const res = runNode([__filename], {
          PADTEC_CALIBRACAO: path.join(dir, "calibracao.json"),
          PADTEC_TESTE_SEM_SUBPROCESSO: "1",
        });
        assert.strictEqual(res.status, 0, res.stdout + res.stderr);
        assert.match(res.stdout, /Carregados 1 caso\(s\) externo\(s\)/);
        assert.match(res.stdout, /OK {3}\[externo\] projeto ao lado -> esperado "modular-por-dominio", obtido "modular-por-dominio"/);
      },
    },
  ];
  return checks;
}

function countFixturesInTmp() {
  return fs
    .readdirSync(os.tmpdir())
    .filter((name) => name.startsWith("padtec-fixture-")).length;
}

// ---------------------------------------------------------------------------
// Execução
// ---------------------------------------------------------------------------

function main() {
  // A calibração externa é validada antes de criar qualquer fixture.
  let extras = [];
  const arquivoCalibracao = process.env.PADTEC_CALIBRACAO;
  if (arquivoCalibracao) {
    try {
      extras = loadCalibration(arquivoCalibracao);
    } catch (err) {
      if (err instanceof CalibracaoInvalida) {
        process.stderr.write(`Erro na calibração externa (PADTEC_CALIBRACAO): ${err.message}\n`);
        process.exitCode = 2;
        return;
      }
      throw err;
    }
    process.stdout.write(`Carregados ${extras.length} caso(s) externo(s) de calibração.\n\n`);
  }

  let failures = 0;
  let total = 0;

  try {
    const cases = [...buildCases(), ...extras];

    for (const testCase of cases) {
      total += 1;
      let detail = "";
      let pass = false;
      try {
        const result = detectStructuralPattern(testCase.projectPath);
        pass = result.structuralPattern === testCase.expected;
        detail = `esperado "${testCase.expected}", obtido "${result.structuralPattern}"`;
        if (pass && typeof testCase.verify === "function") {
          testCase.verify(result);
        }
      } catch (err) {
        pass = false;
        detail = `${detail ? detail + "; " : ""}${err.message}`;
      }
      if (!pass) failures += 1;
      process.stdout.write(`${pass ? "OK  " : "FAIL"} ${testCase.label} -> ${detail}\n`);
    }

    // As verificações de processo relançam a própria suíte; o subprocesso
    // não deve relançar de novo.
    if (!process.env.PADTEC_TESTE_SEM_SUBPROCESSO) {
      for (const check of buildProcessChecks()) {
        total += 1;
        let pass = true;
        let detail = "";
        try {
          check.run();
        } catch (err) {
          pass = false;
          detail = ` -> ${err.message}`;
        }
        if (!pass) failures += 1;
        process.stdout.write(`${pass ? "OK  " : "FAIL"} ${check.label}${detail}\n`);
      }
    }
  } finally {
    cleanupFixtures();
  }

  if (failures > 0) {
    process.stderr.write(`\n${failures} de ${total} caso(s) falharam.\n`);
    process.exitCode = 1;
    return;
  }

  process.stdout.write(`\nTodos os ${total} casos passaram.\n`);
}

main();

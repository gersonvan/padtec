#!/usr/bin/env node
"use strict";

/**
 * Ponto de entrada da CLI do PADTec.
 *
 * Uso: node ferramentas/cli/padtec.js detect [raiz] [--nivel L1|L2|L3] [--saida <pasta>] [--json]
 *
 * O comando `detect` grava `<raiz>/.padtec/run/context.json` e
 * `<raiz>/.padtec/run/detection-report.md` com a detecção de variante,
 * capacidades, padrão estrutural e pasta de saída, segundo os procedimentos
 * do prompt mestre (`padtec/prompts/00-mestre.md`).
 *
 * Códigos de saída: 0 (sucesso), 2 (uso incorreto ou raiz inválida),
 * 1 (erro inesperado).
 */

const { detect, renderReport, writeRunArtifacts, LEVELS } = require("./lib/padtec-detect");

const USAGE =
  "Uso: padtec detect [raiz] [--nivel L1|L2|L3] [--saida <pasta>] [--json]\n" +
  "\n" +
  "Detecta variante, capacidades, padrão estrutural e pasta de saída do projeto\n" +
  "em <raiz> (padrão: diretório atual) e grava o resultado em\n" +
  "<raiz>/.padtec/run/context.json e <raiz>/.padtec/run/detection-report.md.\n" +
  "\n" +
  "Opções:\n" +
  "  --nivel <L1|L2|L3>  nível de documentação; define as seções previstas\n" +
  "  --saida <pasta>     pasta de saída da documentação (sobrepõe a detecção)\n" +
  "  --json              imprime também o context.json em stdout\n" +
  "  -h, --help          mostra esta ajuda\n" +
  "\n" +
  "Códigos de saída: 0 sucesso; 2 uso incorreto ou raiz inválida; 1 erro inesperado.\n";

class UsageError extends Error {}

function parseArgs(argv) {
  const parsed = { command: null, root: null, level: null, outputDir: null, json: false, help: false };
  const positional = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "-h" || arg === "--help") {
      parsed.help = true;
      continue;
    }
    if (arg === "--json") {
      parsed.json = true;
      continue;
    }
    if (arg === "--nivel" || arg.startsWith("--nivel=")) {
      const value = arg.includes("=") ? arg.slice(arg.indexOf("=") + 1) : argv[(i += 1)];
      if (value === undefined || value === "") throw new UsageError("A opção --nivel exige um valor (L1, L2 ou L3).");
      parsed.level = value;
      continue;
    }
    if (arg === "--saida" || arg.startsWith("--saida=")) {
      const value = arg.includes("=") ? arg.slice(arg.indexOf("=") + 1) : argv[(i += 1)];
      if (value === undefined || value === "") throw new UsageError("A opção --saida exige um caminho.");
      parsed.outputDir = value;
      continue;
    }
    if (arg.startsWith("-")) throw new UsageError(`Opção desconhecida: ${arg}`);
    positional.push(arg);
  }
  parsed.command = positional[0] || null;
  if (positional.length > 2) throw new UsageError(`Argumentos excedentes: ${positional.slice(2).join(" ")}`);
  parsed.root = positional[1] || ".";
  return parsed;
}

function runDetect(parsed) {
  if (parsed.level !== null && !LEVELS.includes(String(parsed.level).toUpperCase())) {
    throw new UsageError(`Nível inválido: ${parsed.level}. Use L1, L2 ou L3.`);
  }

  let context;
  try {
    context = detect(parsed.root, { level: parsed.level, outputDir: parsed.outputDir });
  } catch (err) {
    if (err && err.code === "ERR_PROJETO_INVALIDO") {
      process.stderr.write(`Erro: ${err.message}\n`);
      process.exitCode = 2;
      return;
    }
    throw err;
  }

  const report = renderReport(context);
  const written = writeRunArtifacts(context, report);

  if (parsed.json) {
    process.stdout.write(`${JSON.stringify(context, null, 2)}\n`);
  } else {
    process.stdout.write(
      `Detecção concluída: variante ${context.variant || "indeterminada"}, ` +
        `capacidades [${context.capabilities.join(", ")}], padrão ${context.structuralPattern.structuralPattern}.\n` +
        `Gravado em ${written.contextPath} e ${written.reportPath}.\n`
    );
  }
}

function main(argv) {
  let parsed;
  try {
    parsed = parseArgs(argv);
  } catch (err) {
    if (err instanceof UsageError) {
      process.stderr.write(`Erro: ${err.message}\n\n${USAGE}`);
      process.exitCode = 2;
      return;
    }
    throw err;
  }

  if (parsed.help) {
    process.stdout.write(USAGE);
    return;
  }
  if (parsed.command === null) {
    process.stderr.write(USAGE);
    process.exitCode = 2;
    return;
  }
  if (parsed.command !== "detect") {
    process.stderr.write(`Erro: comando desconhecido: ${parsed.command}\n\n${USAGE}`);
    process.exitCode = 2;
    return;
  }

  try {
    runDetect(parsed);
  } catch (err) {
    if (err instanceof UsageError) {
      process.stderr.write(`Erro: ${err.message}\n`);
      process.exitCode = 2;
      return;
    }
    throw err;
  }
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (err) {
    process.stderr.write(`Erro inesperado: ${err && err.message ? err.message : err}\n`);
    process.exitCode = 1;
  }
}

module.exports = { parseArgs, main };

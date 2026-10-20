#!/usr/bin/env node
'use strict';

/**
 * Atualiza uma única página do Confluence com um arquivo ADF.
 *
 * Uso:
 *   node update-confluence-page.js --pageId 123456 --adf arquivo.adf.json
 *   node update-confluence-page.js -p 123456 -a arquivo.adf.json -t "Novo título"
 *
 * Credenciais: config.js ou variáveis de ambiente CONFLUENCE_EMAIL,
 * CONFLUENCE_TOKEN e CONFLUENCE_CLOUD_ID (ver README.md).
 */

const fs = require('fs');
const path = require('path');
const { loadConfig, updatePage: updatePageOnConfluence, getCurrentVersion } = require('./lib/confluence-client');

const SEPARATOR = '='.repeat(63);

/**
 * Atualiza uma página e registra o progresso no console.
 */
async function updatePage(config, pageId, adfContent, title = null) {
  console.log(`\nAtualizando página ${pageId}...`);

  const result = await updatePageOnConfluence(config, pageId, adfContent, {
    title,
    onPageInfo: (info) => {
      console.log(`   Título: ${info.newTitle}`);
      console.log(`   Versão: ${info.version} -> ${info.newVersion}`);
      console.log(`   Payload: ${(info.payloadBytes / 1024).toFixed(2)} KB`);
    },
    onRetry: (message) => console.log(`   ${message}`),
  });

  console.log(`   Sucesso. Versão publicada: ${result.version.number}`);
  const links = result._links || {};
  if (links.base && links.webui) {
    console.log(`   URL: ${links.base}${links.webui}`);
  }
  return result;
}

function parseArgs(argv) {
  const parsed = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--pageId' || arg === '-p') {
      parsed.pageId = argv[++i];
    } else if (arg === '--adf' || arg === '-a') {
      parsed.adfPath = argv[++i];
    } else if (arg === '--title' || arg === '-t') {
      parsed.title = argv[++i];
    } else if (arg === '--help' || arg === '-h') {
      parsed.help = true;
    }
  }
  return parsed;
}

function printUsage() {
  console.log(`
Uso: node update-confluence-page.js --pageId <ID> --adf <arquivo.adf.json>

Argumentos:
  --pageId, -p    ID da página do Confluence
  --adf, -a       Caminho do arquivo ADF
  --title, -t     Título da página (opcional; mantém o atual se omitido)

Exemplos:
  node update-confluence-page.js -p 123456 -a documento.adf.json
  node update-confluence-page.js -p 123456 -a documento.adf.json -t "Novo título"
`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help || !args.pageId || !args.adfPath) {
    printUsage();
    process.exitCode = args.help ? 0 : 1;
    return;
  }

  const config = loadConfig();

  const adfPath = path.resolve(args.adfPath);
  if (!fs.existsSync(adfPath)) {
    throw new Error(`Arquivo ADF não encontrado: ${adfPath}`);
  }

  const adfContent = JSON.parse(fs.readFileSync(adfPath, 'utf8'));
  const adfSizeKB = (fs.statSync(adfPath).size / 1024).toFixed(2);

  console.log(SEPARATOR);
  console.log('ATUALIZAÇÃO DE PÁGINA NO CONFLUENCE');
  console.log(SEPARATOR);
  console.log(`\nCredenciais: ${config.source}`);
  console.log(`Arquivo ADF: ${path.basename(adfPath)} (${adfSizeKB} KB)`);
  console.log(`Elementos: ${adfContent.content?.length || 0}`);

  await updatePage(config, args.pageId, adfContent, args.title);

  console.log(`\n${SEPARATOR}`);
  console.log('Atualização concluída com sucesso.');
  console.log(SEPARATOR);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`\nErro: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { updatePage, getCurrentVersion };

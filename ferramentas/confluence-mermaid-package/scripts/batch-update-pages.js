#!/usr/bin/env node
'use strict';

/**
 * Atualização em lote de páginas do Confluence a partir de arquivos ADF.
 *
 * Uso:
 *   node batch-update-pages.js <pasta-dos-adf> [mapeamento.json]
 *
 * O mapeamento (ID da página -> nome do arquivo ADF sem extensão) vem, nesta
 * ordem, de: arquivo JSON passado como segundo argumento; variável de
 * ambiente CONFLUENCE_PAGE_MAPPING (caminho de um JSON); options.pageMapping
 * em config.js (objeto ou caminho de um JSON); constante PAGE_MAPPING abaixo.
 *
 * A pasta dos arquivos ADF vem do primeiro argumento; na ausência dele, de
 * options.adfDirectory (config.js ou CONFLUENCE_ADF_DIRECTORY); por fim, de
 * adf-files/ ao lado do pacote.
 *
 * Credenciais: config.js ou variáveis de ambiente CONFLUENCE_EMAIL,
 * CONFLUENCE_TOKEN e CONFLUENCE_CLOUD_ID (ver README.md).
 */

const fs = require('fs');
const path = require('path');
const { loadConfig, updatePage: updatePageOnConfluence, sleep } = require('./lib/confluence-client');

const PACKAGE_ROOT = path.join(__dirname, '..');
const SEPARATOR = '='.repeat(63);

// Mapeamento padrão: ID da página -> nome do arquivo ADF (sem .adf.json).
// Prefira um arquivo JSON externo; esta constante serve para uso pontual.
const PAGE_MAPPING = {
  // '123456': 'meu-documento',       // procura meu-documento.adf.json
  // '789012': 'outro-documento',
};

const stats = {
  success: [],
  errors: [],
  skipped: [],
};

function readMappingFile(filePath, origin) {
  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Arquivo de mapeamento não encontrado (${origin}): ${resolved}`);
  }
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(resolved, 'utf8'));
  } catch (error) {
    throw new Error(`Arquivo de mapeamento inválido (${origin}): ${resolved}: ${error.message}`);
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`Arquivo de mapeamento deve conter um objeto { "pageId": "nome-do-arquivo" }: ${resolved}`);
  }
  return { mapping: parsed, origin: `${origin}: ${resolved}` };
}

/**
 * Resolve o mapeamento de páginas conforme a ordem de precedência documentada.
 */
function resolveMapping(config, argv) {
  if (argv[1]) {
    return readMappingFile(argv[1], 'argumento');
  }
  // options.pageMapping já reflete config.js ou CONFLUENCE_PAGE_MAPPING (ver loadConfig).
  const fromOptions = config.options.pageMapping;
  if (fromOptions && typeof fromOptions === 'object') {
    return { mapping: fromOptions, origin: 'config.js (options.pageMapping)' };
  }
  if (typeof fromOptions === 'string' && fromOptions.trim() !== '') {
    return readMappingFile(fromOptions, 'options.pageMapping ou CONFLUENCE_PAGE_MAPPING');
  }
  return { mapping: PAGE_MAPPING, origin: 'constante PAGE_MAPPING do script' };
}

function resolveAdfDirectory(config, argv) {
  const candidate = argv[0] || config.options.adfDirectory || path.join(PACKAGE_ROOT, 'adf-files');
  return path.resolve(candidate);
}

/**
 * Atualiza uma página e registra o resultado em stats.
 */
async function updatePage(config, adfDirectory, pageId, adfFileName) {
  try {
    const adfPath = path.join(adfDirectory, `${adfFileName}.adf.json`);
    if (!fs.existsSync(adfPath)) {
      throw new Error(`Arquivo ADF não encontrado: ${adfPath}`);
    }
    const adfContent = JSON.parse(fs.readFileSync(adfPath, 'utf8'));

    const result = await updatePageOnConfluence(config, pageId, adfContent, {
      onRetry: (message) => console.log(`   ${message}`),
    });

    console.log(`   Sucesso: ${result.title} (versão ${result.version.number})`);
    stats.success.push({
      pageId,
      title: result.title,
      version: result.version.number,
    });
  } catch (error) {
    console.error(`   Erro: ${error.message}`);
    stats.errors.push({
      pageId,
      adfFileName,
      error: error.message,
    });
  }
}

async function main() {
  console.log(SEPARATOR);
  console.log('ATUALIZAÇÃO EM LOTE NO CONFLUENCE');
  console.log(SEPARATOR);

  const argv = process.argv.slice(2);
  const config = loadConfig();
  const adfDirectory = resolveAdfDirectory(config, argv);
  const { mapping, origin } = resolveMapping(config, argv);
  const pages = Object.entries(mapping);

  if (pages.length === 0) {
    console.log('\nNenhuma página mapeada.');
    console.log('   Informe um arquivo JSON como segundo argumento, defina options.pageMapping em config.js');
    console.log('   ou preencha a constante PAGE_MAPPING no script.');
    return;
  }

  if (!fs.existsSync(adfDirectory) || !fs.statSync(adfDirectory).isDirectory()) {
    throw new Error(`Pasta de arquivos ADF não encontrada: ${adfDirectory}`);
  }

  console.log(`\nCredenciais: ${config.source}`);
  console.log(`Mapeamento: ${origin}`);
  console.log(`Total de páginas: ${pages.length}`);
  console.log(`Pasta ADF: ${adfDirectory}\n`);

  let index = 1;
  for (const [pageId, adfFileName] of pages) {
    console.log(`\n[${index}/${pages.length}] Atualizando página ${pageId} (${adfFileName}.adf.json)...`);
    await updatePage(config, adfDirectory, pageId, adfFileName);

    if (index < pages.length && config.options.batchDelay > 0) {
      await sleep(config.options.batchDelay);
    }
    index++;
  }

  console.log(`\n${SEPARATOR}`);
  console.log('RELATÓRIO FINAL');
  console.log(SEPARATOR);
  console.log(`Sucesso: ${stats.success.length} página(s)`);
  console.log(`Falhas: ${stats.errors.length} página(s)`);
  console.log(`Ignoradas: ${stats.skipped.length} página(s)`);

  if (stats.errors.length > 0) {
    console.log('\nErros:');
    stats.errors.forEach((err) => {
      console.log(`   - ${err.pageId}: ${err.error}`);
    });
  }

  const logPath = path.join(PACKAGE_ROOT, 'batch-update-log.json');
  fs.writeFileSync(
    logPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        adfDirectory,
        mappingOrigin: origin,
        stats,
      },
      null,
      2
    )
  );

  console.log(`\nLog salvo em: ${logPath}`);
  console.log(SEPARATOR);
}

if (require.main === module) {
  main()
    .then(() => {
      process.exitCode = stats.errors.length > 0 ? 1 : 0;
    })
    .catch((error) => {
      console.error(`\nErro: ${error.message}`);
      process.exitCode = 1;
    });
}

module.exports = { resolveMapping, resolveAdfDirectory };

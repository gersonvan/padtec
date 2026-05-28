#!/usr/bin/env node

/**
 * Atualização em lote de páginas do Confluence
 * 
 * Configure o mapeamento PAGE_MAPPING abaixo e execute:
 *   node batch-update-pages.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Carregar configuração
let config;
try {
  config = require('../config.js');
} catch (e) {
  console.error('❌ Erro: Arquivo config.js não encontrado!');
  console.error('   Execute: cp config.template.js config.js');
  process.exit(1);
}

// ═══════════════════════════════════════════════════════════════
// CONFIGURAÇÃO: Mapeie Page IDs → arquivos ADF (sem extensão)
// ═══════════════════════════════════════════════════════════════

const PAGE_MAPPING = {
  // Exemplo:
  // '123456': 'meu-documento',       // Procura meu-documento.adf.json
  // '789012': 'outro-documento',
  // '345678': 'diagrama-arquitetura',
};

// Diretório onde estão os arquivos ADF
const ADF_DIRECTORY = path.join(__dirname, '..', 'adf-files');

// ═══════════════════════════════════════════════════════════════

const stats = {
  success: [],
  errors: [],
  skipped: []
};

/**
 * Faz requisição HTTP
 */
function makeRequest(options, postData = null, timeout = 180000) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      req.destroy();
      reject(new Error('Request timeout'));
    }, timeout);

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        clearTimeout(timeoutId);
        resolve({
          statusCode: res.statusCode,
          data: data
        });
      });
    });

    req.on('error', (error) => {
      clearTimeout(timeoutId);
      reject(error);
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

/**
 * Obtém versão atual da página
 */
async function getCurrentVersion(pageId) {
  const auth = Buffer.from(`${config.email}:${config.token}`).toString('base64');
  
  const options = {
    hostname: 'api.atlassian.com',
    path: `/ex/confluence/${config.cloudId}/wiki/api/v2/pages/${pageId}`,
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Accept': 'application/json'
    }
  };

  const response = await makeRequest(options, null, 30000);
  
  if (response.statusCode === 200) {
    const pageData = JSON.parse(response.data);
    return {
      version: pageData.version.number,
      title: pageData.title
    };
  }
  
  throw new Error(`Failed to get page version: ${response.statusCode}`);
}

/**
 * Atualiza uma página
 */
async function updatePage(pageId, adfFileName) {
  try {
    // 1. Carregar ADF
    const adfPath = path.join(ADF_DIRECTORY, `${adfFileName}.adf.json`);
    
    if (!fs.existsSync(adfPath)) {
      throw new Error(`Arquivo ADF não encontrado: ${adfPath}`);
    }
    
    const adfContent = JSON.parse(fs.readFileSync(adfPath, 'utf-8'));
    
    // 2. Obter info da página
    const pageInfo = await getCurrentVersion(pageId);
    const newVersion = pageInfo.version + 1;
    
    // 3. Preparar payload
    const payload = {
      id: pageId,
      status: 'current',
      title: pageInfo.title,
      spaceId: config.spaceId,
      body: {
        representation: 'atlas_doc_format',
        value: JSON.stringify(adfContent)
      },
      version: {
        number: newVersion,
        message: config.options?.defaultVersionMessage || 'Atualização em lote via conversor'
      }
    };

    const payloadString = JSON.stringify(payload);
    const auth = Buffer.from(`${config.email}:${config.token}`).toString('base64');

    // 4. Enviar atualização
    const options = {
      hostname: 'api.atlassian.com',
      path: `/ex/confluence/${config.cloudId}/wiki/api/v2/pages/${pageId}`,
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(payloadString)
      }
    };

    const timeout = config.options?.httpTimeout || 180000;
    const response = await makeRequest(options, payloadString, timeout);

    if (response.statusCode === 200) {
      const result = JSON.parse(response.data);
      console.log(`   ✅ ${result.title} (versão ${result.version.number})`);
      stats.success.push({
        pageId,
        title: result.title,
        version: result.version.number
      });
    } else {
      throw new Error(`HTTP ${response.statusCode}: ${response.data}`);
    }
    
  } catch (error) {
    console.error(`   ❌ Erro: ${error.message}`);
    stats.errors.push({
      pageId,
      adfFileName,
      error: error.message
    });
  }
}

/**
 * Main
 */
async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🔄 ATUALIZAÇÃO EM LOTE - CONFLUENCE');
  console.log('═══════════════════════════════════════════════════════════════');
  
  const pages = Object.entries(PAGE_MAPPING);
  
  if (pages.length === 0) {
    console.log('\n⚠️  Nenhuma página mapeada!');
    console.log('   Edite o arquivo e configure PAGE_MAPPING');
    return;
  }
  
  console.log(`\n📊 Total de páginas: ${pages.length}`);
  console.log(`📁 Diretório ADF: ${ADF_DIRECTORY}\n`);

  // Atualizar páginas sequencialmente com delay
  let index = 1;
  for (const [pageId, adfFileName] of pages) {
    console.log(`\n[${index}/${pages.length}] Atualizando página ${pageId}...`);
    await updatePage(pageId, adfFileName);
    
    // Delay entre requisições
    if (index < pages.length) {
      const delay = config.options?.batchDelay || 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    index++;
  }

  // Relatório final
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('📊 RELATÓRIO FINAL');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`✅ Sucesso: ${stats.success.length} páginas`);
  console.log(`❌ Falhas: ${stats.errors.length} páginas`);
  console.log(`⚠️  Ignoradas: ${stats.skipped.length} páginas`);
  
  if (stats.errors.length > 0) {
    console.log('\n❌ Erros:');
    stats.errors.forEach(err => {
      console.log(`   - ${err.pageId}: ${err.error}`);
    });
  }

  // Salvar log
  const logPath = path.join(__dirname, '..', 'batch-update-log.json');
  fs.writeFileSync(logPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    stats,
    details: {
      success: stats.success,
      errors: stats.errors,
      skipped: stats.skipped
    }
  }, null, 2));
  
  console.log(`\n📝 Log salvo em: batch-update-log.json`);
  console.log('═══════════════════════════════════════════════════════════════');
}

// Executar
if (require.main === module) {
  main().catch(console.error);
}

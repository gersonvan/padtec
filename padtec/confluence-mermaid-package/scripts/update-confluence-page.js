#!/usr/bin/env node

/**
 * Atualiza uma página única do Confluence com arquivo ADF
 * 
 * Uso:
 *   node update-confluence-page.js --pageId 123456 --adf arquivo.adf.json
 *   node update-confluence-page.js -p 123456 -a arquivo.adf.json
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
  console.error('   E preencha suas credenciais.');
  process.exit(1);
}

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
      title: pageData.title,
      spaceId: pageData.spaceId
    };
  }
  
  throw new Error(`Failed to get page info: HTTP ${response.statusCode}`);
}

/**
 * Atualiza página no Confluence
 */
async function updatePage(pageId, adfContent, title = null) {
  console.log(`\n🔄 Atualizando página ${pageId}...`);
  
  // 1. Obter info atual da página
  const pageInfo = await getCurrentVersion(pageId);
  const newVersion = pageInfo.version + 1;
  const pageTitle = title || pageInfo.title;
  
  console.log(`   📄 Título: ${pageTitle}`);
  console.log(`   📋 Versão atual: ${pageInfo.version} → ${newVersion}`);
  
  // 2. Preparar payload
  const payload = {
    id: pageId,
    status: 'current',
    title: pageTitle,
    spaceId: pageInfo.spaceId,
    body: {
      representation: 'atlas_doc_format',
      value: JSON.stringify(adfContent)
    },
    version: {
      number: newVersion,
      message: config.options?.defaultVersionMessage || 'Atualização via conversor Markdown → ADF'
    }
  };

  const payloadString = JSON.stringify(payload);
  const payloadSizeKB = (Buffer.byteLength(payloadString) / 1024).toFixed(2);
  console.log(`   📦 Payload: ${payloadSizeKB} KB`);

  const auth = Buffer.from(`${config.email}:${config.token}`).toString('base64');

  // 3. Enviar atualização
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
    console.log(`   ✅ Sucesso! Versão ${result.version.number}`);
    console.log(`   🔗 URL: https://grupoavp.atlassian.net/wiki/spaces/ung/pages/${pageId}/`);
    return result;
  } else {
    throw new Error(`HTTP ${response.statusCode}: ${response.data}`);
  }
}

/**
 * Parse argumentos da linha de comando
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--pageId' || args[i] === '-p') {
      parsed.pageId = args[++i];
    } else if (args[i] === '--adf' || args[i] === '-a') {
      parsed.adfPath = args[++i];
    } else if (args[i] === '--title' || args[i] === '-t') {
      parsed.title = args[++i];
    }
  }
  
  return parsed;
}

/**
 * Main
 */
async function main() {
  const args = parseArgs();
  
  if (!args.pageId || !args.adfPath) {
    console.log(`
Uso: node update-confluence-page.js --pageId <ID> --adf <arquivo.adf.json>

Argumentos:
  --pageId, -p    ID da página do Confluence
  --adf, -a       Caminho para arquivo ADF
  --title, -t     Título da página (opcional, mantém o atual se omitido)

Exemplos:
  node update-confluence-page.js -p 123456 -a documento.adf.json
  node update-confluence-page.js -p 123456 -a documento.adf.json -t "Novo Título"
    `);
    process.exit(1);
  }
  
  try {
    // Carregar ADF
    const adfPath = path.resolve(args.adfPath);
    if (!fs.existsSync(adfPath)) {
      console.error(`❌ Erro: Arquivo ADF não encontrado: ${adfPath}`);
      process.exit(1);
    }
    
    const adfContent = JSON.parse(fs.readFileSync(adfPath, 'utf-8'));
    const adfSizeKB = (fs.statSync(adfPath).size / 1024).toFixed(2);
    
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('🚀 ATUALIZAÇÃO DE PÁGINA CONFLUENCE');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\n📂 Arquivo ADF: ${path.basename(adfPath)} (${adfSizeKB} KB)`);
    console.log(`📊 Elementos: ${adfContent.content?.length || 0}`);
    
    // Atualizar página
    await updatePage(args.pageId, adfContent, args.title);
    
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('✅ Atualização concluída com sucesso!');
    console.log('═══════════════════════════════════════════════════════════════');
    
  } catch (error) {
    console.error(`\n❌ Erro: ${error.message}`);
    process.exit(1);
  }
}

// Executar
if (require.main === module) {
  main();
}

module.exports = { updatePage, getCurrentVersion };

'use strict';

/**
 * Cliente mínimo da API REST v2 do Confluence Cloud e carregamento de configuração.
 *
 * Responsabilidades:
 * - carregar credenciais e opções de config.js e/ou de variáveis de ambiente;
 * - executar requisições HTTPS com timeout, aceitação de qualquer 2xx e
 *   nova tentativa em HTTP 429 (respeitando Retry-After);
 * - obter versão, título e espaço de uma página e atualizá-la com ADF.
 *
 * Sem dependências externas. Node.js >= 18.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const PACKAGE_ROOT = path.join(__dirname, '..', '..');
const CONFIG_PATH = path.join(PACKAGE_ROOT, 'config.js');
const API_HOST = 'api.atlassian.com';

const DEFAULT_OPTIONS = {
  mermaidLayout: 'full-width',
  mermaidAlignment: 'center',
  httpTimeout: 180000,
  adfDirectory: 'adf-files',
  batchDelay: 1000,
  maxRetries: 3,
  defaultVersionMessage: 'Atualização via conversor Markdown para ADF com Mermaid',
  pageMapping: null,
};

// Campos de credencial e as variáveis de ambiente equivalentes.
const CREDENTIAL_ENV = {
  email: 'CONFLUENCE_EMAIL',
  token: 'CONFLUENCE_TOKEN',
  cloudId: 'CONFLUENCE_CLOUD_ID',
  spaceId: 'CONFLUENCE_SPACE_ID',
};

// Opções e as variáveis de ambiente equivalentes (todas opcionais).
const OPTION_ENV = {
  mermaidLayout: 'CONFLUENCE_MERMAID_LAYOUT',
  mermaidAlignment: 'CONFLUENCE_MERMAID_ALIGNMENT',
  httpTimeout: 'CONFLUENCE_HTTP_TIMEOUT',
  adfDirectory: 'CONFLUENCE_ADF_DIRECTORY',
  batchDelay: 'CONFLUENCE_BATCH_DELAY',
  maxRetries: 'CONFLUENCE_MAX_RETRIES',
  defaultVersionMessage: 'CONFLUENCE_VERSION_MESSAGE',
  pageMapping: 'CONFLUENCE_PAGE_MAPPING',
};

const NUMERIC_OPTIONS = new Set(['httpTimeout', 'batchDelay', 'maxRetries']);

// Valores do template que não devem ser tratados como preenchidos.
const PLACEHOLDER_PATTERN = /^(SEU_|seu-email@)/i;

function isFilled(value) {
  return typeof value === 'string' && value.trim() !== '' && !PLACEHOLDER_PATTERN.test(value.trim());
}

/**
 * Lê config.js se existir. Erros de sintaxe ou de execução do arquivo são
 * propagados com contexto, em vez de serem confundidos com "arquivo ausente".
 */
function readConfigFile(configPath) {
  if (!fs.existsSync(configPath)) {
    return null;
  }
  try {
    const loaded = require(configPath);
    if (!loaded || typeof loaded !== 'object') {
      throw new Error('o módulo não exporta um objeto');
    }
    return loaded;
  } catch (error) {
    const wrapped = new Error(`Falha ao carregar ${configPath}: ${error.message}`);
    wrapped.cause = error;
    throw wrapped;
  }
}

/**
 * Carrega a configuração combinando config.js e variáveis de ambiente.
 *
 * Precedência: valor preenchido em config.js; na falta dele, a variável de
 * ambiente correspondente; por fim, os padrões de DEFAULT_OPTIONS.
 *
 * @param {object} [params]
 * @param {boolean} [params.requireCredentials=true] exige email, token e cloudId
 * @param {object} [params.env=process.env]
 * @param {string} [params.configPath]
 */
function loadConfig({ requireCredentials = true, env = process.env, configPath = CONFIG_PATH } = {}) {
  const fileConfig = readConfigFile(configPath) || {};
  const fileOptions = fileConfig.options || {};
  const sources = new Set();

  const credentials = {};
  for (const [field, envName] of Object.entries(CREDENTIAL_ENV)) {
    if (isFilled(fileConfig[field])) {
      credentials[field] = fileConfig[field].trim();
      sources.add('config.js');
    } else if (isFilled(env[envName])) {
      credentials[field] = env[envName].trim();
      sources.add('variáveis de ambiente');
    } else {
      credentials[field] = null;
    }
  }

  const options = { ...DEFAULT_OPTIONS };
  for (const [field, envName] of Object.entries(OPTION_ENV)) {
    let value;
    if (fileOptions[field] !== undefined && fileOptions[field] !== null && fileOptions[field] !== '') {
      value = fileOptions[field];
    } else if (isFilled(env[envName])) {
      value = env[envName].trim();
    } else {
      continue;
    }
    if (NUMERIC_OPTIONS.has(field)) {
      const parsed = Number(value);
      if (!Number.isFinite(parsed) || parsed < 0) {
        throw new Error(`Opção ${field} inválida: ${JSON.stringify(value)} (esperado número não negativo)`);
      }
      value = parsed;
    }
    options[field] = value;
  }

  if (requireCredentials) {
    const missing = ['email', 'token', 'cloudId'].filter((field) => !credentials[field]);
    if (missing.length > 0) {
      const detail = missing.map((field) => `${field} (${CREDENTIAL_ENV[field]})`).join(', ');
      throw new Error(
        `Credenciais ausentes: ${detail}. ` +
        'Preencha config.js (cp config.template.js config.js) ou defina as variáveis de ambiente indicadas.'
      );
    }
  }

  return {
    ...credentials,
    options,
    source: sources.size > 0 ? Array.from(sources).join(' + ') : 'padrões',
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Interpreta o cabeçalho Retry-After (segundos ou data HTTP) em milissegundos.
 */
function parseRetryAfter(header) {
  if (!header) {
    return null;
  }
  const seconds = Number(header);
  if (Number.isFinite(seconds) && seconds >= 0) {
    return seconds * 1000;
  }
  const date = Date.parse(header);
  if (!Number.isNaN(date)) {
    return Math.max(0, date - Date.now());
  }
  return null;
}

function performRequest(options, postData, timeout) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data,
        });
      });
    });

    req.setTimeout(timeout, () => {
      req.destroy(new Error(`Tempo limite de ${timeout} ms excedido em ${options.method} ${options.path}`));
    });

    req.on('error', reject);

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

/**
 * Executa uma requisição HTTPS e repete em HTTP 429 (limite de taxa),
 * respeitando Retry-After quando presente e aplicando um pequeno recuo
 * exponencial caso contrário.
 *
 * @param {object} options opções de https.request
 * @param {string|null} [postData]
 * @param {object} [params]
 * @param {number} [params.timeout=180000]
 * @param {number} [params.maxRetries=3] número máximo de novas tentativas (0 a 3)
 * @param {(message: string) => void} [params.onRetry]
 */
async function makeRequest(options, postData = null, { timeout = 180000, maxRetries = 3, onRetry } = {}) {
  const retries = Math.max(0, Math.min(3, Number(maxRetries) || 0));
  let attempt = 0;

  for (;;) {
    const response = await performRequest(options, postData, timeout);
    if (response.statusCode !== 429 || attempt >= retries) {
      return response;
    }
    attempt += 1;
    const retryAfter = parseRetryAfter(response.headers['retry-after']);
    const waitMs = retryAfter !== null ? retryAfter : 1000 * 2 ** (attempt - 1);
    if (typeof onRetry === 'function') {
      onRetry(`HTTP 429 recebido; nova tentativa ${attempt}/${retries} em ${Math.round(waitMs / 1000)} s`);
    }
    await sleep(waitMs);
  }
}

function isSuccess(statusCode) {
  return statusCode >= 200 && statusCode < 300;
}

function describeFailure(method, apiPath, response) {
  const body = (response.data || '').trim();
  const excerpt = body.length > 600 ? `${body.slice(0, 600)}...` : body;
  return `HTTP ${response.statusCode} em ${method} ${apiPath}${excerpt ? `: ${excerpt}` : ''}`;
}

/**
 * Requisição autenticada à API v2 do Confluence. Lança erro, com o corpo da
 * resposta, para qualquer status fora de 2xx.
 */
async function apiRequest(config, method, apiPath, body = null, { timeout, onRetry } = {}) {
  const auth = Buffer.from(`${config.email}:${config.token}`).toString('base64');
  const payload = body === null ? null : (typeof body === 'string' ? body : JSON.stringify(body));
  const fullPath = `/ex/confluence/${config.cloudId}/wiki/api/v2${apiPath}`;

  const headers = {
    Authorization: `Basic ${auth}`,
    Accept: 'application/json',
  };
  if (payload !== null) {
    headers['Content-Type'] = 'application/json';
    headers['Content-Length'] = Buffer.byteLength(payload);
  }

  const response = await makeRequest(
    { hostname: API_HOST, path: fullPath, method, headers },
    payload,
    {
      timeout: timeout || config.options?.httpTimeout || DEFAULT_OPTIONS.httpTimeout,
      maxRetries: config.options?.maxRetries ?? DEFAULT_OPTIONS.maxRetries,
      onRetry,
    }
  );

  if (!isSuccess(response.statusCode)) {
    const error = new Error(describeFailure(method, fullPath, response));
    error.statusCode = response.statusCode;
    error.responseBody = response.data;
    throw error;
  }

  let parsed = null;
  if (response.data && response.data.trim() !== '') {
    try {
      parsed = JSON.parse(response.data);
    } catch (error) {
      throw new Error(`Resposta inválida (não é JSON) em ${method} ${fullPath}: ${response.data.slice(0, 200)}`);
    }
  }
  return parsed;
}

/**
 * Obtém versão, título e espaço atuais de uma página.
 */
async function getCurrentVersion(config, pageId, { onRetry } = {}) {
  const page = await apiRequest(config, 'GET', `/pages/${encodeURIComponent(pageId)}`, null, {
    timeout: 30000,
    onRetry,
  });
  if (!page || !page.version || typeof page.version.number !== 'number') {
    throw new Error(`Resposta inesperada ao consultar a página ${pageId}: versão ausente`);
  }
  return {
    version: page.version.number,
    title: page.title,
    spaceId: page.spaceId,
  };
}

/**
 * Atualiza o corpo de uma página com um documento ADF.
 *
 * O spaceId é lido da própria página; config.spaceId não é necessário.
 *
 * @param {object} config retorno de loadConfig()
 * @param {string} pageId
 * @param {object} adfContent documento ADF
 * @param {object} [params]
 * @param {string} [params.title] novo título (mantém o atual se omitido)
 * @param {string} [params.versionMessage]
 * @param {(info: object) => void} [params.onPageInfo] chamado antes do envio
 * @param {(message: string) => void} [params.onRetry]
 */
async function updatePage(config, pageId, adfContent, { title, versionMessage, onPageInfo, onRetry } = {}) {
  const pageInfo = await getCurrentVersion(config, pageId, { onRetry });
  const newVersion = pageInfo.version + 1;
  const pageTitle = title || pageInfo.title;

  const payload = {
    id: String(pageId),
    status: 'current',
    title: pageTitle,
    spaceId: pageInfo.spaceId,
    body: {
      representation: 'atlas_doc_format',
      value: JSON.stringify(adfContent),
    },
    version: {
      number: newVersion,
      message: versionMessage || config.options?.defaultVersionMessage || DEFAULT_OPTIONS.defaultVersionMessage,
    },
  };
  const payloadString = JSON.stringify(payload);

  if (typeof onPageInfo === 'function') {
    onPageInfo({
      ...pageInfo,
      newTitle: pageTitle,
      newVersion,
      payloadBytes: Buffer.byteLength(payloadString),
    });
  }

  const result = await apiRequest(config, 'PUT', `/pages/${encodeURIComponent(pageId)}`, payloadString, { onRetry });
  return result;
}

module.exports = {
  CONFIG_PATH,
  DEFAULT_OPTIONS,
  CREDENTIAL_ENV,
  OPTION_ENV,
  loadConfig,
  makeRequest,
  apiRequest,
  getCurrentVersion,
  updatePage,
  parseRetryAfter,
  sleep,
};

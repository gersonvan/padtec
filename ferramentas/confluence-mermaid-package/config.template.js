/**
 * Configuração do Confluence
 *
 * INSTRUÇÕES
 * 1. Copie este arquivo: cp config.template.js config.js
 *    (Windows PowerShell: Copy-Item config.template.js config.js)
 * 2. Preencha as credenciais em config.js.
 * 3. config.js já está no .gitignore; nunca o versione.
 *
 * ALTERNATIVA SEM ARQUIVO (CI/CD)
 * Todo campo abaixo pode vir de uma variável de ambiente. Um valor preenchido
 * em config.js tem precedência; o que ficar vazio (ou com o texto de exemplo)
 * é lido do ambiente:
 *   email                 -> CONFLUENCE_EMAIL
 *   token                 -> CONFLUENCE_TOKEN
 *   cloudId               -> CONFLUENCE_CLOUD_ID
 *   spaceId               -> CONFLUENCE_SPACE_ID (opcional)
 *   mermaidLayout         -> CONFLUENCE_MERMAID_LAYOUT
 *   mermaidAlignment      -> CONFLUENCE_MERMAID_ALIGNMENT
 *   httpTimeout           -> CONFLUENCE_HTTP_TIMEOUT
 *   adfDirectory          -> CONFLUENCE_ADF_DIRECTORY
 *   batchDelay            -> CONFLUENCE_BATCH_DELAY
 *   maxRetries            -> CONFLUENCE_MAX_RETRIES
 *   defaultVersionMessage -> CONFLUENCE_VERSION_MESSAGE
 *   pageMapping           -> CONFLUENCE_PAGE_MAPPING (caminho de um JSON)
 *
 * COMO OBTER AS CREDENCIAIS
 *
 * Email: o e-mail da sua conta Atlassian.
 *
 * Token: gere em https://id.atlassian.com/manage-profile/security/api-tokens
 *
 * Cloud ID: execute no terminal (o curl pede o token como senha, sem expô-lo
 * no histórico do shell):
 *   curl -u seu-email@dominio.com https://api.atlassian.com/oauth/token/accessible-resources
 *
 * Space ID (opcional; os scripts leem o espaço da própria página):
 *   curl -u seu-email@dominio.com "https://api.atlassian.com/ex/confluence/CLOUD_ID/wiki/api/v2/spaces?keys=CHAVE_DO_ESPACO"
 */

module.exports = {
  // E-mail da sua conta Atlassian
  email: 'seu-email@dominio.com',

  // Token de API (gere em https://id.atlassian.com/manage-profile/security/api-tokens)
  token: 'SEU_TOKEN_AQUI',

  // Cloud ID do seu site Confluence
  cloudId: 'SEU_CLOUD_ID_AQUI',

  // ID do espaço (opcional; mantido para referência, não é usado na atualização)
  spaceId: 'SEU_SPACE_ID_AQUI',

  // Configurações opcionais
  options: {
    // Layout da macro Mermaid: 'default', 'full-width', 'center', 'align-start' ou 'align-end'
    mermaidLayout: 'full-width',

    // Alinhamento da macro Mermaid: 'left', 'center' ou 'right'
    mermaidAlignment: 'center',

    // Tempo limite das requisições HTTP (ms)
    httpTimeout: 180000,

    // Pasta dos arquivos .adf.json usada pela atualização em lote
    // (também aceita como primeiro argumento do script)
    adfDirectory: 'adf-files',

    // Intervalo entre páginas na atualização em lote (ms)
    batchDelay: 1000,

    // Novas tentativas em HTTP 429 (limite de taxa), de 0 a 3
    maxRetries: 3,

    // Mensagem padrão de versionamento da página
    defaultVersionMessage: 'Atualização via conversor Markdown para ADF com Mermaid',

    // Mapeamento da atualização em lote: objeto { 'idDaPagina': 'nome-do-arquivo' }
    // ou caminho de um arquivo JSON com esse objeto. Também aceito como
    // segundo argumento do script de lote.
    pageMapping: null,
  },
};

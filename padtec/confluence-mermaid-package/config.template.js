/**
 * Configuração do Confluence
 * 
 * INSTRUÇÕES:
 * 1. Copie este arquivo: cp config.template.js config.js
 * 2. Preencha suas credenciais no config.js
 * 3. Adicione config.js ao .gitignore
 * 
 * COMO OBTER AS CREDENCIAIS:
 * 
 * Email: Seu email do Atlassian
 * 
 * Token: Gere em https://id.atlassian.com/manage-profile/security/api-tokens
 * 
 * Cloud ID: Execute no terminal:
 *   curl -u email@example.com:TOKEN https://api.atlassian.com/oauth/token/accessible-resources
 * 
 * Space ID: Abra o Confluence, vá até o espaço e use a API:
 *   curl -u email:token https://api.atlassian.com/ex/confluence/CLOUD_ID/wiki/api/v2/spaces?keys=SPACEKEY
 */

module.exports = {
  // Email da sua conta Atlassian
  email: 'seu-email@dominio.com',
  
  // Token de API (gere em: https://id.atlassian.com/manage-profile/security/api-tokens)
  token: 'SEU_TOKEN_AQUI',
  
  // Cloud ID do seu site Confluence
  cloudId: 'SEU_CLOUD_ID_AQUI',
  
  // ID do espaço onde as páginas estão
  spaceId: 'SEU_SPACE_ID_AQUI',
  
  // Configurações opcionais
  options: {
    // Layout padrão para diagramas Mermaid
    mermaidLayout: 'full-width', // 'default', 'full-width', 'center', 'align-start', 'align-end'
    
    // Alinhamento padrão
    mermaidAlignment: 'center', // 'left', 'center', 'right'
    
    // Timeout para requisições HTTP (em ms)
    httpTimeout: 180000,
    
    // Delay entre requisições em batch (em ms)
    batchDelay: 1000,
    
    // Mensagem padrão de versionamento
    defaultVersionMessage: 'Atualização via conversor Markdown → ADF com Mermaid'
  }
};

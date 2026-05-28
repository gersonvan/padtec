# How-to: Mermaid renderizável + Captura de Screenshots

Este guia descreve o fluxo completo para publicar diagramas Mermaid no Confluence com renderização e padrões de captura de screenshots para evidências.

---

## 🎯 Solução Recomendada: Confluence Mermaid Package

**✨ NOVO! Pacote completo criado em fevereiro/2026**

Para facilitar o trabalho com Mermaid no Confluence, criamos um pacote reutilizável que automatiza todo o processo:

### 📦 Localização
```
C:\Projetos AVP\SiteUnigrande\confluence-mermaid-package
```

### 🚀 Uso Rápido

1. **Copie o pacote para seu projeto:**
   ```powershell
   Copy-Item -Recurse "C:\Projetos AVP\SiteUnigrande\confluence-mermaid-package" "C:\SeuProjeto\"
   ```

2. **Configure credenciais:**
   ```bash
   cd C:\SeuProjeto\confluence-mermaid-package
   cp config.template.js config.js
   # Edite config.js com suas credenciais
   ```

3. **Converta e publique:**
   ```bash
   # Converte Markdown para ADF
   node scripts/convert-md-to-adf.js seu-documento.md
   
   # Publica no Confluence
   node scripts/update-confluence-page.js -p 123456 -a seu-documento.adf.json
   ```

### 📚 Documentação Incluída
- **README.md**: Documentação completa (6000+ palavras)
- **QUICKSTART.md**: Guia rápido (15 minutos)
- **INSTALL.md**: Instalação (8 minutos)
- **MERMAID-GUIDE.md**: Tutorial completo de Mermaid
- **Exemplos**: 3 arquivos com 12+ tipos de diagramas

---

## 1) Mermaid Renderizável no Confluence (Manual ou via MCP)

### O que funciona
- O Confluence renderiza Mermaid quando o diagrama é enviado como **macro Mermaid** (ADF), não como bloco de código Markdown.
- Markdown com ` ```mermaid ``` ` vira apenas **code block** (texto), sem renderização.

### ⚠️ Importante
- **Use ADF estruturado corretamente** (não texto plano em paragraphs)
- **Use `contentFormat: "adf"`** quando usar MCP
- **Use macro `confluence-mermaid-macro`** no corpo ADF

### Recomendação Atual (2026)
✅ **Use o Confluence Mermaid Package** (automatiza tudo!)  
❌ **Não use**: Conversão manual ou estrutura ADF incorreta

---

## Exemplo Manual (ADF) - Para Referência

> **Nota:** Você não precisa fazer isso manualmente se usar o pacote!

```json
{
  "type": "doc",
  "version": 1,
  "content": [
    {
      "type": "heading",
      "attrs": { "level": 2 },
      "content": [{ "type": "text", "text": "Exemplo Mermaid" }]
    },
    {
      "type": "extension",
      "attrs": {
        "layout": "full-width",
        "extensionType": "com.atlassian.confluence.macro.core",
        "extensionKey": "confluence-mermaid-macro",
        "parameters": {
          "macroParams": {
            "__bodyContent": {
              "value": "[{\"body\":\"flowchart TD\\n  A[Start] --> B{Mermaid?}\\n  B -->|Sim| C[OK]\\n  B -->|Nao| D[Revisar]\",\"date\":0}]"
            },
            "theme": { "value": "default" },
            "look": { "value": "classic" },
            "download": { "value": "true" },
            "fullscreen": { "value": "true" },
            "copy": { "value": "true" },
            "alignment": { "value": "center" }
          },
          "macroMetadata": {
            "schemaVersion": { "value": "1" },
            "title": "Mermaid diagram"
          }
        }
      }
    }
  ]
}
```

### Passo a passo
1. Gere o ADF com a macro acima e o conteudo Mermaid no campo `__bodyContent`.
2. Envie para o Confluence via MCP com `contentFormat: "adf"`.
3. Valide a renderizacao no Confluence.

### Observacoes
- A macro espera `__bodyContent` como array JSON em string.
- O Confluence pode demorar alguns segundos para renderizar.

---

## 2) Captura de screenshots (evidencias)

### Objetivo
Padronizar as evidencias visuais para documentacao tecnica (telas, fluxos, erros).

### Checklist rapido
- [ ] Resolucao padrao (ex: 1920x1080)
- [ ] Zoom do navegador em 100%
- [ ] Sem dados sensiveis
- [ ] Nomear arquivos com padrao consistente

### Padrao de nome
```
<modulo>__<tela>__<acao>__<data>.png
ex: frontend__requests__nova-solicitacao__2026-02-04.png
```

### Fluxo sugerido
1. Abra a tela desejada.
2. Ajuste zoom (100%) e tema (claro ou padrao do produto).
3. Capture via sistema (Win+Shift+S).
4. Salve com o padrao de nome.
5. Envie para Confluence como anexo da pagina correspondente.

### Onde anexar
- Pagina de diagramas/evidencias.
- Pagina do fluxo especifico (frontend/backend/integracao).

### Boas praticas
- Cortar areas irrelevantes (menu extra, notificacoes).
- Destacar pontos importantes (setas, boxes) se necessario.
- Manter consistencia visual entre capturas.

---

## 3) Dica pratica para replicar em outros projetos

- Crie uma pagina "Teste Mermaid" e valide antes de publicar tudo.
- Use sempre ADF para Mermaid renderizavel.
- Padronize o naming de imagens e a resolucao.

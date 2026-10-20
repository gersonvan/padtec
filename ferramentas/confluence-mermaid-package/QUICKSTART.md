# Início rápido

Somente os comandos. Conceitos, opções e solução de problemas estão no [README.md](README.md).

## Instalar e configurar

macOS e Linux:

```bash
cp -r /caminho/para/confluence-mermaid-package ./confluence-mermaid-package
cd confluence-mermaid-package
cp config.template.js config.js
npm test
```

Windows (PowerShell):

```powershell
Copy-Item -Recurse "C:\caminho\para\confluence-mermaid-package" ".\confluence-mermaid-package"
Set-Location .\confluence-mermaid-package
Copy-Item config.template.js config.js
npm test
```

Preencha `email`, `token` e `cloudId` em `config.js`, ou exporte as variáveis:

```bash
export CONFLUENCE_EMAIL="seu-email@dominio.com"
export CONFLUENCE_TOKEN="..."
export CONFLUENCE_CLOUD_ID="..."
```

Cloud ID (o token é pedido como senha):

```bash
curl -u seu-email@dominio.com https://api.atlassian.com/oauth/token/accessible-resources
```

## Converter

```bash
node scripts/convert-md-to-adf.js documento.md        # gera documento.adf.json
node scripts/convert-md-to-adf.js docs/               # gera docs/.adf-output/*.adf.json
```

## Atualizar uma página

```bash
node scripts/update-confluence-page.js -p 123456 -a documento.adf.json
node scripts/update-confluence-page.js -p 123456 -a documento.adf.json -t "Novo título"
```

## Atualizar várias páginas

`docs/paginas.json`:

```json
{
  "123456": "arquitetura",
  "789012": "api-reference"
}
```

```bash
node scripts/convert-md-to-adf.js docs/
node scripts/batch-update-pages.js docs/.adf-output docs/paginas.json
```

## Atalhos npm

```bash
npm run convert -- docs/
npm run update -- -p 123456 -a documento.adf.json
npm run batch -- docs/.adf-output docs/paginas.json
```

## Exemplos incluídos

```bash
node scripts/convert-md-to-adf.js examples/basic-example.md
node scripts/convert-md-to-adf.js examples/advanced-example.md
node scripts/convert-md-to-adf.js examples/all-diagrams.md
```

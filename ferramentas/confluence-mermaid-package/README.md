# Confluence Mermaid Package

Converte documentos Markdown com diagramas Mermaid para o Atlassian Document Format (ADF) e publica o resultado em páginas do Confluence Cloud, com os diagramas renderizados pela macro Mermaid.

Sem dependências externas: apenas Node.js 18 ou superior.

## Sumário

- [O que o pacote faz](#o-que-o-pacote-faz)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Integração contínua](#integração-contínua)
- [Markdown suportado](#markdown-suportado)
- [Limitações](#limitações)
- [Como o Mermaid é representado no ADF](#como-o-mermaid-é-representado-no-adf)
- [Solução de problemas](#solução-de-problemas)
- [Estrutura do pacote](#estrutura-do-pacote)
- [Documentação relacionada](#documentação-relacionada)
- [Licença](#licença)

## O que o pacote faz

O pacote separa a publicação em duas etapas, para que o ADF possa ser revisado e versionado antes de ir para o Confluence:

1. `convert-md-to-adf.js` lê um arquivo `.md` (ou uma pasta) e gera `.adf.json` com títulos, parágrafos, listas, citações, tabelas, blocos de código e diagramas Mermaid como macro renderizável.
2. `update-confluence-page.js` e `batch-update-pages.js` enviam o ADF para uma página existente (ou várias), lendo a versão atual, incrementando-a e preservando o título.

O pacote nasceu da necessidade de republicar um conjunto grande de páginas técnicas a partir de Markdown versionado, mantendo os diagramas renderizados e a formatação fiel. Foi generalizado para uso em qualquer site Confluence Cloud.

## Requisitos

- Node.js 18 ou superior (`node --version`).
- Um site Confluence Cloud com acesso à API REST v2.
- Um token de API Atlassian da sua conta.
- A macro [Mermaid for Confluence](https://marketplace.atlassian.com/apps/1222792/mermaid-for-confluence) instalada no site (sem ela os diagramas não renderizam).
- As páginas de destino já criadas: os scripts atualizam páginas existentes, não criam novas.

## Instalação

Copie a pasta `confluence-mermaid-package/` para o projeto em que vai usá-la. Não há `npm install` a executar.

macOS e Linux:

```bash
cp -r /caminho/para/confluence-mermaid-package ./confluence-mermaid-package
cd confluence-mermaid-package
cp config.template.js config.js
```

Windows (PowerShell):

```powershell
Copy-Item -Recurse "C:\caminho\para\confluence-mermaid-package" ".\confluence-mermaid-package"
Set-Location .\confluence-mermaid-package
Copy-Item config.template.js config.js
```

Em seguida preencha `config.js` (ver [Configuração](#configuração)). O arquivo já está no `.gitignore` do pacote; nunca o versione.

Para validar a instalação sem credenciais:

```bash
npm test
```

O comando confere a sintaxe dos scripts e converte `examples/basic-example.md`.

## Configuração

### Credenciais

As credenciais podem vir de `config.js`, de variáveis de ambiente ou de uma combinação dos dois. Um valor preenchido em `config.js` tem precedência; o que ficar vazio, ou com o texto de exemplo do template, é lido do ambiente.

| Campo em `config.js` | Variável de ambiente  | Obrigatório | Descrição                                           |
|----------------------|-----------------------|-------------|-----------------------------------------------------|
| `email`              | `CONFLUENCE_EMAIL`    | sim         | E-mail da conta Atlassian                           |
| `token`              | `CONFLUENCE_TOKEN`    | sim         | Token de API da conta                               |
| `cloudId`            | `CONFLUENCE_CLOUD_ID` | sim         | Identificador do site Confluence Cloud              |
| `spaceId`            | `CONFLUENCE_SPACE_ID` | não         | Mantido para referência; o espaço é lido da página  |

Todas as opções de `config.js` também têm variável equivalente (`CONFLUENCE_MERMAID_LAYOUT`, `CONFLUENCE_MERMAID_ALIGNMENT`, `CONFLUENCE_HTTP_TIMEOUT`, `CONFLUENCE_ADF_DIRECTORY`, `CONFLUENCE_BATCH_DELAY`, `CONFLUENCE_MAX_RETRIES`, `CONFLUENCE_VERSION_MESSAGE`, `CONFLUENCE_PAGE_MAPPING`). A lista completa, com os padrões, está comentada em `config.template.js`.

Se `config.js` existir mas tiver erro de sintaxe, os scripts interrompem informando a causa, em vez de tratá-lo como ausente.

### Token de API

Gere em [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens). Use sempre um token, nunca a senha da conta.

### Cloud ID

Com `curl`, passe apenas o e-mail em `-u`; o token é pedido como senha e não fica no histórico do shell:

```bash
curl -u seu-email@dominio.com https://api.atlassian.com/oauth/token/accessible-resources
```

A resposta lista os sites acessíveis; o campo `id` do site desejado é o `cloudId`.

### ID da página

Está na URL da página no Confluence:

```text
https://seu-site.atlassian.net/wiki/spaces/CHAVE/pages/123456/Titulo+da+Pagina
                                                       ^^^^^^
```

### ID do espaço (opcional)

Os scripts leem o espaço da própria página, então o `spaceId` não é necessário para atualizar. Se quiser registrá-lo:

```bash
curl -u seu-email@dominio.com "https://api.atlassian.com/ex/confluence/CLOUD_ID/wiki/api/v2/spaces?keys=CHAVE"
```

### Opções

Em `config.js`, o bloco `options` controla:

- `mermaidLayout`: `default`, `full-width`, `center`, `align-start` ou `align-end` (padrão `full-width`).
- `mermaidAlignment`: `left`, `center` ou `right` (padrão `center`).
- `httpTimeout`: tempo limite das requisições, em ms (padrão 180000).
- `adfDirectory`: pasta dos `.adf.json` usada pelo lote quando não há argumento (padrão `adf-files`).
- `batchDelay`: intervalo entre páginas no lote, em ms (padrão 1000).
- `maxRetries`: novas tentativas em HTTP 429, de 0 a 3 (padrão 3).
- `defaultVersionMessage`: mensagem registrada no histórico de versões da página.
- `pageMapping`: mapeamento do lote, como objeto ou caminho de um JSON (padrão `null`).

## Uso

### Converter Markdown em ADF

Um arquivo (gera `documento.adf.json` ao lado do original):

```bash
node scripts/convert-md-to-adf.js documento.md
```

Uma pasta (gera os `.adf.json` em `pasta/.adf-output/`):

```bash
node scripts/convert-md-to-adf.js docs/
```

A conversão não precisa de credenciais. Se houver `config.js`, apenas `mermaidLayout` e `mermaidAlignment` são usados.

### Atualizar uma página

```bash
node scripts/update-confluence-page.js --pageId 123456 --adf documento.adf.json
node scripts/update-confluence-page.js -p 123456 -a documento.adf.json -t "Novo título"
```

O script consulta a página, incrementa a versão, mantém o título atual (salvo se `--title` for informado) e envia o corpo em ADF. Ao final imprime a versão publicada e a URL.

### Atualizar várias páginas

O lote precisa de um mapeamento `ID da página -> nome do arquivo ADF` (sem a extensão `.adf.json`). Crie um JSON:

```json
{
  "123456": "arquitetura",
  "789012": "api-reference"
}
```

E execute informando a pasta dos ADF e o mapeamento:

```bash
node scripts/convert-md-to-adf.js docs/
node scripts/batch-update-pages.js docs/.adf-output docs/paginas.json
```

Ordem de precedência do mapeamento: segundo argumento; variável `CONFLUENCE_PAGE_MAPPING` (caminho do JSON); `options.pageMapping` em `config.js` (objeto ou caminho); por fim a constante `PAGE_MAPPING` dentro do script, para uso pontual.

Ordem de precedência da pasta: primeiro argumento; `options.adfDirectory`; `adf-files/` ao lado do pacote.

As páginas são atualizadas em sequência, com `batchDelay` entre elas. O resultado é gravado em `batch-update-log.json` (ignorado pelo Git) e o código de saída é 1 se alguma página falhar.

### Scripts npm

`package.json` expõe atalhos equivalentes: `npm run convert -- docs/`, `npm run update -- -p 123456 -a documento.adf.json` e `npm run batch -- docs/.adf-output docs/paginas.json`.

## Integração contínua

Exemplo com GitHub Actions. As credenciais vêm de segredos do repositório e chegam aos scripts como variáveis de ambiente, sem `config.js`. Ajuste o caminho do pacote e das pastas ao seu repositório.

```yaml
name: Publicar documentação no Confluence

on:
  push:
    branches: [main]
    paths:
      - "docs/**"

jobs:
  publicar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Converter Markdown em ADF
        run: node confluence-mermaid-package/scripts/convert-md-to-adf.js docs

      - name: Atualizar páginas
        env:
          CONFLUENCE_EMAIL: ${{ secrets.CONFLUENCE_EMAIL }}
          CONFLUENCE_TOKEN: ${{ secrets.CONFLUENCE_TOKEN }}
          CONFLUENCE_CLOUD_ID: ${{ secrets.CONFLUENCE_CLOUD_ID }}
        run: node confluence-mermaid-package/scripts/batch-update-pages.js docs/.adf-output docs/paginas.json
```

`docs/paginas.json` é o mapeamento descrito em [Atualizar várias páginas](#atualizar-várias-páginas) e pode ser versionado: contém apenas IDs de página, não credenciais.

## Markdown suportado

| Elemento                 | Sintaxe                                              | Resultado em ADF                          |
|--------------------------|------------------------------------------------------|-------------------------------------------|
| Títulos                  | `#` a `######`                                       | `heading` de nível 1 a 6                  |
| Parágrafos               | linhas consecutivas                                  | um `paragraph`; quebra suave vira espaço  |
| Quebra dura              | dois espaços ou `\` no fim da linha                  | `hardBreak`                               |
| Negrito                  | `**texto**` ou `__texto__`                           | marca `strong`                            |
| Itálico                  | `*texto*`                                            | marca `em`                                |
| Negrito e itálico        | `***texto***`                                        | marcas `strong` e `em`                    |
| Tachado                  | `~~texto~~`                                          | marca `strike`                            |
| Código inline            | `` `texto` ``                                        | marca `code`                              |
| Link                     | `[texto](url)` ou `[texto](url "título")`            | marca `link`                              |
| Imagem                   | `![alt](url)`                                        | link com o texto alternativo (ver limitações) |
| Lista não ordenada       | `-`, `*` ou `+`, aninhada por indentação             | `bulletList` (aninhada)                   |
| Lista ordenada           | `1.` ou `1)`, aninhada por indentação                | `orderedList` (aninhada)                  |
| Citação                  | `> texto`                                            | `blockquote`                              |
| Regra horizontal         | `---`, `***`, `___` (e variantes com espaços)        | `rule`                                    |
| Bloco de código          | cerca de três ou mais crases, com linguagem opcional | `codeBlock`                               |
| Diagrama Mermaid         | cerca com linguagem `mermaid`                        | macro `confluence-mermaid-macro`          |
| Tabela                   | linhas `\| a \| b \|` com separador `\|---\|---\|`   | `table`; primeira linha é cabeçalho       |

A entrada é normalizada antes da conversão: BOM é removido e `CRLF` vira `LF`.

## Limitações

O conversor cobre o Markdown usado em documentação técnica comum; não é uma implementação completa do CommonMark. Limitações conhecidas:

- Marcas aninhadas (`**negrito com *itálico* dentro**`) não são interpretadas: a marca externa deixa de ser reconhecida e os asteriscos podem aparecer literalmente.
- Itálico com sublinhado (`_texto_`) não é reconhecido, para não confundir com identificadores como `nome_da_variavel`.
- Formatação inline que atravessa linhas de um mesmo parágrafo não é reconhecida.
- Imagens (`![alt](url)`) viram um link com o texto alternativo. Imagens embutidas no ADF exigem nós de mídia e upload prévio de anexo, o que o pacote não faz.
- Dentro de citações só entram parágrafos, listas e blocos de código. Títulos viram parágrafo em negrito; tabelas e diagramas são emitidos logo após a citação.
- Títulos em estilo setext (texto sublinhado com `===` ou `---`) não são reconhecidos; uma linha `---` logo abaixo de texto vira regra horizontal.
- Tabelas: a primeira linha é sempre o cabeçalho; o alinhamento declarado no separador é ignorado; não há células mescladas; cada linha precisa começar e terminar com `|`.
- Listas de tarefas (`- [ ]`) viram texto literal, e listas ordenadas sempre começam em 1.
- Cercas de código com `~~~` não são reconhecidas; use crases. Linhas em branco no início e no fim de um bloco de código são descartadas.
- Links por referência (`[texto][1]`), notas de rodapé, âncoras internas e HTML embutido são tratados como texto.
- Não há criação de páginas, upload de anexos nem sincronização no sentido Confluence para Markdown.

## Como o Mermaid é representado no ADF

O Confluence só renderiza Mermaid quando o diagrama chega como macro; um bloco de código Markdown com `mermaid` vira apenas texto. O conversor gera, para cada cerca `mermaid`, um nó `extension` com a macro `confluence-mermaid-macro`, cujo corpo é um array JSON serializado em string:

```json
{
  "type": "extension",
  "attrs": {
    "layout": "full-width",
    "extensionType": "com.atlassian.confluence.macro.core",
    "extensionKey": "confluence-mermaid-macro",
    "parameters": {
      "macroParams": {
        "__bodyContent": {
          "value": "[{\"body\":\"graph TD\\n  A[Início] --> B[Fim]\",\"date\":0}]"
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
```

`layout` e `alignment` vêm de `mermaidLayout` e `mermaidAlignment` na configuração. A estrutura é útil para quem precisa montar o ADF por outro caminho (por exemplo, via uma integração que aceite `contentFormat: "adf"`). O Confluence pode levar alguns segundos para renderizar o diagrama após a atualização.

## Solução de problemas

### "Credenciais ausentes: email (CONFLUENCE_EMAIL), ..."

Não há `config.js` preenchido nem variáveis de ambiente. Copie o template (`cp config.template.js config.js`) e preencha os campos, ou exporte as variáveis listadas na mensagem.

### "Falha ao carregar .../config.js: ..."

`config.js` existe, mas tem erro de sintaxe ou lança exceção ao ser carregado. A mensagem traz a causa. Compare com `config.template.js`.

### HTTP 401

Token inválido, expirado ou e-mail diferente do dono do token. Gere um novo token e atualize a configuração.

### HTTP 403

A conta não tem permissão de edição na página ou no espaço. Confirme no Confluence com o mesmo usuário.

### HTTP 404

ID da página ou `cloudId` incorretos. Verifique a URL da página e o resultado de `accessible-resources`.

### HTTP 409

Conflito de versão: a página foi alterada entre a leitura e a escrita. Execute o script novamente; ele lê a versão atual a cada execução.

### HTTP 429

Limite de taxa da API. O cliente repete automaticamente até `maxRetries` vezes, respeitando `Retry-After`. Se persistir, aumente `batchDelay` no lote.

### "Tempo limite de ... ms excedido"

Páginas muito grandes ou rede lenta. Aumente `httpTimeout`.

### O diagrama aparece como texto ou não renderiza

A macro Mermaid for Confluence não está instalada no site, ou o ADF foi gerado por outra ferramenta sem o nó `extension`. Instale a macro e gere o ADF com o conversor deste pacote. Se um diagrama específico falha, valide a sintaxe no [Mermaid Live Editor](https://mermaid.live/).

### Tabela com células erradas

Confira se cada linha começa e termina com `|`. Um `|` literal dentro de uma célula precisa de escape (`\|`) ou de estar dentro de código inline.

## Estrutura do pacote

```text
confluence-mermaid-package/
├── README.md                     # Este documento
├── QUICKSTART.md                 # Só os comandos
├── MERMAID-GUIDE.md              # Referência de sintaxe Mermaid
├── CHANGELOG.md                  # Histórico de versões
├── LICENSE                       # Licença MIT
├── package.json                  # Metadados e atalhos npm
├── config.template.js            # Modelo de configuração
├── config.js                     # Suas credenciais (não versionar)
├── .gitignore                    # Ignora config.js, ADF gerados e logs
├── scripts/
│   ├── convert-md-to-adf.js      # Conversor Markdown para ADF
│   ├── update-confluence-page.js # Atualiza uma página
│   ├── batch-update-pages.js     # Atualiza várias páginas
│   └── lib/
│       └── confluence-client.js  # Configuração e cliente HTTP compartilhados
└── examples/
    ├── basic-example.md          # Exemplo básico
    ├── advanced-example.md       # Exemplo com tabela e vários diagramas
    └── all-diagrams.md           # Todos os tipos de diagrama
```

## Documentação relacionada

- [QUICKSTART.md](QUICKSTART.md): sequência de comandos, sem explicações.
- [MERMAID-GUIDE.md](MERMAID-GUIDE.md): sintaxe dos tipos de diagrama e boas práticas.
- [CHANGELOG.md](CHANGELOG.md): histórico de versões.
- [Atlassian Document Format](https://developer.atlassian.com/cloud/confluence/atlass-doc-format/)
- [Confluence REST API v2](https://developer.atlassian.com/cloud/confluence/rest/v2/intro/)
- [Mermaid](https://mermaid.js.org/)

## Licença

MIT. Veja [LICENSE](LICENSE).

Autor: Gerson Albuquerque.

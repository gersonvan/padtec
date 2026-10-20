# Histórico de versões

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/); versionamento conforme [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.1.0] - 2026-10-20

### Adicionado

- Credenciais e opções por variáveis de ambiente (`CONFLUENCE_EMAIL`, `CONFLUENCE_TOKEN`, `CONFLUENCE_CLOUD_ID`, `CONFLUENCE_SPACE_ID` e equivalentes das opções), complementando ou substituindo `config.js`. Viabiliza o uso em integração contínua.
- `scripts/lib/confluence-client.js`: carregamento de configuração e cliente HTTP compartilhados pelos scripts de atualização.
- Nova tentativa automática em HTTP 429, respeitando `Retry-After`, com limite configurável (`maxRetries`, de 0 a 3).
- Mapeamento do lote por arquivo JSON (segundo argumento, `CONFLUENCE_PAGE_MAPPING` ou `options.pageMapping`), além da constante no script.
- Conversor: parágrafos formados por linhas consecutivas (quebra suave vira espaço; dois espaços ou barra invertida no fim da linha viram `hardBreak`); citações (`> `) como `blockquote`; listas aninhadas por indentação e linhas de continuação; `***texto***`, `__texto__` e `~~texto~~`; imagens convertidas em link com o texto alternativo; regras horizontais com `***`, `___` e variantes com espaço; cercas com quatro ou mais crases; `|` dentro de código inline e `\|` não dividem células de tabela.
- Arquivo `LICENSE` (MIT).
- Seção "Limitações" no README com o comportamento real do conversor.

### Alterado

- Os scripts de atualização única e em lote leem o `spaceId` da própria página; `config.spaceId` deixou de ser necessário.
- Qualquer resposta 2xx é aceita como sucesso (antes, apenas 200).
- Mensagens de erro de leitura da página incluem o corpo da resposta.
- Um `config.js` com erro de sintaxe é reportado com a causa, em vez de ser tratado como ausente (ou ignorado, no conversor).
- Falhas na conversão de diretório sinalizam o código de saída 1.
- Mensagens de console sem emojis.
- Documentação consolidada em `README.md` (fonte única), `QUICKSTART.md` (só comandos), `MERMAID-GUIDE.md` e este histórico; exemplos de `curl` sem o token na linha de comando.

### Corrigido

- `req` era referenciado dentro de `setTimeout` antes da declaração; o tempo limite agora usa `req.setTimeout`.
- Linha separadora de tabela (`|---|:---:|`) reconhecida corretamente, sem gerar células contendo apenas traços.
- BOM e `CRLF` normalizados na entrada, evitando `\r` em blocos de código e corpos Mermaid e preservando o primeiro título.
- O lote recebe a pasta dos arquivos ADF por argumento ou `options.adfDirectory`, e `batch-update-log.json` fica fora do versionamento.

### Removido

- `INSTALL.md` e `how-to-confluence-mermaid-screenshots.md`; o conteúdo exclusivo (instalação em Windows, estrutura ADF da macro Mermaid) foi absorvido pelo README.

## [1.0.0] - 2026-02-11

Primeira versão.

### Adicionado

- Conversor Markdown para ADF: títulos (H1 a H6), parágrafos, negrito, itálico, código inline, links, listas ordenadas e não ordenadas, tabelas com cabeçalho, blocos de código com linguagem e regra horizontal (`---`).
- Diagramas Mermaid como macro `confluence-mermaid-macro` (nó `extension`), com layout e alinhamento configuráveis; qualquer tipo de diagrama aceito pela macro.
- `update-confluence-page.js`: atualização de uma página com leitura e incremento automático da versão e preservação do título.
- `batch-update-pages.js`: atualização sequencial de várias páginas com intervalo configurável e relatório em JSON.
- `config.template.js` com credenciais isoladas em `config.js` (fora do versionamento) e opções de layout, tempo limite, intervalo e mensagem de versão.
- Documentação inicial e exemplos (`basic-example.md`, `advanced-example.md`, `all-diagrams.md`).

### Decisões de projeto

- ADF em vez de HTML: formato nativo do Confluence Cloud, com suporte a macros e melhor integração com a API v2.
- Conversão separada da publicação: permite revisar e versionar o ADF antes de enviar e processa lotes sem reconverter.
- Layout `full-width` para diagramas por padrão: melhor legibilidade em páginas largas.

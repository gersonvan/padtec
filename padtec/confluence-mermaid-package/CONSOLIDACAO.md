# Consolidação do `confluence-mermaid-package`

Este documento registra a decisão de consolidação das duas instâncias preexistentes do ferramental em uma versão única dentro do pacote PADTec.

## Fontes inspecionadas (somente leitura)

- **Fonte A — SiteUnigrande:** `Projetos AVP/SiteUnigrande/confluence-mermaid-package/`
- **Fonte B — PortalDoAlunoUGD:** `Projetos AVP/PortalDoAlunoUGD/confluence-mermaid-package/`

## Diff estrutural

Conteúdo praticamente idêntico entre as duas fontes. Diferenças:

- Arquivos exclusivos da Fonte A: `.DS_Store` (artefato do macOS) e `tmp_extract_stats.ps1` (script PowerShell temporário, sem relação com o propósito do pacote).
- Arquivos comuns: todos os `.md`, `package.json`, `config.template.js`, `.gitignore`, `examples/*` e os três scripts em `scripts/` (`batch-update-pages.js`, `convert-md-to-adf.js`, `update-confluence-page.js`).

## Diff de conteúdo

Após `diff -rq` recursivo entre as duas árvores (excluindo `node_modules/` e `.DS_Store`), encontrou-se uma única divergência funcional:

- `scripts/update-confluence-page.js` difere entre as fontes.

Demais arquivos comuns são byte-a-byte idênticos.

### Classificação da divergência

A divergência em `update-confluence-page.js` é **funcional** (afeta o payload enviado ao endpoint de atualização de página do Confluence). Não há divergências meramente cosméticas nem estruturais entre as fontes.

Detalhe da divergência:

- **Fonte A (SiteUnigrande):** após `GET` da página existente, captura também `pageData.spaceId` e o utiliza no `PUT` de atualização (`spaceId: pageInfo.spaceId`). Não depende de `config.spaceId` estar correto no momento da atualização.
- **Fonte B (PortalDoAlunoUGD):** não captura `spaceId` do retorno da API; usa diretamente `config.spaceId` no `PUT`. Requer que a configuração local esteja alinhada com o espaço real da página.

## Versão-base eleita

**Versão-base: Fonte B — PortalDoAlunoUGD.**

Aplicação do critério de desempate, nesta ordem:

1. **Maior número de scripts funcionais distintos:** empate (3 scripts em cada, mesmos nomes e propósitos).
2. **Documentação interna mais completa:** empate (todos os `.md` são byte-a-byte idênticos entre as fontes).
3. **`package.json` mais recente:** **vence a Fonte B.**
   - Fonte A: `11 fev 2026 14:52:57`.
   - Fonte B: `11 fev 2026 16:39:23`.

## Features portadas da versão não-eleita

- **Origem:** `Projetos AVP/SiteUnigrande/confluence-mermaid-package/scripts/update-confluence-page.js`.
- **Aplicação:** o arquivo `scripts/update-confluence-page.js` da Fonte A foi adotado integralmente em substituição ao da versão-base, por conter a melhoria de robustez descrita acima (derivar `spaceId` do próprio retorno da API em vez de depender do `config.spaceId`).

Não há outras features distintivas a portar — os demais arquivos da Fonte A são idênticos aos da Fonte B.

## Features descartadas

- **`.DS_Store` (Fonte A):** artefato do Finder do macOS; não pertence a pacote distribuído.
- **`tmp_extract_stats.ps1` (Fonte A):** script PowerShell de uso temporário, sem relação com o objetivo do pacote (conversão Markdown→ADF e atualização de páginas Confluence) e sem documentação que justifique sua manutenção.

Justificativa geral: ambos são ruído que não contribui para o funcionamento do pacote e cuja remoção é desejável para garantir higiene do artefato distribuído por cópia.

## Resultado consolidado

A pasta `padtec/confluence-mermaid-package/` contém:

- Documentação: `README.md`, `INSTALL.md`, `QUICKSTART.md`, `MERMAID-GUIDE.md`, `CHANGELOG.md`, `how-to-confluence-mermaid-screenshots.md`.
- Configuração: `package.json`, `config.template.js`, `.gitignore`.
- Scripts em `scripts/`: `convert-md-to-adf.js`, `update-confluence-page.js` (versão da Fonte A), `batch-update-pages.js`.
- Exemplos em `examples/`.
- Este documento (`CONSOLIDACAO.md`).

Sem `node_modules/`. A instalação de dependências é responsabilidade do projeto destino que vier a copiar o pacote, conforme orientação de `INSTALL.md`/`QUICKSTART.md`.

## Nota de organização

Os três scripts principais residem em `scripts/` (subpasta herdada da versão-base), não na raiz do pacote. Essa organização é a praticada pelas duas fontes e foi preservada. As referências em `package.json` e na documentação apontam para esses caminhos.

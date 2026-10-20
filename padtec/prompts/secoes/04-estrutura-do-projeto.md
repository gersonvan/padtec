# Sub-prompt PADTec — Estrutura do projeto

## Parâmetros recebidos do orquestrador

Os seis parâmetros (`nível`, `variante`, `pasta-de-saída`, `capacidades-ativas`, `modo-monorepo`, `raiz-do-projeto-destino`) chegam conforme o contrato de invocação de `prompts/00-mestre.md`, detalhado em `prompts/_comum.md`, que também fixa o procedimento comum de preenchimento e a guarda por nível.

## Template a preencher

Leia integralmente `templates/nucleo/04-estrutura-do-projeto.md`. Esta seção não existe em `L1`.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Liste recursivamente, com limite de profundidade adequado (2 a 3 níveis), as pastas top-level e suas subpastas mais relevantes em `src/`, `app/`, `apps/`, `packages/`, `lib/`, `tests/`, `infra/`, `scripts/`, `cmd/` ou equivalentes do ecossistema detectado.
2. Identifique convenções de nomenclatura por tipo de artefato (ex.: sufixos como `.controller.*`, `.service.*`, `.repository.*`, `.spec.*`, `.test.*`; prefixos de feature; padrão singular vs plural; kebab-case vs camelCase). Catalogue cada convenção observada com pelo menos um exemplo.
3. Identifique o padrão de módulo adotado (módulos por camada, módulos por feature/domínio, padrão híbrido) lendo a organização de subpastas e a granularidade dos pontos de exportação (`index.*`, arquivos de barril).
4. Identifique regras de fronteira entre módulos: arquivos de configuração de lint que impõem regras de import (`eslint`/`tslint`/equivalentes), configuração de boundaries, arquivos de configuração de monorepo (`nx.json`, `tsconfig.references`, `pnpm-workspace.yaml`), ou convenções implícitas observáveis nos imports.
5. Identifique configurações de tooling estruturais que afetam a estrutura: `tsconfig.json`/`jsconfig.json` paths e baseUrl, aliases de import, configuração de bundler.

## Procedimento de preenchimento

Além do procedimento comum de `prompts/_comum.md`:

1. Se o template requer uma representação em árvore (tipo `tree`), gere-a a partir da listagem real do projeto, omitindo arquivos gerados, dependências instaladas e artefatos de build.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **sete regras duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 1 (Evidência rastreável):** cada convenção e cada regra de fronteira cita o arquivo de configuração ou pelo menos um exemplo concreto (`arquivo:linha` ou `arquivo`).
- **Regra 4 (Cobertura exaustiva):** a árvore representada cobre toda a hierarquia significativa do projeto; pastas relevantes ao desenvolvimento não podem ficar de fora.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/04-estrutura-do-projeto.md`, com árvore de pastas representativa, convenções catalogadas, padrão de módulo descrito e regras de fronteira identificadas.

## Comportamento por nível

Existe apenas em `L2` e `L3`. Se invocado com `nível` igual a `L1` (ou fora de `L1|L2|L3`), retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, produza um documento na raiz cobrindo a estrutura do workspace (raiz + relações entre `apps/` e `packages/`) e, para cada app aplicacional, um `<pasta-de-saída>/apps/<nome-do-app>/04-estrutura-do-projeto.md` com a estrutura interna daquele app.

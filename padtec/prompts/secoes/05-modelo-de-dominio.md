# Sub-prompt PADTec — Modelo de domínio

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

## Template a preencher

Leia integralmente `templates/<nível-resolvido>/05-modelo-de-dominio.md`, onde `<nível-resolvido>` é `L2-completo` para `L2` ou `L3-aprofundado` para `L3`. Esta seção não existe em `L1`.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique entidades do domínio por convenções idiomáticas do ecossistema detectado: classes ou tipos anotados como entidade de persistência, arquivos de schema/modelo, arquivos de migrations, definições em camadas de domínio (`domain/`, `entities/`, `models/`).
2. Para cada entidade, extraia: nome, atributos principais com tipo, identificador, e marcadores de relacionamento (campos de chave estrangeira, decoradores/anotações de associação, mapeamentos em arquivos de schema).
3. Identifique a cardinalidade dos relacionamentos pelos mesmos artefatos (associações 1-1, 1-N, N-N declaradas explicitamente; tabelas de junção; chaves compostas).
4. Identifique invariantes de negócio em validações no nível de entidade (decoradores/anotações de validação), em construtores, em métodos de fábrica e em validações no nível de aplicação que falham antes da persistência.
5. Mapeie o vocabulário ubíquo: termos usados consistentemente nos nomes de entidades, atributos e métodos. Esses termos alimentam também o glossário (seção 13).

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Para o bloco `mermaid` placeholder do tipo `erDiagram`, gere o diagrama com todas as entidades identificadas, seus principais atributos e os relacionamentos com cardinalidade. Diagrama mínimo: duas entidades e uma relação significativa baseadas em código real.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 4 (Cobertura exaustiva):** toda entidade de persistência identificada no código aparece no diagrama e na tabela de entidades. Cobertura parcial é falha de QA.
- **Regra 1 (Evidência rastreável):** cada entidade, atributo, relacionamento e invariante cita `arquivo:linha`.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/05-modelo-de-dominio.md`, com tabela de entidades, diagrama Mermaid `erDiagram` gerado, invariantes catalogadas e vocabulário ubíquo registrado.

## Comportamento por nível

Existe apenas em `L2` e `L3`. Em `L3`, o template pode pedir desdobramento adicional (por exemplo, diagrama por subdomínio); siga o template. Se invocado com `nível` igual a `L1` (ou fora de `L1|L2|L3`), retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, gere um diagrama por app aplicacional que tenha modelo de domínio próprio (`<pasta-de-saída>/apps/<nome-do-app>/05-modelo-de-dominio.md`). Quando dois apps compartilham entidades vindas de um `packages/` comum, registre essas entidades uma única vez na visão de workspace (`<pasta-de-saída>/05-modelo-de-dominio.md`) e referencie em cada app.

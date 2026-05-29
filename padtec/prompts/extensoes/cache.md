# Sub-prompt PADTec — Extensão: Cache

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

Este sub-prompt é despachado apenas quando o slug `cache` está em `capacidades-ativas`.

## Template a preencher

Leia integralmente `templates/<nível-resolvido>/condicionais/condicional-cache.md`, onde `<nível-resolvido>` é `L2-completo` ou `L3-aprofundado`. Capacidades condicionais não existem em `L1`; se `nível` for `L1`, retorne sem produzir saída.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique a tecnologia de cache em uso. Sinais técnicos típicos: dependências como Redis, Memcached, `cache-manager`, `ioredis`, `node-cache`, `lru-cache`; SDKs de cache gerenciado em nuvem (Azure Cache for Redis, AWS ElastiCache); decoradores ou anotações de cache aplicadas a métodos; configuração explícita de cache em arquivos de inicialização.
2. Identifique as **camadas** de cache em uso: cache de aplicação em memória, cache distribuído externo, cache de resposta HTTP, cache de cliente HTTP. Para cada camada, indique escopo e ponto de configuração.
3. Catalogue o **esquema de chaves**: convenção de naming, prefixos por contexto, uso de namespacing por tenant ou ambiente. Cite exemplos reais (`arquivo:linha`).
4. Identifique a **política de tempo de vida (TTL)** e a **política de invalidação**: TTL declarado por chamada ou por configuração, invalidações explícitas em escritas, padrão de eventos que disparam invalidação.
5. Identifique **métricas e observabilidade de cache**: contadores de hit/miss, exposição de métricas, dashboards ou logs estruturados que evidenciem o uso.
6. Identifique como o sistema lida com **inconsistência transitória** entre cache e fonte de verdade: política de stale-while-revalidate, fallback em caso de cache indisponível, double-write, write-through.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Quando o template pedir diagrama Mermaid (ex.: fluxo de leitura com cache lookup → miss → fonte), gere-o a partir do código real.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta extensão, atenção especial a:

- **Regra 1 (Evidência rastreável):** cada chave, TTL e política cita `arquivo:linha`.
- **Regra 2 (Anti-alucinação):** quando a política de invalidação não estiver explícita, registre `// CARÊNCIA` em vez de presumir um padrão.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/cache.md`, com camadas catalogadas, esquema de chaves descrito, política de TTL e invalidação documentada, observabilidade e tratamento de inconsistência cobertos.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, gere o documento por app que utilize cache (`<pasta-de-saída>/apps/<nome-do-app>/cache.md`). Quando o cache é compartilhado por todos os apps através de um pacote comum, registre o padrão uma vez na visão de workspace.

# Sub-prompt PADTec — Extensão: Multi-tenancy

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

Este sub-prompt é despachado apenas quando o slug `multi-tenancy` está em `capacidades-ativas`.

## Template a preencher

Leia integralmente `templates/<nível-resolvido>/condicionais/condicional-multi-tenancy.md`, onde `<nível-resolvido>` é `L2-completo` ou `L3-aprofundado`. Capacidades condicionais não existem em `L1`; se `nível` for `L1`, retorne sem produzir saída.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique o **modelo de isolamento** adotado: banco por tenant (database-per-tenant), schema por tenant, tabela compartilhada com coluna `tenant_id` (discriminator), modelo híbrido. Sinais técnicos: múltiplas conexões nomeadas, schemas dinâmicos, decoradores/filtros automáticos por `tenant_id`, configurações dinâmicas por requisição.
2. Identifique a **resolução do tenant na entrada da requisição**: subdomínio, header HTTP, claim em token, parâmetro de rota; middleware/guard responsável por extrair e propagar o tenant. Cite `arquivo:linha`.
3. Identifique o **roteamento de dados por tenant**: como o contexto de tenant é propagado ao repositório/ORM (request-scoped context, fábrica de conexões, filtros automáticos), e o ponto onde a query é restringida.
4. Identifique a **segregação de recursos compartilhados**: cache (namespacing por tenant), filas (canais por tenant ou metadado em mensagem), storage (prefixo/bucket por tenant), notificações (templates por tenant), jobs (contexto por tenant em execução em background).
5. Identifique **provisionamento de tenant**: fluxo de criação de novo tenant, migrações automáticas por tenant quando aplicável, configuração inicial por tenant.
6. Identifique **proteções contra vazamento entre tenants**: testes que validam isolamento, restrições de query que exigem `tenant_id`, asserções defensivas em código.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Quando o template pedir diagrama Mermaid (ex.: fluxo de resolução de tenant na requisição, mapa de recursos por tenant), gere-o a partir do código real.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta extensão, atenção especial a:

- **Regra 1 (Evidência rastreável):** o modelo de isolamento, a resolução do tenant e cada recurso segregado citam `arquivo:linha`.
- **Regra 2 (Anti-alucinação):** quando a segregação de um recurso (ex.: cache) não estiver explícita, registre `// CARÊNCIA` em vez de presumir que está namespaceado.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/multi-tenancy.md`, com modelo de isolamento descrito, resolução do tenant documentada, roteamento de dados explicado, segregação de cada recurso compartilhado coberta, provisionamento e proteções descritos.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, multi-tenancy é geralmente transversal a todos os apps. Gere um documento de workspace (`<pasta-de-saída>/multi-tenancy.md`) com o modelo central e, para cada app que aplique nuances próprias, um adendo em `<pasta-de-saída>/apps/<nome-do-app>/multi-tenancy.md` apenas com as diferenças observáveis.

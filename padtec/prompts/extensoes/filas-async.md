# Sub-prompt PADTec — Extensão: Filas e processamento assíncrono

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

Este sub-prompt é despachado apenas quando o slug `filas-async` está em `capacidades-ativas`.

## Template a preencher

Leia integralmente `templates/<nível-resolvido>/condicionais/condicional-filas-async.md`, onde `<nível-resolvido>` é `L2-completo` ou `L3-aprofundado`. Capacidades condicionais não existem em `L1`; se `nível` for `L1`, retorne sem produzir saída.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique a infraestrutura de mensageria em uso. Sinais técnicos típicos: dependências como Bull, BullMQ, BeeQueue, `amqplib`/RabbitMQ, `kafkajs`, `@aws-sdk/client-sqs`, `azure/service-bus`; SDKs de mensageria gerenciada; arquivos de configuração de mensageria; decoradores ou anotações `@Process`/`@MessageHandler` e equivalentes.
2. Catalogue **todas** as filas/tópicos/canais utilizados: nome, broker/serviço, padrão de naming (prefixos por ambiente/tenant), e localização da declaração no código.
3. Catalogue **produtores e consumidores** por canal: arquivo do produtor e arquivo do consumidor, função/método responsável, sinal de início (request HTTP, evento de domínio, cron) e sinal de fim (resposta, evento subsequente).
4. Identifique a **política de retentativa**: máximo de tentativas, backoff (linear, exponencial, com jitter), dead-letter queue/fila de mensagens não processadas, política de descarte quando configurada.
5. Identifique a **garantia de entrega declarada** (at-most-once, at-least-once, exactly-once) e o nível de **idempotência** do consumidor (chave de deduplicação, transação consumidor + repositório, tabela de idempotência).
6. Identifique métricas e observabilidade da fila: contadores de mensagens, lag/atraso, taxa de falha, dashboards ou logs estruturados.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Quando o template pedir diagrama Mermaid (ex.: produtor → fila → consumidor → DLQ), gere-o a partir do código real.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta extensão, atenção especial a:

- **Regra 4 (Cobertura exaustiva):** toda fila/tópico/canal identificado aparece no documento, com produtor e consumidor mapeados.
- **Regra 1 (Evidência rastreável):** cada canal, política e métrica cita `arquivo:linha`.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/filas-async.md`, com canais catalogados, produtores e consumidores mapeados, política de retentativa e DLQ descritas, garantias de entrega e idempotência documentadas.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, gere o documento por app que produza ou consuma mensagens (`<pasta-de-saída>/apps/<nome-do-app>/filas-async.md`). Canais compartilhados entre apps aparecem em ambos, com o app de origem (produtor) destacado.

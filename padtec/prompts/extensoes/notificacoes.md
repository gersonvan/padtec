# Sub-prompt PADTec — Extensão: Notificações

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

Este sub-prompt é despachado apenas quando o slug `notificacoes` está em `capacidades-ativas`.

## Template a preencher

Leia integralmente `templates/<nível-resolvido>/condicionais/condicional-notificacoes.md`, onde `<nível-resolvido>` é `L2-completo` ou `L3-aprofundado`. Capacidades condicionais não existem em `L1`; se `nível` for `L1`, retorne sem produzir saída.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique os canais de notificação em uso. Sinais técnicos típicos: SDKs como `@sendgrid/mail`, Twilio, `nodemailer`, `mailgun-js`, `@aws-sdk/client-ses`, `firebase-admin` (push), provedores de SMS, provedores de WhatsApp, webhooks declarados.
2. Catalogue cada **canal** (e-mail, SMS, push, webhook, in-app): provedor, módulo/arquivo de cliente, propósito de negócio.
3. Catalogue o **modelo de templates**: localização dos templates (diretório dedicado, banco, provedor externo), formato (Handlebars, MJML, Liquid, equivalentes), variáveis injetadas em cada template.
4. Identifique o **gatilho de envio** por tipo de notificação: evento de domínio, ação direta do usuário, job agendado, callback de integração. Cite `arquivo:linha`.
5. Identifique o **rastreamento de entrega**: armazenamento de eventos de envio/entrega/abertura, integração com webhooks do provedor, política de logging.
6. Identifique o **tratamento de falha de envio**: retentativa, fila dedicada de notificação, alternância de canal em fallback, fila de mensagens não processadas.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Quando o template pedir diagrama Mermaid (ex.: fluxo evento → seletor de canal → envio → registro de entrega), gere-o a partir do código real.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta extensão, atenção especial a:

- **Regra 4 (Cobertura exaustiva):** todo canal e todo tipo de notificação identificado aparece no documento.
- **Regra 1 (Evidência rastreável):** cada canal, template e gatilho cita `arquivo:linha`.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/notificacoes.md`, com canais catalogados, templates descritos, gatilhos mapeados, rastreamento de entrega e tratamento de falha cobertos.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, gere o documento por app que emita notificações (`<pasta-de-saída>/apps/<nome-do-app>/notificacoes.md`). Quando a infraestrutura de notificação é compartilhada por pacote comum em `packages/`, registre o modelo na visão de workspace e referencie nos apps consumidores.

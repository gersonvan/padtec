# Sub-prompt PADTec — Extensão: Notificações

## Parâmetros recebidos do orquestrador

Os seis parâmetros (`nível`, `variante`, `pasta-de-saída`, `capacidades-ativas`, `modo-monorepo`, `raiz-do-projeto-destino`) chegam conforme o contrato de invocação de `prompts/00-mestre.md`, detalhado em `prompts/_comum.md`, que também fixa o procedimento comum de preenchimento e a guarda por nível.

Este sub-prompt é despachado apenas quando o slug `notificacoes` está em `capacidades-ativas`.

## Template a preencher

Leia integralmente `templates/condicionais/condicional-notificacoes.md`. Capacidades condicionais não existem em `L1`; se `nível` for `L1`, retorne sem produzir saída.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique os canais de notificação em uso. Sinais técnicos típicos: SDKs como `@sendgrid/mail`, Twilio, `nodemailer`, `mailgun-js`, `@aws-sdk/client-ses`, `firebase-admin` (push), provedores de SMS, provedores de WhatsApp, webhooks declarados.
2. Catalogue cada **canal** (e-mail, SMS, push, webhook, in-app): provedor, módulo/arquivo de cliente, propósito de negócio.
3. Catalogue o **modelo de templates**: localização dos templates (diretório dedicado, banco, provedor externo), formato (Handlebars, MJML, Liquid, equivalentes), variáveis injetadas em cada template.
4. Identifique o **gatilho de envio** por tipo de notificação: evento de domínio, ação direta do usuário, job agendado, callback de integração. Cite `arquivo:linha`.
5. Identifique o **rastreamento de entrega**: armazenamento de eventos de envio/entrega/abertura, integração com webhooks do provedor, política de logging.
6. Identifique o **tratamento de falha de envio**: retentativa, fila dedicada de notificação, alternância de canal em fallback, fila de mensagens não processadas.

## Procedimento de preenchimento

Além do procedimento comum de `prompts/_comum.md`:

1. Quando o template pedir diagrama Mermaid (ex.: fluxo evento → seletor de canal → envio → registro de entrega), gere-o a partir do código real.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **sete regras duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta extensão, atenção especial a:

- **Regra 4 (Cobertura exaustiva):** todo canal e todo tipo de notificação identificado aparece no documento.
- **Regra 1 (Evidência rastreável):** cada canal, template e gatilho cita `arquivo:linha`.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/condicional-notificacoes.md`, com canais catalogados, templates descritos, gatilhos mapeados, rastreamento de entrega e tratamento de falha cobertos.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, gere o documento por app que emita notificações (`<pasta-de-saída>/apps/<nome-do-app>/condicional-notificacoes.md`). Quando a infraestrutura de notificação é compartilhada por pacote comum em `packages/`, registre o modelo na visão de workspace e referencie nos apps consumidores.

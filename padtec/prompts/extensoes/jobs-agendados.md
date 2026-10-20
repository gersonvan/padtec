# Sub-prompt PADTec — Extensão: Jobs agendados

## Parâmetros recebidos do orquestrador

Os seis parâmetros (`nível`, `variante`, `pasta-de-saída`, `capacidades-ativas`, `modo-monorepo`, `raiz-do-projeto-destino`) chegam conforme o contrato de invocação de `prompts/00-mestre.md`, detalhado em `prompts/_comum.md`, que também fixa o procedimento comum de preenchimento e a guarda por nível.

Este sub-prompt é despachado apenas quando o slug `jobs-agendados` está em `capacidades-ativas`.

## Template a preencher

Leia integralmente `templates/condicionais/condicional-jobs-agendados.md`. Capacidades condicionais não existem em `L1`; se `nível` for `L1`, retorne sem produzir saída.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique a tecnologia de agendamento em uso. Sinais técnicos típicos: dependências como `@nestjs/schedule`, `node-cron`, `node-schedule`, `agenda`, `bullmq` (com repeat), `quartz` (Java), `apscheduler` (Python), `celery beat`; agendadores externos como cron do sistema, EventBridge Scheduler, Azure Functions Timer, Cloud Scheduler; decoradores ou anotações `@Cron`/`@Scheduled` e equivalentes.
2. Catalogue **todos** os jobs agendados: nome do job, expressão de calendário (cron, RRULE) ou intervalo configurado, função/método executado, arquivo de origem.
3. Identifique o **gatilho de inicialização**: registro no boot da aplicação, registro condicional por instância (singleton), agendamento externo. Quando há múltiplas réplicas da aplicação, registre o mecanismo que previne execução duplicada (lock distribuído, eleição de líder, agendamento centralizado).
4. Identifique a **observabilidade da execução**: logs estruturados de início/fim, métricas (duração, sucesso, falha), alertas declarados.
5. Identifique a **tolerância a falhas**: comportamento em falha (retry, próxima execução, alerta), timeout máximo por execução, política de overlap (permitir vs ignorar execução sobreposta).
6. Identifique o **procedimento de re-execução manual**: endpoint administrativo, comando CLI, ação manual em painel.

## Procedimento de preenchimento

Além do procedimento comum de `prompts/_comum.md`:

1. Quando o template pedir diagrama Mermaid (ex.: linha do tempo de execução, fluxo de retry), gere-o a partir do código real.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **sete regras duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta extensão, atenção especial a:

- **Regra 4 (Cobertura exaustiva):** todo job identificado aparece no documento, com expressão de calendário registrada.
- **Regra 1 (Evidência rastreável):** cada job, política e procedimento cita `arquivo:linha`.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/condicional-jobs-agendados.md`, com jobs catalogados, observabilidade descrita, tolerância a falhas documentada, procedimento de re-execução manual coberto.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, gere o documento por app que execute jobs (`<pasta-de-saída>/apps/<nome-do-app>/condicional-jobs-agendados.md`). Quando os jobs estão centralizados em um app dedicado (worker), gere o documento apenas naquele app.

# Sub-prompt PADTec — Extensão: Jobs agendados

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

Este sub-prompt é despachado apenas quando o slug `jobs-agendados` está em `capacidades-ativas`.

## Template a preencher

Leia integralmente `templates/<nível-resolvido>/condicionais/condicional-jobs-agendados.md`, onde `<nível-resolvido>` é `L2-completo` ou `L3-aprofundado`. Capacidades condicionais não existem em `L1`; se `nível` for `L1`, retorne sem produzir saída.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique a tecnologia de agendamento em uso. Sinais técnicos típicos: dependências como `@nestjs/schedule`, `node-cron`, `node-schedule`, `agenda`, `bullmq` (com repeat), `quartz` (Java), `apscheduler` (Python), `celery beat`; agendadores externos como cron do sistema, EventBridge Scheduler, Azure Functions Timer, Cloud Scheduler; decoradores ou anotações `@Cron`/`@Scheduled` e equivalentes.
2. Catalogue **todos** os jobs agendados: nome do job, expressão de calendário (cron, RRULE) ou intervalo configurado, função/método executado, arquivo de origem.
3. Identifique o **gatilho de inicialização**: registro no boot da aplicação, registro condicional por instância (singleton), agendamento externo. Quando há múltiplas réplicas da aplicação, registre o mecanismo que previne execução duplicada (lock distribuído, eleição de líder, agendamento centralizado).
4. Identifique a **observabilidade da execução**: logs estruturados de início/fim, métricas (duração, sucesso, falha), alertas declarados.
5. Identifique a **tolerância a falhas**: comportamento em falha (retry, próxima execução, alerta), timeout máximo por execução, política de overlap (permitir vs ignorar execução sobreposta).
6. Identifique o **procedimento de re-execução manual**: endpoint administrativo, comando CLI, ação manual em painel.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Quando o template pedir diagrama Mermaid (ex.: linha do tempo de execução, fluxo de retry), gere-o a partir do código real.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta extensão, atenção especial a:

- **Regra 4 (Cobertura exaustiva):** todo job identificado aparece no documento, com expressão de calendário registrada.
- **Regra 1 (Evidência rastreável):** cada job, política e procedimento cita `arquivo:linha`.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/jobs-agendados.md`, com jobs catalogados, observabilidade descrita, tolerância a falhas documentada, procedimento de re-execução manual coberto.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, gere o documento por app que execute jobs (`<pasta-de-saída>/apps/<nome-do-app>/jobs-agendados.md`). Quando os jobs estão centralizados em um app dedicado (worker), gere o documento apenas naquele app.

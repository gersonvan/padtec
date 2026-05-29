<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.

Esta seção é condicional. Inclua-a na documentação do projeto somente se a capacidade `jobs-agendados` for detectada. Sinais típicos: agendadores embutidos (@nestjs/schedule, node-cron, APScheduler, Quartz), declarações de tarefas com expressão cron, agendadores gerenciados de plataforma, planilha de execuções periódicas.
-->

# Tarefas agendadas

<!-- IA: documente as tarefas agendadas e periódicas do sistema. Esta é uma seção condicional — citar produto e biblioteca (@nestjs/schedule, node-cron, APScheduler, Quartz, cron de plataforma) é permitido. Cobertura 100% das tarefas. -->

## Mecanismo de agendamento

<!-- IA: identifique o mecanismo de agendamento utilizado, versão e local de registro das tarefas. -->

| Mecanismo | Versão | Local de registro das tarefas | Evidência |
|---|---|---|---|
| `<<MECANISMO>>` | `<<VERSAO>>` | `<<DIRETORIO_OU_MODULO>>` | `<<ARQUIVO:LINHA>>` |

## Inventário de tarefas

<!-- IA: liste todas as tarefas agendadas com nome, calendário de execução (expressão cron ou descrição), propósito e duração típica. Cobertura 100%. -->

| Tarefa | Calendário (expressão ou descrição) | Propósito | Duração típica observada | Evidência |
|---|---|---|---|---|
| `<<NOME>>` | `<<CRON_OU_DESCRICAO>>` | `<<PROPOSITO>>` | `<<DURACAO>>` | `<<ARQUIVO:LINHA>>` |

## Gatilhos de disparo

<!-- IA: descreva como cada tarefa é efetivamente disparada (agendador embutido na aplicação, agendador gerenciado de plataforma, mensagem em fila de agendamento). -->

| Tarefa | Tipo de gatilho | Componente disparador | Evidência |
|---|---|---|---|
| `<<NOME>>` | `<<TIPO>>` | `<<COMPONENTE>>` | `<<ARQUIVO:LINHA>>` |

## Observabilidade da execução

<!-- IA: liste para cada tarefa qual sinal de observabilidade é emitido (log de início e fim, métrica de duração, contador de falhas) e onde é consumido. -->

| Tarefa | Sinal | Destino | Evidência |
|---|---|---|---|
| `<<NOME>>` | `<<TIPO_DE_SINAL>>` | `<<COLETOR>>` | `<<ARQUIVO:LINHA>>` |

## Tolerância a falhas

<!-- IA: descreva o comportamento da tarefa diante de falha (retentativa, salto da execução, marcação de falha persistente, alerta). -->

| Tarefa | Tratamento de falha | Política de retentativa | Evidência |
|---|---|---|---|
| `<<NOME>>` | `<<TRATAMENTO>>` | `<<POLITICA>>` | `<<ARQUIVO:LINHA>>` |

## Procedimento de re-execução manual

<!-- IA: descreva como uma tarefa pode ser re-executada manualmente em caso de necessidade (comando, endpoint administrativo, console operacional). Cite o ponto de entrada. -->

| Tarefa | Modo de re-execução manual | Pré-condições | Evidência |
|---|---|---|---|
| `<<NOME>>` | `<<MODO>>` | `<<PRE_CONDICOES>>` | `<<ARQUIVO:LINHA>>` |

## Riscos de sobreposição e concorrência

<!-- IA: descreva como o sistema previne sobreposição de execuções (trava distribuída, marcação de execução em curso, agendador com garantia de instância única). Quando ausente, registrar `// CARÊNCIA: não identificado no código`. -->

<<POLITICA_DE_SOBREPOSICAO_E_CONCORRENCIA>>

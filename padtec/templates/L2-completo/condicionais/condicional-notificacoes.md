<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.

Esta seção é condicional. Inclua-a na documentação do projeto somente se a capacidade `notificacoes` for detectada. Sinais típicos: bibliotecas de e-mail (SendGrid, nodemailer, Amazon SES), bibliotecas de SMS ou voz (Twilio), SDKs de notificação por aplicativo, templates de mensagem versionados no repositório.
-->

# Notificações

<!-- IA: documente os canais de notificação suportados pelo sistema. Esta é uma seção condicional — citar provedor (SendGrid, Twilio, Amazon SES, nodemailer, push SDKs) e biblioteca é permitido. -->

## Canais suportados

<!-- IA: liste cada canal de notificação implementado (e-mail, SMS, notificação por aplicativo, notificação interna), o provedor e a biblioteca cliente. -->

| Canal | Provedor | Biblioteca cliente | Versão | Evidência |
|---|---|---|---|---|
| `<<CANAL>>` | `<<PROVEDOR>>` | `<<BIBLIOTECA>>` | `<<VERSAO>>` | `<<ARQUIVO:LINHA>>` |

## Modelos de mensagem

<!-- IA: liste os templates de mensagem versionados no repositório com nome, canal, propósito e local. -->

| Template | Canal | Propósito | Localização | Evidência |
|---|---|---|---|---|
| `<<NOME>>` | `<<CANAL>>` | `<<PROPOSITO>>` | `<<CAMINHO>>` | `<<ARQUIVO:LINHA>>` |

## Gatilhos de envio

<!-- IA: liste os gatilhos que disparam notificações (evento de domínio, ação do usuário, agendamento) e o template associado a cada gatilho. -->

| Gatilho | Origem | Template | Destinatário | Evidência |
|---|---|---|---|---|
| `<<GATILHO>>` | `<<ORIGEM>>` | `<<TEMPLATE>>` | `<<DESTINATARIO>>` | `<<ARQUIVO:LINHA>>` |

## Rastreamento de entrega

<!-- IA: descreva como a entrega das notificações é rastreada (acompanhamento via webhook do provedor, registro local de tentativas, persistência do estado de entrega). -->

<<RASTREAMENTO_DE_ENTREGA>>

## Tratamento de falha de envio

<!-- IA: descreva o tratamento de falha de envio (retentativa, fila de fallback, alerta operacional, supressão temporária por endereço bloqueado). -->

| Falha | Resposta | Persistência do registro de falha | Evidência |
|---|---|---|---|
| `<<TIPO_DE_FALHA>>` | `<<RESPOSTA>>` | `<<DESTINO_DO_REGISTRO>>` | `<<ARQUIVO:LINHA>>` |

## Conformidade com preferências do destinatário

<!-- IA: descreva como o sistema respeita preferências (opt-in/opt-out, frequência máxima, horário de silêncio). Quando inexistente, registrar `// CARÊNCIA: não identificado no código`. -->

<<POLITICA_DE_PREFERENCIAS_DO_DESTINATARIO>>

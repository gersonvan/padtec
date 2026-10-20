<!--
Esta seção é condicional. Inclua-a na documentação do projeto somente se a capacidade `filas-async` for detectada. Sinais típicos: bibliotecas como Bull, BullMQ, RabbitMQ, Kafka, SQS, Pub/Sub, manipuladores decorados como processadores de fila, definições de fila de mensagens não processadas (DLQ), políticas de retentativa codificadas.
-->

# Filas e processamento assíncrono

<!-- IA: documente as filas e tópicos do sistema. Esta é uma seção condicional — exemplos de produto (Bull, BullMQ, RabbitMQ, Kafka, SQS, Pub/Sub) e biblioteca específicos são permitidos quando refletem o uso real no projeto. -->

## Infraestrutura de mensageria

<!-- IA: identifique o(s) sistema(s) de mensageria utilizado(s), com versão exata e biblioteca cliente. -->

| Sistema | Versão | Biblioteca cliente | Versão da biblioteca | Evidência |
|---|---|---|---|---|
| `<<SISTEMA>>` | `<<VERSAO>>` | `<<BIBLIOTECA>>` | `<<VERSAO>>` | `<<ARQUIVO:LINHA>>` |

## Inventário de filas e tópicos

<!-- IA: liste todas as filas e tópicos com nome, finalidade, esquema da mensagem e direção (produção, consumo, ambos). Cobertura 100%. -->

| Nome | Finalidade | Esquema da mensagem | Direção | Evidência |
|---|---|---|---|---|
| `<<NOME>>` | `<<FINALIDADE>>` | `<<ESQUEMA>>` | `<<PRODUTOR_OU_CONSUMIDOR>>` | `<<ARQUIVO:LINHA>>` |

## Produtores

<!-- IA: liste os componentes que publicam mensagens, com fila/tópico de destino, frequência típica e operação que dispara a publicação. -->

| Produtor | Fila ou tópico | Operação que dispara | Evidência |
|---|---|---|---|
| `<<COMPONENTE>>` | `<<DESTINO>>` | `<<OPERACAO>>` | `<<ARQUIVO:LINHA>>` |

## Consumidores

<!-- IA: liste os componentes que consomem mensagens, com fila/tópico de origem, concorrência configurada e idempotência. -->

| Consumidor | Fila ou tópico | Concorrência | Idempotência garantida (sim, não, parcial) | Evidência |
|---|---|---|---|---|
| `<<COMPONENTE>>` | `<<ORIGEM>>` | `<<NUMERO>>` | `<<NIVEL>>` | `<<ARQUIVO:LINHA>>` |

## Política de retentativa

<!-- IA: descreva a política de retentativa: número máximo de tentativas, intervalo entre tentativas, recuo exponencial, destino após esgotamento (fila de mensagens não processadas). -->

| Fila | Tentativas máximas | Intervalo / recuo | Destino após esgotamento | Evidência |
|---|---|---|---|---|
| `<<FILA>>` | `<<NUMERO>>` | `<<INTERVALO>>` | `<<DLQ_OU_DESCARTE>>` | `<<ARQUIVO:LINHA>>` |

## Garantias de entrega

<!-- IA: declare a garantia de entrega adotada para cada fila (no máximo uma vez, pelo menos uma vez, exatamente uma vez quando alcançável). Cite o ponto de configuração. -->

| Fila | Garantia | Evidência |
|---|---|---|
| `<<FILA>>` | `<<NO_MAXIMO_UMA_VEZ_OU_PELO_MENOS_UMA_VEZ_OU_EXATAMENTE_UMA_VEZ>>` | `<<ARQUIVO:LINHA>>` |

## Fluxo típico produtor-consumidor

<!-- IA: gere diagrama Mermaid `sequenceDiagram` mostrando publicação, recepção, processamento bem-sucedido e caminho de retentativa após falha para a fila mais representativa do sistema. -->

```mermaid
<<DIAGRAMA_MERMAID_SEQUENCEDIAGRAM_PRODUTOR_CONSUMIDOR>>
```

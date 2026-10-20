# Fluxos de negócio

<!-- IA: documente os fluxos end-to-end dos casos de uso principais. Cada fluxo é descrito por uma sequência narrada de passos numerados e por um diagrama Mermaid `sequenceDiagram`. Cubra também o caminho de erro mais comum de cada fluxo. Nenhum fluxo pode ser inventado: cada um deve corresponder a um caso de uso real evidenciado no código. -->

## Inventário de fluxos

<!-- IA: liste os fluxos end-to-end principais antes de detalhá-los. Cada fluxo deve ter um nome, o ator iniciador e o ponto de entrada (`arquivo:linha` da rota, manipulador de mensagem ou agendador que o dispara). -->

| Fluxo | Ator iniciador | Ponto de entrada | Evidência |
|---|---|---|---|
| `<<NOME_DO_FLUXO>>` | `<<ATOR>>` | `<<TIPO_DE_ENTRADA>>` | `<<ARQUIVO:LINHA>>` |

## Fluxo: <<NOME_DO_FLUXO_PRINCIPAL>>

<!-- IA: para cada fluxo, instancie esta subseção. Quando houver mais de um fluxo, replique o bloco inteiro abaixo (do título H2 ao diagrama). -->

### Descrição

<!-- IA: descreva, em um parágrafo curto, o propósito do fluxo no domínio. -->

<<DESCRICAO_DO_FLUXO>>

### Pré-condições

<!-- IA: liste as pré-condições necessárias para o fluxo iniciar (estado de dados, autenticação, configuração). -->

<<PRE_CONDICOES>>

### Passos do caminho feliz

<!-- IA: numere os passos do início ao fim do fluxo. Cada passo cita `arquivo:linha` do componente que executa a ação. Mantenha entre cinco e vinte passos. -->

1. `<<PASSO_1>>` — `<<ARQUIVO:LINHA>>`
2. `<<PASSO_2>>` — `<<ARQUIVO:LINHA>>`
3. `<<PASSO_3>>` — `<<ARQUIVO:LINHA>>`

### Caminho de erro principal

<!-- IA: descreva o caminho de erro mais relevante do fluxo (validação que falha, integração indisponível, conflito de estado). Numere os passos. -->

1. `<<PASSO_DE_ERRO_1>>` — `<<ARQUIVO:LINHA>>`
2. `<<PASSO_DE_ERRO_2>>` — `<<ARQUIVO:LINHA>>`

### Pós-condições

<!-- IA: liste as pós-condições garantidas pelo caminho feliz e as pós-condições garantidas pelo caminho de erro. -->

<<POS_CONDICOES>>

### Diagrama de sequência

<!-- IA: gere diagrama Mermaid `sequenceDiagram` com os participantes do fluxo (ator, componentes internos, serviços externos genéricos). Inclua mensagens de retorno e branches de erro com `alt`/`else` quando aplicável. -->

```mermaid
<<DIAGRAMA_MERMAID_SEQUENCEDIAGRAM_DO_FLUXO>>
```

## Métricas de saúde do fluxo

<!-- IA: quando houver instrumentação que produza métricas para o fluxo (contadores, histogramas, logs estruturados com identificador de correlação), listar nome da métrica, o que mede e onde é emitida. Quando ausente, registrar `// CARÊNCIA: não identificado no código`. -->

| Métrica | O que mede | Ponto de emissão | Evidência |
|---|---|---|---|
| `<<METRICA>>` | `<<MEDIDA>>` | `<<COMPONENTE>>` | `<<ARQUIVO:LINHA>>` |

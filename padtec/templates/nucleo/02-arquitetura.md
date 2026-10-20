# Arquitetura

<!-- IA: apresente a arquitetura em três blocos: visão em camadas, fluxo principal de uma requisição e decisões de design relevantes. Use vocabulário genérico (camada de apresentação, camada de aplicação, camada de domínio, camada de infraestrutura). Não cite nomes de framework, biblioteca, runtime ou produto. -->

## Visão em camadas

<!-- IA: descreva, em uma a duas linhas por camada, a responsabilidade de cada uma e o que cada camada não faz. Cite o diretório raiz que materializa cada camada, como caminho relativo à raiz do projeto. -->

| Camada | Responsabilidade | Fronteira (o que não faz) | Diretório-raiz |
|---|---|---|---|
| Apresentação | `<<RESPONSABILIDADE>>` | `<<FRONTEIRA>>` | `<<CAMINHO>>` |
| Aplicação | `<<RESPONSABILIDADE>>` | `<<FRONTEIRA>>` | `<<CAMINHO>>` |
| Domínio | `<<RESPONSABILIDADE>>` | `<<FRONTEIRA>>` | `<<CAMINHO>>` |
| Infraestrutura | `<<RESPONSABILIDADE>>` | `<<FRONTEIRA>>` | `<<CAMINHO>>` |

## Diagrama de componentes internos

<!-- IA: gere diagrama Mermaid `flowchart TB` mostrando os componentes internos agrupados por camada, com setas indicando dependência (a aponta para b quando a usa b). Mantenha rótulos genéricos (sem nomes de produto). Limite a no máximo doze nós. -->

```mermaid
<<DIAGRAMA_MERMAID_COMPONENTES_INTERNOS_POR_CAMADA>>
```

## Fluxo principal de uma requisição

<!-- IA: descreva, passo a passo, o caminho de uma requisição típica desde a entrada na camada de apresentação até a resposta ao chamador. Cada passo numerado deve apontar `arquivo:linha` do trecho responsável (controlador, serviço, repositório). Inclua o caminho de erro mais comum. -->

1. `<<PASSO_1>>` — `<<ARQUIVO:LINHA>>`
2. `<<PASSO_2>>` — `<<ARQUIVO:LINHA>>`
3. `<<PASSO_3>>` — `<<ARQUIVO:LINHA>>`

## Decisões de design

<!-- IA: antes de inferir decisões a partir do código, procure um diretório de registro de decisões na raiz do projeto ou em pastas de documentação (nomes como decisions, decisoes ou adr). Quando existir, cite o arquivo da decisão como evidência do motivo e da consequência aceita, em vez de reconstruí-los por inferência; use inferência só para decisões sem registro, e o marcador de carência quando nem registro nem código indicarem o motivo. -->

<!-- IA: liste as decisões arquiteturais relevantes que foram tomadas, no formato decisão / motivo / consequência aceita. Cada linha precisa de evidência (`arquivo:linha`) ou de marcador `// CARÊNCIA: não identificado no código` quando a motivação não estiver registrada. -->

| Decisão | Motivo | Consequência aceita | Evidência |
|---|---|---|---|
| `<<DECISAO>>` | `<<MOTIVO>>` | `<<CONSEQUENCIA>>` | `<<ARQUIVO:LINHA>>` |

## Limites da arquitetura

<!-- IA: liste os limites conhecidos da arquitetura — pontos onde decisões correntes restringem evoluções futuras. Use uma linha por limite e evidência (`arquivo:linha`) quando possível. -->

<<LISTA_DE_LIMITES_ARQUITETURAIS>>

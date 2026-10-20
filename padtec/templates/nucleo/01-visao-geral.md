# Visão geral

<!-- IA: redija um parágrafo curto (3 a 6 linhas) que situe o sistema documentado: o que é, a que problema responde e qual o público-alvo da própria documentação. Evite jargão de produto; descreva em termos de domínio. -->

<<RESUMO_EXECUTIVO_DO_SISTEMA>>

## Objetivo do sistema

<!-- IA: descreva o objetivo de negócio do sistema em um parágrafo. Cite o artefato de código ou de configuração que materializa esse objetivo (por exemplo, o ponto de entrada da aplicação ou o manifesto principal) no formato `arquivo:linha`. -->

<<DESCRICAO_DO_OBJETIVO_DE_NEGOCIO>>

## Escopo

<!-- IA: liste o que está dentro e fora do escopo do sistema. Use duas subseções enxutas: "Dentro do escopo" e "Fora do escopo". Cada item deve ter evidência (`arquivo:linha`) ou marcador de carência. -->

### Dentro do escopo

<<LISTA_DENTRO_DO_ESCOPO>>

### Fora do escopo

<<LISTA_FORA_DO_ESCOPO>>

## Atores principais

<!-- IA: liste os atores externos do sistema (humanos e sistemas). Para cada um, preencha tipo (humano ou sistema), papel e modo de interação (interface gráfica, contrato programático, mensageria, lote). Cite `arquivo:linha` da rota, controlador ou consumidor que materializa a interação. -->

| Ator | Tipo | Papel | Modo de interação | Evidência |
|---|---|---|---|---|
| `<<NOME_DO_ATOR>>` | `<<HUMANO_OU_SISTEMA>>` | `<<PAPEL_NO_DOMINIO>>` | `<<INTERFACE_GRAFICA_OU_CONTRATO>>` | `<<ARQUIVO:LINHA>>` |

## Proposta de valor

<!-- IA: descreva, em até três linhas, qual valor o sistema entrega para cada ator principal. Sem superlativos; sem promessas. Apenas o que o sistema faz por cada ator. -->

<<PROPOSTA_DE_VALOR>>

## Visão de alto nível

<!-- IA: gere uma visão geral em uma única figura. Use diagrama Mermaid `flowchart LR` mostrando o sistema documentado como uma caixa central e os atores principais ao redor, com setas rotuladas pelo tipo de interação. Limite a até oito nós para legibilidade. -->

```mermaid
<<DIAGRAMA_MERMAID_CONTEXTO_DE_ATORES>>
```

## Onde cada coisa vive

<!-- IA: tabela de orientação rápida para quem (pessoa ou agente) precisa localizar algo no repositório: ponto de entrada da aplicação, rotas ou interface externa, modelo de domínio, configuração e segredos (sem valores), testes, pipeline de integração e entrega, scripts utilitários, documentação existente. Uma linha por item, com o caminho relativo à raiz e a evidência. Inclua só o que existe; o que não existir recebe o marcador de carência. -->

| O que | Onde (caminho) | Evidência |
|---|---|---|
| `<<ITEM>>` | `<<CAMINHO_RELATIVO>>` | `<<ARQUIVO:LINHA_OU_DIRETORIO>>` |

## Como navegar a documentação

<!-- IA: liste os próximos documentos recomendados para leitura na sequência indicada pela ordenação `NN-` do nível corrente. Aponte cada item pelo caminho relativo `./NN-slug.md`. -->

<<LISTA_DE_PROXIMOS_DOCUMENTOS>>

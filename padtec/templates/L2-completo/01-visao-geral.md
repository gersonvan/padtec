<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.
-->

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

## Como navegar a documentação

<!-- IA: liste os próximos documentos recomendados para leitura na sequência indicada pela ordenação `NN-` do nível corrente. Aponte cada item pelo caminho relativo `./NN-slug.md`. -->

<<LISTA_DE_PROXIMOS_DOCUMENTOS>>

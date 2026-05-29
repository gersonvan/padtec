<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.
-->

# Infraestrutura e implantação

<!-- IA: documente a topologia de implantação, recursos de plataforma utilizados, pipeline de integração e entrega contínua, observabilidade em produção e procedimento de retorno seguro a versão anterior. Use vocabulário genérico — não cite nomes de produto comercial. Para detalhes da plataforma específica, ver os arquivos em `condicionais/` quando aplicável. -->

## Topologia de implantação

<!-- IA: descreva a topologia em uma tabela: componentes implantáveis, quantidade de réplicas, tamanho de instância (categoria), região e dependências externas. Sem nomes de produto. -->

| Componente implantável | Quantidade de réplicas | Categoria de instância | Região | Dependências externas | Evidência |
|---|---|---|---|---|---|
| `<<NOME>>` | `<<NUMERO>>` | `<<CATEGORIA>>` | `<<REGIAO>>` | `<<LISTA>>` | `<<ARQUIVO:LINHA>>` |

## Recursos de plataforma utilizados

<!-- IA: liste os recursos de plataforma utilizados (computação gerenciada, armazenamento gerenciado, banco gerenciado, fila gerenciada, cache gerenciado, identidade gerenciada) por categoria. Sem nomes comerciais. -->

| Categoria | Função no sistema | Evidência |
|---|---|---|
| `<<CATEGORIA>>` | `<<FUNCAO>>` | `<<ARQUIVO:LINHA>>` |

## Pipeline de integração e entrega contínua

<!-- IA: descreva as etapas do pipeline (compilação, teste, análise estática, geração de artefato, implantação por ambiente). Cite o arquivo de definição do pipeline. -->

| Etapa | Gatilho | Pré-condição | Saída | Evidência |
|---|---|---|---|---|
| `<<NOME_DA_ETAPA>>` | `<<EVENTO_DE_DISPARO>>` | `<<PRE_CONDICAO>>` | `<<ARTEFATO_OU_AMBIENTE>>` | `<<ARQUIVO:LINHA>>` |

## Estratégia de implantação

<!-- IA: descreva a estratégia de implantação adotada (substituição direta, implantação canária, implantação azul-verde, implantação progressiva por anel) e como é implementada no pipeline. -->

<<DESCRICAO_DA_ESTRATEGIA_DE_IMPLANTACAO>>

## Observabilidade em produção

<!-- IA: descreva os sinais de observabilidade emitidos (logs estruturados, métricas, rastreamento distribuído) e onde são consumidos. -->

| Sinal | Conteúdo | Destino | Evidência |
|---|---|---|---|
| `<<TIPO_DE_SINAL>>` | `<<O_QUE_CARREGA>>` | `<<COLETOR>>` | `<<ARQUIVO:LINHA>>` |

## Retorno seguro a versão anterior

<!-- IA: descreva o procedimento de retorno seguro a versão anterior: como acionar, pré-condições, pós-condições, limitações (por exemplo, migrações de dados não reversíveis). Quando inexistente, registrar `// CARÊNCIA: não identificado no código`. -->

<<PROCEDIMENTO_DE_RETORNO_SEGURO>>

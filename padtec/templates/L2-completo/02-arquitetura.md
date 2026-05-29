<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.
-->

# Arquitetura

<!-- IA: apresente a arquitetura em três blocos: visão em camadas, fluxo principal de uma requisição e decisões de design relevantes. Use vocabulário genérico (camada de apresentação, camada de aplicação, camada de domínio, camada de infraestrutura). Não cite nomes de framework, biblioteca, runtime ou produto. -->

## Visão em camadas

<!-- IA: descreva, em uma a duas linhas por camada, a responsabilidade de cada uma e o que cada camada não faz. Cite o diretório raiz que materializa cada camada no formato `arquivo:linha`. -->

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

<!-- IA: liste as decisões arquiteturais relevantes que foram tomadas, no formato decisão / motivo / consequência aceita. Cada linha precisa de evidência (`arquivo:linha`) ou de marcador `// CARÊNCIA: não identificado no código` quando a motivação não estiver registrada. -->

| Decisão | Motivo | Consequência aceita | Evidência |
|---|---|---|---|
| `<<DECISAO>>` | `<<MOTIVO>>` | `<<CONSEQUENCIA>>` | `<<ARQUIVO:LINHA>>` |

## Limites da arquitetura

<!-- IA: liste os limites conhecidos da arquitetura — pontos onde decisões correntes restringem evoluções futuras. Use uma linha por limite e evidência (`arquivo:linha`) quando possível. -->

<<LISTA_DE_LIMITES_ARQUITETURAIS>>

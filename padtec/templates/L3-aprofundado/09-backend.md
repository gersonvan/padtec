<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.
-->

# Backend

<!-- IA: descreva a organização interna do backend sem citar nomes de framework, biblioteca, runtime ou produto. Use vocabulário genérico (módulo, camada, controlador, serviço de aplicação, repositório, manipulador). Nomes específicos vivem em `03-stack-e-dependencias.md`. Quando o sistema não possui backend autônomo, registrar "Não aplicável". -->

## Organização interna em módulos

<!-- IA: liste todos os módulos do backend com propósito, endpoints expostos, dependências entre módulos e ponto de definição. Cobertura 100% obrigatória. -->

| Módulo | Propósito | Endpoints expostos | Dependências internas | Evidência |
|---|---|---|---|---|
| `<<NOME>>` | `<<PROPOSITO>>` | `<<LISTA_DE_ENDPOINTS>>` | `<<LISTA_DE_MODULOS>>` | `<<ARQUIVO:LINHA>>` |

## Camadas e padrões aplicados

<!-- IA: descreva quais camadas existem dentro de cada módulo (camada de borda, camada de aplicação, camada de domínio, camada de infraestrutura) e quais padrões são aplicados (manipulador único por endpoint, separação consulta/comando, repositório, fábrica). Cite exemplos canônicos no código. -->

| Camada | Padrão aplicado | Exemplo canônico |
|---|---|---|
| `<<CAMADA>>` | `<<PADRAO>>` | `<<ARQUIVO:LINHA>>` |

## Ciclo de vida de uma requisição

<!-- IA: descreva a trajetória de uma requisição típica desde a chegada na camada de borda até a resposta. Inclua autenticação, validação, autorização, manipulação, persistência e retorno. Cite componentes por `arquivo:linha`. -->

1. `<<PASSO_1>>` — `<<ARQUIVO:LINHA>>`
2. `<<PASSO_2>>` — `<<ARQUIVO:LINHA>>`
3. `<<PASSO_3>>` — `<<ARQUIVO:LINHA>>`

## Tratamento de erro

<!-- IA: descreva como erros são tratados no backend: hierarquia de exceções de domínio, ponto único de mapeamento exceção→resposta, política de log de erro. Cite o filtro ou interceptador central. -->

| Origem do erro | Estratégia de tratamento | Ponto central de mapeamento | Evidência |
|---|---|---|---|
| `<<ORIGEM>>` | `<<ESTRATEGIA>>` | `<<COMPONENTE>>` | `<<ARQUIVO:LINHA>>` |

## Pontos de extensão

<!-- IA: identifique os pontos do backend explicitamente desenhados para extensão (interfaces de plug-in, ganchos de evento, decoradores reutilizáveis). Quando inexistentes, registrar `// CARÊNCIA: não identificado no código`. -->

| Ponto de extensão | O que permite estender | Como é registrado | Evidência |
|---|---|---|---|
| `<<NOME>>` | `<<DESCRICAO>>` | `<<MECANISMO>>` | `<<ARQUIVO:LINHA>>` |

## Convenções de log e correlação

<!-- IA: descreva o formato de log adotado, o identificador de correlação propagado entre componentes e os campos obrigatórios em cada registro de log. -->

<<DESCRICAO_DE_LOG_E_CORRELACAO>>

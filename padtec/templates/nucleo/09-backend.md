# Backend

<!-- IA: descreva a organização interna do backend pelo vocabulário de camadas (módulo, camada, controlador, serviço de aplicação, repositório, manipulador) e nomeie o framework, o runtime e as bibliotecas reais que materializam cada parte, com evidência; as versões ficam em `03-stack-e-dependencias.md`. Quando o sistema não possui backend autônomo, registrar "Não aplicável". -->

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

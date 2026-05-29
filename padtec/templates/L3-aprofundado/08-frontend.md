<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.
-->

# Frontend

<!-- IA: descreva a camada de apresentação do sistema sem citar nomes de framework ou biblioteca. Use vocabulário genérico (camada de apresentação, roteamento, gerência de estado, integração com a interface externa, renderização). Os nomes específicos pertencem ao bloco de stack em `03-stack-e-dependencias.md`. Quando o sistema não possui frontend autônomo, registrar "Não aplicável" no início e omitir tabelas seguintes. -->

## Estratégia de renderização

<!-- IA: descreva a estratégia de renderização adotada (renderização no servidor, renderização no cliente, abordagem híbrida, geração estática) em termos genéricos. Cite a configuração que materializa a estratégia (`arquivo:linha`). -->

<<DESCRICAO_DA_ESTRATEGIA_DE_RENDERIZACAO>>

## Roteamento

<!-- IA: liste as rotas públicas da camada de apresentação, com caminho, tela ou página associada, exigência de autenticação e ponto de carregamento. Cobertura exaustiva. -->

| Caminho | Tela ou página | Autenticação | Evidência |
|---|---|---|---|
| `<<CAMINHO>>` | `<<TELA>>` | `<<SIM_OU_NAO>>` | `<<ARQUIVO:LINHA>>` |

## Composição de telas

<!-- IA: para cada tela ou página principal, descreva os componentes que a compõem e o fluxo de carregamento de dados. Mantenha vocabulário genérico (componente, contêiner, formulário). -->

| Tela | Componentes principais | Fonte de dados | Evidência |
|---|---|---|---|
| `<<TELA>>` | `<<LISTA_DE_COMPONENTES>>` | `<<ENDPOINT_OU_ESTADO_LOCAL>>` | `<<ARQUIVO:LINHA>>` |

## Padrão de gerência de estado

<!-- IA: descreva como o estado da camada de apresentação é gerido (estado local, contexto compartilhado, repositório global, cache de servidor). Cite o ponto de configuração principal. -->

<<DESCRICAO_DO_PADRAO_DE_GERENCIA_DE_ESTADO>>

## Integração com a interface externa

<!-- IA: descreva como a camada de apresentação consome a interface externa do sistema (cliente HTTP gerado a partir de contrato, cliente manual, padronização de tratamento de erro). Cite o ponto de configuração principal. Aponte para `07-interface-externa.md` para a lista de endpoints. -->

<<DESCRICAO_DA_INTEGRACAO_COM_INTERFACE_EXTERNA>>

## Acessibilidade e suporte a dispositivos

<!-- IA: liste as decisões de acessibilidade e de adaptação a dispositivos efetivamente codificadas no projeto (uso de atributos semânticos, contraste mínimo, breakpoints definidos). Quando não houver evidência, registrar `// CARÊNCIA: não identificado no código`. -->

<<DECISOES_DE_ACESSIBILIDADE_E_RESPONSIVIDADE>>

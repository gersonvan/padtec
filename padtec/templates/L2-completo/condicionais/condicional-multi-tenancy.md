<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.

Esta seção é condicional. Inclua-a na documentação do projeto somente se a capacidade `multi-tenancy` for detectada. Sinais típicos: múltiplas conexões de banco nomeadas por tenant, esquemas dinâmicos resolvidos em tempo de execução, resolvedores de tenant em camada de borda, isolamento de dados por identificador como `collegeId` ou `tenantId`, segregação de recursos compartilhados (cache, filas, armazenamento) por tenant.
-->

# Multi-tenancy

<!-- IA: documente o modelo de isolamento por tenant adotado pelo sistema. Esta é uma seção condicional — citar produtos, padrões e identificadores reais (por exemplo, `collegeId`, `tenantId`) é permitido. Inspire-se em sistemas que isolam por identificador de organização e demonstram fluxo end-to-end de resolução do tenant. -->

## Modelo de isolamento

<!-- IA: declare o modelo de isolamento: banco por tenant, esquema por tenant, linha por tenant (com discriminador), híbrido. Cite o ponto onde o modelo é implementado. -->

| Camada | Modelo de isolamento | Identificador discriminador | Evidência |
|---|---|---|---|
| Banco de dados | `<<MODELO>>` | `<<IDENTIFICADOR>>` | `<<ARQUIVO:LINHA>>` |
| Cache | `<<MODELO>>` | `<<IDENTIFICADOR>>` | `<<ARQUIVO:LINHA>>` |
| Filas | `<<MODELO>>` | `<<IDENTIFICADOR>>` | `<<ARQUIVO:LINHA>>` |
| Armazenamento de arquivos | `<<MODELO>>` | `<<IDENTIFICADOR>>` | `<<ARQUIVO:LINHA>>` |

## Resolução do tenant na entrada da requisição

<!-- IA: descreva como o tenant é resolvido em cada entrada do sistema (cabeçalho da requisição, subdomínio, segmento do caminho, atributo da credencial autenticada). Cite o resolvedor no código. -->

| Tipo de entrada | Fonte do identificador | Resolvedor | Evidência |
|---|---|---|---|
| `<<TIPO>>` | `<<CABECALHO_OU_SUBDOMINIO_OU_TOKEN>>` | `<<COMPONENTE>>` | `<<ARQUIVO:LINHA>>` |

## Diagrama de resolução do tenant

<!-- IA: gere diagrama Mermaid `sequenceDiagram` mostrando o caminho da requisição: cliente → camada de borda → resolvedor de tenant → contexto da requisição → componentes de aplicação que consultam o contexto. -->

```mermaid
<<DIAGRAMA_MERMAID_SEQUENCEDIAGRAM_RESOLUCAO_DE_TENANT>>
```

## Roteamento de dados por tenant

<!-- IA: descreva como o sistema roteia a leitura e a escrita para os dados corretos do tenant (seleção dinâmica de conexão, filtro automático por discriminador, prefixo aplicado a chaves). -->

| Operação | Mecanismo de roteamento | Risco se mal aplicado | Evidência |
|---|---|---|---|
| `<<OPERACAO>>` | `<<MECANISMO>>` | `<<RISCO>>` | `<<ARQUIVO:LINHA>>` |

## Segregação de recursos compartilhados

<!-- IA: descreva como recursos transversais (cache, filas, armazenamento, jobs agendados) são particionados por tenant — prefixos, namespaces, contêineres por tenant. -->

| Recurso | Estratégia de particionamento | Padrão de chave ou namespace | Evidência |
|---|---|---|---|
| `<<RECURSO>>` | `<<ESTRATEGIA>>` | `<<PADRAO>>` | `<<ARQUIVO:LINHA>>` |

## Gestão do ciclo de vida de tenants

<!-- IA: descreva o ciclo de vida de um tenant no sistema: criação (provisionamento de recursos isolados), ativação, suspensão, remoção (despovoamento e arquivamento). Cite o componente que executa cada etapa. -->

| Etapa | Operação executada | Componente responsável | Evidência |
|---|---|---|---|
| Criação | `<<OPERACAO>>` | `<<COMPONENTE>>` | `<<ARQUIVO:LINHA>>` |
| Ativação | `<<OPERACAO>>` | `<<COMPONENTE>>` | `<<ARQUIVO:LINHA>>` |
| Suspensão | `<<OPERACAO>>` | `<<COMPONENTE>>` | `<<ARQUIVO:LINHA>>` |
| Remoção | `<<OPERACAO>>` | `<<COMPONENTE>>` | `<<ARQUIVO:LINHA>>` |

## Garantias de não vazamento entre tenants

<!-- IA: descreva os testes e barreiras automatizadas que previnem vazamento de dados entre tenants (testes de integração com múltiplos tenants, asserções de filtro obrigatório, política negativa por padrão). Quando ausentes, registrar `// CARÊNCIA: não identificado no código`. -->

<<GARANTIAS_DE_NAO_VAZAMENTO>>

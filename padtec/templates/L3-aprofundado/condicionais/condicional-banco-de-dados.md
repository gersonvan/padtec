<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.

Esta seção é condicional. Inclua-a na documentação do projeto somente se a capacidade `banco-de-dados` for detectada. Sinais típicos: entidades mapeadas por bibliotecas de objeto-relacional (TypeORM, Prisma, Sequelize, SQLAlchemy, Hibernate), arquivos `.sql`, migrações versionadas, conexões nomeadas em arquivos de configuração.
-->

# Banco de dados

<!-- IA: documente a estratégia de persistência adotada. Esta é uma seção condicional — exemplos de produto e biblioteca específicos são permitidos quando refletem o uso real no projeto. -->

## Mecanismo de persistência

<!-- IA: identifique o(s) sistema(s) de banco em uso (relacional, documento, chave-valor, grafo) com versão exata e a biblioteca de acesso (por exemplo, TypeORM, Prisma, Sequelize, SQLAlchemy, Hibernate). Cite `arquivo:linha` do manifesto e do bootstrap da conexão. -->

| Mecanismo | Versão | Biblioteca de acesso | Versão da biblioteca | Evidência |
|---|---|---|---|---|
| `<<MOTOR>>` | `<<VERSAO>>` | `<<BIBLIOTECA>>` | `<<VERSAO>>` | `<<ARQUIVO:LINHA>>` |

## Conexões nomeadas

<!-- IA: liste todas as conexões nomeadas configuradas no sistema (em projetos multi-conexão é comum haver várias). Inclua alias, host, banco, modo (leitura, escrita, ambos) e estratégia de pool. -->

| Alias | Host | Banco | Modo | Pool máximo | Evidência |
|---|---|---|---|---|---|
| `<<ALIAS>>` | `<<HOST>>` | `<<BANCO>>` | `<<LEITURA_OU_ESCRITA>>` | `<<NUMERO>>` | `<<ARQUIVO:LINHA>>` |

## Modelo físico

<!-- IA: gere diagrama Mermaid `erDiagram` cobrindo as entidades persistidas, com chaves primárias e cardinalidades. Quando o número de entidades for elevado, agrupe por subdomínio em diagramas separados. -->

```mermaid
<<DIAGRAMA_MERMAID_ERDIAGRAM_MODELO_FISICO>>
```

## Inventário de entidades persistidas

<!-- IA: liste todas as entidades persistidas (mapeamento objeto-relacional, esquemas de coleção, modelos). Cite `arquivo:linha` da definição. -->

| Entidade | Tabela ou coleção | Chave primária | Evidência |
|---|---|---|---|
| `<<ENTIDADE>>` | `<<TABELA>>` | `<<CHAVE>>` | `<<ARQUIVO:LINHA>>` |

## Padrão de migrações

<!-- IA: descreva a ferramenta de migração adotada (por exemplo, TypeORM migrations, Prisma migrate, Flyway, Liquibase, Alembic), o diretório de migrações, a convenção de nomenclatura e a política de geração e aplicação. -->

| Item | Descrição | Evidência |
|---|---|---|
| Ferramenta de migração | `<<NOME_E_VERSAO>>` | `<<ARQUIVO:LINHA>>` |
| Diretório de migrações | `<<CAMINHO>>` | `<<ARQUIVO:LINHA>>` |
| Convenção de nomenclatura | `<<PADRAO>>` | `<<ARQUIVO:LINHA>>` |
| Política de aplicação | `<<MANUAL_OU_AUTOMATICA_NO_BOOT>>` | `<<ARQUIVO:LINHA>>` |

## Política de transações

<!-- IA: descreva onde transações são abertas, nível de isolamento padrão e tratamento de falhas. -->

<<POLITICA_DE_TRANSACOES>>

## Padrões de acesso a dados

<!-- IA: descreva padrões aplicados na camada de dados (repositório, fonte de dados ativa, unidade de trabalho, consultas declarativas) e quando consultas SQL nativas são permitidas. -->

<<PADROES_DE_ACESSO_A_DADOS>>

## Otimizações estruturais

<!-- IA: liste índices, views materializadas, particionamento, replicação de leitura e outras otimizações estruturais aplicadas. Cite `arquivo:linha` da migração ou do script que cria cada otimização. -->

| Otimização | Objeto | Motivo | Evidência |
|---|---|---|---|
| `<<TIPO>>` | `<<TABELA_OU_VIEW>>` | `<<MOTIVO>>` | `<<ARQUIVO:LINHA>>` |

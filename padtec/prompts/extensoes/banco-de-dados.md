# Sub-prompt PADTec — Extensão: Banco de dados

## Parâmetros recebidos do orquestrador

Os seis parâmetros (`nível`, `variante`, `pasta-de-saída`, `capacidades-ativas`, `modo-monorepo`, `raiz-do-projeto-destino`) chegam conforme o contrato de invocação de `prompts/00-mestre.md`, detalhado em `prompts/_comum.md`, que também fixa o procedimento comum de preenchimento e a guarda por nível.

Este sub-prompt é despachado apenas quando o slug `banco-de-dados` está em `capacidades-ativas`.

## Template a preencher

Leia integralmente `templates/condicionais/condicional-banco-de-dados.md`. Capacidades condicionais não existem em `L1-essencial`; se `nível` for `L1`, retorne sem produzir saída.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique o motor de persistência efetivamente em uso. Sinais técnicos típicos: dependências como TypeORM, Prisma, Sequelize, Mongoose, Hibernate, SQLAlchemy, Entity Framework Core, Django ORM, ActiveRecord; arquivos de schema (`schema.prisma`, `*.dbml`); arquivos `.sql`; arquivos de configuração de conexão (`ormconfig.*`, `database.yml`, `appsettings.json` seção de conexão).
2. Catalogue **todas** as migrations: caminho do diretório de migrations, convenção de nomenclatura (timestamp/incremental), número total de migrations aplicadas. Identifique a migration mais antiga e a mais recente como referência cronológica.
3. Catalogue o **modelo físico**: tabelas/coleções, suas colunas/campos com tipo, índices declarados, restrições (chave única, chave estrangeira, check). Use o schema declarativo do ORM ou os arquivos de migration como fonte primária; cite `arquivo:linha`.
4. Identifique a **política de transações**: usos de `@Transaction`/`@Transactional`, abertura explícita de transação no código de serviço, modo de propagação quando declarado, isolamento quando configurado.
5. Identifique **padrões de acesso a dados**: repositórios genéricos vs específicos, padrão de query (query builder, raw SQL, ORM nativo), prepared statements vs strings interpoladas, paginação adotada.
6. Identifique **otimizações estruturais**: índices declarados (e seu motivo aparente), views materializadas, particionamento, sharding quando documentado.

## Procedimento de preenchimento

Além do procedimento comum de `prompts/_comum.md`:

1. Quando o template pedir diagrama Mermaid (ex.: relacionamento físico de tabelas), gere-o a partir do schema real.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **sete regras duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta extensão, atenção especial a:

- **Regra 4 (Cobertura exaustiva):** toda tabela/coleção identificada no schema aparece no documento.
- **Regra 1 (Evidência rastreável):** cada tabela, índice, restrição e política cita `arquivo:linha`.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/condicional-banco-de-dados.md`, com motor identificado, modelo físico tabulado, migrations catalogadas, política de transação descrita, padrões de acesso documentados.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, gere o documento por app que tenha conexão própria a banco (`<pasta-de-saída>/apps/<nome-do-app>/condicional-banco-de-dados.md`). Quando dois apps compartilham o mesmo banco via pacote comum em `packages/`, registre o schema uma única vez na visão de workspace e referencie em cada app.

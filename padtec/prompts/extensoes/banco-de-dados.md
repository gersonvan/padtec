# Sub-prompt PADTec — Extensão: Banco de dados

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

Este sub-prompt é despachado apenas quando o slug `banco-de-dados` está em `capacidades-ativas`.

## Template a preencher

Leia integralmente `templates/<nível-resolvido>/condicionais/condicional-banco-de-dados.md`, onde `<nível-resolvido>` é `L2-completo` ou `L3-aprofundado`. Capacidades condicionais não existem em `L1-essencial`; se `nível` for `L1`, retorne sem produzir saída.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique o motor de persistência efetivamente em uso. Sinais técnicos típicos: dependências como TypeORM, Prisma, Sequelize, Mongoose, Hibernate, SQLAlchemy, Entity Framework Core, Django ORM, ActiveRecord; arquivos de schema (`schema.prisma`, `*.dbml`); arquivos `.sql`; arquivos de configuração de conexão (`ormconfig.*`, `database.yml`, `appsettings.json` seção de conexão).
2. Catalogue **todas** as migrations: caminho do diretório de migrations, convenção de nomenclatura (timestamp/incremental), número total de migrations aplicadas. Identifique a migration mais antiga e a mais recente como referência cronológica.
3. Catalogue o **modelo físico**: tabelas/coleções, suas colunas/campos com tipo, índices declarados, restrições (chave única, chave estrangeira, check). Use o schema declarativo do ORM ou os arquivos de migration como fonte primária; cite `arquivo:linha`.
4. Identifique a **política de transações**: usos de `@Transaction`/`@Transactional`, abertura explícita de transação no código de serviço, modo de propagação quando declarado, isolamento quando configurado.
5. Identifique **padrões de acesso a dados**: repositórios genéricos vs específicos, padrão de query (query builder, raw SQL, ORM nativo), prepared statements vs strings interpoladas, paginação adotada.
6. Identifique **otimizações estruturais**: índices declarados (e seu motivo aparente), views materializadas, particionamento, sharding quando documentado.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Quando o template pedir diagrama Mermaid (ex.: relacionamento físico de tabelas), gere-o a partir do schema real.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta extensão, atenção especial a:

- **Regra 4 (Cobertura exaustiva):** toda tabela/coleção identificada no schema aparece no documento.
- **Regra 1 (Evidência rastreável):** cada tabela, índice, restrição e política cita `arquivo:linha`.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/banco-de-dados.md`, com motor identificado, modelo físico tabulado, migrations catalogadas, política de transação descrita, padrões de acesso documentados.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, gere o documento por app que tenha conexão própria a banco (`<pasta-de-saída>/apps/<nome-do-app>/banco-de-dados.md`). Quando dois apps compartilham o mesmo banco via pacote comum em `packages/`, registre o schema uma única vez na visão de workspace e referencie em cada app.

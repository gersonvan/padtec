---
stage: 2
task: 3
agent: prompts-agent
log_path: ".apm/memory/stage-02/task-02-03.log.md"
has_dependencies: true
---

# Task 2.3: Sub-prompts de seção do núcleo e de extensão por capacidade

## Task Reference

Task 2.3 — atribuída ao Prompts Agent (same-agent continuation após Task 2.2).

## Context from Dependencies

Esta Task depende diretamente de Tasks já concluídas e integradas em `main`:

**Integration Steps:**

1. Releia [padtec/prompts/00-mestre.md](padtec/prompts/00-mestre.md) — produzido por você na Task 2.2. O **Contrato de invocação de sub-prompts** (bloco em §vi) é autoritativo: cada sub-prompt que você criará aqui recebe **exatamente os seis parâmetros** definidos no contrato (`nível`, `variante`, `pasta-de-saída`, `capacidades-ativas`, `modo-monorepo`, `raiz-do-projeto-destino`).
2. Releia [.apm/memory/stage-1/esqueleto-canonico.md](.apm/memory/stage-1/esqueleto-canonico.md) — nomes autoritativos das 15 seções de núcleo + 9 condicionais, com mapeamento a níveis e capacidades.
3. Inspecione os templates produzidos pela Task 2.1, **um por seção/condicional**, para entender os placeholders concretos que cada sub-prompt deve orientar a IA a preencher:
   - `padtec/templates/L1-essencial/{01,02,03}-*.md`
   - `padtec/templates/L2-completo/*.md` (11 núcleo + 9 em `condicionais/`)
   - `padtec/templates/L3-aprofundado/*.md` (15 núcleo + 9 em `condicionais/`)

   Você não precisa abrir todos os 47 — abra ao menos: `02-arquitetura.md` (placeholder Mermaid), `05-modelo-de-dominio.md` (erDiagram), `07-interface-externa.md` (tabela de endpoints), `12-quick-start.md` (L3-only), `condicionais/condicional-banco-de-dados.md` (estrutura de condicional), `condicionais/condicional-auth.md` (a leitura confirmará o naming exato).

**Producer Output Summary — esqueleto canônico (relembrado):**

- **Núcleo universal (15):** `01-visao-geral` (L1), `02-arquitetura` (L1), `03-stack-e-dependencias` (L1); `04-estrutura-do-projeto`, `05-modelo-de-dominio`, `06-fluxos-de-negocio`, `07-interface-externa`, `08-frontend`, `09-backend`, `10-configuracao-e-ambientes`, `11-infraestrutura-e-deployment` (acrescentados em L2); `12-quick-start`, `13-glossario`, `14-faq-e-troubleshooting`, `15-manutencao-da-documentacao` (acrescentados em L3). Inclusão `L1 ⊂ L2 ⊂ L3` (cópia byte-a-byte quando replicado).
- **Núcleo condicional (9):** os arquivos de condicional existem em `templates/L2-completo/condicionais/` e `templates/L3-aprofundado/condicionais/`. Mapeamento exato slug-de-capacidade → arquivo-de-template-condicional (este é o que o seu sub-prompt de extensão lê):
  - `banco-de-dados` → `condicional-banco-de-dados.md`
  - `cache` → `condicional-cache.md`
  - `filas-async` → `condicional-filas-async.md`
  - `auth` → `condicional-autenticacao-e-autorizacao.md`
  - `integracoes-externas` → `condicional-integracoes-externas.md`
  - `storage` → `condicional-armazenamento-de-arquivos.md`
  - `notificacoes` → `condicional-notificacoes.md`
  - `jobs-agendados` → `condicional-jobs-agendados.md`
  - `multi-tenancy` → `condicional-multi-tenancy.md`

**Upstream Context — naming dos sub-prompts (contratual):**

- Sub-prompts de seção: arquivo `padtec/prompts/secoes/NN-<slug>.md` com naming **idêntico** ao nome do template correspondente em `padtec/templates/<nível>/`. Total: **15 arquivos**.
- Sub-prompts de extensão: arquivo `padtec/prompts/extensoes/<slug-de-capacidade>.md` (sem prefixo `condicional-` — usa o slug puro da capacidade, conforme `00-mestre.md` §vi.4 prevê: `prompts/extensoes/<slug-da-capacidade>.md`). Total: **9 arquivos**.

## Objective

Escrever os 15 sub-prompts de seção do núcleo e os 9 sub-prompts de extensão por capacidade, completando o pacote de prompts orquestrados do PADTec. Cada sub-prompt recebe os seis parâmetros do contrato canônico definido em `00-mestre.md` §vi e produz **um documento** em `pasta-de-saída/` no projeto destino, preenchendo o template correspondente com evidências extraídas do código.

## Detailed Instructions

### A. Estrutura uniforme de **todo** sub-prompt

Cada arquivo (de seção ou de extensão) começa com o seguinte padrão estrutural — adapte os placeholders `<<...>>` ao sub-prompt específico, mas mantenha a ordem e os cabeçalhos.

````markdown
# Sub-prompt PADTec — <<Título humano da seção ou extensão>>

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume que recebeu valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

## Template a preencher

<<Para sub-prompts de seção:>> Leia integralmente `templates/<nível-resolvido>/<NN-slug>.md`, onde `<nível-resolvido>` é `L1-essencial` para `L1`, `L2-completo` para `L2`, `L3-aprofundado` para `L3`. Esse arquivo é o template autoritativo desta seção.

<<Para sub-prompts de extensão:>> Leia integralmente `templates/<nível-resolvido>/condicionais/condicional-<arquivo-da-capacidade>.md` — somente acionado quando `nível` é `L2` ou `L3` (capacidades não existem em `L1-essencial`).

## Procedimento de extração de evidências

<<Lista numerada e específica de buscas a executar no `raiz-do-projeto-destino`. Cite extensões de arquivo, nomes de manifesto, padrões de busca, decoradores, anotações etc. relevantes para esta seção/capacidade. Seja específico — esta é a parte que dá valor real ao sub-prompt.>>

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído na etapa anterior.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Para cada bloco `mermaid` placeholder, gere o diagrama Mermaid correspondente conforme o tipo indicado (`flowchart`, `erDiagram`, `sequenceDiagram` etc.). Diagrama mínimo aceitável: dois nós e uma aresta significativa do código real.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Em particular, para esta seção/extensão, atenção especial a:

<<Liste as duas ou três regras que são mais críticas para esta seção/extensão, com justificativa de uma linha cada. Ex.: para `13-glossario`, regra 3 (mínimo de termos) é central; para `07-interface-externa`, regra 4 (cobertura exaustiva) é central.>>

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/<NN-slug>.md` (sub-prompts de seção) ou `<pasta-de-saída>/<slug-da-capacidade>.md` (sub-prompts de extensão), com placeholders preenchidos, diretivas executadas, evidências citadas e ausências marcadas com `// CARÊNCIA`.

## Comportamento por nível (somente sub-prompts de seção)

<<Quando o sub-prompt cobre uma seção que existe em múltiplos níveis (todas, no caso do núcleo), descreva o que muda. Para seções `01`–`03`: idênticas em L1, L2 e L3 (template já é cópia byte-a-byte). Para seções `04`–`11`: existem em L2 e L3; em L3 podem ter Mermaid adicional ou aprofundamento. Para seções `12`–`15`: somente L3.>>

Se este sub-prompt for invocado com `nível` fora do conjunto suportado, retorne imediatamente sem produzir saída (situação que o `00-mestre.md` previne na resolução do conjunto de seções; este é um guard defensivo).

## Comportamento sob `modo-monorepo: sim` (quando aplicável)

<<Para seções/extensões cujo conteúdo escala por app (ex.: `09-backend`, `08-frontend`, condicionais de `auth`/`banco-de-dados`), descreva que o sub-prompt deve produzir um arquivo por app dentro de `pasta-de-saída/apps/<nome-do-app>/<NN-slug>.md`. Para seções/extensões globais (ex.: `01-visao-geral`, `11-infraestrutura-e-deployment`, `13-glossario`), descreva que o documento permanece único.>>
````

### B. Lista exata dos 15 sub-prompts de seção a criar

Em `padtec/prompts/secoes/`:

| Arquivo | Existe nos níveis | Naturezas-chave |
|---|---|---|
| `01-visao-geral.md` | L1, L2, L3 | prosa de overview do produto/sistema |
| `02-arquitetura.md` | L1, L2, L3 | diagrama Mermaid `flowchart` em L2/L3 |
| `03-stack-e-dependencias.md` | L1, L2, L3 | tabelas de versões exatas (regra 5) |
| `04-estrutura-do-projeto.md` | L2, L3 | árvore de pastas + descrição |
| `05-modelo-de-dominio.md` | L2, L3 | diagrama Mermaid `erDiagram` em L2/L3 |
| `06-fluxos-de-negocio.md` | L2, L3 | diagrama Mermaid `sequenceDiagram` em L2/L3 |
| `07-interface-externa.md` | L2, L3 | diagrama Mermaid `sequenceDiagram` em L2/L3 + tabela de endpoints (regra 4) |
| `08-frontend.md` | L2, L3 | componentes, rotas, estado |
| `09-backend.md` | L2, L3 | módulos, controladores, serviços (regra 4 para módulos) |
| `10-configuracao-e-ambientes.md` | L2, L3 | variáveis de ambiente, perfis, segredos (regra 1 importante) |
| `11-infraestrutura-e-deployment.md` | L2, L3 | pipeline, ambientes-alvo, IaC |
| `12-quick-start.md` | L3 | passos numerados executáveis pelo leitor |
| `13-glossario.md` | L3 | regra 3 central: mínimo 100 termos em L3 |
| `14-faq-e-troubleshooting.md` | L3 | perguntas e respostas extraídas de issues/READMEs |
| `15-manutencao-da-documentacao.md` | L3 | quando atualizar, gatilhos, donos |

### C. Lista exata dos 9 sub-prompts de extensão a criar

Em `padtec/prompts/extensoes/`. **Naming usa o slug puro da capacidade**, não o nome do template (que tem prefixo `condicional-`). Cada extensão lê o template `templates/<nível>/condicionais/<arquivo-mapeado>` e produz `<pasta-de-saída>/<slug>.md`.

| Arquivo do sub-prompt | Template lido | Sinais técnicos típicos (já presentes em `00-mestre.md` §iv) |
|---|---|---|
| `banco-de-dados.md` | `condicionais/condicional-banco-de-dados.md` | TypeORM, Prisma, Sequelize, `.sql`, migrations, schema files |
| `cache.md` | `condicionais/condicional-cache.md` | Redis, `cache-manager`, `ioredis`, decorators de cache |
| `filas-async.md` | `condicionais/condicional-filas-async.md` | Bull, BullMQ, RabbitMQ, Kafka, SQS, decorators `@Process` |
| `auth.md` | `condicionais/condicional-autenticacao-e-autorizacao.md` | passport, JWT, OAuth, OpenID, guards, middlewares de sessão |
| `integracoes-externas.md` | `condicionais/condicional-integracoes-externas.md` | clientes HTTP nomeados, SDKs de terceiros |
| `storage.md` | `condicionais/condicional-armazenamento-de-arquivos.md` | Azure Blob, AWS S3, multer, fs-extra usado para upload |
| `notificacoes.md` | `condicionais/condicional-notificacoes.md` | SendGrid, Twilio, nodemailer, SMTP, push SDKs |
| `jobs-agendados.md` | `condicionais/condicional-jobs-agendados.md` | `@nestjs/schedule`, `node-cron`, cron jobs declarados |
| `multi-tenancy.md` | `condicionais/condicional-multi-tenancy.md` | múltiplas conexões nomeadas, schemas dinâmicos, tenant resolvers |

### D. Restrições gerais

- **Independência de stack do núcleo permanece.** Sub-prompts de seção em `prompts/secoes/` são **não-núcleo** para fins desta restrição? **Não — são núcleo.** Os sub-prompts de seção descrevem **procedimentos genéricos** e não devem nomear frameworks/bibliotecas específicas no corpo do procedimento. Quando precisar dar exemplo de sinal técnico em um sub-prompt de seção (ex.: para 09-backend, "procure decoradores que indiquem controladores HTTP"), use linguagem genérica. Sub-prompts de extensão (em `prompts/extensoes/`) podem nomear stacks livremente — eles existem precisamente para capturar especificidade por capacidade.
- **Tool-calling nativo.** Todos os sub-prompts assumem agente Copilot Chat com acesso direto a arquivos. **Proibido instruir o usuário a colar trechos no chat.**
- **Caminhos relativos a `padtec/`.** Referências a templates, ao mestre ou a outros sub-prompts usam caminho relativo à raiz do pacote.
- **Autocontenção do pacote.** Não referenciar Spec/Plan/Tracker ou qualquer artefato APM desta sessão.
- **Sem composição entre sub-prompts.** Conforme §vi do mestre: "O sub-prompt **não** procura outros sub-prompts: composição é responsabilidade exclusiva do mestre." Não inclua diretivas tipo "depois desta seção, invoque também...".

### E. Verificações automatizadas obrigatórias

Antes de declarar Success:

1. **Contagem exata de arquivos:**
   ```bash
   echo "seções: $(ls padtec/prompts/secoes/*.md 2>/dev/null | grep -v gitkeep | wc -l) (esperado 15)"
   echo "extensões: $(ls padtec/prompts/extensoes/*.md 2>/dev/null | grep -v gitkeep | wc -l) (esperado 9)"
   ```
2. **Naming exato de seções (15):**
   ```bash
   for f in 01-visao-geral 02-arquitetura 03-stack-e-dependencias 04-estrutura-do-projeto 05-modelo-de-dominio 06-fluxos-de-negocio 07-interface-externa 08-frontend 09-backend 10-configuracao-e-ambientes 11-infraestrutura-e-deployment 12-quick-start 13-glossario 14-faq-e-troubleshooting 15-manutencao-da-documentacao; do
     [ -f "padtec/prompts/secoes/$f.md" ] && echo "ok: $f" || echo "FALTA: $f"
   done
   ```
3. **Naming exato de extensões (9):**
   ```bash
   for f in banco-de-dados cache filas-async auth integracoes-externas storage notificacoes jobs-agendados multi-tenancy; do
     [ -f "padtec/prompts/extensoes/$f.md" ] && echo "ok: $f" || echo "FALTA: $f"
   done
   ```
4. **Cabeçalhos contratuais em todo sub-prompt:** cada arquivo deve conter os blocos `## Parâmetros recebidos do orquestrador`, `## Template a preencher`, `## Procedimento de extração de evidências`, `## Procedimento de preenchimento`, `## Regras de qualidade aplicáveis`, `## Saída esperada`. Execute:
   ```bash
   for f in padtec/prompts/secoes/*.md padtec/prompts/extensoes/*.md; do
     [ "$(basename "$f")" = ".gitkeep" ] && continue
     missing=""
     for h in "Parâmetros recebidos do orquestrador" "Template a preencher" "Procedimento de extração de evidências" "Procedimento de preenchimento" "Regras de qualidade aplicáveis" "Saída esperada"; do
       grep -q "$h" "$f" || missing="$missing | $h"
     done
     [ -z "$missing" ] && echo "ok: $f" || echo "FALTA em $f: $missing"
   done
   ```
5. **Os seis parâmetros do contrato aparecem literalmente em todo sub-prompt:**
   ```bash
   for f in padtec/prompts/secoes/*.md padtec/prompts/extensoes/*.md; do
     [ "$(basename "$f")" = ".gitkeep" ] && continue
     for p in "nível" "variante" "pasta-de-saída" "capacidades-ativas" "modo-monorepo" "raiz-do-projeto-destino"; do
       grep -q "$p" "$f" || echo "FALTA '$p' em $f"
     done
   done
   ```
   Saída ideal: vazia.
6. **Cada sub-prompt referencia seu template correspondente por caminho:**
   ```bash
   for f in padtec/prompts/secoes/*.md; do
     [ "$(basename "$f")" = ".gitkeep" ] && continue
     grep -qE 'templates/(L[123][^/]*|<n[íi]vel-resolvido>)/' "$f" || echo "FALTA ref template em $f"
   done
   for f in padtec/prompts/extensoes/*.md; do
     [ "$(basename "$f")" = ".gitkeep" ] && continue
     grep -qE 'condicionais/condicional-' "$f" || echo "FALTA ref condicional em $f"
   done
   ```
7. **Independência de stack nos sub-prompts de seção** (extensões podem mencionar):
   ```bash
   grep -liE 'NestJS|Next\.js|Express|Django|Spring|SQL Server|PostgreSQL|Redis|TypeORM|Prisma|Bull|RabbitMQ' padtec/prompts/secoes/*.md
   ```
   Saída esperada: vazia.
8. **Ausência de pedidos de colagem manual:**
   ```bash
   grep -riE 'cole aqui|paste here|informe o conte[uú]do de|copie e cole' padtec/prompts/secoes/ padtec/prompts/extensoes/
   ```
   Saída esperada: vazia.
9. **Ausência de composição cruzada entre sub-prompts:**
   ```bash
   grep -riE 'invoque (o |outro )?sub-prompt|despache .*sub-prompt|carregue .*prompts/(secoes|extensoes)/' padtec/prompts/secoes/ padtec/prompts/extensoes/
   ```
   Saída esperada: vazia (a composição é exclusiva do mestre, conforme §vi do `00-mestre.md`).
10. **Ausência de emojis decorativos** (BSD grep não suporta `-P`; use `perl`):
    ```bash
    perl -CSD -ne 'while (/([\x{1F300}-\x{1F9FF}\x{2600}-\x{27BF}\x{1F600}-\x{1F64F}])/g) { print "$ARGV:$.: $1\n" }' padtec/prompts/secoes/*.md padtec/prompts/extensoes/*.md
    ```
    Saída esperada: vazia.

## Workspace

- **Worktree (área de trabalho):** `.apm/worktrees/feat-prompts-secoes-e-extensoes/` — branch `feat/prompts-secoes-e-extensoes`. Faça todas as escritas nesta área. A árvore já contém `padtec/templates/`, `padtec/prompts/00-mestre.md`, `padtec/prompts/variantes/` (vindos da base). Pode lê-los livremente, **não modificar**.
- **Runtime APM resolve a partir da raiz do projeto:** Task Log em `/Users/gersonvan/Library/CloudStorage/OneDrive-Pessoal/Documentos/Projetos AVP/Centralizador de Docs/.apm/memory/stage-02/task-02-03.log.md`, não na cópia espelhada do worktree.
- **macOS BSD grep não suporta `-P`:** use `perl -CSD -ne` para checagens Unicode.
- **Commit:** após validações passarem, commit no branch `feat/prompts-secoes-e-extensoes` com mensagem `feat: cria sub-prompts de seção e extensão do PADTec` (ou descrição imperativa equivalente em pt-BR). Sem identificadores APM no nome.
- **Idioma:** pt-BR, técnico-formal, sem emojis decorativos.

## Expected Output

- 15 arquivos em `padtec/prompts/secoes/` com naming exato listado em §B.
- 9 arquivos em `padtec/prompts/extensoes/` com naming exato listado em §C.
- Todos seguindo a estrutura uniforme de §A com os seis cabeçalhos contratuais, os seis parâmetros do contrato literalmente citados, e referência ao template correspondente por caminho.

## Validation Criteria

- (a) 15 arquivos `secoes/*.md` + 9 arquivos `extensoes/*.md` com naming exato.
- (b) Cada sub-prompt contém os seis cabeçalhos contratuais da estrutura uniforme.
- (c) Cada sub-prompt cita literalmente os seis parâmetros do contrato (`nível`, `variante`, `pasta-de-saída`, `capacidades-ativas`, `modo-monorepo`, `raiz-do-projeto-destino`).
- (d) Cada sub-prompt de seção referencia seu template em `templates/<nível-resolvido>/<arquivo>` (literal ou pelo padrão `templates/<nível-resolvido>/<NN-slug>.md`); cada sub-prompt de extensão referencia o template `condicionais/condicional-<arquivo>`.
- (e) Sub-prompts de seção respeitam independência de stack (busca por nomes de framework retorna vazio).
- (f) Zero pedidos de colagem manual; zero composição cruzada entre sub-prompts; zero emojis decorativos.
- (g) Idioma pt-BR, tom técnico-formal.

## Instruction Accuracy

- O naming dos 15 sub-prompts de seção é **literal** ao naming dos templates do núcleo. Se algum naming acima divergir do que existe em `padtec/templates/L3-aprofundado/`, o nome do template é autoritativo — ajuste o sub-prompt e registre a divergência no Task Log.
- O naming dos 9 sub-prompts de extensão usa o **slug puro da capacidade** (sem `condicional-`). Conferência cruzada: o `00-mestre.md` §vi.4 prevê `prompts/extensoes/<slug-da-capacidade>.md` — autoritativo. Se você criou a si próprio uma variante na Task 2.2 que diverge desse padrão, ajuste agora.
- Se durante a redação você identificar que um sub-prompt precisa de uma 7ª seção estrutural não prevista em §A para fazer sentido, adicione-a apenas a esse sub-prompt e registre no Task Log.

## Task Iteration

Quando uma validação falhar, investigue antes de corrigir. Aplique uma mudança direcionada por iteração. Se uma correção não resolver, despache um subagente de debug. Valide descobertas antes de aplicar. Se não resolver após investigação, reporte Partial.

## Task Logging

Task Log em `.apm/memory/stage-02/task-02-03.log.md` (raiz do projeto). Procedimento em `.github/apm-guides/task-logging.md` §3.1.

## Task Report

Escreva o Task Report em `.apm/bus/prompts-agent/report.md` ao concluir.

---
stage: 2
task: 2
agent: prompts-agent
log_path: ".apm/memory/stage-02/task-02-02.log.md"
has_dependencies: true
---

# Task 2.2: Prompt mestre e prompts de variante

## Task Reference

Task 2.2 — atribuída ao Prompts Agent.

## Context from Dependencies

This Task depends on work completed by the Foundation Agent (Task 1.1) and the Templates Agent (Task 2.1):

**Integration Steps:**

1. Leia integralmente [.apm/memory/stage-1/esqueleto-canonico.md](.apm/memory/stage-1/esqueleto-canonico.md) — contrato autoritativo de 24 seções do núcleo (15 universais + 9 condicionais) com naming, nível mínimo, descrição e mapeamento a capacidades.
2. Leia integralmente [.apm/memory/stage-1/indice-padroes.md](.apm/memory/stage-1/indice-padroes.md) — vocabulário, padrões estruturais, padrões de diagramas Mermaid destilados das dez fontes.
3. Liste e inspecione os templates produzidos pela Task 2.1:
   - `padtec/templates/L1-essencial/` (3 arquivos núcleo).
   - `padtec/templates/L2-completo/` (11 arquivos núcleo + 9 em `condicionais/`).
   - `padtec/templates/L3-aprofundado/` (15 arquivos núcleo + 9 em `condicionais/`).

   Esses são os artefatos-alvo que os prompts referenciam — abra alguns para entender o padrão estrutural (cabeçalho de regras de qualidade em comentário HTML, placeholders `<<...>>`, diretivas `<!-- IA: ... -->`, placeholders Mermaid em seções estruturais L2 — 02, 05, 06, 07 — e em todos os L3 novos — 12, 13, 14, 15).

**Producer Output Summary — esqueleto canônico:**

- **Núcleo universal (15):** `01-visao-geral.md`, `02-arquitetura.md`, `03-stack-e-dependencias.md` (L1); `04-estrutura-do-projeto.md`, `05-modelo-de-dominio.md`, `06-fluxos-de-negocio.md`, `07-interface-externa.md`, `08-frontend.md`, `09-backend.md`, `10-configuracao-e-ambientes.md`, `11-infraestrutura-e-deployment.md` (L2 adicionais); `12-quick-start.md`, `13-glossario.md`, `14-faq-e-troubleshooting.md`, `15-manutencao-da-documentacao.md` (L3 adicionais). Inclusão: `L1 ⊂ L2 ⊂ L3` (cópia byte-a-byte quando replicado).
- **Núcleo condicional (9 por nível L2 e L3):** mapeamento 1:1 com capacidades — `condicional-banco-de-dados.md` → `banco-de-dados`; `condicional-cache.md` → `cache`; `condicional-filas-async.md` → `filas-async`; `condicional-autenticacao-e-autorizacao.md` → `auth`; `condicional-integracoes-externas.md` → `integracoes-externas`; `condicional-armazenamento-de-arquivos.md` → `storage`; `condicional-notificacoes.md` → `notificacoes`; `condicional-jobs-agendados.md` → `jobs-agendados`; `condicional-multi-tenancy.md` → `multi-tenancy`.

**Producer Output Summary — templates da Task 2.1:**

Todos os 47 templates têm padrão estrutural uniforme:
- Cabeçalho `<!-- Regras de qualidade aplicáveis a este documento: ... -->` listando as seis regras-duras.
- Título humanizado (`# <Título>`).
- Seções internas com placeholders explícitos `<<DESCRIÇÃO_DO_QUE_PREENCHER>>`.
- Diretivas-à-IA `<!-- IA: ... -->` em cada bloco onde a IA deve gerar conteúdo.
- Placeholders Mermaid (`` ```mermaid ... ``` ``) em seções estruturais conforme padrão observado em corpora L3.

Independência de stack rigorosamente preservada no núcleo (verificado por `grep -riE` — zero violações). Exemplos de stack permitidos apenas em `templates/<nível>/condicionais/`.

**Upstream Context — regras de qualidade do produto:**

As **seis regras-duras de qualidade** que devem ser **replicadas literalmente** no `00-mestre.md` (bloco vii) e estarão referenciadas em cabeçalho de cada sub-prompt (Task 2.3, depois):

1. **Evidência rastreável.** Toda afirmação técnica em conteúdo gerado deve citar `arquivo:linha` (ou `arquivo`, quando a evidência é estrutural e não pontual) do código-fonte do projeto destino. Formato sugerido: nota de rodapé ou citação inline.
2. **Anti-alucinação.** Quando o sub-prompt requisita uma seção mas a evidência não é encontrada no código, o conteúdo gerado registra o marcador literal `// CARÊNCIA: não identificado no código` no lugar da afirmação. Proibido inferir além do código.
3. **Glossário mínimo.** Toda execução produz um documento de glossário com no mínimo **30 termos** identificados no código (nomes de domínio, entidades, abreviações usadas no projeto). Em L2 o mínimo sobe para 60; em L3, 100.
4. **Cobertura exaustiva.** Toda rota HTTP, endpoint, módulo, classe-controlador, entidade de persistência e job encontrado no código aparece em alguma tabela do conteúdo gerado. Cobertura não-exaustiva é falha de QA.
5. **Versões exatas.** Toda versão de runtime, framework ou biblioteca-chave citada deve ser versão exata (pinada conforme aparece no manifesto), nunca range. Quando o manifesto registra range (ex.: `^10.0.0`), o conteúdo gerado registra o range literal entre crases e a versão resolvida do lockfile separadamente.
6. **Sem estimativas.** Conteúdo gerado não contém estimativas de tempo, custo ou esforço. Cronogramas, "X dias", "Y horas", projeções financeiras são proibidos.

**Upstream Context — sinais técnicos das nove capacidades (tabela autoritativa, replicar literalmente no `00-mestre.md` bloco iv):**

| Capacidade | Slug da extensão | Sinais técnicos no código |
|---|---|---|
| Banco de dados | `banco-de-dados` | TypeORM, Prisma, Sequelize, arquivos `.sql`, migrations, schema files |
| Cache | `cache` | Redis, `cache-manager`, `ioredis`, decorators de cache |
| Filas / Processamento assíncrono | `filas-async` | Bull, BullMQ, RabbitMQ, Kafka, SQS, decorators `@Process` |
| Autenticação e autorização | `auth` | passport, JWT, OAuth, OpenID, guards de auth, middlewares de sessão |
| Integrações externas | `integracoes-externas` | clientes HTTP nomeados, SDKs de terceiros (axios com baseURL fixa, SDKs de provedores) |
| Armazenamento de arquivos | `storage` | Azure Blob, AWS S3, multer, fs-extra usado para upload |
| Notificações | `notificacoes` | SendGrid, Twilio, nodemailer, SMTP, push notification SDKs |
| Jobs agendados | `jobs-agendados` | `@nestjs/schedule`, `node-cron`, cron jobs declarados |
| Multi-tenancy | `multi-tenancy` | múltiplas conexões nomeadas, schemas dinâmicos, tenant resolvers |

**Upstream Context — sinais de monorepo (replicar no bloco v do mestre):** presença de `nx.json`, `pnpm-workspace.yaml`, `lerna.json`, `turbo.json`, ou múltiplos `package.json` em estrutura `apps/`/`packages/`. Monorepo é **extensão** das variantes `full-stack-web` ou `backend-api`, não variante própria.

## Objective

Escrever o orquestrador `00-mestre.md` e os cinco prompts de variante, definindo o contrato pelo qual os sub-prompts de seção do núcleo e de extensão por capacidade serão consumidos na Task 2.3.

## Detailed Instructions

### A. Prompt mestre `padtec/prompts/00-mestre.md`

Cobrir, **na ordem abaixo, com cabeçalhos claros**, os sete blocos:

**(i) Identidade.** Declaração tipo "Você é o orquestrador PADTec v1.0, responsável por gerar documentação técnica reversa do projeto atual." Definir o ponto único de entrada: usuário invoca este prompt no GitHub Copilot Chat dentro do projeto destino, agente tem tool-calling nativo (lê arquivos diretamente), proibido pedir colagem de conteúdo no chat.

**(ii) Parâmetros de entrada.** O **nível alvo** é fornecido pelo usuário (`L1`, `L2` ou `L3`). Outros parâmetros opcionais: pasta de saída (default: detectada por bloco iii.3 abaixo), publicar no Confluence (default: não). Definir formato esperado da invocação (ex.: "Execute o PADTec no nível L2 nesta pasta").

**(iii) Procedimento de detecção de variante.** Algoritmo de detecção em ordem, consumindo sinais técnicos no projeto destino:

1. Listar arquivos da raiz e detectar manifestos: `package.json`, `pom.xml`, `requirements.txt`, `*.csproj`, `go.mod`, `Cargo.toml`, manifests de IaC (`*.bicep`, `*.tf`, `*.tfstate`).
2. Detectar estrutura: `apps/`, `packages/`, `src/`, `pages/` ou `app/` (Next.js), `infra/`, `bicep/`.
3. Detectar `docs/`, `documentation/` ou `documentacao/` como pasta-alvo de saída (se nenhuma existir, criar `docs/`).
4. Resolver variante por árvore de decisão (descreva a árvore explicitamente; ex.: "se há manifests Bicep/Terraform e não há `package.json` aplicacional → `iac`; se há `package.json` com `dependencies.next` ou `dependencies.vite` sem backend acoplado → `frontend-site`; se há `package.json` com framework backend e sem frontend acoplado → `backend-api`; se há ambos no mesmo repo ou em `apps/web` + `apps/api` → `full-stack-web`; se nenhum manifesto aplicacional mas há scripts em `scripts/` ou `bin/` → `automacao-script`").

**(iv) Procedimento de detecção de capacidades.** Iterar sobre cada uma das nove capacidades. Para cada, executar busca no projeto destino pelos sinais técnicos listados literalmente na tabela do Upstream Context acima. Quando ao menos um sinal é detectado, a capacidade está **ativa**; sub-prompt de extensão correspondente entrará na fila de despacho. **Reproduza a tabela com nove linhas literalmente** dentro deste bloco.

**(v) Procedimento de detecção de monorepo.** Buscar pelos quatro arquivos de configuração de monorepo (`nx.json`, `pnpm-workspace.yaml`, `lerna.json`, `turbo.json`) e por presença de `apps/`+`packages/` com múltiplos `package.json`. Quando detectado, ativar documentação extra de workspace + por app, ainda dentro da variante resolvida.

**(vi) Sequência de despacho.** Ordem fixa de invocação:

1. Carregar prompt da variante resolvida (`padtec/prompts/variantes/<slug>.md`).
2. Resolver o conjunto de seções a gerar pelo cruzamento (variante + nível). A variante define seções específicas que estendem o núcleo; o nível define o subconjunto do núcleo a usar.
3. Para cada seção do núcleo no nível alvo, invocar o sub-prompt de seção correspondente em `padtec/prompts/secoes/`. Para cada capacidade ativa, invocar o sub-prompt de extensão correspondente em `padtec/prompts/extensoes/`.
4. Definir e documentar o **contrato de invocação** de sub-prompts — formato exato pelo qual o `00-mestre.md` despacha um sub-prompt para o agente Copilot Chat (a Task 2.3 implementará cada sub-prompt segundo este contrato). Sugestão de formato: "Leia integralmente o arquivo `padtec/prompts/secoes/<nome>.md` e execute as instruções nele, com os parâmetros: nível=<L1|L2|L3>, variante=<slug>, pasta-de-saída=<caminho>, capacidades-ativas=<lista>." Este formato é a **API** que sub-prompts irão consumir; documente-o em um bloco delimitado e claramente nomeado (ex.: `## Contrato de invocação de sub-prompts`) para que a Task 2.3 referencie sem ambiguidade.
5. Ao final, apontar o usuário para `padtec/checklist-qa.md` para validação da saída.

**(vii) Regras de qualidade.** Reproduzir **literalmente** as seis regras-duras da seção Upstream Context acima. Não parafrasear. Não abreviar. Texto idêntico.

### B. Cinco prompts de variante

Em `padtec/prompts/variantes/`, redigir um arquivo por variante com os slugs **exatos** abaixo. Os slugs já correspondem aos definidos no esqueleto canônico e nas tabelas autoritativas do README do pacote.

- `padtec/prompts/variantes/full-stack-web.md`
- `padtec/prompts/variantes/backend-api.md`
- `padtec/prompts/variantes/frontend-site.md`
- `padtec/prompts/variantes/automacao-script.md`
- `padtec/prompts/variantes/iac.md`

Padrão estrutural de cada arquivo:

1. **Identidade.** "Você é o prompt da variante `<slug>` do PADTec v1.0. O orquestrador `00-mestre.md` invocou este prompt após detectar que o projeto destino se enquadra nesta variante."
2. **Seções específicas que estendem o núcleo.** Para cada variante, listar as seções do núcleo que recebem **ênfase específica** ou **conteúdo adicional** nesta variante (ex.: `backend-api` enfatiza `07-interface-externa.md`, `09-backend.md`, `10-configuracao-e-ambientes.md`, e diagrama de sequência de fluxo de requisição obrigatório em `06`).
3. **Exemplos de stack permitidos nesta variante.** Aqui — e **somente** em prompts de variante, extensões e condicionais — é permitido citar nomes específicos de framework/biblioteca/runtime como exemplos típicos. Sugestões mínimas por variante (não exaustivo; o Worker pode ampliar):
   - `full-stack-web`: NestJS + Next.js, Django + React, Spring Boot + Angular.
   - `backend-api`: NestJS, Express, FastAPI, Spring Boot, ASP.NET Core.
   - `frontend-site`: Next.js, Nuxt, Vite + React, SvelteKit, Astro.
   - `automacao-script`: scripts Python, Node CLIs, shell scripts, processadores ETL.
   - `iac`: Bicep, Terraform, ARM templates, CloudFormation, Ansible.
4. **Referências cruzadas a templates da Task 2.1.** Apontar explicitamente, por caminho relativo a `padtec/`, quais templates esta variante consome com mais ênfase. Exemplo:
   ```markdown
   - Template L2: `templates/L2-completo/07-interface-externa.md` — preencher tabela de endpoints com método, rota, código de resposta e citação de evidência.
   ```
5. **Indicação sobre monorepo (quando aplicável).** Para `full-stack-web` e `backend-api`, incluir bloco explicando o que muda quando `00-mestre.md` detectou monorepo (gerar documentação extra de workspace + por app).
6. **Regras de qualidade.** Pode referenciar o bloco vii do mestre por linha-resumo ("Aplicam-se integralmente as seis regras-duras de qualidade do `00-mestre.md`"). Não precisa reproduzir literalmente — o mestre é a referência autoritativa.

### C. Restrições gerais

- **Independência de stack do núcleo é mantida.** O `00-mestre.md` é classificado como **não-núcleo** (assim como variantes/extensões) — pode citar exemplos de stack quando estritamente necessário (ex.: na detecção de monorepo e capacidades a tabela cita nomes concretos como Redis, RabbitMQ etc., porque são sinais técnicos). Mas evite excessos: o mestre é orquestração; especificidade de stack vive em variantes/extensões/condicionais.
- **Tool-calling nativo.** Todos os prompts assumem que o agente Copilot Chat lê arquivos do projeto destino diretamente. **Proibido instruir o usuário a colar trechos de código, conteúdo de arquivo ou saída de comando dentro do chat.** Frases como "cole aqui", "informe o conteúdo de", "copie e cole" não devem aparecer em nenhum arquivo desta Task.
- **Caminhos relativos a `padtec/`.** Toda referência a arquivos do pacote usa caminho relativo à raiz `padtec/`. Não usar caminhos absolutos do sistema de arquivos.
- **Autocontenção do pacote.** Os prompts NÃO podem referenciar Spec, Plan, Tracker ou qualquer artefato APM desta sessão. O pacote é distribuído por cópia e não tem acesso a esses documentos no momento da execução.

### D. Verificações automatizadas obrigatórias

Antes de declarar Success:

1. Estrutura: `ls padtec/prompts/00-mestre.md padtec/prompts/variantes/*.md` lista o mestre e exatamente cinco arquivos de variante com os slugs corretos.
2. Cobertura dos sete blocos no mestre: `grep -cE '^##? ' padtec/prompts/00-mestre.md` retorna ≥ 7 cabeçalhos; inspecionar visualmente para confirmar que todos os sete blocos (identidade, parâmetros, detecção de variante, detecção de capacidades, detecção de monorepo, sequência de despacho, regras de qualidade) estão presentes.
3. Sinais técnicos das nove capacidades aparecem literalmente no mestre:
   ```bash
   for cap in banco-de-dados cache filas-async auth integracoes-externas storage notificacoes jobs-agendados multi-tenancy; do
     grep -q "$cap" padtec/prompts/00-mestre.md && echo "ok: $cap" || echo "FALTA: $cap"
   done
   ```
   Todas as nove devem dar `ok`.
4. Cobertura de stack signals representativos:
   ```bash
   grep -ciE 'TypeORM|Prisma|Redis|Bull|JWT|Azure Blob|AWS S3|SendGrid' padtec/prompts/00-mestre.md
   ```
   Retornar ≥ 6 (presença razoável de sinais técnicos da tabela).
5. Cada prompt de variante referencia pelo menos um template da Task 2.1 por caminho relativo:
   ```bash
   for v in full-stack-web backend-api frontend-site automacao-script iac; do
     grep -qE 'templates/L[123][^[:space:]]*\.md' "padtec/prompts/variantes/$v.md" && echo "ok: $v" || echo "FALTA refs: $v"
   done
   ```
6. Contrato de invocação de sub-prompts está definido no mestre:
   ```bash
   grep -iE 'contrato de invoca|invoca.*sub-prompt|leia.*prompts/secoes' padtec/prompts/00-mestre.md
   ```
   Deve retornar ao menos uma linha.
7. Ausência de pedidos de colagem manual:
   ```bash
   grep -riE 'cole aqui|paste here|informe o conte[uú]do de|copie e cole' padtec/prompts/
   ```
   Deve retornar zero ocorrências.
8. Ausência de emojis decorativos (usar `perl` no macOS, pois BSD `grep` não tem `-P`):
   ```bash
   perl -CSD -ne 'while (/([\x{1F300}-\x{1F9FF}\x{2600}-\x{27BF}\x{1F600}-\x{1F64F}])/g) { print "$ARGV:$.: $1\n" }' padtec/prompts/00-mestre.md padtec/prompts/variantes/*.md
   ```
   Deve retornar zero saídas.

## Workspace

- **Worktree (área de trabalho):** `.apm/worktrees/feat-prompt-mestre-e-variantes/` — branch `feat/prompt-mestre-e-variantes`. Realize todas as escritas nesta área. A árvore espelha a raiz: você verá `padtec/templates/`, `padtec/README.md`, `padtec/confluence-mermaid-package/` já presentes (vindos da base) — pode lê-los livremente, **não modificar**.
- **Runtime APM resolve a partir da raiz do projeto:** O Task Log deve ser gravado na cópia do `.apm/` da raiz do projeto (`/Users/gersonvan/Library/CloudStorage/OneDrive-Pessoal/Documentos/Projetos AVP/Centralizador de Docs/.apm/memory/stage-02/task-02-02.log.md`), não na cópia espelhada dentro do worktree. Leituras de `.apm/memory/stage-1/...` podem ser feitas indistintamente.
- **Caminho correto para os projetos-fonte (se precisar inspecionar):** `../<projeto>/...` (não `../Projetos AVP/<projeto>/...`). Esses projetos são **somente leitura** — qualquer escrita ali é violação de escopo.
- **macOS BSD grep não suporta `-P`:** use `perl -CSD -ne` para checagens Unicode (veja exemplos em D.8).
- **Commit:** após todas as validações passarem, commit no branch `feat/prompt-mestre-e-variantes` com mensagem `<tipo>: <descrição imperativa pt-BR>` (ex.: `feat: cria prompt mestre e prompts de variante do PADTec`). Sem identificadores APM no nome.
- **Idioma:** pt-BR com acentuação correta, tom técnico-formal, sem emojis decorativos.

## Expected Output

- `padtec/prompts/00-mestre.md` cobrindo os sete blocos (identidade, parâmetros, detecção de variante, detecção de capacidades, detecção de monorepo, sequência de despacho, regras de qualidade) com o contrato de invocação de sub-prompts explicitamente definido.
- Cinco arquivos em `padtec/prompts/variantes/` com os slugs exatos: `full-stack-web.md`, `backend-api.md`, `frontend-site.md`, `automacao-script.md`, `iac.md`. Cada um com identidade, seções específicas, exemplos de stack, referências cruzadas a templates da Task 2.1, indicação de monorepo quando aplicável, referência às regras de qualidade do mestre.

## Validation Criteria

- (a) `00-mestre.md` existe e cobre os sete blocos.
- (b) Os cinco prompts de variante existem com os slugs exatos.
- (c) Cada prompt de variante referencia explicitamente ao menos um arquivo de template produzido na Task 2.1 por caminho relativo.
- (d) O contrato de invocação de sub-prompts está definido em `00-mestre.md` em bloco delimitado e claramente nomeado, em formato consumível pela Task 2.3.
- (e) Os nove slugs das capacidades aparecem literalmente no procedimento de detecção do mestre.
- (f) Busca por strings de colagem manual ("cole aqui", "paste here", "informe o conteúdo de", "copie e cole") retorna zero ocorrências em todos os arquivos da Task.
- (g) Idioma pt-BR, tom técnico-formal, sem emojis decorativos.

## Instruction Accuracy

O objetivo e os outputs esperados são autoritativos. Os slugs de variante (`full-stack-web`, `backend-api`, `frontend-site`, `automacao-script`, `iac`) e os de capacidade (lista de nove) são contratuais — devem ser usados exatamente como escritos. Se você detectar incoerência entre os slugs descritos nesta Task e o que o `README.md` do pacote ou o esqueleto canônico usam, o esqueleto canônico é autoritativo; registre a divergência no Task Log para revisão do Manager. Se a inspeção dos templates da Task 2.1 revelar diferença estrutural (ex.: placeholder Mermaid ausente em alguma seção L3 que você presumia ter), ajuste a referência cruzada ao que efetivamente existe e registre no Task Log.

## Task Iteration

Quando uma validação falhar, investigue antes de corrigir: leia a saída de erro, rastreie a causa, entenda o que falhou. Aplique uma mudança direcionada por iteração. Se uma correção não resolver, despache um subagente de debug com instruções estruturadas (erro, o que você investigou e tentou, caminhos relevantes, comportamento esperado vs real). Valide as descobertas do subagente antes de aplicar. Se não resolver após investigação por subagente, reporte com status Partial.

## Task Logging

Grave o Task Log em `.apm/memory/stage-02/task-02-02.log.md` (a partir da raiz do projeto). Procedimento e formato em `.github/apm-guides/task-logging.md` §3.1 Task Log Procedure.

## Task Report

Ao concluir, escreva o Task Report no seu Report Bus (`.apm/bus/prompts-agent/report.md`) para que o usuário o retorne ao Manager via `/apm-5-check-reports`.

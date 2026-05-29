---
stage: 3
task: 1
agent: foundation-agent
log_path: ".apm/memory/stage-03/task-03-01.log.md"
has_dependencies: true
---

# Task 3.1: Costura, empacotamento e QA final

## Task Reference

Task 3.1 — atribuída ao Foundation Agent. Esta é a **Task final** do projeto PADTec v1.0.

## Context from Dependencies

Esta Task absorve as saídas de **todas** as Tasks anteriores, já integradas em `main`. Você produziu pessoalmente parte delas (1.1 e 1.2); herda também 1.3 (Tooling), 2.1 (Templates) e 2.2+2.3 (Prompts).

**Integration Steps:**

1. **Releia o esqueleto canônico** que você mesmo produziu na Task 1.1: [.apm/memory/stage-1/esqueleto-canonico.md](.apm/memory/stage-1/esqueleto-canonico.md). É o contrato autoritativo dos 24 documentos (15 universais + 9 condicionais). Use-o como **fonte da verdade** para verificar consistência de naming em templates e sub-prompts.
2. **Inspecione o pacote completo** em `padtec/`:
   - Raiz: `VERSION`, `README.md`, `guia-humano.md`, `checklist-qa.md`, `glossario-base.md` (Task 1.2, sua).
   - `padtec/templates/L1-essencial/`, `L2-completo/`, `L3-aprofundado/` — 3+11+15 núcleo + 0+9+9 condicionais (Task 2.1).
   - `padtec/prompts/00-mestre.md` + `prompts/variantes/{5}.md` (Task 2.2).
   - `padtec/prompts/secoes/{15}.md` + `prompts/extensoes/{9}.md` (Task 2.3).
   - `padtec/confluence-mermaid-package/` (Task 1.3).
3. **Releia o índice de mudanças** em [.apm/memory/index.md](.apm/memory/index.md) — Memory Notes e Stage Summaries trazem decisões e ajustes que afetam consistência (ex.: Mermaid sistematicamente em L3 estruturais; mapeamento autoritativo slug-de-capacidade → arquivo-de-template-condicional preservando `condicional-autenticacao-e-autorizacao.md` e `condicional-armazenamento-de-arquivos.md`).

**Producer Output Summary — mapeamentos contratuais a verificar 1:1:**

- **Variantes (5):** `full-stack-web`, `backend-api`, `frontend-site`, `automacao-script`, `iac`. Devem aparecer em: README (tabela autoritativa), `00-mestre.md` (árvore de decisão da detecção de variante), `prompts/variantes/<slug>.md` (5 arquivos exatos).
- **Níveis (3):** `L1-essencial`, `L2-completo`, `L3-aprofundado`. Devem aparecer em: README (tabela autoritativa), `00-mestre.md` (parâmetros + resolução de conjunto de seções), pastas em `templates/`.
- **Capacidades (9):** `banco-de-dados`, `cache`, `filas-async`, `auth`, `integracoes-externas`, `storage`, `notificacoes`, `jobs-agendados`, `multi-tenancy`. Devem aparecer em: README (tabela autoritativa), `00-mestre.md` (tabela de sinais técnicos), `prompts/extensoes/<slug>.md` (9 arquivos com **slug puro**), `templates/L2|L3/condicionais/condicional-<arquivo>.md` (mapeamento documentado: alguns têm naming expandido — `auth → condicional-autenticacao-e-autorizacao.md`; `storage → condicional-armazenamento-de-arquivos.md`).
- **Seções do núcleo (15):** naming idêntico ao listado no esqueleto canônico. Devem aparecer 1:1 entre `templates/<nível>/NN-<slug>.md` e `prompts/secoes/NN-<slug>.md`.

## Objective

Revisar o pacote PADTec inteiro produzido nos Stages 1 e 2, corrigir incoerências cruzadas detectadas, finalizar o checklist QA contra o produto real e alinhar guia humano e README ao pacote efetivamente entregue.

**Esta é Task de revisão integrativa, não de criação de novos artefatos do produto.** Onde houver incoerência, corrija nos arquivos de origem (Stages 1 ou 2 já em main) — não crie arquivos adicionais para "corrigir". Não rode o PADTec contra projeto vizinho real — validação aplicada é fase posterior, fora deste escopo. Validação é estritamente estática.

## Detailed Instructions

### A. Mapeamento 1:1 template ↔ sub-prompt de seção

Para cada uma das 15 seções do núcleo, verificar pareamento entre o template (no nível mais alto onde existe, geralmente L3) e o sub-prompt de seção. Pareamento de naming **literal** (mesmo prefixo numérico, mesmo slug). Executar:

```bash
echo "=== templates L3 vs sub-prompts secoes ==="
diff <(ls padtec/templates/L3-aprofundado/*.md | xargs -n1 basename | grep -v gitkeep | sort) \
     <(ls padtec/prompts/secoes/*.md | xargs -n1 basename | grep -v gitkeep | sort)
```

Saída esperada: nenhuma diferença (15 nomes iguais em ambos os lados).

### B. Mapeamento condicional ↔ sub-prompt de extensão

Para as 9 capacidades, verificar mapeamento entre arquivos de template condicional (que têm prefixo `condicional-` e podem ter naming expandido) e sub-prompts de extensão (que usam **slug puro**). Executar:

```bash
echo "=== mapeamento capacidade → template condicional → extensão ==="
declare -A MAP=(
  [banco-de-dados]=condicional-banco-de-dados.md
  [cache]=condicional-cache.md
  [filas-async]=condicional-filas-async.md
  [auth]=condicional-autenticacao-e-autorizacao.md
  [integracoes-externas]=condicional-integracoes-externas.md
  [storage]=condicional-armazenamento-de-arquivos.md
  [notificacoes]=condicional-notificacoes.md
  [jobs-agendados]=condicional-jobs-agendados.md
  [multi-tenancy]=condicional-multi-tenancy.md
)
for cap in "${!MAP[@]}"; do
  ext_ok=$([ -f "padtec/prompts/extensoes/$cap.md" ] && echo ok || echo FALTA)
  l2_ok=$([ -f "padtec/templates/L2-completo/condicionais/${MAP[$cap]}" ] && echo ok || echo FALTA)
  l3_ok=$([ -f "padtec/templates/L3-aprofundado/condicionais/${MAP[$cap]}" ] && echo ok || echo FALTA)
  echo "$cap: ext=$ext_ok L2=$l2_ok L3=$l3_ok"
done
```

Saída esperada: 9 linhas com `ext=ok L2=ok L3=ok`. Se algum `FALTA`, registre em `.apm/memory/stage-3/correcoes.md` e corrija (renomear template ou sub-prompt, conforme apropriado, mantendo o **slug puro** nas extensões como contrato autoritativo do `00-mestre.md`).

### C. Caminhos referenciados no mestre apontam para arquivos existentes

```bash
echo "=== caminhos citados em 00-mestre.md ==="
grep -oE '(prompts|templates|confluence-mermaid-package|checklist-qa\.md|guia-humano\.md|glossario-base\.md|README\.md|VERSION)[^[:space:]`)]*' padtec/prompts/00-mestre.md | sort -u | while read p; do
  # remover placeholders <...>
  echo "$p" | grep -qE '<[^>]+>' && continue
  [ -e "padtec/$p" ] && echo "ok: $p" || echo "FALTA: $p"
done
```

Mensagens `FALTA` devem ser revisadas. Placeholders (`<nível-resolvido>`, `<slug>`, etc.) podem aparecer e devem ser ignorados — o filtro acima já tenta excluí-los. Se algo legítimo faltar, ajuste o mestre.

### D. Slugs de variante/nível/capacidade consistentes em todos os artefatos

Esta verificação é mais qualitativa. Execute spot-checks:

```bash
echo "=== variantes no README ==="
for v in full-stack-web backend-api frontend-site automacao-script iac; do
  grep -q "$v" padtec/README.md && echo "ok: $v" || echo "FALTA: $v"
done
echo "=== variantes no mestre ==="
for v in full-stack-web backend-api frontend-site automacao-script iac; do
  grep -q "$v" padtec/prompts/00-mestre.md && echo "ok: $v" || echo "FALTA: $v"
done
echo "=== variantes têm arquivo ==="
for v in full-stack-web backend-api frontend-site automacao-script iac; do
  [ -f "padtec/prompts/variantes/$v.md" ] && echo "ok: $v" || echo "FALTA: $v"
done
echo "=== capacidades no README ==="
for c in banco-de-dados cache filas-async auth integracoes-externas storage notificacoes jobs-agendados multi-tenancy; do
  grep -q "$c" padtec/README.md && echo "ok: $c" || echo "FALTA: $c"
done
echo "=== níveis nas pastas ==="
for n in L1-essencial L2-completo L3-aprofundado; do
  [ -d "padtec/templates/$n" ] && echo "ok: $n" || echo "FALTA: $n"
done
```

### E. Refinar `padtec/checklist-qa.md` contra o produto real

Releia `padtec/checklist-qa.md` (que você redigiu na Task 1.2 como versão inicial). Para **cada item**, aplique mentalmente ao pacote como ele está agora e responda: o item é **objetivamente verificável** olhando para o pacote ou para a saída gerada pelo PADTec? Se não, refine. Padrões a manter:

- Itens binários (resolvíveis em ✅ ou ❌).
- Sem ambiguidade ("documentação está boa" → ❌; "glossário tem no mínimo 30 termos em L1, 60 em L2, 100 em L3" → ✅).
- Cobertura das seis regras-duras (uma seção por regra) com pelo menos 2 itens cada.
- Cobertura estrutural mínima: presença do mestre, das 5 variantes, dos templates do nível alvo, dos sub-prompts do nível alvo, das extensões para capacidades ativas detectadas.

Onde refinar, **edite o arquivo diretamente** (faz parte da Task). Não crie novo arquivo.

### F. Ajustar `padtec/guia-humano.md` ao pacote efetivamente entregue

Releia simulando usuário que abriu o pacote pela primeira vez sem contexto prévio. Verifique:

1. O usuário consegue executar os passos sem precisar pedir nada ao Manager nem ao Spec.
2. A sequência cobre: pré-requisitos, como invocar o `00-mestre.md`, como passar o parâmetro de nível, como interpretar a saída, quando rodar o checklist, como publicar no Confluence (referenciando `confluence-mermaid-package/`).
3. Não há referência a artefatos APM (Spec, Plan, Tracker, Memory Notes) — o pacote é autocontido.

Edite onde houver lacuna ou referência a artefato inexistente.

### G. Ajustar `padtec/README.md` se necessário

Releia. Se a estrutura de pastas mudou, se algum slug foi corrigido, se contagens (5 variantes, 3 níveis, 9 capacidades) precisam reafirmar — atualize. Se nada mudou, deixe como está.

### H. Confirmar `padtec/VERSION`

```bash
[ "$(cat padtec/VERSION)" = "v1.0" ] && echo "ok: v1.0 exato" || echo "FALTA: VERSION incorreto: $(cat padtec/VERSION)"
```

### I. Registrar correções em `.apm/memory/stage-3/correcoes.md`

Crie a pasta e o arquivo. Para cada correção aplicada, registre: arquivo modificado, natureza da incoerência detectada, correção feita, em uma frase cada. Se nenhuma correção foi necessária, o arquivo deve conter literalmente o texto **"Nenhuma correção necessária"** (e nada mais além de cabeçalho).

Formato sugerido:

```markdown
# Correções aplicadas na Task 3.1

- `padtec/<arquivo>` — <natureza da incoerência> → <correção feita>.
- (...)
```

Ou:

```markdown
# Correções aplicadas na Task 3.1

Nenhuma correção necessária.
```

### J. Verificações automatizadas finais (gate de aceite)

Após todas as correções, rode novamente toda a sequência §A–§D, e adicionalmente:

```bash
echo "=== independência de stack no núcleo (templates + secoes) ==="
grep -liE 'NestJS|Next\.js|Express|Django|Spring|SQL Server|PostgreSQL|Redis|TypeORM|Prisma|Bull|RabbitMQ' \
  padtec/templates/L1-essencial/*.md padtec/templates/L2-completo/*.md padtec/templates/L3-aprofundado/*.md \
  padtec/prompts/secoes/*.md 2>&1
echo "(silêncio = ok; exceto se for shell glob fail)"

echo "=== ausência de pedidos de colagem no pacote inteiro ==="
grep -riE 'cole aqui|paste here|informe o conte[uú]do de|copie e cole' padtec/ 2>&1
echo "(silêncio = ok)"

echo "=== ausência de referências a artefatos APM no pacote ==="
grep -riE '\.apm/|tracker\.md|spec\.md|plan\.md|APM_RULES|AGENTS\.md' padtec/ 2>&1
echo "(silêncio = ok)"

echo "=== emojis decorativos no pacote ==="
perl -CSD -ne 'while (/([\x{1F300}-\x{1F9FF}\x{2600}-\x{27BF}\x{1F600}-\x{1F64F}])/g) { print "$ARGV:$.: $1\n" }' \
  $(find padtec -name '*.md' -type f) 2>&1
echo "(silêncio = ok)"
```

**Nota:** algumas linhas em `padtec/checklist-qa.md` legitimamente usam `✅` e `❌` como ícones funcionais (significado binário); estes são **permitidos** pela regra de tom em `AGENTS.md`. Se aparecerem no scan §J emojis, distinga entre decorativos (proibidos) e funcionais (permitidos). O scan acima cobre uma faixa Unicode que **não** inclui `✅` (U+2705) nem `❌` (U+274C) (ambos em `\x{2700}-\x{27BF}`, mas o intervalo `\x{2600}-\x{27BF}` os cobre, então marcações desses dois caracteres em `checklist-qa.md` são esperadas e aceitáveis). Documente o veredicto no Task Log.

## Workspace

- **Worktree:** `.apm/worktrees/chore-fechamento-padtec-v1/` — branch `chore/fechamento-padtec-v1`. Faça as escritas aqui.
- **Runtime APM resolve a partir da raiz do projeto:** Task Log em `/Users/gersonvan/Library/CloudStorage/OneDrive-Pessoal/Documentos/Projetos AVP/Centralizador de Docs/.apm/memory/stage-03/task-03-01.log.md`. Correções em `.apm/memory/stage-3/correcoes.md` na raiz (note `stage-3` sem zero-pad, conforme convenção do Plan; o Task Log usa `stage-03` zero-padded conforme guia de logging — convivência documentada no Memory Index).
- **macOS BSD grep não suporta `-P`:** use `perl -CSD -ne` para checagens Unicode.
- **OneDrive pode mexer em modos de arquivo (100644 ↔ 100755):** inofensivo; se aparecer no `git status` durante a Task, ignore ou normalize com `git update-index --chmod=-x` antes do commit. Se a remoção do worktree no fim reclamar, será permitido `--force`.
- **Commit:** mensagem `chore: revisão integrativa final do pacote PADTec v1.0` (ou descrição imperativa equivalente em pt-BR) no branch `chore/fechamento-padtec-v1`. Se aplicou correções substantivas em arquivos do pacote, prefira `fix: ...` na descrição.
- **Idioma:** pt-BR, técnico-formal, sem emojis decorativos (ícones funcionais `✅`/`❌` em checklist permitidos).

## Expected Output

- Pacote `padtec/` revisado e coerente. Modificações **diretas** nos arquivos de Stages 1 e 2 onde houver incoerência.
- `padtec/checklist-qa.md` finalizado (refinado a partir da versão da Task 1.2).
- `padtec/guia-humano.md` ajustado se necessário.
- `padtec/README.md` ajustado se necessário.
- `.apm/memory/stage-3/correcoes.md` listando correções aplicadas ou contendo "Nenhuma correção necessária".
- `padtec/VERSION` continua exatamente `v1.0`.

## Validation Criteria

- (a) Mapeamento 1:1 templates ↔ sub-prompts de seção sem órfãos em nenhum dos lados (15 ↔ 15).
- (b) Mapeamento 1:1 templates condicionais (L2 e L3) ↔ sub-prompts de extensão sem órfãos (9 ↔ 9 ↔ 9).
- (c) Todos os caminhos referenciados em `padtec/prompts/00-mestre.md` apontam para arquivos existentes (placeholders ignorados).
- (d) Slugs de variante, nível e capacidade consistentes em todos os artefatos relevantes (`grep` confirma presença em README, mestre, pastas, sub-prompts).
- (e) Aplicação mental do `checklist-qa.md` ao próprio pacote resolve cada item para ✅ ou registra ação de correção realizada nesta Task.
- (f) Leitura do `guia-humano.md` sem contexto prévio descreve sequência operacional completa e executável com os artefatos efetivamente entregues.
- (g) `.apm/memory/stage-3/correcoes.md` existe registrando correções aplicadas ou contendo literal "Nenhuma correção necessária".
- (h) `padtec/VERSION` continua exatamente `v1.0`.
- (i) Independência de stack no núcleo (templates não-condicionais + sub-prompts de seção) preservada.
- (j) Ausência de pedidos de colagem manual e de referências a artefatos APM em todo o pacote.

## Instruction Accuracy

Se durante a revisão integrativa você detectar que o esqueleto canônico em `.apm/memory/stage-1/esqueleto-canonico.md` está em desacordo com o que foi efetivamente implementado em templates ou sub-prompts, **o que foi implementado é autoritativo** se houver razão técnica para a divergência — neste caso, atualize o esqueleto canônico para refletir a realidade e registre a atualização em `correcoes.md`. Se o desacordo for por erro de implementação, corrija a implementação no Stage de origem.

A regra "edite arquivos de origem; não crie arquivos adicionais para corrigir" tem exceção única: `correcoes.md` (que é metadata APM, não produto). Toda outra correção é edição in-loco.

## Task Iteration

Quando uma validação falhar, investigue antes de corrigir. Aplique mudança direcionada por iteração. Se uma correção introduzir outra incoerência, role para trás e busque a causa raiz. Se não conseguir resolver após investigação por subagente, reporte Partial com lista exata das incoerências remanescentes.

## Task Logging

Task Log em `.apm/memory/stage-03/task-03-01.log.md` (raiz do projeto). Procedimento em `.github/apm-guides/task-logging.md` §3.1.

## Task Report

Escreva o Task Report em `.apm/bus/foundation-agent/report.md` ao concluir, sinalizando explicitamente se aplicou correções substantivas (e quais) ou se o pacote estava íntegro como entregue pelos Stages anteriores.

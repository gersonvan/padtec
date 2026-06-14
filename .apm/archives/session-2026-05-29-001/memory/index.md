---
title: PADTec — Padrão AVP de Documentação Técnica
---

# APM Memory Index

## Memory Notes

- **Caminhos das fontes referenciadas:** o workspace fica em `Projetos AVP/Centralizador de Docs/`; os projetos-fonte (`SiteUnigrande/`, `PortalDoAlunoUGD/`, `DocBox/`, `Processos_docentes/`, `siteavp-docs/`) são irmãos diretos, acessíveis por `../<projeto>/...`. O Spec usa `Projetos AVP/<projeto>/...` (relativo à pasta-pai do workspace) — traduzir corretamente ao construir Task Prompts.
- **Ferramental Confluence:** versão canonônica eleita é `PortalDoAlunoUGD/confluence-mermaid-package/` (Task 1.3); núcleo das duas fontes é funcionalmente idêntico, divergem apenas em melhoria pontual de `update-confluence-page.js` e em cruft (`tmp_extract_stats.ps1` no SiteUnigrande, descartado).
- **Adendo de qualidade para Task 2.1 (templates):** o salto L2→L3 nos corpora de referência inclui adoção sistemática de diagramas Mermaid — zero em `PortalDoAlunoUGD/documentation/` (L2) versus 15+ em `SiteUnigrande/docs/` (L3), com diversidade de tipos (`flowchart`, `sequenceDiagram`, `erDiagram`, `classDiagram`, `C4Context`). Templates L3 do núcleo (seções 12–15) e estruturais L2 (seções 02, 05, 06, 07) são candidatos naturais a exigir pelo menos um diagrama Mermaid.
- **Fontes primárias para templates condicionais (Task 2.1 condicionais):** `multi-tenancy` e `auth` são subrepresentadas nos corpora L2/L3 principais; cobertura robusta apenas em `DocBox/docs/` (isolamento por `collegeId`; fluxo de login com 20+ passos em `fase5-fluxos-end-to-end-principais.md`). Usar DocBox como fonte primária desses dois templates condicionais.
- **Convenção de pastas de memória por Stage:** o Plan define `.apm/memory/stage-<N>/` (sem zero-padding) para artefatos de memória do Stage; o guia de logging define `.apm/memory/stage-<NN>/` (zero-padded) para Task Logs. As duas pastas coexistem por desenho e tratam coisas distintas — não consolidar.
- **macOS BSD grep não suporta `-P` (PCRE):** Tasks que requererem verificação de emojis ou outras checagens Unicode por classe devem usar `perl -CSD -ne` no lugar; ambos os Workers Foundation (1.2) e Templates (2.1) detectaram e adaptaram autonomamente — incluir adaptação em Task Prompts futuros desse tipo para evitar redescoberta.

## Stage Summaries

### Stage 1 — Fundamentação Documental e Ferramental

Stage concluída com três Tasks Done na primeira tentativa, sem follow-ups. Workers envolvidos: Foundation Agent (1.1 inventario/destilação/esqueleto canônico, 1.2 arquivos raiz do pacote) e Tooling Agent (1.3 consolidação do ferramental Confluence). Despacho paralelo inicial 1.1 + 1.3 desde o primeiro turno; 1.2 sequencial após 1.1.

A Task 1.1 destilou padrões de dez fontes referenciadas e firmou o esqueleto canônico de 24 seções (15 universais cobrindo L1/L2/L3 + 9 condicionais com mapeamento 1:1 às capacidades) em `.apm/memory/stage-1/{esqueleto-canonico,indice-padroes}.md`. Cinco `important_findings` foram absorvidos durante a review e propagados conforme escopo: correção do Spec (substituição de `APM_RULES.md` por `AGENTS.md` na tabela de Documentos-Fonte Referenciados; bidirecional ao texto da Task 1.1 que já havia mitigado), Memory notes guiando seções de Mermaid obrigatório em L2/L3 estruturais e uso primário de DocBox como fonte de condicionais `auth` e `multi-tenancy`, Working Note sobre a convenção de caminhos `../<projeto>/` para Task Prompts futuros (impacto direto na qualidade dos dispatches 1.2 e 2.1).

A Task 1.3 consolidou `padtec/confluence-mermaid-package/` a partir das duas instâncias existentes (base eleita: `PortalDoAlunoUGD` por `package.json` mais recente; portada melhoria de `update-confluence-page.js` do `SiteUnigrande` que deriva `spaceId` da API), descartando cruft (`tmp_extract_stats.ps1`, `.DS_Store`) e registrando a decisão em `CONSOLIDACAO.md`. Confirmada ausência de `node_modules/` e validade sintática via `node --check`.

A Task 1.2 produziu a árvore completa de `padtec/` (com `.gitkeep` em pastas vazias para preservação em git) e os cinco arquivos raiz: `VERSION` (4 bytes, `v1.0`), `README.md` (identidade, três eixos com tabelas autoritativas, estrutura, entrada para guia humano), `guia-humano.md` (sequência executavel de seis passos), `checklist-qa.md` (seis regras-duras + verificações estruturais) e `glossario-base.md` (50 termos em três categorias). Verificação holística da Stage confirmou árvore completa, contagens de templates corretas (3/11/15 + 0/9/9 com 2.1 já integrada), zero violação de independência de stack no núcleo, README cobrindo as 5 variantes + 3 níveis + 9 capacidades.

Commits relevantes: `1840c1d` (consolidação Confluence), `fb94d65` (merge 1.3), `c1e6e74` (memória + ajustes Spec/Tracker/Index), `de05114` (estrutura raiz), `ae17c7c` (merge 1.2), `bf4be19` (templates da Task 2.1 — commitado nesta janela mas pertence à Stage 2).

**Task Logs:**
- task-01-01.log.md
- task-01-02.log.md
- task-01-03.log.md

### Stage 2 — Templates e Prompts Orquestrados

Stage concluída com três Tasks Done em primeira tentativa, sem follow-ups. Workers envolvidos: Templates Agent (2.1) e Prompts Agent (2.2 e 2.3, mesma instância em encadeamento same-agent). Despacho 2.1 em paralelo com 1.2 no início da Stage; 2.2 após 2.1; 2.3 após 2.2 (dependência do contrato de invocação de sub-prompts).

A Task 2.1 produziu 47 templates: 3 + 11 + 15 do núcleo cobrindo L1/L2/L3 com inclusão `L1 ⊂ L2 ⊂ L3` (cópia byte-a-byte) e 9 condicionais por capacidade replicados em L2 e L3. Padrão estrutural uniforme: cabeçalho de regras-duras em comentário HTML, placeholders `<<...>>`, diretivas `<!-- IA: ... -->`, placeholders Mermaid em seções estruturais e todas as L3 adicionais. Independência de stack no núcleo preservada por verificação automática.

A Task 2.2 definiu o orquestrador `padtec/prompts/00-mestre.md` com sete blocos contratuais (identidade, parâmetros, detecção de variante, detecção de capacidades, detecção de monorepo, sequência de despacho com **Contrato de invocação de sub-prompts** em bloco delimitado, e regras de qualidade reproduzidas literalmente) e cinco prompts de variante (`full-stack-web`, `backend-api`, `frontend-site`, `automacao-script`, `iac`), cada um referenciando templates por caminho relativo.

A Task 2.3 entregou 15 sub-prompts de seção (`prompts/secoes/NN-<slug>.md`, 1:1 com o núcleo) e 9 sub-prompts de extensão por capacidade (`prompts/extensoes/<slug>.md`, slug puro sem prefixo `condicional-` conforme contrato do mestre). Estrutura uniforme com seis cabeçalhos contratuais e os seis parâmetros do contrato citados literalmente em cada arquivo. Independência de stack respeitada nas seções; extensões livres para citar stacks. Ausente composição cruzada entre sub-prompts (a composição é exclusiva do mestre).

Observação operacional: durante a remoção do worktree de 2.3 surgiram mudanças de modo (100644 → 100755) em `auth.md` e `cache.md` causadas pelo OneDrive; inofensivas, resolvidas com `git worktree remove --force`. Padrão a observar em próximas Tasks sob este workspace.

Commits relevantes: `5099159` (mestre + variantes), `1e7eb42` (merge 2.2), `4d82b7a` (sub-prompts), `83a0a59` (merge 2.3). O commit `bf4be19`/`869fbda` (Task 2.1) já foi listado no Summary da Stage 1 por ter sido commitado naquela janela.

**Task Logs:**
- task-02-01.log.md
- task-02-02.log.md
- task-02-03.log.md

### Stage 3 — Costura, Empacotamento e QA Final

Stage concluída com uma única Task (3.1) executada pelo Foundation Agent (mesma instância que executou 1.1 e 1.2). Revisão integrativa estática do pacote inteiro produzido nos Stages 1 e 2, sem criação de novos artefatos do produto e sem execução contra projeto destino.

Duas correções substantivas in-loco foram aplicadas:

1. **`padtec/checklist-qa.md`** — Parte B.1 listava L1 com apenas `01-visao-geral.md` e atribuía `02-arquitetura.md` e `03-stack-e-dependencias.md` como adicionais de L2, contrariando o esqueleto canônico (L1 = três seções 01, 02, 03 conforme acordado na Task 1.1). Reescrito o bloco L1 incluindo as três seções; removidas as duas linhas duplicadas em L2.
2. **`padtec/guia-humano.md`** — Passo 6 apontava para `README.md` do subpacote `confluence-mermaid-package/`, divergindo do `prompts/00-mestre.md` que referencia `QUICKSTART.md` como entrada operacional. Ajustado para apontar `QUICKSTART.md` (entrada) e `INSTALL.md` (instalação completa) com links relativos.

As duas correções expuseram o valor da Task 3.1: ambas eram incoerências cruzadas pontuais que nenhum Worker individual teria capturado em sua própria Task. Demais artefatos foram validados íntegros: mapeamento 1:1 entre templates L3 e sub-prompts de seção (15↕15, diff vazio), mapeamento triplo capacidade↔condicional L2↔condicional L3↔extensão (9↔9↔9↔9 sem órfãos), caminhos no mestre válidos, independência de stack no núcleo preservada, ausente pedidos de colagem manual e referências a artefatos APM nos arquivos do pacote próprios.

Veredicto registrado sobre emojis: arquivos do subpacote `confluence-mermaid-package/` (CHANGELOG, QUICKSTART, INSTALL, README, how-to) contêm emojis decorativos, mas esse subpacote é ferramenta externa consolidada (Task 1.3) com versionamento próprio, distribuída intocavelmente. Artefatos PADTec próprios (templates, prompts, README, guia, checklist, glossário, VERSION) não contêm emojis decorativos. Gate aprovado.

Registro completo das correções e observações em `.apm/memory/stage-3/correcoes.md`. Esqueleto canônico em `.apm/memory/stage-1/esqueleto-canonico.md` permanece autoritativo — nenhuma atualização necessária.

Commits relevantes: `27bae66` (correções), `bf8fb11` (merge 3.1 em main).

**Task Logs:**
- task-03-01.log.md

## Project Phase Complete

PADTec v1.0 entregue. Pacote portátil em `padtec/` contém: VERSION (`v1.0` exato, 4 bytes), README + guia humano + checklist QA + glossário base (5 arquivos raiz), 47 templates (3 L1 + 11 L2 + 15 L3 + 9+9 condicionais L2/L3), orquestrador `00-mestre.md` + 5 prompts de variante + 15 sub-prompts de seção + 9 sub-prompts de extensão, e ferramental Confluence consolidado em subpacote próprio. Pacote autocontido (não referencia artefatos APM desta sessão), com independência de stack no núcleo, e pronto para ser copiado a projetos destino conforme `guia-humano.md`.


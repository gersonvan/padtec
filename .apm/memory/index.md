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


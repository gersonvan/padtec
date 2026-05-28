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

## Stage Summaries


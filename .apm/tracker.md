---
title: PADTec — Padrão AVP de Documentação Técnica
---

# APM Tracker

## Task Tracking

**Stage 1:**

| Task | Status | Agent | Branch |
|------|--------|-------|--------|
| 1.1 | Active | foundation-agent | feat/esqueleto-canonico-padtec |
| 1.2 | Waiting: 1.1 | foundation-agent | |
| 1.3 | Active | tooling-agent | chore/consolida-confluence-mermaid |

## Worker Tracking

| Agent | Instance | Notes |
|-------|----------|-------|
| foundation-agent | 1 | uninitialized |
| templates-agent | 1 | uninitialized |
| prompts-agent | 1 | uninitialized |
| tooling-agent | 1 | uninitialized |

## Version Control

| Repository | Base Branch | Branch Convention | Commit Convention |
|-----------|-------------|-------------------|-------------------|
| Centralizador de Docs | main | `<tipo>/<descrição-kebab>` — tipos: feat, fix, refactor, docs, test, chore | `<tipo>: <descrição imperativa pt-BR>` |

## Working Notes

- Workspace sob OneDrive: separar fases de escrita e leitura quando viável; alertar Workers quando relevante para a Task.
- `Projetos AVP/` (um nível acima) é exclusivamente leitura — fonte para destilação e referências de stack.
- Decisão do usuário: versionar tudo de `.apm/` no git; apenas `.apm/worktrees/`, `.DS_Store` e `node_modules/` no `.gitignore`.
- Dispatch paralelo inicial 1.1 + 1.3 (Workers e domínios distintos, sem dependências entre si).


---
title: PADTec — Padrão AVP de Documentação Técnica
---

# APM Tracker

## Task Tracking

**Stage 1:** Complete

**Stage 2:**

| Task | Status | Agent | Branch |
|------|--------|-------|--------|
| 2.1 | Done | templates-agent | |
| 2.2 | Active | prompts-agent | feat/prompt-mestre-e-variantes |
| 2.3 | Waiting: 2.2 | prompts-agent | |

## Worker Tracking

| Agent | Instance | Notes |
|-------|----------|-------|
| foundation-agent | 1 | |
| templates-agent | 1 | |
| prompts-agent | 1 | uninitialized |
| tooling-agent | 1 | |

## Version Control

| Repository | Base Branch | Branch Convention | Commit Convention |
|-----------|-------------|-------------------|-------------------|
| Centralizador de Docs | main | `<tipo>/<descrição-kebab>` — tipos: feat, fix, refactor, docs, test, chore | `<tipo>: <descrição imperativa pt-BR>` |

## Working Notes

- Workspace sob OneDrive: separar fases de escrita e leitura quando viável; alertar Workers quando relevante para a Task.
- `Projetos AVP/` (um nível acima) é exclusivamente leitura — fonte para destilação e referências de stack.
- Decisão do usuário: versionar tudo de `.apm/` no git; apenas `.apm/worktrees/`, `.DS_Store` e `node_modules/` no `.gitignore`.
- Caminhos de fontes em Task Prompts: usar `../<projeto>/...` (não `../Projetos AVP/<projeto>/...`) — lição da Task 1.1; o workspace já está dentro de `Projetos AVP/`.


# Correções aplicadas na Task 3.1

- `padtec/checklist-qa.md` — Parte B.1 listava L1 com apenas `01-visao-geral.md` e atribuía `02-arquitetura.md` e `03-stack-e-dependencias.md` como adicionais de L2, contrariando o esqueleto canônico (L1 = três seções 01, 02, 03) → reescrita do bloco L1 incluindo as três seções e remoção das duas linhas duplicadas em L2.
- `padtec/guia-humano.md` — Passo 6 apontava para `README.md` do subpacote `confluence-mermaid-package/`, divergindo do `prompts/00-mestre.md` que referencia `QUICKSTART.md` como entrada operacional → ajustado para apontar `QUICKSTART.md` (entrada) e `INSTALL.md` (instalação completa) com links relativos.

## Observações sem ação corretiva (registradas para rastreabilidade)

- `padtec/confluence-mermaid-package/` contém emojis decorativos em arquivos próprios (`CHANGELOG.md`, `QUICKSTART.md`, `INSTALL.md`, `README.md`, `how-to-confluence-mermaid-screenshots.md`). Como o subpacote é ferramenta externa consolidada (Task 1.3) com versionamento independente e CHANGELOG próprio, é distribuído intocável; os emojis estão fora do escopo de revisão integrativa do PADTec v1.0 e não violam a regra de tom dos artefatos PADTec propriamente ditos (templates, prompts, README, guia, checklist, glossário — todos sem emojis decorativos).
- Esqueleto canônico em `.apm/memory/stage-1/esqueleto-canonico.md` permanece autoritativo e consistente com o que foi implementado nos Stages 2 (templates e prompts). Nenhuma atualização foi necessária no esqueleto.

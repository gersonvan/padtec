# Adaptadores por agente

O PADTec é executado por qualquer agente de codificação com acesso nativo aos arquivos do projeto: basta pedir, no chat, que ele leia e execute `padtec/prompts/00-mestre.md`. Os adaptadores desta pasta não acrescentam lógica — são apontadores finos que fazem o agente encontrar o prompt mestre sozinho, sem o usuário precisar indicar o caminho a cada vez. Toda a lógica continua no mestre; se um adaptador e o mestre divergirem, o mestre prevalece.

| Agente | Mecanismo nativo | Adaptador | Como instalar |
|---|---|---|---|
| Claude Code | skill (`SKILL.md` com `name` e `description`) | `claude-code/SKILL.md` | Copie a pasta `claude-code/` para `~/.claude/skills/padtec/` (vale para todos os projetos) ou para `.claude/skills/padtec/` na raiz do projeto destino. Um link simbólico também serve. A skill passa a ser acionada por pedidos de documentação e pelo comando `/padtec`. |
| GitHub Copilot Chat | instruções do repositório (`.github/copilot-instructions.md`) | `copilot/copilot-instructions.md` | Acrescente o conteúdo desse arquivo ao `.github/copilot-instructions.md` do projeto destino (crie o arquivo se não existir). |
| Codex e outros que leem `AGENTS.md` | `AGENTS.md` na raiz | nenhum arquivo próprio | A seção `16-mapa-para-agentes`, gerada em toda execução, grava em `AGENTS.md` o bloco com a instrução de regeneração. Na primeira execução, invoque o mestre manualmente. |

Em qualquer agente, a invocação manual continua válida e é a referência: "Leia integralmente `padtec/prompts/00-mestre.md` e execute o PADTec no nível L2 nesta pasta."

Os adaptadores são opcionais e não fazem parte do fluxo mínimo descrito em `guia-humano.md`.

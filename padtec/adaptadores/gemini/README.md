# Adaptadores para os agentes do Google

O Google oferece três agentes de codificação com mecanismos de instrução diferentes. Esta pasta cobre os três; escolha pelo agente que você usa. Como em todo adaptador, nada aqui acrescenta lógica: a execução é sempre `padtec/prompts/00-mestre.md`.

| Agente | Lê `AGENTS.md` da raiz sozinho? | Arquivo desta pasta | Como instalar |
|---|---|---|---|
| Antigravity (IDE e CLI) | Sim | `SKILL.md` | Copie esta pasta para `.agents/skills/padtec/` na raiz do projeto destino (vale só para ele) ou para `~/.gemini/config/skills/padtec/` (vale para todos). A CLI transforma a skill no comando `/padtec`; na IDE, o pedido de documentação já a aciona. Nada mais é necessário: o bloco gerado em `AGENTS.md` é lido automaticamente. |
| Gemini CLI | Não (lê `GEMINI.md`) | `padtec.toml` e `trecho-GEMINI.md` | Copie `padtec.toml` para `.gemini/commands/padtec.toml` na raiz do projeto destino ou para `~/.gemini/commands/padtec.toml`; ele vira o comando `/padtec`. Para o bloco de `AGENTS.md` ser lido nas próximas sessões, acrescente ao `GEMINI.md` da raiz o conteúdo de `trecho-GEMINI.md` (o comando `/padtec` já faz isso na primeira execução). |
| Gemini Code Assist (VS Code e JetBrains) | Não (lê `GEMINI.md`) | `trecho-GEMINI.md` | Acrescente o conteúdo de `trecho-GEMINI.md` ao `GEMINI.md` da raiz do projeto destino (crie o arquivo se não existir). Não há comando por barra; o pedido de documentação no chat aciona o mestre. |

## Por que `GEMINI.md` importa `AGENTS.md`

O Gemini CLI e o Gemini Code Assist carregam `GEMINI.md`, não `AGENTS.md`. A linha `@./AGENTS.md` em `GEMINI.md` importa o arquivo inteiro, inclusive o bloco delimitado que a seção `16-mapa-para-agentes` regenera a cada execução, sem duplicar conteúdo. Alternativa equivalente, sem importação: declarar em `.gemini/settings.json` da raiz do projeto

```json
{ "context": { "fileName": ["GEMINI.md", "AGENTS.md"] } }
```

para que os dois arquivos sejam carregados como contexto. As duas formas dão o mesmo resultado; use uma só.

## Observações

- O Antigravity impõe limite de tamanho por arquivo de regras e um orçamento agregado de contexto. O bloco gerado em `AGENTS.md` é curto por construção (sub-prompt 16); se o `AGENTS.md` do projeto já for grande por outros motivos, o limite é do projeto, não do PADTec.
- O comando `padtec.toml` recebe o texto digitado após `/padtec` como parâmetros (por exemplo, `/padtec L3 em documentacao/`). Sem texto, o mestre assume os padrões e pergunta o que faltar.
- Mecanismos e caminhos conferidos na documentação oficial do Gemini CLI, do Antigravity e do Gemini Code Assist em novembro de 2026; se o agente mudar o formato, o mestre e a invocação manual continuam valendo.

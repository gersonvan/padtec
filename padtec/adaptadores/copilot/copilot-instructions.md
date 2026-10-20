<!-- PADTec: acrescente este bloco ao arquivo .github/copilot-instructions.md do projeto destino. -->

## Documentação técnica com o PADTec

Quando o usuário pedir para documentar o projeto, gerar ou atualizar a pasta de documentação, rodar o PADTec ou escolher um nível de documentação (L1, L2 ou L3):

1. Confirme que a pasta `padtec/` existe na raiz do projeto; se não existir, informe e não prossiga.
2. Leia integralmente `padtec/prompts/00-mestre.md` e execute-o do início ao fim com o nível pedido (padrão `L2`), a pasta de saída (padrão: a pasta de documentação existente, ou `docs/`) e a opção de publicação no Confluence (padrão: não). Não resuma nem pule etapas.
3. Execute os itens mecânicos de `padtec/checklist-qa.md` (A.2, A.3, A.6 e B.1) e reporte o resultado.
4. Não gere nem altere código do projeto: o PADTec escreve apenas na pasta de documentação e no bloco delimitado de `AGENTS.md`.

Toda afirmação técnica na documentação cita `arquivo:linha`; sem evidência, usa-se `// CARÊNCIA: não identificado no código`. Sem estimativas de tempo, custo ou esforço. Português do Brasil revisado.

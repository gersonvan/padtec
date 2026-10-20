# Contrato comum dos sub-prompts — PADTec

Este arquivo reúne o que todos os sub-prompts de seção (`prompts/secoes/`) e de extensão (`prompts/extensoes/`) assumem: o significado dos parâmetros recebidos do orquestrador, o procedimento comum de preenchimento de templates e a guarda por nível. Cada sub-prompt contém apenas o que é específico da sua seção — template a preencher, fontes de evidência, saída esperada e comportamento em monorepo.

## Parâmetros recebidos do orquestrador

O orquestrador (`prompts/00-mestre.md`) invoca cada sub-prompt pelo contrato de invocação definido na seção vi, com estes seis parâmetros já resolvidos:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida (`full-stack-web`, `backend-api`, `frontend-site`, `automacao-script` ou `iac`); o arquivo `prompts/variantes/<slug>.md`, já carregado pelo orquestrador, orienta ênfases e adaptações.
- `pasta-de-saída` — caminho relativo, no projeto destino, onde o documento gerado é gravado.
- `capacidades-ativas` — lista de slugs de capacidades detectadas, separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho relativo ao workspace, normalmente `.`.

Os sub-prompts executam no mesmo contexto do orquestrador; não precisam reler o mestre nem a variante.

## Procedimento comum de preenchimento

1. Leia integralmente o template indicado pelo sub-prompt.
2. Para cada placeholder `<<...>>`, substitua pelo conteúdo extraído do código-fonte conforme o procedimento de extração do sub-prompt.
3. Para cada diretiva `<!-- IA: ... -->`, execute-a e remova o comentário do documento final. Nenhum comentário de instrução sobrevive no documento gerado.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar do conteúdo. Não infira além do código.
5. Toda afirmação técnica cita `arquivo:linha` (ou `arquivo`, quando a evidência é estrutural), com caminho relativo à raiz do projeto destino.
6. Grave o documento no caminho indicado na seção "Saída esperada" do sub-prompt. Ao reexecutar o PADTec, regenere-o integralmente.

## Guarda por nível

Cada sub-prompt declara em quais níveis a sua seção existe. Se invocado com `nível` fora desse conjunto, ou fora de `L1|L2|L3`, retorne sem produzir saída e sem sinalizar erro.

## Regras de qualidade

As sete regras de `prompts/00-mestre.md` §vii aplicam-se integralmente a todo conteúdo gerado. Os templates não as reproduzem: o mestre é a única fonte.

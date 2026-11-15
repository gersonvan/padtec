# PADTec

Repositório-fonte do **PADTec — Padrão Automatizado de Documentação Técnica**, versão `v2.0.0`.

O PADTec é um pacote portátil para produzir documentação técnica a partir do código-fonte existente de um projeto. Ele orienta um agente de codificação com acesso direto aos arquivos a inspecionar evidências no código e gerar documentação rastreável, sem alterar a aplicação documentada (apenas a pasta de documentação é criada ou atualizada).

## Conteúdo do repositório

- [padtec/](padtec/): o pacote distribuível, copiado integralmente para a raiz do projeto que será documentado.
- [padtec/guia-humano.md](padtec/guia-humano.md): roteiro operacional — por onde começar.
- [padtec/README.md](padtec/README.md): identidade do pacote, níveis, variantes, capacidades condicionais e estrutura interna.
- [padtec/checklist-qa.md](padtec/checklist-qa.md): verificações objetivas sobre a documentação gerada.
- [padtec/CHANGELOG.md](padtec/CHANGELOG.md): o que mudou em cada versão e como atualizar uma cópia antiga do pacote.
- [padtec/adaptadores/](padtec/adaptadores/): apontadores opcionais por agente (Claude Code, GitHub Copilot, Antigravity, Gemini CLI, Gemini Code Assist) para acionar o PADTec com um pedido curto ou um comando por barra.
- [ferramentas/cli/](ferramentas/cli/): `padtec detect`, comando opcional em Node.js que lê o projeto e antecipa variante, capacidades e seções previstas antes da execução.
- [ferramentas/confluence-mermaid-package/](ferramentas/confluence-mermaid-package/): ferramental opcional, distribuído à parte do pacote, para publicar a documentação no Confluence, preservando diagramas Mermaid.

## Como usar

1. Copie a pasta `padtec/` deste repositório, inteira, para a raiz do projeto que será documentado. Nada é instalado.
2. Abra o projeto no seu agente de codificação (qualquer um que leia e grave arquivos do projeto: Claude Code, GitHub Copilot, Codex, Antigravity, Gemini CLI e outros).
3. No chat do agente, peça:

   > Leia integralmente `padtec/prompts/00-mestre.md` e execute o PADTec no nível L2 nesta pasta.

   `L2` é o nível recomendado para começar; `L1` gera o essencial e `L3` aprofunda. Na mesma mensagem você pode indicar a pasta de saída (padrão: a pasta de documentação existente, ou `docs/`).
4. O agente detecta a variante e as capacidades do projeto, gera os documentos com evidência `arquivo:linha` e grava em `AGENTS.md` um bloco que aponta a documentação para agentes futuros. Confira a saída com [padtec/checklist-qa.md](padtec/checklist-qa.md).
5. Opcional: instale o adaptador do seu agente a partir de [padtec/adaptadores/](padtec/adaptadores/) para que, nas próximas vezes, baste pedir "documente o projeto" ou usar `/padtec`.

O roteiro completo, com critérios de escolha de nível, exemplos de mensagem e o que fazer após a primeira geração, está em [padtec/guia-humano.md](padtec/guia-humano.md).

## Princípios

- A documentação parte de evidências do código-fonte, citadas como `arquivo:linha`, não de suposições.
- Ausências de evidência são registradas com o marcador `// CARÊNCIA: não identificado no código`, em vez de inventadas.
- O pacote é autocontido: pode ser copiado integralmente e usado sem depender deste repositório nem de instalação.
- O PADTec gera documentação; não gera nem modifica o código do projeto destino.
- Os prompts são escritos para qualquer agente de codificação com acesso nativo aos arquivos do projeto.

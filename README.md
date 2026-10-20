# PADTec

Repositório-fonte do **PADTec — Padrão Automatizado de Documentação Técnica**, versão `v1.0.1`.

O PADTec é um pacote portátil para produzir documentação técnica a partir do código-fonte existente de um projeto. Ele orienta um agente de codificação com acesso direto aos arquivos a inspecionar evidências no código e gerar documentação rastreável, sem alterar a aplicação documentada (apenas a pasta de documentação é criada ou atualizada).

## Conteúdo do repositório

- [padtec/](padtec/): o pacote distribuível, copiado integralmente para a raiz do projeto que será documentado.
- [padtec/guia-humano.md](padtec/guia-humano.md): roteiro operacional — por onde começar.
- [padtec/README.md](padtec/README.md): identidade do pacote, níveis, variantes, capacidades condicionais e estrutura interna.
- [padtec/checklist-qa.md](padtec/checklist-qa.md): verificações objetivas sobre a documentação gerada.
- [ferramentas/confluence-mermaid-package/](ferramentas/confluence-mermaid-package/): ferramental opcional, distribuído à parte do pacote, para publicar a documentação no Confluence, preservando diagramas Mermaid.

## Princípios

- A documentação parte de evidências do código-fonte, citadas como `arquivo:linha`, não de suposições.
- Ausências de evidência são registradas com o marcador `// CARÊNCIA: não identificado no código`, em vez de inventadas.
- O pacote é autocontido: pode ser copiado integralmente e usado sem depender deste repositório nem de instalação.
- O PADTec gera documentação; não gera nem modifica o código do projeto destino.
- Os prompts são escritos para qualquer agente de codificação com acesso nativo aos arquivos do projeto.

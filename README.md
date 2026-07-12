# PADTec

Repositório-fonte do **PADTec — Padrão AVP de Documentação Técnica**.

O PADTec é um pacote portátil para produzir documentação técnica a partir do código-fonte existente de um projeto. Ele orienta um agente com acesso direto aos arquivos a inspecionar evidências no código e gerar documentação rastreável, sem alterar a aplicação documentada.

## Uso rápido

1. Copie a pasta `padtec/` para a raiz do projeto que será documentado.
2. No projeto destino, siga o [guia humano](padtec/guia-humano.md).
3. Escolha o nível documental: `L1` (essencial), `L2` (completo) ou `L3` (aprofundado).
4. Execute o prompt mestre `padtec/prompts/00-mestre.md` em um ambiente de agente com acesso nativo aos arquivos.
5. Valide a documentação gerada com [checklist-qa.md](padtec/checklist-qa.md).

## Conteúdo do repositório

- [padtec/](padtec/): pacote distribuível do PADTec, atualmente na versão `v1.0.1`.
- [padtec/README.md](padtec/README.md): visão completa dos níveis, variantes e capacidades condicionais.
- [padtec/guia-humano.md](padtec/guia-humano.md): instruções operacionais para aplicar o pacote a um projeto.
- [padtec/confluence-mermaid-package/](padtec/confluence-mermaid-package/): conversão e publicação opcional de Markdown no Confluence, incluindo diagramas Mermaid.

## Princípios

- A documentação parte de evidências do código-fonte, não de suposições.
- Ausências de evidência são registradas como carências, em vez de serem inventadas.
- O pacote é autocontido: pode ser copiado integralmente e usado sem depender deste repositório.
- O PADTec gera documentação; não gera nem modifica código do projeto destino.

## Estrutura

```text
padtec/
  prompts/       instruções para o agente executor
  templates/     esqueletos de documentação por nível
  guia-humano.md roteiro de aplicação do pacote
  checklist-qa.md validação da documentação gerada
```

Para detalhes de funcionamento e referências, consulte a [README do pacote](padtec/README.md).

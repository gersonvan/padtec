<!-- PADTec:início -->
## Documentação técnica deste projeto

<!-- IA: preencha a linha abaixo com a versão lida em `padtec/VERSION`, a data de hoje no formato AAAA-MM-DD, o nível executado e a pasta de saída resolvida. -->

Gerada pelo PADTec `<<VERSAO_DO_PADTEC>>` em `<<DATA>>`, nível `<<NIVEL>>`, a partir do código-fonte: toda afirmação técnica cita `arquivo:linha`, e o que o código não responde está marcado como `// CARÊNCIA: não identificado no código`. Os documentos ficam em `<<PASTA_DE_SAIDA>>/`.

### Qual documento responde a quê

<!-- IA: uma linha por documento efetivamente gerado nesta execução, na ordem `NN-`, seguida das seções condicionais; a pergunta vem da correspondência fixa do sub-prompt. Não liste documento que não existe. -->

| Pergunta | Documento |
|---|---|
| `<<PERGUNTA>>` | `<<PASTA_DE_SAIDA>>/<<NN-slug.md>>` |

### Onde cada coisa vive

<!-- IA: reproduza a tabela "Onde cada coisa vive" de `01-visao-geral.md`, apenas com as colunas "O que" e "Onde". -->

| O que | Onde |
|---|---|
| `<<ITEM>>` | `<<CAMINHO_RELATIVO>>` |

### Regras ao usar ou editar a documentação

- Antes de alterar um comportamento, leia o documento da área afetada: ele cita o arquivo e a linha que sustentam cada afirmação.
- Ao editar um documento, mantenha a evidência `arquivo:linha` em toda afirmação técnica e use `// CARÊNCIA: não identificado no código` em vez de inferir.
- Não registre estimativas de tempo, custo ou esforço.
- Quando a mudança no código for estrutural (rotas, modelo de domínio, dependências, pipeline), prefira regenerar a documentação a corrigi-la à mão.

### Como regenerar

Com a pasta `padtec/` presente na raiz, peça ao agente de codificação: "Execute o PADTec no nível `<<NIVEL>>` nesta pasta." O prompt mestre é `padtec/prompts/00-mestre.md`; o gate de qualidade é `padtec/checklist-qa.md`. Este bloco é regenerado a cada execução; não o edite manualmente.
<!-- PADTec:fim -->

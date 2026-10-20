---
name: padtec
description: Gera ou atualiza a documentação técnica de um projeto a partir do código-fonte existente com o PADTec (níveis L1, L2 ou L3; variante e capacidades detectadas no código; evidência arquivo:linha; lacunas marcadas, nunca inventadas). Use quando o usuário pedir para documentar o projeto, gerar ou atualizar a pasta de documentação, rodar o PADTec ou escolher um nível de documentação. Não use para escrever comentários de código, README de biblioteca, docstrings ou documentação de API isolada, nem para alterar código.
---

# PADTec — documentação técnica a partir do código

## Quando usar

- O usuário pede para documentar o projeto, gerar ou atualizar `docs/` (ou pasta equivalente), "rodar o PADTec" ou escolher entre L1, L2 e L3.
- Existe a pasta `padtec/` na raiz do projeto. Se não existir, diga isso e pare: o pacote precisa ser copiado antes (ver `padtec/guia-humano.md` no repositório-fonte).

## Quando não usar

- Comentários de código, docstrings, README de biblioteca ou documentação de uma única API: fora do escopo.
- Qualquer alteração no código do projeto: o PADTec só escreve na pasta de documentação e no bloco delimitado de `AGENTS.md`.

## Passos

1. Resolva com o usuário, se não estiver na mensagem: o nível (`L1`, `L2` ou `L3`; padrão `L2`), a pasta de saída (padrão: a pasta de documentação existente, ou `docs/`) e se há publicação no Confluence (padrão: não).
2. Leia integralmente `padtec/prompts/00-mestre.md` e execute-o do início ao fim com esses parâmetros. Ele detecta variante e capacidades, despacha os sub-prompts de seção e de extensão, preenche os templates e gera o bloco de `AGENTS.md`. Não resuma nem pule etapas do mestre; não leia os sub-prompts fora da ordem que ele determina.
3. Execute os itens mecânicos de `padtec/checklist-qa.md` (A.2, A.3, A.6 e B.1) e reporte o resultado de cada um.
4. Garanta que `CLAUDE.md` na raiz do projeto contenha a linha `@AGENTS.md` (crie o arquivo com essa única linha se não existir; acrescente a linha se ele existir sem ela), para que o bloco gerado em `AGENTS.md` seja lido automaticamente nas próximas sessões.
5. Entregue ao usuário: lista dos documentos gerados, variante e capacidades detectadas, contagem de marcadores `// CARÊNCIA: não identificado no código`, resultado do QA mecânico e os itens do checklist que dependem de leitura humana.

## Regras que valem acima de qualquer atalho

- Toda afirmação técnica cita `arquivo:linha`; sem evidência, grava-se o marcador de carência. Nada é inferido além do código.
- Sem estimativas de tempo, custo ou esforço na documentação gerada.
- Português do Brasil revisado em todo texto narrativo.

A lógica inteira está em `padtec/prompts/00-mestre.md`; esta skill só o aciona. Se esta skill e o mestre divergirem, o mestre prevalece.

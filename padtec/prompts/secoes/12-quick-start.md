# Sub-prompt PADTec — Quick start

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

## Template a preencher

Leia integralmente `templates/L3-aprofundado/12-quick-start.md`. Esta seção existe **apenas em `L3`**.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique pré-requisitos de ambiente: versão de runtime (do arquivo de versão de runtime ou do campo de engine no manifesto), gerenciador de pacotes esperado, serviços de plataforma necessários localmente (banco, cache, mensageria) declarados em `docker-compose.yml` ou em scripts de setup.
2. Identifique a sequência de comandos de instalação: scripts em `package.json`/`Makefile`/`justfile`/`scripts/`, instruções em `README.md`, comandos descritos em `CONTRIBUTING.md`.
3. Identifique a sequência de comandos de inicialização: scripts de start declarados no manifesto, comandos de seed/migração quando necessários para o sistema responder.
4. Identifique a verificação de que o sistema responde: endpoint de health-check exposto, página inicial servida em porta declarada, comando de teste smoke. Cite `arquivo:linha` da configuração de porta/rota.
5. Identifique variáveis de ambiente mínimas para subir localmente (subconjunto do inventário da seção 10): aquelas sem as quais o sistema não inicia. Cite o `.env.example` correspondente.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Apresente os passos numerados, em ordem executável, com o comando exato em bloco de código. Garanta que um leitor seguindo o documento na ordem chega ao sistema respondendo.
4. Quando uma evidência requerida não puder ser localizada (ex.: nenhum endpoint de health-check declarado), registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 6 (Sem estimativas):** mesmo que o template do L3 mencione "trinta minutos" como referência, o documento gerado não promete tempo. Apresente a sequência mínima sem estimativa.
- **Regra 1 (Evidência rastreável):** cada comando, variável e endpoint cita o manifesto/script/arquivo de origem.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/12-quick-start.md`, com passos numerados executáveis, comandos em blocos de código, variáveis mínimas listadas, verificação de que o sistema responde.

## Comportamento por nível

Existe apenas em `L3`. Se invocado com `nível` igual a `L1` ou `L2` (ou fora de `L1|L2|L3`), retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, o quick start é tipicamente **único no workspace** (`<pasta-de-saída>/12-quick-start.md`), cobrindo o procedimento que sobe o workspace todo. Quando apps têm procedimento independente (e relevante isoladamente), gere também `<pasta-de-saída>/apps/<nome-do-app>/12-quick-start.md`.

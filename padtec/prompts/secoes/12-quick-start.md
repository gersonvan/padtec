# Sub-prompt PADTec — Quick start

## Parâmetros recebidos do orquestrador

Os seis parâmetros (`nível`, `variante`, `pasta-de-saída`, `capacidades-ativas`, `modo-monorepo`, `raiz-do-projeto-destino`) chegam conforme o contrato de invocação de `prompts/00-mestre.md`, detalhado em `prompts/_comum.md`, que também fixa o procedimento comum de preenchimento e a guarda por nível.

## Template a preencher

Leia integralmente `templates/nucleo/12-quick-start.md`. Esta seção existe **apenas em `L3`**.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique pré-requisitos de ambiente: versão de runtime (do arquivo de versão de runtime ou do campo de engine no manifesto), gerenciador de pacotes esperado, serviços de plataforma necessários localmente (banco, cache, mensageria) declarados em `docker-compose.yml` ou em scripts de setup.
2. Identifique a sequência de comandos de instalação: scripts em `package.json`/`Makefile`/`justfile`/`scripts/`, instruções em `README.md`, comandos descritos em `CONTRIBUTING.md`.
3. Identifique a sequência de comandos de inicialização: scripts de start declarados no manifesto, comandos de seed/migração quando necessários para o sistema responder.
4. Identifique a verificação de que o sistema responde: endpoint de health-check exposto, página inicial servida em porta declarada, comando de teste smoke. Cite `arquivo:linha` da configuração de porta/rota.
5. Identifique variáveis de ambiente mínimas para subir localmente (subconjunto do inventário da seção 10): aquelas sem as quais o sistema não inicia. Cite o `.env.example` correspondente.
6. Catalogue os ritos recorrentes com os comandos literais declarados no repositório (scripts do manifesto, `Makefile`/`justfile`, scripts em `scripts/`, passos do pipeline): instalar, executar localmente, testar, gerar build, implantar.

## Procedimento de preenchimento

Além do procedimento comum de `prompts/_comum.md`:

1. Apresente os passos numerados, em ordem executável, com o comando exato em bloco de código. Garanta que um leitor seguindo o documento na ordem chega ao sistema respondendo.
2. Quando uma evidência requerida não puder ser localizada (ex.: nenhum endpoint de health-check declarado), registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **sete regras duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 6 (Sem estimativas):** o documento gerado não promete tempo. Apresente a sequência mínima sem estimativa.
- **Regra 1 (Evidência rastreável):** cada comando, variável e endpoint cita o manifesto/script/arquivo de origem.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/12-quick-start.md`, com passos numerados executáveis, comandos em blocos de código, variáveis mínimas listadas, verificação de que o sistema responde.

## Comportamento por nível

Existe apenas em `L3`. Se invocado com `nível` igual a `L1` ou `L2` (ou fora de `L1|L2|L3`), retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, o quick start é tipicamente **único no workspace** (`<pasta-de-saída>/12-quick-start.md`), cobrindo o procedimento que sobe o workspace todo. Quando apps têm procedimento independente (e relevante isoladamente), gere também `<pasta-de-saída>/apps/<nome-do-app>/12-quick-start.md`.

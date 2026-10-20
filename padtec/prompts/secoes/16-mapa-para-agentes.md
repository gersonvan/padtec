# Sub-prompt PADTec — Mapa para agentes

## Parâmetros recebidos do orquestrador

Os seis parâmetros (`nível`, `variante`, `pasta-de-saída`, `capacidades-ativas`, `modo-monorepo`, `raiz-do-projeto-destino`) chegam conforme o contrato de invocação de `prompts/00-mestre.md`, detalhado em `prompts/_comum.md`, que também fixa o procedimento comum de preenchimento e a guarda por nível.

## Template a preencher

Leia integralmente `templates/nucleo/16-mapa-para-agentes.md`. Esta seção é gerada em **todos os níveis** e é a única cuja saída **não** vai para `pasta-de-saída`: ela produz um bloco delimitado dentro do arquivo `AGENTS.md` na raiz do projeto destino, que agentes de codificação leem automaticamente ao abrir o repositório. O objetivo é que um agente futuro encontre a documentação e suas regras sem precisar varrer o projeto.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`, depois que todos os demais sub-prompts do nível tiverem concluído:

1. Liste os documentos efetivamente gerados nesta execução em `pasta-de-saída` (núcleo e condicionais). Só eles entram no mapa.
2. Para cada documento gerado, associe a pergunta que ele responde, usando esta correspondência fixa: `01` — o que o sistema faz, para quem e qual o escopo; `02` — camadas, fluxo de uma requisição e decisões de design; `03` — versões de runtime e dependências; `04` — o que há em cada pasta; `05` — entidades, invariantes e vocabulário do domínio; `06` — fluxos de negócio; `07` — endpoints e canais expostos; `08` — telas e rotas de interface; `09` — organização interna do backend; `10` — variáveis e perfis de ambiente; `11` — implantação, pipeline e observabilidade; `12` — como subir e verificar localmente; `13` — glossário; `14` — erros, diagnóstico e defeitos registrados; `15` — como manter a documentação; `condicional-<slug>` — a capacidade correspondente.
3. Reproduza a tabela "Onde cada coisa vive" de `01-visao-geral.md`, apenas com as colunas "O que" e "Onde".
4. Leia `padtec/VERSION` na raiz do projeto destino para registrar a versão do pacote.
5. Verifique se já existe `AGENTS.md` na raiz e, nele, o par de marcadores `<!-- PADTec:início -->` e `<!-- PADTec:fim -->`.

## Procedimento de preenchimento

Além do procedimento comum de `prompts/_comum.md`:

1. Preencha o template como um bloco único, delimitado pelos marcadores `<!-- PADTec:início -->` e `<!-- PADTec:fim -->`, com no máximo quarenta linhas além das tabelas.
2. Se `AGENTS.md` não existir na raiz, crie-o contendo apenas o bloco. Se existir sem os marcadores, acrescente o bloco ao final, preservando todo o conteúdo anterior. Se existir com os marcadores, substitua apenas o conteúdo entre eles. Nunca altere texto fora dos marcadores.
3. Se o ambiente de execução usar um arquivo próprio de instruções na raiz que não leia `AGENTS.md` automaticamente, garanta que esse arquivo passe a referenciá-lo (uma linha de importação ou de remissão), sem alterar o restante do conteúdo; os adaptadores em `adaptadores/` dizem como cada ambiente faz isso.
4. Ao reexecutar o PADTec, regenere o bloco integralmente.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **sete regras duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 1 (Evidência rastreável):** o mapa cita caminhos de documentos e de pastas que existem; não aponte para arquivo que não foi gerado.
- **Regra 6 (Sem estimativas):** o bloco não contém prazos, cronograma de revisão nem periodicidade como compromisso.

## Saída esperada

Bloco delimitado gravado em `AGENTS.md` na raiz do projeto destino (não em `pasta-de-saída`), com: versão do pacote, nível e data da geração; tabela "qual documento responde a quê" cobrindo todos os documentos gerados; tabela "onde cada coisa vive"; regras para quem usa ou edita a documentação; instrução de regeneração.

## Comportamento por nível

A seção é gerada em `L1`, `L2` e `L3`, variando apenas os documentos listados. Se invocado com `nível` fora de `L1|L2|L3`, retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Gere um único `AGENTS.md` na raiz do workspace. Na tabela de documentos, aponte os documentos de workspace em `pasta-de-saída/` e os de cada app em `pasta-de-saída/apps/<nome-do-app>/`, uma linha por documento. Não crie `AGENTS.md` por app.

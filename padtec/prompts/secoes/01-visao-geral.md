# Sub-prompt PADTec — Visão geral

## Parâmetros recebidos do orquestrador

Os seis parâmetros (`nível`, `variante`, `pasta-de-saída`, `capacidades-ativas`, `modo-monorepo`, `raiz-do-projeto-destino`) chegam conforme o contrato de invocação de `prompts/00-mestre.md`, detalhado em `prompts/_comum.md`, que também fixa o procedimento comum de preenchimento e a guarda por nível.

## Template a preencher

Leia integralmente `templates/nucleo/01-visao-geral.md`. Esse arquivo é o template autoritativo desta seção.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Leia o arquivo `README.md` da raiz (e variações como `README.pt-BR.md`, `README.md` em subprojetos relevantes). Extraia: nome do sistema, propósito declarado, escopo, público-alvo.
2. Inspecione o manifesto principal do projeto (`package.json` campo `description` e `name`, `pyproject.toml` `[project].description`, `pom.xml` `<description>`, `Cargo.toml` `[package].description`, equivalente) para reforçar o nome canônico e a descrição curta.
3. Identifique atores principais lendo a estrutura de domínio (pastas em `src/` ou equivalente, nomes de módulos top-level, papéis citados em `README.md`).
4. Detecte a proposta de valor e o contexto pelos seguintes sinais: descrição em manifestos, primeiros parágrafos do `README.md`, documentação em `docs/`/`documentation/`/`documentacao/` quando já existir, badges/links da raiz.
5. Liste as integrações externas e dependências de infraestrutura mais visíveis (pelos manifestos e por configuração) — apenas em alto nível; o detalhamento vive nas seções específicas.

## Procedimento de preenchimento

Além do procedimento comum de `prompts/_comum.md`:

1. Gere o diagrama de contexto `flowchart LR` previsto no template (sistema, atores e sistemas externos); mantenha a prosa enxuta e objetiva.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **sete regras duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 1 (Evidência rastreável):** cada afirmação sobre nome, escopo, atores ou proposta de valor cita o arquivo de origem (tipicamente `README.md` ou manifesto).
- **Regra 2 (Anti-alucinação):** quando a documentação existente não declara escopo ou atores, registre `// CARÊNCIA` em vez de presumir.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/01-visao-geral.md`, com placeholders preenchidos, diretivas executadas, evidências citadas e ausências marcadas com `// CARÊNCIA`.

## Comportamento por nível

A seção `01-visao-geral.md` existe em `L1`, `L2` e `L3`; o template é cópia byte-a-byte entre os três níveis. O conteúdo gerado por este sub-prompt é o mesmo independentemente do `nível`. Se invocado com `nível` fora desse conjunto, retorne sem produzir saída (guard defensivo; o `00-mestre.md` previne essa situação na resolução do conjunto de seções).

## Comportamento sob `modo-monorepo: sim`

Visão geral é um documento **único** no workspace, mesmo em monorepo. Gera-se um único `<pasta-de-saída>/01-visao-geral.md` cobrindo o sistema como um todo; descrição por app é responsabilidade da visão de workspace, não desta seção.

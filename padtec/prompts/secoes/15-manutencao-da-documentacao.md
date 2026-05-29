# Sub-prompt PADTec — Manutenção da documentação

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

## Template a preencher

Leia integralmente `templates/L3-aprofundado/15-manutencao-da-documentacao.md`. Esta seção existe **apenas em `L3`**.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique gatilhos no código que devem disparar atualização de documentação: mudanças em rotas/endpoints (seção 07), mudanças no modelo de domínio (seção 05), mudanças no manifesto/lockfile (seção 03), mudanças em variáveis de ambiente (seção 10), mudanças no pipeline ou em manifestos de IaC (seção 11). Para cada gatilho, indique qual seção do `pasta-de-saída/` deve ser revisitada.
2. Identifique convenções de escrita já em uso no projeto (`docs/STYLE.md`, `CONTRIBUTING.md`, regras de markdown lint) e adote-as como base.
3. Identifique a governança de revisão: arquivos `CODEOWNERS`, política de PR de documentação, processos descritos em `CONTRIBUTING.md`. Se houver, referencie; se não houver, registre uma governança mínima (ex.: revisão por pelo menos um par antes de merge na pasta de documentação).
4. Para cada seção do `pasta-de-saída/` produzida pelos demais sub-prompts, defina um **checklist de qualidade de manutenção**: o que conferir em cada revisão (versões ainda batem com lockfile, novos endpoints presentes, novas variáveis presentes, etc.).
5. Identifique a relação entre este documento e o `checklist-qa.md` do pacote PADTec, usado para validação no momento da geração inicial — esta seção foca em manutenção contínua; o checklist de geração é referenciado, não duplicado.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Apresente a relação gatilho-em-código → seção-a-revisar como tabela. Apresente os checklists por seção como listas de verificação com `[ ]`.
4. Quando uma evidência requerida não puder ser localizada (ex.: nenhum `CONTRIBUTING.md` no projeto), registre o marcador literal `// CARÊNCIA: não identificado no código` e proponha uma governança mínima de forma explícita, marcando-a como "sugestão sem governança prévia documentada".

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 6 (Sem estimativas):** não estabeleça prazos ("revisar a cada 30 dias", "release a cada 2 semanas"). Estabeleça gatilhos baseados em evento.
- **Regra 1 (Evidência rastreável):** as convenções e a governança citadas existem no projeto e são referenciadas pelo arquivo de origem.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/15-manutencao-da-documentacao.md`, com tabela de gatilhos, checklists por seção, convenções de escrita adotadas, governança de revisão.

## Comportamento por nível

Existe apenas em `L3`. Se invocado com `nível` igual a `L1` ou `L2` (ou fora de `L1|L2|L3`), retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, esta seção é **única no workspace** (`<pasta-de-saída>/15-manutencao-da-documentacao.md`), pois a governança e os gatilhos costumam ser compartilhados. Checklists por app aparecem como subseções dentro do mesmo documento.

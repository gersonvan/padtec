# Sub-prompt PADTec — Glossário

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

## Template a preencher

Leia integralmente `templates/L3-aprofundado/13-glossario.md`. Esta seção existe **apenas em `L3`**, embora a regra 3 (glossário mínimo) seja aplicável a todos os níveis com mínimos diferentes — a seção dedicada é responsabilidade do `L3`.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Catalogue termos de **domínio** lendo nomes de entidades (do modelo de domínio), atributos significativos, métodos de domínio e papéis declarados em código.
2. Catalogue termos **técnicos** específicos ao sistema: padrões internos nomeados (ex.: nome próprio de um padrão de organização), abreviações usadas consistentemente (em nomes de arquivo, em logs, em commits), camadas/categorias internas com nome próprio.
3. Catalogue termos de **infraestrutura** e **integração** identificáveis em manifestos e configurações: serviços de plataforma usados, nomes de fila/tópico/canal, nomes de bucket/contêiner de armazenamento, nomes próprios de integradores externos.
4. Para cada termo, registre: categoria (Domínio/Técnico/Infraestrutura/Integração), definição curta baseada na evidência (não inferida), exemplo de uso em código ou arquivo onde aparece (cite `arquivo:linha`).
5. Compile a lista ordenada alfabeticamente dentro de cada categoria.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Verifique a quantidade mínima de termos antes de finalizar o documento (ver regras de qualidade abaixo).
4. Quando um termo for usado no código mas não tenha definição inferível com segurança, inclua-o no glossário com `// CARÊNCIA: não identificado no código` no campo de definição — registrar a presença do termo é mais útil do que omitir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 3 (Glossário mínimo):** esta seção é o exemplar canônico da regra. Mínimo: **30 termos em `L1`**, **60 em `L2`**, **100 em `L3`**. Quando o glossário ficar abaixo do mínimo, amplie a busca a novas fontes (logs, exceptions com mensagem, arquivos de fixture, nomes de teste) antes de finalizar.
- **Regra 1 (Evidência rastreável):** cada termo cita pelo menos um ponto no código onde aparece.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/13-glossario.md`, com termos organizados por categoria, ordenação alfabética dentro de cada categoria, definição curta e citação de evidência por termo, contagem mínima atendida conforme o `nível`.

## Comportamento por nível

A seção dedicada existe em `L3`. Em `L1` e `L2`, o glossário pode aparecer como anexo de outra seção; o `00-mestre.md` decide quando despachar este sub-prompt. Se invocado com `nível` fora de `L1|L2|L3`, retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, gere um glossário **único no workspace** (`<pasta-de-saída>/13-glossario.md`) consolidando termos de todos os apps. Termos específicos de um app entram com nota indicando o app de origem; termos compartilhados entram sem nota.

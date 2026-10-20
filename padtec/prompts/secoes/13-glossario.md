# Sub-prompt PADTec — Glossário

## Parâmetros recebidos do orquestrador

Os seis parâmetros (`nível`, `variante`, `pasta-de-saída`, `capacidades-ativas`, `modo-monorepo`, `raiz-do-projeto-destino`) chegam conforme o contrato de invocação de `prompts/00-mestre.md`, detalhado em `prompts/_comum.md`, que também fixa o procedimento comum de preenchimento e a guarda por nível.

## Template a preencher

Leia integralmente `templates/nucleo/13-glossario.md`. Esta seção é gerada em **todos os níveis**, com mínimos distintos de termos (30 em `L1`, 60 em `L2`, 100 em `L3`); o template é o mesmo nos três níveis.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

Leia primeiro `glossario-base.md`, na raiz do pacote, e separe os termos aplicáveis ao projeto — aqueles cujo conceito aparece no código. Eles entram no glossário com a definição da semente, acrescida da evidência local; termos da semente sem ocorrência no código ficam de fora.

1. Catalogue termos de **domínio** lendo nomes de entidades (do modelo de domínio), atributos significativos, métodos de domínio e papéis declarados em código.
2. Catalogue termos **técnicos** específicos ao sistema: padrões internos nomeados (ex.: nome próprio de um padrão de organização), abreviações usadas consistentemente (em nomes de arquivo, em logs, em commits), camadas/categorias internas com nome próprio.
3. Catalogue termos de **infraestrutura** e **integração** identificáveis em manifestos e configurações: serviços de plataforma usados, nomes de fila/tópico/canal, nomes de bucket/contêiner de armazenamento, nomes próprios de integradores externos.
4. Para cada termo, registre: categoria (Domínio/Técnico/Infraestrutura/Integração), definição curta baseada na evidência (não inferida), exemplo de uso em código ou arquivo onde aparece (cite `arquivo:linha`).
5. Compile a lista ordenada alfabeticamente dentro de cada categoria.

## Procedimento de preenchimento

Além do procedimento comum de `prompts/_comum.md`:

1. Verifique a quantidade mínima de termos antes de finalizar o documento (ver regras de qualidade abaixo).
2. Quando um termo for usado no código mas não tenha definição inferível com segurança, inclua-o no glossário com `// CARÊNCIA: não identificado no código` no campo de definição — registrar a presença do termo é mais útil do que omitir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **sete regras duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 3 (Glossário mínimo):** esta seção é o exemplar canônico da regra. Mínimo: **30 termos em `L1`**, **60 em `L2`**, **100 em `L3`**. Quando o glossário ficar abaixo do mínimo, amplie a busca a novas fontes (logs, exceptions com mensagem, arquivos de fixture, nomes de teste) antes de finalizar.
- **Regra 1 (Evidência rastreável):** cada termo cita pelo menos um ponto no código onde aparece.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/13-glossario.md`, com termos organizados por categoria, ordenação alfabética dentro de cada categoria, definição curta e citação de evidência por termo, contagem mínima atendida conforme o `nível`.

## Comportamento por nível

A seção é gerada em `L1`, `L2` e `L3`, variando apenas o mínimo de termos exigido. Se invocado com `nível` fora de `L1|L2|L3`, retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, gere um glossário **único no workspace** (`<pasta-de-saída>/13-glossario.md`) consolidando termos de todos os apps. Termos específicos de um app entram com nota indicando o app de origem; termos compartilhados entram sem nota.

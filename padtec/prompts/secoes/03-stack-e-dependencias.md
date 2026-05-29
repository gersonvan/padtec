# Sub-prompt PADTec — Stack e dependências

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

## Template a preencher

Leia integralmente `templates/<nível-resolvido>/03-stack-e-dependencias.md`, onde `<nível-resolvido>` é `L1-essencial` para `L1`, `L2-completo` para `L2`, `L3-aprofundado` para `L3`. Esse arquivo é o template autoritativo desta seção.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique o manifesto de dependências principal por convenção do ecossistema (manifesto declarativo do gerenciador de pacotes na raiz; em monorepo, o manifesto da raiz e o de cada app/pacote).
2. Identifique o arquivo de lockfile correspondente ao manifesto (lockfile do gerenciador detectado). É **obrigatório** ler o lockfile: as versões reportadas no documento devem ser as resolvidas pelo lockfile, não as declaradas no manifesto.
3. Identifique o runtime e sua versão exata: arquivo de versão de runtime (`.nvmrc`, `.tool-versions`, `.python-version`, `runtime.txt`, equivalente), campo de engine no manifesto, ou versão declarada em pipeline de CI.
4. Catalogue por camada: linguagem(s), motor(es) de execução, framework(s) de aplicação, mecanismos de persistência, serviços de plataforma usados, bibliotecas estruturais (testes, lint, build).
5. Para cada item catalogado, registre a versão **resolvida do lockfile**. Quando o manifesto declara range, registre o range literal entre crases (ex.: \`^10.0.0\`) e, separadamente, a versão exata resolvida.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Não há diagrama Mermaid obrigatório nesta seção; concentre-se em tabelas precisas de versão.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 5 (Versões exatas):** esta seção é o exemplar canônico da regra. Toda versão citada é a resolvida do lockfile; ranges aparecem separadamente com a fonte do manifesto identificada.
- **Regra 1 (Evidência rastreável):** cada entrada de tabela cita o caminho do manifesto/lockfile que a evidencia.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/03-stack-e-dependencias.md`, com tabelas por camada preenchidas com versão exata, citação ao manifesto/lockfile de origem, placeholders preenchidos, diretivas executadas, e ausências marcadas com `// CARÊNCIA`.

## Comportamento por nível

A seção existe em `L1`, `L2` e `L3`; o template é cópia byte-a-byte entre os três níveis. O sub-prompt comporta-se da mesma forma em qualquer nível. Se invocado com `nível` fora de `L1|L2|L3`, retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, produza **um documento de stack na raiz** (com a interseção/união da stack do workspace) e, para cada app aplicacional, um `<pasta-de-saída>/apps/<nome-do-app>/03-stack-e-dependencias.md` com a stack específica daquele app, baseada no manifesto/lockfile próprio. Quando o monorepo usa um único lockfile (ex.: workspace gerenciado por gerenciador único), a versão resolvida é a mesma para todos os apps; ainda assim, registre por app o subconjunto efetivamente usado.

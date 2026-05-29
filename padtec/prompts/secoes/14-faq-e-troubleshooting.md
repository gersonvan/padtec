# Sub-prompt PADTec — FAQ e troubleshooting

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

## Template a preencher

Leia integralmente `templates/L3-aprofundado/14-faq-e-troubleshooting.md`. Esta seção existe **apenas em `L3`**.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique cenários de erro recorrentes em código: classes de exceção do domínio, mensagens de erro literais lançadas, tratamento de erro com mensagens específicas, retornos de erro nos endpoints (códigos e estruturas).
2. Identifique cenários documentados em `README.md`, `CONTRIBUTING.md`, `docs/`/`documentation/`/`documentacao/` existentes, ou em comentários `TODO`/`FIXME` que descrevam pegadinhas conhecidas.
3. Identifique cenários comuns de setup que falham (variáveis ausentes, portas em conflito, dependências de serviço externo não inicializadas) a partir da seção 12 (quick-start) e da configuração de docker-compose ou scripts de setup.
4. Para cada cenário, registre: sintoma (mensagem ou comportamento observado), causa provável (com evidência em código), procedimento de diagnóstico (comandos ou pontos a inspecionar), procedimento de correção.
5. Quando o projeto destino tiver histórico de issues conhecidas em `docs/` ou em um diretório de notas, use-as como fonte. Não invente cenários: prefira menos itens, todos sustentados, do que muitos itens inferidos.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Organize as entradas em duas listas: perguntas frequentes (FAQ) e situações de troubleshooting com sintoma → causa → diagnóstico → correção.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 2 (Anti-alucinação):** esta seção é especialmente vulnerável a invenções. Cada cenário precisa estar sustentado por código, configuração ou documento existente. Sem evidência, omita.
- **Regra 1 (Evidência rastreável):** cada cenário cita o arquivo de origem (classe de exceção, configuração, documento).

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/14-faq-e-troubleshooting.md`, com FAQ e troubleshooting organizados, cada entrada sustentada por evidência citada.

## Comportamento por nível

Existe apenas em `L3`. Se invocado com `nível` igual a `L1` ou `L2` (ou fora de `L1|L2|L3`), retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, esta seção é **única no workspace** (`<pasta-de-saída>/14-faq-e-troubleshooting.md`), consolidando cenários comuns. Cenários específicos a um app aparecem com nota indicando o app de origem.

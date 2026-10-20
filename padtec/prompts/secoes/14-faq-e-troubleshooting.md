# Sub-prompt PADTec — FAQ e troubleshooting

## Parâmetros recebidos do orquestrador

Os seis parâmetros (`nível`, `variante`, `pasta-de-saída`, `capacidades-ativas`, `modo-monorepo`, `raiz-do-projeto-destino`) chegam conforme o contrato de invocação de `prompts/00-mestre.md`, detalhado em `prompts/_comum.md`, que também fixa o procedimento comum de preenchimento e a guarda por nível.

## Template a preencher

Leia integralmente `templates/nucleo/14-faq-e-troubleshooting.md`. Esta seção existe **apenas em `L3`**.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique cenários de erro recorrentes em código: classes de exceção do domínio, mensagens de erro literais lançadas, tratamento de erro com mensagens específicas, retornos de erro nos endpoints (códigos e estruturas).
2. Identifique cenários documentados em `README.md`, `CONTRIBUTING.md`, `docs/`/`documentation/`/`documentacao/` existentes, ou em comentários `TODO`/`FIXME` que descrevam pegadinhas conhecidas.
3. Identifique cenários comuns de setup que falham (variáveis ausentes, portas em conflito, dependências de serviço externo não inicializadas) a partir da seção 12 (quick-start) e da configuração de docker-compose ou scripts de setup.
4. Para cada cenário, registre: sintoma (mensagem ou comportamento observado), causa provável (com evidência em código), procedimento de diagnóstico (comandos ou pontos a inspecionar), procedimento de correção.
5. Quando o projeto destino tiver histórico de issues conhecidas em `docs/` ou em um diretório de notas, use-as como fonte. Não invente cenários: prefira menos itens, todos sustentados, do que muitos itens inferidos.
6. Levante os defeitos e limitações com registro textual no repositório: comentários `TODO`, `FIXME`, `HACK` e `XXX`, testes marcados como ignorados ou pendentes, contornos comentados, referências a chamados ou issues em comentários e nas mensagens de commit recentes, sempre com `arquivo:linha`.

## Procedimento de preenchimento

Além do procedimento comum de `prompts/_comum.md`:

1. Organize as entradas em duas listas: perguntas frequentes (FAQ) e situações de troubleshooting com sintoma → causa → diagnóstico → correção.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **sete regras duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 2 (Anti-alucinação):** esta seção é especialmente vulnerável a invenções. Cada cenário precisa estar sustentado por código, configuração ou documento existente. Sem evidência, omita.
- **Regra 1 (Evidência rastreável):** cada cenário cita o arquivo de origem (classe de exceção, configuração, documento).

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/14-faq-e-troubleshooting.md`, com FAQ e troubleshooting organizados, cada entrada sustentada por evidência citada.

## Comportamento por nível

Existe apenas em `L3`. Se invocado com `nível` igual a `L1` ou `L2` (ou fora de `L1|L2|L3`), retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, esta seção é **única no workspace** (`<pasta-de-saída>/14-faq-e-troubleshooting.md`), consolidando cenários comuns. Cenários específicos a um app aparecem com nota indicando o app de origem.

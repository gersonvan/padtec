# Sub-prompt PADTec — Interface externa

## Parâmetros recebidos do orquestrador

Os seis parâmetros (`nível`, `variante`, `pasta-de-saída`, `capacidades-ativas`, `modo-monorepo`, `raiz-do-projeto-destino`) chegam conforme o contrato de invocação de `prompts/00-mestre.md`, detalhado em `prompts/_comum.md`, que também fixa o procedimento comum de preenchimento e a guarda por nível.

## Template a preencher

Leia integralmente `templates/nucleo/07-interface-externa.md`. Esta seção não existe em `L1`.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique **todos** os endpoints expostos pelo sistema. Combine duas estratégias para garantir cobertura: a) leitura de classes/funções marcadas por decoradores ou anotações de roteamento do framework detectado; b) leitura de arquivos de roteamento declarativos (roteamento file-based ou tabelas de rotas explícitas). A união das duas listas é a fonte de verdade. Quando o sistema expõe contrato declarado (ex.: arquivo OpenAPI, GraphQL schema, definição de gRPC), use também como fonte cruzada.
2. Para cada endpoint, extraia: método, caminho, autenticação exigida, formato de requisição, formato de resposta, classes de erro retornadas. Cite `arquivo:linha` da definição.
3. Identifique consumo e publicação de mensagens: handlers de mensagens, decoradores/anotações de subscrição, chamadas a clientes de publicação. Para cada canal, extraia: direção (consumido/publicado), nome do canal, esquema da mensagem, garantia de entrega quando declarada. Quando o sistema não consome nem publica mensagens, registre "Não aplicável".
4. Identifique consumidores externos conhecidos: lista de origens autorizadas (configuração de CORS), registros de chaves de acesso/clientes em arquivos de seed ou migrations, documentação de integradores.
5. Para o diagrama de fluxo entre chamador e sistema, selecione um endpoint representativo e rastreie o caminho como em `06-fluxos-de-negocio.md`, com foco no contrato externo.

## Procedimento de preenchimento

Além do procedimento comum de `prompts/_comum.md`:

1. Para o bloco `mermaid` placeholder do tipo `sequenceDiagram`, gere o diagrama do endpoint representativo selecionado, com participantes Chamador, Sistema e dependências externas relevantes.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **sete regras duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 4 (Cobertura exaustiva):** esta seção é o exemplar canônico da regra. **Toda** rota e **todo** manipulador de mensagem do sistema aparece em alguma tabela. Cobertura parcial é falha de QA.
- **Regra 1 (Evidência rastreável):** cada linha de tabela cita `arquivo:linha` da definição.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/07-interface-externa.md`, com tabelas exaustivas de endpoints síncronos e de mensagens (consumidas/publicadas), tabela de consumidores externos identificados, e diagrama Mermaid `sequenceDiagram` do endpoint representativo.

## Comportamento por nível

Existe apenas em `L2` e `L3`. Os templates de `L2` e `L3` compartilham o mesmo esqueleto nesta seção. Se invocado com `nível` igual a `L1` (ou fora de `L1|L2|L3`), retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, esta seção é gerada **por app que expõe interface externa**: `<pasta-de-saída>/apps/<nome-do-app>/07-interface-externa.md`. Não há agregação no nível de workspace, pois cobertura exaustiva por app evita ambiguidade. Quando um endpoint é exposto por gateway compartilhado em `packages/`, registre-o no app que o monta.

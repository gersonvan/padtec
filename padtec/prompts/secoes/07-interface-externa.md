# Sub-prompt PADTec — Interface externa

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

## Template a preencher

Leia integralmente `templates/<nível-resolvido>/07-interface-externa.md`, onde `<nível-resolvido>` é `L2-completo` para `L2` ou `L3-aprofundado` para `L3`. Esta seção não existe em `L1`.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique **todos** os endpoints expostos pelo sistema. Combine duas estratégias para garantir cobertura: a) leitura de classes/funções marcadas por decoradores ou anotações de roteamento do framework detectado; b) leitura de arquivos de roteamento declarativos (roteamento file-based ou tabelas de rotas explícitas). A união das duas listas é a fonte de verdade. Quando o sistema expõe contrato declarado (ex.: arquivo OpenAPI, GraphQL schema, definição de gRPC), use também como fonte cruzada.
2. Para cada endpoint, extraia: método, caminho, autenticação exigida, formato de requisição, formato de resposta, classes de erro retornadas. Cite `arquivo:linha` da definição.
3. Identifique consumo e publicação de mensagens: handlers de mensagens, decoradores/anotações de subscrição, chamadas a clientes de publicação. Para cada canal, extraia: direção (consumido/publicado), nome do canal, esquema da mensagem, garantia de entrega quando declarada. Quando o sistema não consome nem publica mensagens, registre "Não aplicável".
4. Identifique consumidores externos conhecidos: lista de origens autorizadas (configuração de CORS), registros de chaves de acesso/clientes em arquivos de seed ou migrations, documentação de integradores.
5. Para o diagrama de fluxo entre chamador e sistema, selecione um endpoint representativo e rastreie o caminho como em `06-fluxos-de-negocio.md`, com foco no contrato externo.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Para o bloco `mermaid` placeholder do tipo `sequenceDiagram`, gere o diagrama do endpoint representativo selecionado, com participantes Chamador, Sistema e dependências externas relevantes.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 4 (Cobertura exaustiva):** esta seção é o exemplar canônico da regra. **Toda** rota e **todo** manipulador de mensagem do sistema aparece em alguma tabela. Cobertura parcial é falha de QA.
- **Regra 1 (Evidência rastreável):** cada linha de tabela cita `arquivo:linha` da definição.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/07-interface-externa.md`, com tabelas exaustivas de endpoints síncronos e de mensagens (consumidas/publicadas), tabela de consumidores externos identificados, e diagrama Mermaid `sequenceDiagram` do endpoint representativo.

## Comportamento por nível

Existe apenas em `L2` e `L3`. Em `L3`, o template pode requerer detalhamento adicional (esquemas, exemplos, códigos de erro tabulados); siga o template. Se invocado com `nível` igual a `L1` (ou fora de `L1|L2|L3`), retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, esta seção é gerada **por app que expõe interface externa**: `<pasta-de-saída>/apps/<nome-do-app>/07-interface-externa.md`. Não há agregação no nível de workspace, pois cobertura exaustiva por app evita ambiguidade. Quando um endpoint é exposto por gateway compartilhado em `packages/`, registre-o no app que o monta.

# Sub-prompt PADTec — Fluxos de negócio

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

## Template a preencher

Leia integralmente `templates/<nível-resolvido>/06-fluxos-de-negocio.md`, onde `<nível-resolvido>` é `L2-completo` para `L2` ou `L3-aprofundado` para `L3`. Esta seção não existe em `L1`.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique os casos de uso principais a partir de: nomes de rotas/endpoints expostos, módulos top-level por feature/domínio, descrições de caso de uso em `README.md` ou em `docs/` existentes, nomes de testes de integração ou end-to-end.
2. Para cada caso de uso selecionado, rastreie o caminho de execução: ponto de entrada → camada(s) intermediária(s) → camada de persistência ou integração → resposta ao chamador. Use os imports e as chamadas para construir a sequência.
3. Identifique caminhos de erro relevantes: validações que falham antes de prosseguir, dependências externas que podem falhar, autorização negada, conflito de estado. Para cada caminho de erro, anote o ponto onde o erro é detectado e como é propagado.
4. Identifique pontos de assincronia (mensagens publicadas, jobs disparados, callbacks) que façam parte do fluxo principal. Esses pontos entram no diagrama como interações com componentes externos ou com filas.
5. Quando houver documentação narrativa pré-existente do fluxo (em `README.md` ou em `docs/`), referencie-a; ela complementa e não substitui a evidência em código.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Para o bloco `mermaid` placeholder do tipo `sequenceDiagram`, gere um diagrama por caso de uso principal. Diagrama mínimo: dois participantes e duas mensagens significativas baseadas em código real. Inclua caminhos de erro relevantes (mensagens alt/opt).
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 1 (Evidência rastreável):** cada passo do fluxo cita `arquivo:linha` do código que o implementa.
- **Regra 2 (Anti-alucinação):** quando uma etapa for inferida sem código que a sustente, registre `// CARÊNCIA` em vez de presumir.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/06-fluxos-de-negocio.md`, com casos de uso descritos passo a passo, diagramas Mermaid `sequenceDiagram` gerados (em L2/L3), caminhos de erro relevantes documentados.

## Comportamento por nível

Existe apenas em `L2` e `L3`. Em `L3`, o template pode requerer mais fluxos cobertos ou subdiagramas adicionais; siga o template. Se invocado com `nível` igual a `L1` (ou fora de `L1|L2|L3`), retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, gere o documento por app aplicacional cujos fluxos sejam internos àquele app (`<pasta-de-saída>/apps/<nome-do-app>/06-fluxos-de-negocio.md`). Fluxos que cruzam apps (ex.: `apps/web` chama `apps/api`) entram no documento de workspace (`<pasta-de-saída>/06-fluxos-de-negocio.md`).

# Sub-prompt PADTec — Frontend

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

## Template a preencher

Leia integralmente `templates/<nível-resolvido>/08-frontend.md`, onde `<nível-resolvido>` é `L2-completo` para `L2` ou `L3-aprofundado` para `L3`. Esta seção não existe em `L1`.

Quando a `variante` for `backend-api`, `automacao-script` ou `iac`, o frontend é geralmente inexistente — preencha a seção registrando `// CARÊNCIA: não aplicável a esta variante` nas subseções que pressupõem frontend, conforme a regra 2 (anti-alucinação).

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique a estratégia de roteamento: roteamento file-based (estrutura de pastas que define rotas) ou roteamento code-based (declaração explícita de rotas). Liste as rotas top-level e o componente associado a cada uma.
2. Identifique o padrão de composição de telas/páginas: componentes atômicos, organização por feature, padrão de layout compartilhado, gerência de slots/outlets.
3. Identifique o padrão de gerência de estado: estado local de componente, estado global compartilhado, estado de servidor cacheado, contextos/stores declarados.
4. Identifique a integração com a interface externa: cliente HTTP usado, geração de tipos a partir do contrato (quando aplicável), pontos de fetch declarados, política de re-fetch e cache.
5. Identifique a estratégia de renderização adotada e os pontos onde isso é declarado: SSR, SSG, CSR, RSC ou modos híbridos; arquivos de configuração que controlam o build e o runtime.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Quando o template pedir diagrama Mermaid (por exemplo, mapa de rotas), gere-o a partir da estrutura real.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 4 (Cobertura exaustiva):** a lista de rotas top-level cobre todas as rotas declaradas no projeto.
- **Regra 1 (Evidência rastreável):** cada decisão de roteamento, estado e renderização cita `arquivo:linha` ou `arquivo`.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/08-frontend.md`, com roteamento mapeado, padrão de composição descrito, gerência de estado catalogada, integração com a interface externa documentada, estratégia de renderização explicada.

## Comportamento por nível

Existe apenas em `L2` e `L3`. Em `L3`, o template pode pedir aprofundamento (mapa visual de rotas, decisões de performance, política de cache); siga o template. Se invocado com `nível` igual a `L1` (ou fora de `L1|L2|L3`), retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, esta seção é gerada por app frontend identificado: `<pasta-de-saída>/apps/<nome-do-app>/08-frontend.md`. Apps somente-backend não geram esta seção.

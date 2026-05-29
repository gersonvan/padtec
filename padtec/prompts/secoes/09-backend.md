# Sub-prompt PADTec — Backend

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

## Template a preencher

Leia integralmente `templates/<nível-resolvido>/09-backend.md`, onde `<nível-resolvido>` é `L2-completo` para `L2` ou `L3-aprofundado` para `L3`. Esta seção não existe em `L1`.

Quando a `variante` for `frontend-site`, esta seção pode ser inteiramente inaplicável — registre `// CARÊNCIA: não aplicável a esta variante` conforme a regra 2. Para `automacao-script` e `iac`, adapte conforme orientação da variante.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Catalogue **todos** os módulos top-level do backend: pastas em `src/`/`app/`/`apps/<api>/src/` ou equivalentes, agrupando por responsabilidade aparente (domínio, infraestrutura, transporte, jobs).
2. Catalogue **todos** os controladores/handlers de transporte: classes/funções marcadas por convenções do framework detectado (decoradores, anotações, prefixos, registro em tabelas de rotas). A lista é exaustiva.
3. Catalogue serviços/aplicação e repositórios/adapters: pelos sufixos/prefixos convencionais, pelos diretórios e pelos imports a partir dos controladores.
4. Descreva o ciclo de vida de uma requisição: ponto de entrada → middlewares/guards/filtros → controlador → serviço → repositório → resposta. Cite o arquivo do framework ou da configuração que define a ordem.
5. Catalogue padrões de tratamento de erro: filtros de exceção, mapeamento de erro para resposta, política de logging de erro, classes de erro do domínio. Cite `arquivo:linha`.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Quando o template pedir diagrama Mermaid (ex.: ciclo de vida da requisição), gere-o a partir do código real.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 4 (Cobertura exaustiva):** todo módulo, classe-controlador, serviço e job encontrado no código aparece em alguma tabela.
- **Regra 1 (Evidência rastreável):** cada item cita `arquivo:linha` da declaração.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/09-backend.md`, com tabelas exaustivas de módulos, controladores, serviços e repositórios, descrição do ciclo de vida de uma requisição, padrões de tratamento de erro documentados.

## Comportamento por nível

Existe apenas em `L2` e `L3`. Em `L3`, o template pode pedir aprofundamento (padrões de injeção de dependência, política de transações por método, decisões de design por módulo); siga o template. Se invocado com `nível` igual a `L1` (ou fora de `L1|L2|L3`), retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, esta seção é gerada por app backend identificado: `<pasta-de-saída>/apps/<nome-do-app>/09-backend.md`. Apps somente-frontend não geram esta seção. Pacotes compartilhados em `packages/` que contenham lógica de backend (ex.: módulo de domínio comum) aparecem como dependência referenciada nos apps que os consomem.

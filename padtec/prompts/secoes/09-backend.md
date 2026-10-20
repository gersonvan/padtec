# Sub-prompt PADTec — Backend

## Parâmetros recebidos do orquestrador

Os seis parâmetros (`nível`, `variante`, `pasta-de-saída`, `capacidades-ativas`, `modo-monorepo`, `raiz-do-projeto-destino`) chegam conforme o contrato de invocação de `prompts/00-mestre.md`, detalhado em `prompts/_comum.md`, que também fixa o procedimento comum de preenchimento e a guarda por nível.

## Template a preencher

Leia integralmente `templates/nucleo/09-backend.md`. Esta seção não existe em `L1`.

Quando a `variante` for `frontend-site`, esta seção pode ser inteiramente inaplicável — registre `// CARÊNCIA: não aplicável a esta variante` conforme a regra 2. Para `automacao-script` e `iac`, adapte conforme orientação da variante.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Catalogue **todos** os módulos top-level do backend: pastas em `src/`/`app/`/`apps/<api>/src/` ou equivalentes, agrupando por responsabilidade aparente (domínio, infraestrutura, transporte, jobs).
2. Catalogue **todos** os controladores/handlers de transporte: classes/funções marcadas por convenções do framework detectado (decoradores, anotações, prefixos, registro em tabelas de rotas). A lista é exaustiva.
3. Catalogue serviços/aplicação e repositórios/adapters: pelos sufixos/prefixos convencionais, pelos diretórios e pelos imports a partir dos controladores.
4. Descreva o ciclo de vida de uma requisição: ponto de entrada → middlewares/guards/filtros → controlador → serviço → repositório → resposta. Cite o arquivo do framework ou da configuração que define a ordem.
5. Catalogue padrões de tratamento de erro: filtros de exceção, mapeamento de erro para resposta, política de logging de erro, classes de erro do domínio. Cite `arquivo:linha`.

## Procedimento de preenchimento

Além do procedimento comum de `prompts/_comum.md`:

1. Quando o template pedir diagrama Mermaid (ex.: ciclo de vida da requisição), gere-o a partir do código real.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **sete regras duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 4 (Cobertura exaustiva):** todo módulo, classe-controlador, serviço e job encontrado no código aparece em alguma tabela.
- **Regra 1 (Evidência rastreável):** cada item cita `arquivo:linha` da declaração.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/09-backend.md`, com tabelas exaustivas de módulos, controladores, serviços e repositórios, descrição do ciclo de vida de uma requisição, padrões de tratamento de erro documentados.

## Comportamento por nível

Existe apenas em `L2` e `L3`. Os templates de `L2` e `L3` compartilham o mesmo esqueleto nesta seção. Se invocado com `nível` igual a `L1` (ou fora de `L1|L2|L3`), retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, esta seção é gerada por app backend identificado: `<pasta-de-saída>/apps/<nome-do-app>/09-backend.md`. Apps somente-frontend não geram esta seção. Pacotes compartilhados em `packages/` que contenham lógica de backend (ex.: módulo de domínio comum) aparecem como dependência referenciada nos apps que os consomem.

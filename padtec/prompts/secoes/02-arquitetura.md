# Sub-prompt PADTec — Arquitetura

## Parâmetros recebidos do orquestrador

Os seis parâmetros (`nível`, `variante`, `pasta-de-saída`, `capacidades-ativas`, `modo-monorepo`, `raiz-do-projeto-destino`) chegam conforme o contrato de invocação de `prompts/00-mestre.md`, detalhado em `prompts/_comum.md`, que também fixa o procedimento comum de preenchimento e a guarda por nível.

## Template a preencher

Leia integralmente `templates/nucleo/02-arquitetura.md`. Esse arquivo é o template autoritativo desta seção.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique as camadas arquiteturais a partir da estrutura de diretórios em `src/`, `app/`, `apps/`, `packages/`, `cmd/`, `lib/` ou equivalentes do ecossistema detectado. Documente o critério de separação (por camada, por feature, por domínio).
2. Identifique pontos de entrada do sistema lendo o manifesto principal (campo `main`/`scripts.start`, classes anotadas como ponto de entrada do framework detectado, função `main`).
3. Mapeie dependências entre módulos lendo `import`/`require`/`use`/`using` em arquivos top-level por camada; identifique o sentido das dependências para o diagrama.
4. Identifique fronteiras com sistemas externos (clientes HTTP nomeados, conexões a serviços de plataforma, leitura/escrita em armazenamento, publicação/consumo de mensagens) — sem detalhar; o aprofundamento vive nas seções específicas e nas condicionais.
5. Procure por arquivos de decisão arquitetural (`ADR/`, `docs/adr/`, `decisions/`, ou similar) para sustentar a seção de "decisões de design e seus motivos".

## Procedimento de preenchimento

Além do procedimento comum de `prompts/_comum.md`:

1. Para cada bloco `mermaid` placeholder, em qualquer nível, gere um diagrama `flowchart` (LR ou TB) representando as camadas identificadas e as dependências entre elas. Diagrama mínimo: dois nós e uma aresta significativa baseada em código real. Em `L1`, diagrama é opcional conforme o template; respeite o template.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **sete regras duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 1 (Evidência rastreável):** cada camada, dependência ou decisão arquitetural cita `arquivo:linha` ou `arquivo` que a evidencia.
- **Regra 2 (Anti-alucinação):** quando uma decisão arquitetural for inferida sem documento ou padrão de código claro, registre `// CARÊNCIA`.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/02-arquitetura.md`, com placeholders preenchidos, diretivas executadas, diagrama Mermaid `flowchart` gerado, evidências citadas e ausências marcadas com `// CARÊNCIA`.

## Comportamento por nível

Os templates dos três níveis compartilham o mesmo esqueleto nesta seção; o diagrama de camadas é obrigatório em todos. Se invocado com `nível` fora de `L1|L2|L3`, retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, esta seção é produzida **uma vez como visão de workspace** em `<pasta-de-saída>/02-arquitetura.md` (camadas e fronteiras do sistema como um todo). Para cada app aplicacional, o sub-prompt produz adicionalmente um `<pasta-de-saída>/apps/<nome-do-app>/02-arquitetura.md` com a arquitetura interna daquele app, conforme orientação da variante.

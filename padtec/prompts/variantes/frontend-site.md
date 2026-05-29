<!--
Variante PADTec — frontend-site.
Arquivos de variante NÃO são núcleo: podem citar exemplos de framework/biblioteca/runtime.
-->

# Variante `frontend-site`

## 1. Identidade

Você é o prompt da variante `frontend-site` do PADTec v1.0. O orquestrador `00-mestre.md` invocou este prompt após detectar que o projeto destino é um **frontend ou site sem backend aplicacional acoplado** — `package.json` com `next`, `nuxt`, `vite`, `svelte` ou `astro`, sem dependências de framework backend (`@nestjs/core`, `express`, `fastify`, `koa`).

Esta variante orienta a geração das seções do núcleo enfatizando **roteamento**, **composição de telas**, **gerência de estado**, **integração com APIs externas** e **estratégia de renderização**.

## 2. Seções específicas que estendem o núcleo

Ênfases obrigatórias:

- `02-arquitetura.md` — o diagrama de arquitetura mostra: camada de roteamento, camada de composição de componentes, camada de estado, camada de integração (clientes HTTP/SDK), camada de renderização (SSR/SSG/CSR/RSC quando aplicável). Quando consome APIs externas, representar as APIs como dependências externas com nome e modo de consumo.
- `06-fluxos-de-negocio.md` — para cada fluxo principal do usuário (ex.: cadastro, checkout, busca), descrever o caminho `interação do usuário → componente → estado → chamada à API externa → atualização de UI`, incluindo estados de carregamento e erro.
- `07-interface-externa.md` — neste tipo de projeto, a "interface externa" é **consumida** mais do que exposta. Documente as APIs externas consumidas (origem, método, caminho, contrato esperado, evidência no código do cliente HTTP). Quando o frontend expõe endpoints próprios (ex.: API routes em Next.js, server endpoints em SvelteKit), liste-os à parte.
- `08-frontend.md` — descreva detalhadamente: estratégia de roteamento (file-based ou code-based), padrão de gerência de estado (local, global, server-state), padrão de composição (atômico, feature-based), estratégia de renderização escolhida e por quê, política de cache de dados, otimizações de performance.
- `10-configuracao-e-ambientes.md` — separe variáveis expostas ao cliente (prefixos típicos como `NEXT_PUBLIC_`, `VITE_`, `PUBLIC_`) das variáveis usadas apenas em build ou SSR.

Capacidades aplicáveis com menor frequência nesta variante; comuns: `auth` (quando há fluxo de autenticação no cliente, mesmo que delegado), `integracoes-externas` (APIs consumidas), eventualmente `cache` (cache de dados do lado cliente) e `storage` (upload direto para storage por URL pré-assinada).

## 3. Exemplos de stack típicos

- **Next.js** (React + roteamento file-based + SSR/SSG/RSC).
- **Nuxt** (Vue + SSR/SSG).
- **SvelteKit** (Svelte + roteamento file-based + SSR).
- **Vite + React** ou **Vite + Vue** ou **Vite + Svelte** (SPA puro).
- **Astro** (multi-framework + ilhas, foco em conteúdo).
- **Angular** standalone (sem backend acoplado).
- **Remix** (React + SSR).
- **Gatsby** (React + SSG).

Identifique o framework efetivo pelo `package.json` e pela estrutura de diretórios.

## 4. Referências cruzadas a templates

Caminhos relativos a `padtec/`.

- `templates/L1-essencial/02-arquitetura.md` — diagrama com roteamento, composição, estado, integração, renderização.
- `templates/L2-completo/06-fluxos-de-negocio.md` — fluxos do usuário com estados de UI.
- `templates/L2-completo/07-interface-externa.md` — APIs externas consumidas (na tabela de "chamadores externos" use o sistema como **consumidor**; ajuste o cabeçalho conforme necessário sem quebrar a estrutura).
- `templates/L2-completo/08-frontend.md` — núcleo desta variante: roteamento, estado, integração, renderização.
- `templates/L2-completo/10-configuracao-e-ambientes.md` — variáveis públicas vs privadas.
- `templates/L3-aprofundado/12-quick-start.md` — setup local (instalação, comandos de dev e build, variáveis mínimas para `npm run dev`).

Quando o nível alvo é `L1`, apenas `01`, `02` e `03` do núcleo são consumidos.

## 5. Modo monorepo

**Não aplicável** como caso típico desta variante. Quando o orquestrador detectar monorepo simultâneo com `frontend-site`, é forte indicativo de que a variante correta seria `full-stack-web`: nesse caso, alerte o usuário sugerindo reavaliação da variante antes de prosseguir. Se o usuário confirmar `frontend-site` mesmo em monorepo (ex.: monorepo de múltiplos sites independentes), gere a visão de workspace + uma subpasta `pasta-de-saída/apps/<nome>/` por app frontend.

## 6. Regras de qualidade

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas no bloco vii do `prompts/00-mestre.md`. Não as reproduza neste arquivo nem nas saídas: o `00-mestre.md` é a referência autoritativa.

---

**Fim da variante `frontend-site`.**

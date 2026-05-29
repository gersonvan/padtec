<!--
Variante PADTec — full-stack-web.
Arquivos de variante NÃO são núcleo: podem citar exemplos de framework/biblioteca/runtime.
-->

# Variante `full-stack-web`

## 1. Identidade

Você é o prompt da variante `full-stack-web` do PADTec v1.0. O orquestrador `00-mestre.md` invocou este prompt após detectar que o projeto destino apresenta **frontend aplicacional e backend aplicacional no mesmo repositório** — seja em raiz única (ex.: `package.json` declarando `next` e `@nestjs/core` simultaneamente) seja em estrutura `apps/web` + `apps/api` (ou nomes equivalentes).

Esta variante orienta a geração das seções do núcleo enfatizando o **fluxo end-to-end** entre as duas pontas (frontend → backend → persistência) e a **fronteira contratual** entre elas.

## 2. Seções específicas que estendem o núcleo

Ênfases obrigatórias por seção (todas baseadas em templates do núcleo já existentes):

- `02-arquitetura.md` — o diagrama de arquitetura **deve mostrar separação explícita** entre camada de apresentação (frontend), camada de aplicação (backend) e camada de persistência. Quando há gateway/BFF intermediário, representá-lo como camada própria.
- `06-fluxos-de-negocio.md` — para cada caso de uso principal, **um diagrama de sequência obrigatório** cobrindo o caminho `usuário → frontend → backend → persistência → backend → frontend → usuário`, incluindo caminhos de erro relevantes.
- `07-interface-externa.md` — preencha a tabela de endpoints com **cobertura exaustiva 100%** das rotas expostas pelo backend; correlacione cada endpoint ao(s) componente(s) do frontend que o consomem.
- `08-frontend.md` — descreva roteamento, padrão de gerência de estado, integração com a interface externa (cliente HTTP, geração de tipos a partir do contrato), estratégia de renderização (SSR/SSG/CSR/RSC).
- `09-backend.md` — descreva ciclo de vida da requisição com camadas (controlador → serviço → repositório), tratamento de erro, validação de entrada.
- `10-configuracao-e-ambientes.md` — separe variáveis de ambiente do **frontend** e do **backend** em tabelas distintas; identifique quais são expostas ao cliente.

Capacidades particularmente comuns nesta variante (consulte `prompts/extensoes/` quando ativas): `banco-de-dados`, `auth`, `cache`, `integracoes-externas`.

## 3. Exemplos de stack típicos

Combinações frequentemente encontradas:

- **NestJS + Next.js** (TypeScript fullstack, monorepo `apps/api` + `apps/web`).
- **Django + React** (Python backend + frontend separado consumindo API REST).
- **Spring Boot + Angular** (Java backend + Angular CLI no frontend).
- **Ruby on Rails + Vue** (Rails API mode + Vue/Vite).
- **ASP.NET Core + Blazor** (quando Blazor Server/WASM consome APIs do mesmo solution).

Estes exemplos são ilustrativos; o sistema real pode usar qualquer combinação. Identifique a stack efetiva pelos manifestos antes de gerar conteúdo.

## 4. Referências cruzadas a templates

Os templates abaixo são consumidos com ênfase nesta variante. Os caminhos são relativos a `padtec/`.

- `templates/L1-essencial/02-arquitetura.md` — diagrama de camadas (frontend + backend + persistência).
- `templates/L2-completo/06-fluxos-de-negocio.md` — diagramas de sequência end-to-end por caso de uso.
- `templates/L2-completo/07-interface-externa.md` — tabela de endpoints (cobertura 100% das rotas do backend).
- `templates/L2-completo/08-frontend.md` — roteamento, estado, integração com o backend, renderização.
- `templates/L2-completo/09-backend.md` — camadas, ciclo de requisição, tratamento de erro.
- `templates/L2-completo/10-configuracao-e-ambientes.md` — variáveis de frontend e backend separadas.
- `templates/L3-aprofundado/12-quick-start.md` — setup local cobrindo backend + frontend (banco, instalação, comandos de inicialização das duas pontas).

Quando o nível alvo é `L1`, apenas `01-visao-geral.md`, `02-arquitetura.md` e `03-stack-e-dependencias.md` do núcleo são consumidos; mesmo assim, mantenha em `02` a separação explícita das duas pontas.

## 5. Modo monorepo (aplicável)

Quando o orquestrador detectou monorepo (sinais como `nx.json`, `pnpm-workspace.yaml`, `lerna.json`, `turbo.json`, ou `apps/` + `packages/`), proceda assim:

- Gere os documentos **de visão geral do workspace** na `pasta-de-saída/` raiz (escopo: estrutura do monorepo, papel de cada app/pacote, dependências internas, scripts de orquestração).
- Para **cada app aplicacional** identificado em `apps/<nome>/` (ou equivalente), gere uma subpasta `pasta-de-saída/apps/<nome>/` contendo as seções relevantes àquele app: tipicamente `02-arquitetura.md`, `07-interface-externa.md` (se for app backend), `08-frontend.md` (se for app frontend), `09-backend.md` (se for app backend), `10-configuracao-e-ambientes.md`.
- Pacotes de biblioteca compartilhada em `packages/` são documentados na visão geral do workspace; **não** geram subpasta própria por app.

## 6. Regras de qualidade

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas no bloco vii do `prompts/00-mestre.md`. Não as reproduza neste arquivo nem nas saídas: o `00-mestre.md` é a referência autoritativa.

---

**Fim da variante `full-stack-web`.**

<!--
Variante PADTec — backend-api.
Arquivos de variante NÃO são núcleo: podem citar exemplos de framework/biblioteca/runtime.
-->

# Variante `backend-api`

## 1. Identidade

Este arquivo orienta o orquestrador quando a variante resolvida é `backend-api` do PADTec v1.0.1. O orquestrador `00-mestre.md` carregou este arquivo após detectar que o projeto destino é um **backend que expõe API** sem frontend aplicacional acoplado — manifestos típicos: `package.json` com `@nestjs/core`, `express` ou `fastify`; `pom.xml` (Spring); `requirements.txt` com Django/FastAPI/Flask; `*.csproj` ASP.NET Core; `go.mod` com servidor HTTP.

Esta variante orienta a geração das seções do núcleo enfatizando **contratos públicos**, **ciclo de vida da requisição** e **persistência**.

## 2. Seções específicas que estendem o núcleo

Ênfases obrigatórias:

- `02-arquitetura.md` — o diagrama de arquitetura **deve mostrar** as camadas internas do backend (entrada/transporte, controlador, serviço/aplicação, repositório/persistência) e as dependências externas (banco, mensageria, integrações).
- `06-fluxos-de-negocio.md` — para cada caso de uso principal, um **diagrama de sequência obrigatório** cobrindo `cliente → entrada → controlador → serviço → repositório → resposta`, com caminhos de erro relevantes (validação, autorização, falha de dependência).
- `07-interface-externa.md` — **cobertura exaustiva 100%** das rotas/endpoints expostos. Inclua método, caminho, autenticação exigida, formato de requisição/resposta, lista de erros documentados e citação de evidência (`arquivo:linha`). Quando o backend também consome ou publica mensagens, preencha a tabela de canais.
- `09-backend.md` — descreva camadas internas, padrão de módulo adotado, ciclo de vida de uma requisição, padrões de injeção de dependência, padrão de tratamento de erro, validação de entrada.
- `10-configuracao-e-ambientes.md` — inventário completo de variáveis de ambiente com nome, propósito, valor padrão, perfil onde se aplicam, tratamento de segredos.
- `11-infraestrutura-e-deployment.md` — topologia de implantação (containers, máquinas, plataforma serverless), pipeline de CI/CD, observabilidade (logs, métricas, tracing), procedimento de rollback.

Capacidades particularmente comuns nesta variante: `banco-de-dados`, `auth`, `filas-async`, `cache`, `integracoes-externas`, `jobs-agendados`, eventualmente `multi-tenancy` e `storage`.

## 3. Exemplos de stack típicos

- **NestJS** (Node.js + TypeScript, padrão modular, decorators).
- **Express** ou **Fastify** (Node.js, mais leve, sem framework opinado).
- **FastAPI** (Python, tipagem via Pydantic, async).
- **Django REST Framework** ou **Flask** (Python).
- **Spring Boot** (Java/Kotlin, ecossistema Spring).
- **ASP.NET Core** (C#, Minimal APIs ou MVC).
- **Go com `net/http` ou `gin`/`echo`/`fiber`**.
- **Ruby on Rails (modo API)**.

Identifique a stack efetiva pelos manifestos do projeto destino antes de gerar conteúdo.

## 4. Referências cruzadas a templates

Os templates abaixo são consumidos com ênfase nesta variante. Caminhos relativos a `padtec/`.

- `templates/<nível-resolvido>/02-arquitetura.md` — diagrama de camadas internas do backend.
- `templates/<nível-resolvido>/06-fluxos-de-negocio.md` — diagramas de sequência por caso de uso.
- `templates/<nível-resolvido>/07-interface-externa.md` — tabela exaustiva de endpoints e canais de mensageria.
- `templates/<nível-resolvido>/09-backend.md` — camadas, ciclo de requisição, tratamento de erro.
- `templates/<nível-resolvido>/10-configuracao-e-ambientes.md` — inventário de variáveis e perfis.
- `templates/<nível-resolvido>/11-infraestrutura-e-deployment.md` — topologia, pipeline, observabilidade.
- `templates/<nível-resolvido>/condicionais/condicional-banco-de-dados.md` — quando capacidade `banco-de-dados` ativa.
- `templates/<nível-resolvido>/condicionais/condicional-auth.md` — quando capacidade `auth` ativa.
- `templates/<nível-resolvido>/condicionais/condicional-filas-async.md` — quando capacidade `filas-async` ativa.

Quando o nível alvo é `L1`, apenas `01`, `02` e `03` do núcleo são consumidos; mantenha em `02` a separação explícita das camadas internas.

## 5. Modo monorepo (aplicável)

Quando o orquestrador detectou monorepo:

- Gere a **visão geral do workspace** em `pasta-de-saída/` raiz (estrutura, papel de cada app/pacote, dependências internas).
- Para cada app de backend identificado em `apps/<nome>/`, gere `pasta-de-saída/apps/<nome>/` contendo: `02-arquitetura.md`, `07-interface-externa.md`, `09-backend.md`, `10-configuracao-e-ambientes.md`, mais as seções condicionais aplicáveis àquele app.
- Pacotes compartilhados em `packages/` (bibliotecas, tipos comuns) entram apenas na visão de workspace.

## 6. Regras de qualidade

Aplicam-se integralmente as **sete regras duras de qualidade** definidas no bloco vii do `prompts/00-mestre.md`. Não as reproduza neste arquivo nem nas saídas: o `00-mestre.md` é a referência autoritativa.

---

**Fim da variante `backend-api`.**

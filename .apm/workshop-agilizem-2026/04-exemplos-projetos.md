# Exemplos de Projetos — 3 Variantes Mínimas

## 📌 Objetivo

Fornecer **3 exemplos reais e reproduzíveis** que você pode demonstrar durante o workshop ou que grupos podem estudar para aprofundar. Cada exemplo segue o padrão universal e usa **engenharia reversa** como método.

---

## 🎯 Estrutura Geral de Cada Exemplo

```
Exemplo: [Nome do Projeto]
├─ Tipo: [Variante]
├─ Capabilities Ativas: [Lista]
├─ Padrão Identificado
│  ├─ Núcleo (3 seções)
│  ├─ Condicionais (5-6 seções ativas)
│  └─ L1/L2/L3 proposto
├─ Engenharia Reversa
│  ├─ Onde procurar no código
│  ├─ Comandos verificáveis
│  └─ Evidências encontradas
└─ Documentação (esboço L1)
```

---

## 1️⃣ EXEMPLO 1: Backend-API (Node.js + Express + PostgreSQL)

### **Projeto: `user-service`**

**Descrição:** Microsserviço de autenticação e gestão de usuários. API REST que maneja login, registro, autenticação JWT.

**Tipo:** Backend-API

**Características Técnicas:**
- Framework: Express.js 4.18
- Linguagem: Node.js 18
- Banco: PostgreSQL 14 + Sequelize ORM
- Auth: JWT + Refresh Token
- Queue: Bull (Redis)
- Cache: Redis
- Hosted: Docker + Kubernetes

---

### **PADRÃO IDENTIFICADO**

#### **Núcleo (3 seções universais)**

1. **Visão Geral**
   - Propósito: "Microsserviço que autentica usuários e emite JWT tokens"
   - Usuários: Frontend, mobile app, backend services
   - Responsabilidades: Login, signup, token refresh, user profile

2. **Arquitetura**
   - Padrão: MVC (Model-View-Controller) adaptado pra API
   - Camadas: Router → Controller → Service → Repository → Model
   - Fluxo: HTTP request → middleware (auth) → controller → service (business logic) → repository (DB) → response

3. **Stack e Dependências**
   - Core: Node.js 18, Express 4.18, TypeScript 5.0
   - DB: PostgreSQL 14, Sequelize 6.35
   - Auth: jsonwebtoken 9.0
   - Cache/Queue: redis 4.6, bull 4.11
   - Ferramentas: Docker, Docker Compose

#### **Condicionais (5 Ativas)**

4. **Banco de Dados**
   - Tipo: PostgreSQL (relacional)
   - Tabelas principais: `users`, `sessions`, `refresh_tokens`
   - Migrations: /migrations/*.js

5. **Autenticação**
   - Tipo: JWT + Refresh Token strategy
   - Fluxo: POST /auth/login (email+password) → JWT + Refresh Token → Cliente armazena
   - Middleware: `auth.middleware.ts` valida token em cada request

6. **Cache (Redis)**
   - Tipo: Redis (in-memory cache)
   - Uso: Cache de sessão de usuário (5 min TTL)
   - Setup: Redis container em docker-compose.yml

7. **Fila (Bull)**
   - Tipo: Bull (job queue baseada em Redis)
   - Jobs: Email de boas-vindas, resetar senha
   - Workers: /workers/*.ts

8. **Integrações Externas**
   - Sendgrid: Envio de email
   - Stripe (opcional): Futura integração de pagamento

---

### **ENGENHARIA REVERSA** (Como Detectar)

| Capacidade | Procure Em | Comando | Evidência |
|---|---|---|---|
| **Banco de Dados** | `/src/models/`, `/migrations/` | `ls src/models/ && ls src/migrations/` | Encontra `User.ts`, `Session.ts`, `001_create_users.sql` |
| **ORM** | `package.json` | `grep sequelize package.json` | `"sequelize": "^6.35"` |
| **Autenticação** | `/src/middleware/`, `/src/controllers/auth*` | `grep -r "jwt\|token" src/middleware/` | Encontra `auth.middleware.ts` com `verify()` |
| **JWT Secret** | `.env.example` | `grep JWT .env.example` | `JWT_SECRET=your_secret_here` |
| **Queue** | `/src/workers/`, `package.json` | `grep bull package.json && ls src/workers/` | `"bull": "^4.11"`, encontra `emailWorker.ts` |
| **Redis** | `docker-compose.yml`, `/src/config/` | `grep -i redis docker-compose.yml` | `image: redis:7-alpine` |

---

### **ESTRUTURA DE PASTA** (Para Referência)

```
user-service/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── user.controller.ts
│   ├── middleware/
│   │   └── auth.middleware.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Session.ts
│   │   └── RefreshToken.ts
│   ├── repositories/
│   │   ├── user.repository.ts
│   │   └── session.repository.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── user.service.ts
│   ├── workers/
│   │   ├── email.worker.ts
│   │   └── password-reset.worker.ts
│   ├── routes/
│   │   └── auth.routes.ts
│   ├── config/
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── bull.ts
│   └── app.ts
├── migrations/
│   ├── 001_create_users.sql
│   ├── 002_create_sessions.sql
│   └── 003_create_refresh_tokens.sql
├── docker-compose.yml
├── Dockerfile
├── package.json
├── .env.example
└── README.md
```

---

### **L1 ESSENCIAL — Documentação Mínima** (300 palavras, 20 min leitura)

```markdown
# User Service — Visão Geral

## O Que É?

Microsserviço que autentica usuários e emite JWT tokens para a plataforma.

## Responsabilidades

- ✅ Registrar novos usuários
- ✅ Autenticar com email + senha
- ✅ Emitir JWT tokens (15 min expiry)
- ✅ Renovar tokens com refresh token
- ✅ Gerenciar sessões

## Arquitetura (Diagrama)

```
┌─────────────┐
│  Frontend   │
└──────┬──────┘
       │ POST /auth/login
       ▼
┌─────────────────────────────────────┐
│  Express Router                      │
│  ↓ auth.middleware (valida JWT)      │
│  ↓ auth.controller (mapeia request)  │
│  ↓ auth.service (business logic)     │
│  ↓ user.repository (query DB)        │
└─────────────────────────────────────┘
       │
       ▼
   PostgreSQL
   (users, sessions, refresh_tokens)
```

## Stack

- **Node.js 18** + **Express 4.18** (framework web)
- **PostgreSQL 14** (banco relacional)
- **Sequelize ORM** (query builder)
- **JWT** (stateless auth)
- **Redis** (cache + queue)
- **Bull** (job queue)

## Como Rodar

```bash
# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env
# Editar .env com credenciais PostgreSQL + Redis

# Rodar migrations
npm run migrate

# Iniciar servidor
npm run dev
# Servidor em http://localhost:3000
```

## Fluxo de Autenticação

```
1. POST /auth/register (email, password)
   → Valida email
   → Hash password (bcrypt)
   → Cria user em BD
   → Envia email de boas-vindas (via Bull)

2. POST /auth/login (email, password)
   → Busca user em BD
   → Compara password
   → Emite JWT (15 min) + Refresh Token (7 dias)
   → Retorna tokens ao cliente

3. POST /auth/refresh (refreshToken)
   → Valida refresh token
   → Emite novo JWT
   → Retorna novo JWT

4. GET /user (header: Authorization: Bearer <JWT>)
   → Valida JWT (auth.middleware)
   → Retorna user profile
```

## Variáveis de Ambiente

```
# .env.example
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=user_service
DB_USER=postgres
DB_PASSWORD=postgres

# Auth
JWT_SECRET=your_super_secret_key
JWT_EXPIRY=900 (15 minutos em segundos)

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Email
SENDGRID_API_KEY=your_key_here
```

## Próximos Passos

- Leia `ARCHITECTURE.md` pra entender decisões de design
- Leia `SETUP.md` pra configurar ambiente de desenvolvimento
- Perguntas? Slack: #user-service
```

---

### **Como Demonstrar no Workshop**

1. **Slide:** Mostre a estrutura de pasta (screenshot)
2. **Demo ao vivo:** Abra terminal, execute:
   ```bash
   grep -r "import.*jwt" src/
   ls src/workers/
   grep -i redis docker-compose.yml
   ```
3. **Resultado:** "3 evidências de autenticação, queue e cache"
4. **Padrão encontrado:** "5 condicionais ativas (BD, Auth, Cache, Queue, Integrações)"

---

## 2️⃣ EXEMPLO 2: Frontend-React (React + TypeScript + Redux)

### **Projeto: `dashboard-analytics`**

**Descrição:** Dashboard de analytics com charts, relatórios, filtros interativos. Consome API backend (user-service + reports API).

**Tipo:** Frontend-Site

**Características Técnicas:**
- Framework: React 18 + TypeScript
- State: Redux Toolkit
- UI: React Query + TailwindCSS
- Charts: Recharts
- Build: Vite

---

### **PADRÃO IDENTIFICADO**

#### **Núcleo (3 seções)**

1. **Visão Geral**
   - Propósito: "Dashboard de analytics em tempo real para stakeholders visualizarem KPIs"
   - Usuários: Gestores, analistas, executivos
   - Responsabilidades: Render de charts, filtros, export de relatórios

2. **Arquitetura**
   - Padrão: React Components + Redux Store
   - Estrutura: Components (presentacionais + containers), Store (slices), Services (API calls)
   - Fluxo: User interaction → Redux dispatch → API call → Update store → Re-render

3. **Stack e Dependências**
   - Core: React 18, TypeScript 5.0, Vite
   - State: Redux Toolkit 1.9, Redux Persist
   - UI: TailwindCSS 3.3, React Query 4.0
   - Charts: Recharts 2.9

#### **Condicionais (3 Ativas)**

4. **Componentes Presentacionais**
   - Localização: `/src/components/`
   - Tipos: `Chart.tsx`, `Table.tsx`, `Card.tsx`, `Filter.tsx`
   - Convenção: File name = component name

5. **Redux Store**
   - Localização: `/src/store/slices/`
   - Slices: `authSlice.ts`, `reportsSlice.ts`, `filtersSlice.ts`
   - Pattern: Redux Toolkit (immer internally, serializability checks)

6. **Integração API**
   - Localização: `/src/services/api.ts`
   - Base URL: Configurable (staging/prod)
   - Auth: Token em localStorage, refresh automático via middleware

---

### **ENGENHARIA REVERSA**

| Capacidade | Procure Em | Comando | Evidência |
|---|---|---|---|
| **React** | `package.json` | `grep '"react"' package.json` | `"react": "^18.0.0"` |
| **Redux** | `package.json`, `/src/store/` | `grep redux package.json && ls src/store/slices/` | `"@reduxjs/toolkit": "^1.9"`, encontra 3 slices |
| **TypeScript** | `package.json`, `tsconfig.json` | `grep typescript package.json` | `"typescript": "^5.0"` |
| **API Integration** | `/src/services/`, `/src/hooks/` | `grep -r "fetch\|axios" src/services/` | Encontra `api.ts` com axios instance |
| **UI Framework** | `package.json` | `grep tailwindcss package.json` | `"tailwindcss": "^3.3"` |

---

### **ESTRUTURA DE PASTA**

```
dashboard-analytics/
├── src/
│   ├── components/
│   │   ├── Chart/
│   │   │   ├── Chart.tsx
│   │   │   └── Chart.module.css
│   │   ├── Table/
│   │   ├── Card/
│   │   └── Filter/
│   ├── containers/
│   │   ├── Dashboard.tsx
│   │   ├── ReportsList.tsx
│   │   └── FilterPanel.tsx
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── reportsSlice.ts
│   │   │   └── filtersSlice.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── reports.ts
│   │   └── auth.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useReports.ts
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   └── Login.tsx
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

### **L1 ESSENCIAL — Documentação Mínima** (250 palavras, 15 min leitura)

```markdown
# Dashboard Analytics — Visão Geral

## O Que É?

Single Page Application (SPA) que exibe KPIs em tempo real via charts e relatórios.

## Funcionalidades Principais

- 📊 Charts interativos (Recharts)
- 📋 Tabelas de relatórios
- 🔍 Filtros dinâmicos (data range, categoria, etc.)
- ✅ Autenticação com JWT
- 💾 Estado global com Redux

## Arquitetura (Diagrama)

```
┌────────────────┐
│  Components    │ (Chart, Table, Card, Filter)
└────────┬───────┘
         │
    Redux │ Dispatch
         ▼
┌────────────────┐
│ Store (Slices) │ (auth, reports, filters)
└────────┬───────┘
         │
   Update│ State
         ▼
   Re-render UI
```

## Stack

- **React 18** (component framework)
- **TypeScript** (type safety)
- **Redux Toolkit** (state management)
- **TailwindCSS** (styling)
- **Recharts** (charting library)
- **Vite** (build tool)

## Como Rodar

```bash
npm install
npm run dev
# http://localhost:5173
```

## Estrutura de Componentes

```
src/components/
  ├── Chart.tsx          (chart presentacional)
  ├── Table.tsx          (tabela presentacional)
  ├── Filter.tsx         (filtros interativos)

src/containers/
  ├── Dashboard.tsx      (container que orquestra)

src/store/slices/
  ├── authSlice.ts       (user auth)
  ├── reportsSlice.ts    (dados de relatórios)
  ├── filtersSlice.ts    (estado de filtros)
```

## Fluxo de Dados

```
1. User clica em filtro (data range)
2. Filter component dispatch action ao Redux
3. Redux atualiza filters slice
4. Dashboard container subscrito recebe mudança
5. Dashboard faz API call com novos filtros
6. Resposta atualiza reports slice
7. Chart component re-renderiza com novos dados
```

## Como Adicionar Nova Feature

1. Crie component em `/src/components/NewFeature.tsx`
2. Crie slice em `/src/store/slices/newFeatureSlice.ts`
3. Importe slice em `/src/store/index.ts`
4. Use em container com `useSelector(selectNewFeature)`
5. Teste em http://localhost:5173

## Variáveis de Ambiente

```
VITE_API_URL=http://localhost:3000
VITE_ENV=development
```

## Próximos Passos

- Component library setup (Storybook)
- Testes unitários (Vitest)
- Deploy (Vercel/Netlify)
```

---

### **Como Demonstrar no Workshop**

1. **Slide:** Screenshot do dashboard (UI visual)
2. **Demo:** Abra `src/store/slices/` e mostre Redux actions
3. **Código:** Mostre component simple (Chart.tsx) vs. container (Dashboard.tsx)
4. **Padrão:** "3 condicionais ativas (Componentes, Redux, API Integration)"

---

## 3️⃣ EXEMPLO 3: Automação (Airflow + Python)

### **Projeto: `etl-daily-pipeline`**

**Descrição:** Pipeline ETL que extrai dados de múltiplas APIs (Salesforce, Google Sheets), transforma, e carrega em data warehouse (PostgreSQL).

**Tipo:** Automação-Script

**Características Técnicas:**
- Orquestrador: Apache Airflow 2.0
- Linguagem: Python 3.9
- Banco de Dados: PostgreSQL (staging) + Snowflake (DW)
- Queue: Celery (executor distribuído)
- Scheduling: Cron jobs

---

### **PADRÃO IDENTIFICADO**

#### **Núcleo (3 seções)**

1. **Visão Geral**
   - Propósito: "Pipeline que alimenta data warehouse com dados de Salesforce, Google Sheets, RD Station"
   - Frequência: Diário (00:00 UTC)
   - Responsabilidades: Extract → Transform → Load

2. **Arquitetura**
   - Padrão: Apache Airflow (DAG-based orchestration)
   - Componentes: DAGs (definição de fluxo) → Tasks (operações) → Executors (distribuição)
   - Fluxo: Airflow scheduler lê DAG → inicia tasks conforme dependencies → logs em metadata DB

3. **Stack e Dependências**
   - Airflow 2.0 (orchestration)
   - Python 3.9 (scripts)
   - PostgreSQL 14 (staging DB)
   - Snowflake (DW)
   - Celery (distributed executor)

#### **Condicionais (4 Ativas)**

4. **Jobs Agendados**
   - Localização: `/dags/`
   - Trigger: Airflow scheduler (cron-like)
   - Schedule: `@daily` (00:00 UTC)

5. **Banco de Dados**
   - Staging: PostgreSQL (tabelas temporárias)
   - Warehouse: Snowflake (tabelas finais, queries OLAP)

6. **Integrações Externas**
   - Salesforce API: Extract de oportunidades, contas
   - Google Sheets: Extract de configurações
   - RD Station: Extract de leads

7. **Tratamento de Erro + Retry**
   - Retry: 3 tentativas com backoff exponencial
   - Alertas: Notificações Slack em falha

---

### **ENGENHARIA REVERSA**

| Capacidade | Procure Em | Comando | Evidência |
|---|---|---|---|
| **Airflow DAGs** | `/dags/` | `ls dags/ && grep -l "DAG\|dag_id" dags/*.py` | Encontra `etl_daily_dag.py`, `etl_weekly_dag.py` |
| **Scheduling** | `/dags/*.py` | `grep -E "@daily\|schedule_interval" dags/` | `schedule_interval='@daily'` |
| **Database Connections** | `/dags/`, `airflow_settings.cfg` | `grep -r "conn_id" dags/` | `conn_id='postgres_default'`, `conn_id='snowflake_dw'` |
| **Retry Logic** | `/dags/*.py` | `grep -E "retries=\|retry_delay=" dags/*.py` | `retries=3, retry_delay=timedelta(minutes=5)` |
| **External APIs** | `/operators/`, `/dags/` | `grep -r "salesforce\|google\|requests" dags/` | Encontra task com SalesforceHook, GoogleSheetsHook |
| **Notifications** | `/dags/*.py` | `grep -r "SlackApiOperator\|notify" dags/` | Alert em failure_callback |

---

### **ESTRUTURA DE PASTA**

```
etl-daily-pipeline/
├── dags/
│   ├── etl_daily_dag.py           (main DAG)
│   └── etl_weekly_dag.py          (secundário)
├── operators/
│   ├── extract_salesforce.py
│   ├── extract_google_sheets.py
│   ├── transform_data.py
│   └── load_snowflake.py
├── utils/
│   ├── db_utils.py                (PostgreSQL helpers)
│   ├── api_utils.py               (API connections)
│   └── logger.py
├── config/
│   ├── airflow_settings.cfg
│   └── connections.yaml           (.gitignored)
├── tests/
│   ├── test_etl_daily_dag.py
│   └── test_operators.py
├── docker-compose.yml
├── requirements.txt
├── .env.example
└── README.md
```

---

### **L1 ESSENCIAL — Documentação Mínima** (300 palavras, 20 min leitura)

```markdown
# ETL Daily Pipeline — Visão Geral

## O Que É?

Pipeline de ETL que executa diariamente (00:00 UTC) para alimentar data warehouse com dados de sistemas externos.

## Responsabilidades

- 📥 **Extract:** Salesforce API, Google Sheets, RD Station
- 🔄 **Transform:** Normalizar dados, validar, enriquecer
- 📤 **Load:** Snowflake (DW final)
- ✅ **Monitor:** Alertas Slack em falha

## Arquitetura (Diagrama)

```
Airflow Scheduler (runs @daily)
    ↓
etl_daily_dag.py
    ├─ Task 1: Extract Salesforce
    ├─ Task 2: Extract Google Sheets
    ├─ Task 3: Extract RD Station
    ├─ Task 4: Transform & Validate
    └─ Task 5: Load to Snowflake
    
(retry: 3x, timeout: 2h, alert Slack on failure)
```

## Stack

- **Airflow 2.0** (DAG orchestration)
- **Python 3.9** (scripting)
- **PostgreSQL 14** (staging DB)
- **Snowflake** (data warehouse)
- **Celery** (distributed executor)

## Como Rodar Localmente

```bash
# Setup
python -m venv venv
source venv/bin/activate (ou .\\venv\\Scripts\\activate no Windows)

# Instalar dependências
pip install -r requirements.txt

# Configurar Airflow
export AIRFLOW_HOME=$(pwd)
airflow db init
airflow webserver -p 8080 &
airflow scheduler &

# Acessar UI
http://localhost:8080
```

## Estrutura de DAG

```python
# dags/etl_daily_dag.py

from airflow import DAG
from datetime import datetime

dag = DAG(
    dag_id='etl_daily',
    schedule_interval='@daily',  # Roda 00:00 UTC
    start_date=datetime(2024, 1, 1),
    retries=3,                    # 3 tentativas
    retry_delay=timedelta(minutes=5)
)

# Tasks
task_extract_sf = SalesforceExtractOperator(...)
task_extract_sheets = GoogleSheetsExtractOperator(...)
task_transform = PythonOperator(python_callable=transform_data)
task_load = SnowflakeLoadOperator(...)

# Dependencies
[task_extract_sf, task_extract_sheets] >> task_transform >> task_load
```

## Monitorar Execução

```bash
# Via web UI
http://localhost:8080/dags/etl_daily

# Via CLI
airflow dags list
airflow tasks list etl_daily
airflow tasks test etl_daily task_extract_sf 2024-01-01
```

## Variáveis de Ambiente

```
# .env
AIRFLOW_HOME=/path/to/project
SALESFORCE_CLIENT_ID=your_id
SALESFORCE_CLIENT_SECRET=your_secret
GOOGLE_SHEETS_API_KEY=your_key
SNOWFLAKE_USER=user
SNOWFLAKE_PASSWORD=pass
SNOWFLAKE_ACCOUNT=account_id
```

## Próximos Passos

- Adicione data quality checks (Great Expectations)
- Configure alertas de SLA (data freshness)
- Adicione testes (pytest)
- Deploy em staging/prod Airflow
```

---

### **Como Demonstrar no Workshop**

1. **Slide:** Mostre DAG graph (screenshot visual)
2. **Demo:** Terminal: `airflow dags list`, `airflow tasks list etl_daily`
3. **Código:** Abra `/dags/etl_daily_dag.py`, mostre `schedule_interval='@daily'`
4. **Padrão:** "4 condicionais ativas (Jobs, BD, Integrações, Retry logic)"

---

## 📊 Comparação Entre os 3 Exemplos

| Aspecto | Backend-API | Frontend | Automação |
|---------|-------------|----------|-----------|
| **Tipo (Variante)** | Backend-API | Frontend-Site | Automação-Script |
| **Núcleo (3 seções)** | Visão, Arquitetura, Stack | ✅ (igual) | ✅ (igual) |
| **Condicionais Ativas** | 5 (BD, Auth, Cache, Queue, Integ) | 3 (Components, Redux, API) | 4 (Jobs, BD, Integrações, Retry) |
| **Padrão Detectado** | MVC + layers | React + Redux | DAG + tasks |
| **Engenharia Reversa** | Procura em `models/`, `migrations/` | Procura em `components/`, `store/` | Procura em `dags/`, `operators/` |
| **L1 Tempo** | 20 min | 15 min | 20 min |
| **Diagrama Critical?** | Sim (arquitetura) | Sim (component tree) | Sim (DAG graph) |
| **Tech Stack** | Express, PostgreSQL | React, Redux | Airflow, Python |

---

## 🎯 Como Usar Estes Exemplos no Workshop

### **Durante Abertura:**
- Slide 1: Mostre 3 exemplos lado-a-lado
- "Variantes diferentes, mas MESMO padrão universal"

### **Durante Conceitos:**
- Slide 6-15: Use Backend como exemplo principal
- Refira-se aos outros 2 para pluralismo

### **Durante Demo:**
- 5 minutos ao vivo:
  1. Abra Backend-API: `ls src/models/`
  2. Abra Frontend: `ls src/store/slices/`
  3. Abra Automação: `airflow dags list`
- "Diferentes linguagens, mesma estrutura encontrada"

### **Durante Workshop Prático:**
- Distribua exemplos como referência (PDF ou link)
- Grupos podem basearem-se neles

### **Pós-Workshop:**
- Compartilhe repositórios públicos (GitHub) para que times façam fork

---

## 📁 Sugestões de Repositórios Públicos

Se quiser criar versões reais:

```
github.com/agilizem/
├── user-service-example (Node.js backend)
├── dashboard-analytics-example (React frontend)
└── etl-pipeline-example (Airflow automation)
```

Cada um com:
- README.md (L1 + L2 + L3)
- Dockerfile + docker-compose.yml
- .github/workflows (CI/CD)
- Exemplos rodáveis

---

## 🚀 Reproduzir Um Exemplo na Prática

**Passo-a-Passo para Facilitador (no dia do workshop):**

1. **Pre-download:** Clonar repos antes (wifi pode falhar)
   ```bash
   git clone github.com/agilizem/user-service-example
   git clone github.com/agilizem/dashboard-analytics-example
   git clone github.com/agilizem/etl-pipeline-example
   ```

2. **Abra em VS Code:** 3 tabs abertos

3. **Demo ao vivo (5 min):**
   - Backend: `grep -r "jwt" src/`
   - Frontend: `ls src/store/slices/`
   - Automação: `grep -E "@daily|schedule" dags/`

4. **Resultado:** "Mesmo padrão? Vê? Núcleo + 3-5 condicionais"

5. **Transição:** "Agora vocês vão desenhar o padrão do projeto de vocês"


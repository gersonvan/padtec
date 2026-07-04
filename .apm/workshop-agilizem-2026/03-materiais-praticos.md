# Materiais Práticos — Canvases + Templates + Checklists

## 📋 Conteúdo deste Arquivo

1. **Canvas Principal** (para os grupos preencherem)
2. **Exemplos de Preenchimento** (guia para facilitador)
3. **Checklist de Verificação** (pós-workshop)
4. **Instruções de Distribuição** (imprimir vs. digital)

---

## 1️⃣ CANVAS PRINCIPAL — Para Grupos Preencherem

**Formato:** A3 (paisagem) ou compartilhado digitalmente (Google Jamboard/Miro)

```
════════════════════════════════════════════════════════════════════════════════
   WORKSHOP: DOCUMENTAÇÃO TÉCNICA AUTOMÁTICA — DESIGN COLETIVO DE SOLUÇÃO
════════════════════════════════════════════════════════════════════════════════

GRUPO: ___________________________    TIPO DE PROJETO: _________________________

NOMES DOS INTEGRANTES:
[ ] _____________________________
[ ] _____________________________
[ ] _____________________________
[ ] _____________________________
[ ] _____________________________

────────────────────────────────────────────────────────────────────────────────
SEÇÃO 1: ESQUELETO DE DOCUMENTAÇÃO
────────────────────────────────────────────────────────────────────────────────

"Que seções de documentação SEMPRE aparecem no seu tipo de projeto?"

NÚCLEO (Sempre):
  [✓] Visão Geral — O que é este projeto?
      Descrição breve: _______________________________________________________
  
  [✓] Arquitetura — Como é organizado?
      Componentes principais: ________________________________________________
  
  [✓] Stack e Dependências — Qual tecnologia?
      Tecnologias-chave: ____________________________________________________

CONDICIONAIS (Marque as que aplicam):
  [ ] Banco de Dados — Qual? _________________________________________________
      Por quê está aqui? ____________________________________________________
  
  [ ] Cache — Qual? __________________________________________________________
      Por quê está aqui? ____________________________________________________
  
  [ ] Autenticação — Como funciona? _________________________________________
      Por quê está aqui? ____________________________________________________
  
  [ ] Fila / Async — Qual ferramenta? _______________________________________
      Por quê está aqui? ____________________________________________________
  
  [ ] Armazenamento (S3) — Sim/Não? __________________________________________
      Por quê está aqui? ____________________________________________________
  
  [ ] Notificações — Canais? _________________________________________________
      Por quê está aqui? ____________________________________________________
  
  [ ] Integrações Externas — Quais? __________________________________________
      Por quê está aqui? ____________________________________________________
  
  [ ] Jobs Agendados — Qual scheduler? _______________________________________
      Por quê está aqui? ____________________________________________________
  
  [ ] Multi-tenancy — Sim/Não? _______________________________________________
      Por quê está aqui? ____________________________________________________

────────────────────────────────────────────────────────────────────────────────
SEÇÃO 2: COMO DETECTAR CAPACIDADES (Engenharia Reversa)
────────────────────────────────────────────────────────────────────────────────

"Para cada capacidade ativa, onde no código vocês procurariam para ter evidência?"

Banco de Dados:
  Procure em: [ ] /models/  [ ] /migrations/  [ ] package.json  [ ] outro: _____
  Comando: grep -r "database|migration|ORM" ________________________________________
  Evidência esperada: ____________________________________________________________________

Autenticação:
  Procure em: [ ] /middleware/  [ ] .env.example  [ ] /routes/  [ ] outro: _____
  Comando: grep -r "token|jwt|auth" ________________________________________
  Evidência esperada: ____________________________________________________________________

Cache:
  Procure em: [ ] /cache/  [ ] package.json  [ ] redis/memcached  [ ] outro: _____
  Comando: grep -r "redis|cache|memcached" ________________________________________
  Evidência esperada: ____________________________________________________________________

Jobs:
  Procure em: [ ] /jobs/  [ ] /workers/  [ ] package.json  [ ] outro: _____
  Comando: grep -r "bull|agenda|cron|schedule" ________________________________________
  Evidência esperada: ____________________________________________________________________

[Continue para outras capacidades relevantes...]

────────────────────────────────────────────────────────────────────────────────
SEÇÃO 3: NÍVEL MÍNIMO VIÁVEL (L1)
────────────────────────────────────────────────────────────────────────────────

"O que um novo desenvolvedor PRECISA entender em 1 hora de leitura?"

Novo Dev Deve Entender (máximo 5 itens):
  [ ] 1. ___________________________________________________________________
  [ ] 2. ___________________________________________________________________
  [ ] 3. ___________________________________________________________________
  [ ] 4. ___________________________________________________________________
  [ ] 5. ___________________________________________________________________

L1 Em Números:
  - Estimativa de páginas: ________
  - Estimativa de tempo de leitura: ________ minutos
  - Diagrama necessário? Sim/Não
  - Se sim, que tipo (arquitetura/fluxo/BD/outro)? _________________________________

────────────────────────────────────────────────────────────────────────────────
SEÇÃO 4: ABORDAGEM / FERRAMENTA
────────────────────────────────────────────────────────────────────────────────

"Como vocês implementariam isso?"

Escolha 1 ou marque múltiplas:

  [ ] **Scripts Bash + Templates** (simples, nenhuma ferramenta)
      Se escolheu: Qual linguagem? ______________ Qual template? __________________

  [ ] **Plugin de IDE** (doc inline com código)
      Se escolheu: Qual IDE? _____________________ Qual plugin? ____________________

  [ ] **Gerador Estático** (gatsby, nextjs, eleventy)
      Se escolheu: Qual ferramenta? ________________

  [ ] **Agente Customizado (IA)** (LLM customizado)
      Se escolheu: Qual LLM? _____________________ Qual provider? ________________

  [ ] **Checklist Manual** (disciplina, sem automação)
      Se escolheu: Frequência de atualização? _____________________________________

  [ ] **PADTec** (ferramenta pré-existente)
      Se escolheu: Por quê? ________________________________________________________

  [ ] **Outro:** ________________________________________________________________

Justificativa (por que essa abordagem funciona pro seu time?):
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________

────────────────────────────────────────────────────────────────────────────────
SEÇÃO 5: PADRÕES EMERGENTES (Anotações do Grupo)
────────────────────────────────────────────────────────────────────────────────

"Que insights vocês tiveram enquanto desenhavam?"

3 insights principais:
  1. __________________________________________________________________
  2. __________________________________________________________________
  3. __________________________________________________________________

Surpresa / Aha moment:
  _____________________________________________________________________

O que faltou / dúvidas:
  _____________________________________________________________________

════════════════════════════════════════════════════════════════════════════════
```

---

## 2️⃣ EXEMPLOS DE PREENCHIMENTO — Guia para Facilitador

### **Exemplo 1: Backend-API (Node.js + PostgreSQL)**

```
GRUPO: Backend Dream Team    TIPO DE PROJETO: Backend-API

NOMES: João, Maria, Carlos, Ana, Pedro

SEÇÃO 1: ESQUELETO
────────────────
Núcleo:
  [✓] Visão Geral — API de e-commerce, processa pedidos
  [✓] Arquitetura — MVC (Express/Controller/Service/Model)
  [✓] Stack — Node.js 18, Express 4, PostgreSQL 14, Sequelize ORM

Condicionais Ativas:
  [✓] Banco de Dados — PostgreSQL, migrations com Sequelize
  [✓] Autenticação — JWT + RefreshToken
  [✓] Fila — Bull (Redis queue) para processamento de pedidos
  [✓] Notificações — Email via SendGrid
  [✓] Integrações — Stripe (pagamento), Mailchimp (email)
  [✓] Jobs — Cron para limpeza de sessões expiradas
  [ ] Cache — (não tem)
  [ ] Armazenamento — (arquivos em BD, não S3)

SEÇÃO 2: DETECTAR CAPACIDADES
────────────────────────────
Banco de Dados:
  Procure em: [✓] /models/  [✓] /migrations/  [✓] package.json
  Comando: grep -r "sequelize\|migration" src/
  Evidência: Encontra: sequelize: "^6.0", /migrations/*.js com SQL

Autenticação:
  Procure em: [✓] /middleware/  [✓] .env.example
  Comando: grep -r "jwt\|token" src/
  Evidência: Encontra: middleware/auth.js, JWT_SECRET em .env

Fila:
  Procure em: [✓] /jobs/  [✓] package.json
  Comando: grep -r "bull\|queue" src/
  Evidência: Encontra: bull: "^3.0", /jobs/processOrder.js

SEÇÃO 3: L1 MÍNIMO
────────────────
Novo Dev deve entender:
  [✓] 1. Como rodar o projeto (npm install, npm start)
  [✓] 2. Estrutura de pasta (MVC layout)
  [✓] 3. Como autenticar (JWT flow)
  [✓] 4. Principais endpoints (GET /orders, POST /orders)
  [✓] 5. Como testar (npm test, Postman collection)

L1 em números:
  - Páginas: 3-4
  - Tempo de leitura: 45 minutos
  - Diagrama: Sim (arquitetura MVC + fluxo JWT)

SEÇÃO 4: ABORDAGEM
─────────────────
[✓] Agente Customizado (IA)
    LLM: OpenAI GPT-4, Provider: Azure OpenAI

Justificativa: "Temos LLM setup já. Quer dizer que podemos rodar engenharia reversa
automática em cada novo projeto. Seria ideal pra nossos 8 projetos ativos."

SEÇÃO 5: PADRÕES EMERGENTES
───────────────────────────
3 insights:
  1. "Toda API tem BD + Auth — esses dois são universais"
  2. "Integração com Stripe foi surpresa — sempre esquecemos de documentar"
  3. "L1 deveria incluir 'como investigar um bug' (logs)"

Aha moment:
  "Nunca tinham pensado em 'procurar código para ter evidência' — muitas vezes
   assumiam que BD estava lá sem verificar migrations."

Dúvidas:
  "Como detectar se job está ativo em projeto legado (sem package.json claro)?"
```

### **Exemplo 2: Frontend-React**

```
GRUPO: Frontend Ninjas    TIPO DE PROJETO: Frontend-Site

NOMES: Alice, Bob, Carol

SEÇÃO 1: ESQUELETO
────────────────
Núcleo:
  [✓] Visão Geral — Dashboard de analytics, para usuários logados
  [✓] Arquitetura — React + Redux, componentes em src/components/
  [✓] Stack — React 18, Redux Toolkit, TailwindCSS, Vite

Condicionais Ativas:
  [✓] Componentes principais — Dashboard, Charts, Tables
  [✓] Estados — Redux com slices (auth, reports, ui)
  [✓] Autenticação — OAuth2 com Google/GitHub
  [✓] Integrações — API backend em /api/*, dados em real-time (WebSocket)
  [ ] BD — (no frontend, não tem)
  [ ] Cache — (browser cache apenas, não Redis)
  [ ] Notifications — (se vem, é push browser)

SEÇÃO 2: DETECTAR CAPACIDADES
────────────────────────────
Estados Redux:
  Procure em: [✓] /store/slices/
  Comando: ls -la src/store/slices/*.js
  Evidência: Encontra: auth.js, reports.js, ui.js (3 slices)

Componentes:
  Procure em: [✓] /components/
  Comando: find src/components -name "*.jsx" | wc -l
  Evidência: 24 componentes estruturados

Integração API:
  Procure em: [✓] /services/ ou /api/
  Comando: grep -r "fetch\|axios" src/
  Evidência: Encontra: services/api.js com axios instance

SEÇÃO 3: L1 MÍNIMO
────────────────
Novo Dev deve entender:
  [✓] 1. Estrutura de pasta (components, store, services)
  [✓] 2. Como rodar localmente (npm install, npm run dev)
  [✓] 3. Fluxo de autenticação (OAuth setup)
  [✓] 4. Principais componentes (Dashboard é container, Cards são presentacionais)

L1 em números:
  - Páginas: 2-3
  - Tempo de leitura: 30 minutos
  - Diagrama: Sim (component tree + Redux data flow)

SEÇÃO 4: ABORDAGEM
─────────────────
[✓] Scripts Bash + Templates
    Linguagem: JavaScript, Template: markdown + diagramas Mermaid

Justificativa: "Frontend é rápido de documentar — estrutura é visual.
Um script que scrapeia components/ e gera lista é suficiente."

SEÇÃO 5: PADRÕES EMERGENTES
───────────────────────────
3 insights:
  1. "Frontend L1 é muito visual — precisa de screenshots"
  2. "Redux state é importante documentar — muita gente perde com Redux learning curve"
  3. "OAuth setup deveria ser step-by-step pra novo dev (senão quebra meio caminho)"

Aha moment:
  "Componentes presentacionais vs. containers — essa separação não tá explícita
   em nenhuma doc. Devia estar no L1."

Dúvidas:
  "Como documentar animações/transições? Markdown não mostra movimento."
```

### **Exemplo 3: Automação (Airflow + Python)**

```
GRUPO: Data Engineers    TIPO DE PROJETO: Automação-Script

NOMES: David, Elena, Frank

SEÇÃO 1: ESQUELETO
────────────────
Núcleo:
  [✓] Visão Geral — Pipeline de ETL diário: extrai dados de APIs, transforma, carrega em DW
  [✓] Arquitetura — Airflow DAGs, tasks em Python, orquestração com Celery
  [✓] Stack — Python 3.9, Airflow 2.0, PostgreSQL, Celery, Pandas

Condicionais Ativas:
  [✓] Jobs Agendados — Airflow DAGs, rodam 00:00 UTC diariamente
  [✓] Banco de Dados — PostgreSQL DW, staging em SQLite
  [✓] Integrações — Google Sheets, Salesforce API, AWS S3
  [✓] Tratamento de Erro — Retry logic (3 tentativas), alertas Slack
  [ ] Cache — (não aplicável)
  [ ] Autenticação — (credenciais em .env, não OAuth)

SEÇÃO 2: DETECTAR CAPACIDADES
────────────────────────────
DAGs:
  Procure em: [✓] /dags/
  Comando: find dags/ -name "*.py" | grep -E "dag_|DAG" dags/
  Evidência: Encontra: etl_daily_dag.py, etl_weekly_dag.py (2 DAGs)

Retry Logic:
  Procure em: [✓] /dags/*.py (procure "retries=", "retry_delay=")
  Comando: grep -r "retries=" dags/
  Evidência: Encontra: retries=3, retry_delay=timedelta(minutes=5)

Integrações:
  Procure em: [✓] /operators/ ou imports em DAGs
  Comando: grep -r "requests\|google\|boto3" dags/
  Evidência: Encontra: requests library (APIs), google.cloud (GCS), boto3 (AWS)

SEÇÃO 3: L1 MÍNIMO
────────────────
Novo Dev deve entender:
  [✓] 1. DAG structure — como Airflow organiza tarefas
  [✓] 2. Como rodar DAG manualmente (airflow dags test)
  [✓] 3. Credenciais (onde estão, como renovar tokens)
  [✓] 4. Fluxo de dados (input → transformation → output)

L1 em números:
  - Páginas: 3-4
  - Tempo de leitura: 60 minutos
  - Diagrama: Sim (DAG diagram + data flow)

SEÇÃO 4: ABORDAGEM
─────────────────
[✓] Gerador Estático (MkDocs)
    Ferramenta: MkDocs + Material theme

Justificativa: "Documentação de data pipelines é estática — não muda rápido.
MkDocs com Mermaid diagrams é perfeito pra DAG visualization."

SEÇÃO 5: PADRÕES EMERGENTES
───────────────────────────
3 insights:
  1. "Data pipeline documentation sempre precisa de visual (DAG graph)"
  2. "Retry logic e error handling são críticos — muita gente não testa isso"
  3. "Credenciais/tokens são pontos de atrito — rotação deveria estar documentada"

Aha moment:
  "Nunca tinham pensado em 'onde procurar credential setup' sistematicamente.
   Sempre era 'perguntar pra XYZ'. Agora é checklist."

Dúvidas:
  "Como documentar mudanças de schema? DAG evolui, histórico fica confuso."
```

---

## 3️⃣ CHECKLIST DE VERIFICAÇÃO — Pós-Workshop

**Para facilitador usar após coletaas apresentações dos grupos.**

```
════════════════════════════════════════════════════════════════════════════════
CHECKLIST DE VERIFICAÇÃO PÓS-WORKSHOP
════════════════════════════════════════════════════════════════════════════════

Nome do Grupo: ___________________________    Data: ________________

Revisor: ________________________________

════════════════════════════════════════════════════════════════════════════════
QUALIDADE DO CANVAS
════════════════════════════════════════════════════════════════════════════════

SEÇÃO 1: Esqueleto de Documentação
  [ ] Núcleo preenchido (Visão Geral, Arquitetura, Stack)?
  [ ] Capacidades condicionais marcadas?
  [ ] Descrições claras (não vagas)?
  [ ] Lógica faz sentido (capacidades são realmente ativas)?

Escore: __/4   Notas: ___________________________________________________________________

SEÇÃO 2: Engenharia Reversa
  [ ] Indicam onde procurar no código?
  [ ] Comandos (grep/find) específicos?
  [ ] Evidências são verificáveis?
  [ ] Cobrindo todas as capacidades ativas?

Escore: __/4   Notas: ___________________________________________________________________

SEÇÃO 3: L1 Mínimo Viável
  [ ] Clareza (novo dev entenderia?)?
  [ ] Concisão (5 itens máximo)?
  [ ] Estimativa realística de tempo?
  [ ] Diagrama identificado?

Escore: __/4   Notas: ___________________________________________________________________

SEÇÃO 4: Abordagem
  [ ] Escolha faz sentido para tipo de projeto?
  [ ] Justificativa é clara?
  [ ] Viável com recursos do time?
  [ ] Sustentável (não é tecnologia por tecnologia)?

Escore: __/4   Notas: ___________________________________________________________________

SEÇÃO 5: Insights
  [ ] Insights são reais (não genéricos)?
  [ ] Aha moment é surpreendente/valioso?
  [ ] Dúvidas são substantivas?

Escore: __/2   Notas: ___________________________________________________________________

════════════════════════════════════════════════════════════════════════════════
INTELIGÊNCIA COLETIVA
════════════════════════════════════════════════════════════════════════════════

Padrão Emergente (marca as que aplicam):

  [ ] Todos os grupos identificaram essas seções no núcleo:
      Seção 1: _____________________________
      Seção 2: _____________________________
      Seção 3: _____________________________

  [ ] Convergência não foi forçada — emergiu naturalmente?

  [ ] Diferenças inter-grupos são lógicas (conforme tipo de projeto)?

Notas sobre emergência de padrão:
  _________________________________________________________________________________
  _________________________________________________________________________________

════════════════════════════════════════════════════════════════════════════════
PRONTO PARA IMPLEMENTAÇÃO?
════════════════════════════════════════════════════════════════════════════════

Este grupo deixa o workshop pronto pra:

  [ ] Aplicar o padrão em 1 projeto real (próximas 2 semanas)?
  [ ] Implementar a abordagem escolhida (próximos 30 dias)?
  [ ] Treinar outros no time (depois)?

Nível de Readiness: [ ] Baixo (precisa refinar)  [ ] Médio (tá bem)  [ ] Alto (pronto pra ir)

Próximas Ações Sugeridas:
  1. ____________________________________________________________________
  2. ____________________________________________________________________
  3. ____________________________________________________________________

════════════════════════════════════════════════════════════════════════════════
OBSERVAÇÕES DO FACILITADOR
════════════════════════════════════════════════════════════════════════════════

Dinâmica do grupo:
  _________________________________________________________________________________
  _________________________________________________________________________________

Perguntas mais frequentes (do público):
  _________________________________________________________________________________
  _________________________________________________________________________________

Momento mais impactante:
  _________________________________________________________________________________

Coisa que vocês (facilitador) conseguiram melhorar:
  _________________________________________________________________________________

Coisa que precisa melhorar na próxima vez:
  _________________________________________________________________________________

════════════════════════════════════════════════════════════════════════════════
SCORES TOTAIS
════════════════════════════════════════════════════════════════════════════════

Canvas Quality: __/18 (máx 18)
Readiness: [ ] Low | [ ] Medium | [ ] High

Recomendação Final:
  [ ] Grupo tá pronto pra apresentar para liderança
  [ ] Grupo precisa de 1 semana de refinement
  [ ] Grupo precisa de mentoring antes de implementar
  [ ] Excelente trabalho — use como template pra outros times
```

---

## 4️⃣ INSTRUÇÕES DE DISTRIBUIÇÃO

### **Opção A: Impresso (Recomendado para maior engagement)**

**O que imprimir:**
- 1x Canvas principal por grupo (A3, landscape)
- 5x exemplos de preenchimento (referência para facilitador)
- 1x checklist de verificação por grupo

**Como imprimir:**
- Imprima em alta qualidade (laser, não inkjet — cora mais)
- Landscape (A3 preferido, se não tiver, A4 reduzido)
- Papel branco 120gsm (mais rígido = melhor pra workshop)
- Imprima 1-2 cópias extras (alguém vai errar)

**Distribuição no dia:**
- Cada mesa recebe 1 canvas + canetas/marcadores
- Exemplos ficam na mesa do facilitador (referência)
- Checklist é usado apenas pós-apresentações

### **Opção B: Digital (Escalável, mas menos tátil)**

**Ferramentas:**
- Google Jamboard: Compartilhe template, cada grupo copia
- Miro: Board pre-feito com canvas de cada grupo
- Figma: Frames separados por grupo

**Como configurar:**
1. Crie 1 arquivo com 6-7 frames (1 por grupo)
2. Copie canvas principal em cada frame
3. Compartilhe link (edit mode) pro grupo
4. Todos trabalham em paralelo (you see updates live)

**Vantagem:** Facilita foto/export. **Desvantagem:** Menos "real" (tela vs. papel).

---

## 📸 Pós-Workshop: Captura + Documentação

**No final do workshop:**

1. **Fotos dos Canvas** (se impresso)
   - Tirem foto de cada canvas preenchido
   - Boa iluminação, ângulo frontal

2. **Exportem Digital** (se Jamboard/Miro/Figma)
   - PNG ou PDF de cada canvas
   - Compartilhem com grupo

3. **Recolham Canvases**
   - Se quiser, enviem por email para você
   - Incluam como "evidência" de aprendizado

4. **Email Consolidado** (24h pós-workshop)
   - Fotos + PDFs de todos os grupos
   - Seu resumo: "5 padrões emergentes que vimos"
   - Convite pra comunidade contínua

---

## 🎯 Resumo: O Que Imprimir/Preparar

| Material | Formato | Qtd | Notas |
|----------|---------|-----|-------|
| Canvas Principal | A3 landscape | 6-8 | 1 por grupo + extras |
| Exemplos (guia facilitador) | A4 portrait | 10 | Várias cópias pra referência |
| Canetas/Marcadores | Físico | 30 | 5-6 por grupo, cores variadas |
| Checklist Verificação | A4 portrait | 6-8 | 1 por grupo, pós-apresentações |
| Fotos/Câmera | Digital | 1 | Celular suficiente |

---

**Tudo pronto?** Vá para `01-estrutura-e-agenda.md` para executar o workshop.


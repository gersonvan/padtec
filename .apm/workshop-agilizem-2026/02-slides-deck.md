# Deck de Slides — 31 Slides Estruturados

## 📊 Visão Geral

- **Total de slides:** 31
- **Formato recomendado:** 16:9 (widescreen)
- **Cores:** Azul corporativo (#0051BA) + Branco + Cinza escuro (#333333)
- **Fonte:** Montserrat (títulos), Open Sans (corpo)
- **Tema:** Limpo, minimalista, foco em diagramas + palavras-chave

---

## SEGMENTO 1: ABERTURA (Slides 1-4)

### **Slide 1: Capa**
**Tipo:** Full image background  
**Título:** "Documentação Técnica Automática: Do Manual Tedioso ao Padrão Inteligente"  
**Subtítulo:** Agilizem Day 2026 | Fortaleza  
**Imagem:** Código em background (transparência 30%), pessoas colaborando em foreground  
**Notas do apresentador:**  
- Posicione-se centralmente
- Mencione tema do evento (agilidade + entrega)
- Promessa: "Vocês saem com padrão que levam pra casa"

---

### **Slide 2: Contexto Rápido**
**Layout:** Two-column (esquerda/direita)  
**Título:** "Por que documentação é crítica em times ágeis?"

**Coluna Esquerda (Problema):**
- ❌ Times ageis: entregam código em 2 semanas
- ❌ Documentação: leva 2 meses (manual, desatualizada)
- ❌ Resultado: novo dev perde 1 semana entendendo

**Coluna Direita (Oportunidade):**
- ✅ Doc estruturada: escalável
- ✅ Padrão reutilizável: vez 1 é 100%, vez 2 é 20%
- ✅ Automável: depois torna-se ferramenta

**Visual:** Ícone ⏱️ à esquerda, ✨ à direita  
**Notas do apresentador:**
- Pause após problema — deixe silêncio 2 seg
- Pergunta ao público: "Isso bate com a realidade de vocês?"
- Espere confirmação corporal (heads nod)

---

### **Slide 3: O Problema Real**
**Layout:** Full-width statement  
**Frase-gancho:** 
"**Times ágeis precisam documentação técnica VIVA, rastreável ao código, sem ser manual.**"

**Design:**
- Fonte 72pt, cor azul corporativo (#0051BA)
- Fundo branco/cinza suave
- Ícone do lado: código + documento unidos

**Notas do apresentador:**
- Leia com énfase em "VIVA" (documentação não obsoleta)
- Pausa após slide
- Ponte: "Vocês deixam de ser consumers para ser designers"

---

### **Slide 4: O Que Vai Sair Daqui**
**Layout:** 3 cards verticals  
**Título:** "Ao final você vai entender:"

**Card 1 — Padrão Universal**
- Estrutura que funciona em qualquer projeto
- Variante × Nível × Capacidades
- Checklist objetivamente verificável

**Card 2 — Design Próprio**
- Não é ferramenta prescritiva
- Você desenha a solução para seu contexto
- Exemplos: scripts, templates, agentes, plugins

**Card 3 — Implementação**
- Saem com modelo reutilizável
- Integração ágil (DoD)
- Comunidade contínua

**Visual:** 3 ícones (universal, designer, build)  
**Notas do apresentador:**
- Pontue: "Em 90 minutos, vocês ganham padrão mental + design + comunidade"
- Transição: "Vamos começar..."

---

## SEGMENTO 2: CONCEITOS (Slides 5-15)

### **Slide 5: Documentação Tem 3 Dimensões**
**Layout:** 3D cube isometric  
**Título:** "As 3 Dimensões de Documentação Técnica"

**Visual:**
- Cubo em perspectiva isométrica
- Eixo X: **Variante** (tipo de projeto)
- Eixo Y: **Nível** (profundidade)
- Eixo Z: **Capacidades** (features presentes)
- Cada eixo com cor diferente

**Notas do apresentador:**
- "Não é intuição — são dimensões reais que aparecem em todo projeto"
- Pausa: deixe absorver a imagem

---

### **Slide 6: Dimensão 1 — Variante**
**Layout:** Horizontal 5 columns  
**Título:** "Variante: O Tipo de Sistema"

**5 Colunas (com ícones):**
1. **Backend-API** 🔌
   - Exemplo: serviço REST
   - Seção especial: Arquitetura de BD

2. **Frontend-Site** 🎨
   - Exemplo: React/Vue app
   - Seção especial: Estados + componentes

3. **Full-Stack Web** 🌐
   - Exemplo: Next.js
   - Seção especial: Ambas (server + client)

4. **Automação-Script** ⚙️
   - Exemplo: Airflow/Cron
   - Seção especial: Fluxo + triggers

5. **IaC** 📦
   - Exemplo: Terraform/Bicep
   - Seção especial: Recursos + estado

**Bottom insight:** "Cada tipo tem seções universais diferentes"  
**Notas do apresentador:**
- Mostre com cursor: "Se você documenta backend, não precisa de 'componentes React'"
- Pergunta: "Alguém trabalha com mais de 1 variante?"

---

### **Slide 7: Exemplo Prático — Variante**
**Layout:** Split-screen  
**Título:** "Backend vs Frontend — Seções Diferentes"

**Esquerda (Backend-API):**
```
📋 Seções esperadas:
✅ Visão Geral
✅ Arquitetura
✅ Stack
✅ BANCO DE DADOS ← específico
✅ Endpoints
✅ Auth
```

**Direita (Frontend-Site):**
```
📋 Seções esperadas:
✅ Visão Geral
✅ Arquitetura
✅ Stack
✅ COMPONENTES ← específico
✅ Estados
✅ Integração API
```

**Insight:** "Documentação é tão diferente quanto o código"  
**Notas do apresentador:**
- Mostre que L1 (núcleo) é igual, mas condicionais mudam
- "Sua ferramenta precisa saber de qual variante ela está falando"

---

### **Slide 8: Dimensão 2 — Nível**
**Layout:** Pyramid 3 levels  
**Título:** "Nível: A Profundidade da Documentação"

**Pirâmide (base para topo):**
```
        L3 — Aprofundado
    (troubleshooting, casos edge)
    
      L2 — Completo
    (tudo que precisa saber)
    
    L1 — Essencial
  (novo dev entende rápido)
```

**Relação:** L1 ⊂ L2 ⊂ L3 (inclusão, não duplicação)

**Exemplo:**
- L1: "Temos BD PostgreSQL"
- L2: L1 + schema/migrations
- L3: L2 + performance tips, índices recomendados

**Notas do apresentador:**
- Enfatizar: "Não é versão diferente, é incremento"
- "L1 está inteiro dentro de L2, não precisa reescrever"

---

### **Slide 9: Exemplo Prático — Nível**
**Layout:** Three vertical sections  
**Título:** "Mesma Seção, Três Níveis de Detalhe"

**Seção: 'Arquitetura'**

**L1 — Essencial (50 palavras):**
```
Sistema em 3 camadas: API (Express) 
→ Lógica (Service) → BD (PostgreSQL).
Diagrama: [caixa simples]
```

**L2 — Completo (300 palavras):**
```
Sistema em 3 camadas...
[diagrama mais detalhado]
Fluxo de requisição:
1. Express middleware valida token
2. Service executa lógica
3. BD retorna resultado
Tratamento de erro: [cenários específicos]
```

**L3 — Aprofundado (1000+ palavras):**
```
Tudo de L2 +
- Justificativa de cada camada (por que 3?)
- Trade-offs (monolítico vs. microserviço)
- Performance: latência de cada camada
- Cenários de timeout
- Como escalar (há gargalo em L2?)
- Alternativas consideradas
```

**Notas do apresentador:**
- "Novo dev? L1. Maintainer? L2. Arquiteto? L3."
- "Vocês não duplicam esforço — vocês incrementam"

---

### **Slide 10: Dimensão 3 — Capacidades**
**Layout:** 3×3 grid checklist  
**Título:** "Capacidades: O que Realmente Está Lá"

**9 Capacidades (com toggle on/off):**
- 🗄️ **Banco de Dados** — ON/OFF
- 💾 **Cache** — ON/OFF
- 🔐 **Autenticação** — ON/OFF
- ⏰ **Jobs Agendados** — ON/OFF
- 📤 **Fila Async** — ON/OFF
- 📦 **Armazenamento (S3)** — ON/OFF
- 🔔 **Notificações** — ON/OFF
- 🌍 **Integrações Externas** — ON/OFF
- 👥 **Multi-tenancy** — ON/OFF

**Insight:** "Doc muda conforme capacidades estão presentes"

**Exemplo:**
- Projeto A: BD ✅ + Cache ✅ + Jobs ✅
- Projeto B: BD ✅ (apenas)
- Doc de A precisa descrever Cache + Jobs
- Doc de B não precisa (não pollui)

**Notas do apresentador:**
- "Documentação é mapa do que tá lá, não wishlist"
- Pergunta: "Alguém tem projeto que combina BD + Async + Cache?"

---

### **Slide 11: O Método — Engenharia Reversa**
**Layout:** Full-width statement  
**Título:** "Como Extrair Verdade do Código sem Alucinação"

**Frase central (72pt):**
"**Documentação ≠ Ficção | Engenharia Reversa ≠ Invenção**"

**Visual:** Ícone: 🔎 (lupa em código) ≠ 🎨 (pincel/invenção)

**Notas do apresentador:**
- "Vamos aprender o contrato anti-alucinação"
- Tom: técnico mas provocador

---

### **Slide 12: O Contrato Anti-Alucinação**
**Layout:** 3 rules stacked  
**Título:** "3 Regras para Não Inventar"

**Regra 1: Se Não Acha, Marca 'Não Identificado'**
- ❌ Problema: "Acho que tem auth aqui"
- ✅ Solução: "Auth não identificada" (ou "procurar mais")

**Regra 2: Nunca Invente Feature Que Não Viu**
- ❌ "Este projeto certamente tem cache" (sem evidência)
- ✅ "Cache não encontrado em /cache, /middleware, etc."

**Regra 3: Quando Dúvida, Pergunte**
- Ao código (procure em places específicos)
- Ao time (pair programming)
- Ao stack (redis? presente? search com ctrl+F)

**Visual:** 
- Regra 1: ❌ → ❓
- Regra 2: ❌ → 🔍
- Regra 3: ❌ → 💬

**Notas do apresentador:**
- "Isso é a diferença entre doc e ficção"
- Pausa dramática: "Se a ferramenta inventa, ela é inútil"

---

### **Slide 13: Exemplo Prático — Engenharia Reversa, Parte 1**
**Layout:** Code walkthrough  
**Título:** "Encontrando Banco de Dados em Estrutura Real"

**Cenário:** Analisar repositório backend-api

**Estrutura de Pasta:**
```
src/
├── config/
├── models/     ← 🔍 BD está aqui
├── controllers/
├── middleware/
├── services/
└── migrations/ ← 🔍 BD está aqui
```

**Processo de Engenharia Reversa:**
1. **Procurar em `/models`:** Encontra `User.js`, `Post.js` (ORM)
2. **Procurar em `/migrations`:** Encontra `001_create_users.sql`
3. **Procurar em `package.json`:** Encontra `"sequelize": "^6.0"` ou `"typeorm": "^0.3"`
4. **Conclusão:** ✅ BD Identificada — PostgreSQL com Sequelize

**Evidência = Resposta**

**Notas do apresentador:**
- "Não é intuição — é busca sistemática"
- Mostre em live demo (abra repositório, ctrl+F "migrate"/"model")

---

### **Slide 14: Exemplo Prático — Engenharia Reversa, Parte 2**
**Layout:** Checklist preenchido  
**Título:** "Resultado: Checklist Preenchido com Evidências"

**Modelo Preenchido (fictício):**
```
✅ Banco de Dados
   Evidência: /src/models/ + /migrations/ + sequelize em package.json
   Tipo: PostgreSQL
   
✅ Auth
   Evidência: /src/middleware/auth.js + JWT tokens em .env.example
   Tipo: JWT
   
❌ Cache
   Evidência: Nenhuma em /cache, package.json não menciona redis
   Status: Não implementado
   
✅ Jobs Agendados
   Evidência: /src/jobs/ + bull em package.json
   Tipo: Bull (Redis queue)
   
❓ Notificações
   Evidência: /src/services/email.js encontrado, mas SQS não claro
   Status: Requer investigação (marcar para perguntar ao time)
```

**Insight:** "Checklist é evidência, não opinião"

**Notas do apresentador:**
- "Isso que vocês veem é documentação OBJETIVA"
- "Qualquer dev consegue replicar esse checklist"

---

### **Slide 15: Por Que Isso Importa para Design de Ferramenta**
**Layout:** Cause & Effect  
**Título:** "Se Você Automatizar Doc, Sua Ferramenta Precisa..."

**Esquerda (Problema):**
```
Ferramenta que Inventa:
❌ "Projeto tem cache"
   (sem procurar)
❌ "Usa microserviços"
   (sem evidência)
❌ Resultado: doc inútil
```

**Direita (Solução):**
```
Ferramenta que Encontra:
✅ "Cache não encontrado
   em [places específicos]"
✅ "Monolítico detectado
   porque [razão]"
✅ Resultado: doc confiável
```

**Insight Central:** "A qualidade da ferramenta = qualidade da engenharia reversa"

**Notas do apresentador:**
- Transição: "Agora que sabemos o método, vamos desenhar a estrutura universal..."

---

## SEGMENTO 3: PADRÃO ESTRUTURAL (Slides 16-20)

### **Slide 16: Esqueleto Canônico de Documentação**
**Layout:** Title + intro text  
**Título:** "O Que Não Pode Faltar (Universal)"

**Frase orientadora:**
"Todo projeto técnico precisa responder 9 perguntas. Se responder, está documentado."

**Notas do apresentador:**
- "Esse esqueleto funciona em backend, frontend, automação, IaC..."
- "É universal."

---

### **Slide 17: 9 Seções do Esqueleto**
**Layout:** Mixed (núcleo destacado + condicionais com toggles)  
**Título:** "As 9 Seções: Núcleo + Condicionais"

**NÚCLEO (Sempre):**
- 🎯 **1. Visão Geral** — O que é isto? (para quem? por quê?)
- 🏗️ **2. Arquitetura** — Como é organizado?
- 📦 **3. Stack e Dependências** — Com que tecnologia?

**CONDICIONAIS (Se Presente):**
- 🗄️ **4. Banco de Dados** — Como os dados estão organizados?
- 💾 **5. Cache** — O que é cacheado?
- 🔐 **6. Autenticação** — Como o sistema sabe quem você é?
- ⏰ **7. Fila / Async** — O que roda em background?
- 📦 **8. Armazenamento** — Onde estão os arquivos?
- 🔔 **9. Notificações** — Como o sistema avisa?

**Visual:** 
- Núcleo em destaque (cor mais forte, ícones maiores)
- Condicionais com toggles (on/off)

**Notas do apresentador:**
- "Se projeto não tem DB, não escreve seção BD"
- "Se tem DB, BD é obrigatória"
- Pergunta: "Falta algo aí? Alguma 10ª seção que vocês precisam sempre?"

---

### **Slide 18: Como Estruturar em Níveis**
**Layout:** Stacked files + arrows  
**Título:** "Aplicando Níveis ao Esqueleto"

**Visualização de Arquivos:**

**L1 — Essencial (1 arquivo, 20 minutos de leitura)**
```
README.md
├── Visão Geral
├── Arquitetura (diagrama simples)
└── Stack
```

**L2 — Completo (2-3 arquivos, 2h leitura)**
```
README.md
├── (tudo de L1)
├── BD (schema, migrations)
├── Auth (fluxo JWT)
└── [seções ativas]

ARCHITECTURE.md
├── Decisões técnicas
├── Trade-offs
└── Alternativas consideradas
```

**L3 — Aprofundado (4+ arquivos, 1 dia)**
```
CONTRIBUTING.md
├── Setup dev
├── Padrões de código
├── Debugging
└── Performance

TROUBLESHOOTING.md
├── Cenários comuns
├── Logs
└── Soluções

E mais 2-3 docs específicas
```

**Relação:** L1 ⊂ L2 ⊂ L3 (cada nível inclui o anterior)

**Notas do apresentador:**
- "Não são versões diferentes — são incrementos"
- "Você escreve L1, depois L1 + 300 linhas = L2"

---

### **Slide 19: Exemplo Real — Backend-API com BD + Auth**
**Layout:** Scenario-based  
**Título:** "Projeto Concreto: Backend-API que Tem BD + Auth"

**Cenário:**
```
Tipo de projeto: Backend-API
Capacidades: ✅ BD ✅ Auth ❌ Cache ✅ Jobs

Doc esperada:
L1 (2-3 páginas):
  ✅ Visão Geral
  ✅ Arquitetura
  ✅ Stack
  ✅ BD (esquema básico)
  ✅ Auth (fluxo básico)
  ❌ Cache (não tem)
  ✅ Jobs (trigger básico)

L2 (5-6 páginas):
  L1 + detalhes de:
  - BD: migrations, índices, queries lentas
  - Auth: refresh token strategy, 2FA
  - Jobs: retry logic, dead letter queue

L3 (10+ páginas):
  L2 + troubleshooting, scaling, edge cases
```

**Insight:** "Estrutura é função da variante + capacidades"

**Notas do apresentador:**
- "Projeto X com BD + Auth tem EXATAMENTE essas 5 seções"
- "Não mais, não menos"
- Pergunta: "Se doc tem seção que não deveria ter, o que isso significa?"
- (Resposta esperada: "Projeto tem capacidade que não tá implementada")

---

### **Slide 20: Checklist Objetivamente Verificável**
**Layout:** Checklist grid  
**Título:** "Como Verificar se Documentação Está Completa"

**Para cada seção, pergunta objetiva:**

```
L1 — Essencial
□ Visão Geral: Responde "O que é isto?"? (1 parágrafo clareia)
□ Arquitetura: Tem diagrama? (visual é obrigatório)
□ Stack: Lista tecnologias? (versões mencionadas?)

L2 — Completo (se BD ativa)
□ BD: Tem schema SQL/descrição? (tabelas principais?)
□ BD: Tem 1 exemplo de query? (SELECT real funciona?)

L2 — Completo (se Auth ativa)
□ Auth: Tem diagrama de fluxo? (login → token?)
□ Auth: Menciona tempo de expiry? (quanto tempo vale?)

L3 — Aprofundado (se Jobs ativa)
□ Jobs: Como triggar? (evento/cron/manual?)
□ Jobs: O que acontece se falhar? (retry/deadletter?)
```

**Resultado:** Checklist SIM/NÃO (sem subjetividade)

**Insight:** "Doc está completa quando checklist é 100% SIM"

**Notas do apresentador:**
- "Isso remove 'achismo' — é binário"
- "Se 80%, significa 20% faltando — clara é a lacuna"

---

## SEGMENTO 4: IMPLEMENTAÇÕES (Slides 21-25)

### **Slide 21: Caso de Estudo — PADTec**
**Layout:** Logo + descrição  
**Título:** "Um Exemplo Real: PADTec"

**O que é:**
```
PADTec (Semantic Documentation Generation Package)
┌─────────────────────────────────────┐
│ Prompts (orquestrador + 5 variantes)│
│          ↓                          │
│ Templates (47 arquivos)             │
│          ↓                          │
│ Documentação (automática)           │
└─────────────────────────────────────┘
```

**Como funciona:**
1. Agente lê código do seu projeto
2. Executa prompts (engenharia reversa)
3. Preenche templates automaticamente
4. Resultado: 3 níveis × 5 variantes × 9 capacidades

**Resultado:**
- ✅ Backend-API com 5 seções relevantes
- ✅ Frontend com 4 seções relevantes
- ✅ Cada em 3 níveis (L1/L2/L3)
- ✅ Tudo baseado em engenharia reversa (sem invenção)

**Link:** https://github.com/gersonvan/padtec  
**Licença:** Open source (MIT)

**Notas do apresentador:**
- "Isso nasceu do mesmo problema que vocês têm"
- "Abordagem: padrão universal + automação com IA"

---

### **Slide 22: Por Que PADTec?**
**Layout:** Problem → Solution  
**Título:** "O Que PADTec Resolve"

**Problema Nomeado:**
- Times ágeis entregam código rápido
- Documentação fica para trás (manual, tedioso)
- Novo dev demora 1 semana pra entender
- Doc fica desatualizada (código evolui, doc não)

**Solução PADTec:**
- Padrão universal (não precisa desenhar de novo)
- Automação (executa engenharia reversa)
- Mantém-se viva (roda depois de cada deploy)
- Reutilizável (mesma ferramenta em 10 projetos)

**Custo-Benefício:**
- Vez 1: 2h setup
- Vez 2-10: 15 min cada (ferramenta já funciona)
- Manutenção: 0 (automática)

**Notas do apresentador:**
- "Não é mágica — é arquitetura deliberada"

---

### **Slide 23: Outras Abordagens Possíveis**
**Layout:** 5 alternatives cards  
**Título:** "Diferentes Caminhos para o Mesmo Destino"

**Abordagem 1: Scripts Bash + Templates**
- Pro: Simples, nenhuma ferramenta externa
- Con: Difícil manter, sem engenharia reversa sofisticada
- Caso: Projeto pequeno (< 50k linhas)

**Abordagem 2: Plugin de IDE**
- Pro: Doc inline, sincronizada com código
- Con: Dependência de IDE
- Caso: Trabalho ágil, atualizações rápidas

**Abordagem 3: Gerador Estático**
- Pro: Escalável, versionável (git)
- Con: Precisa estruturar beforehand
- Caso: Documentação complexa, múltiplos projetos

**Abordagem 4: Agente Customizado (IA)**
- Pro: Inteligência, adaptável
- Con: Precisa de LLM, custo de API
- Caso: Padrão não trivial, precisa de raciocínio

**Abordagem 5: Checklist Manual**
- Pro: Controle total, sem tecnologia
- Con: Tedioso, sujeito a erro humano
- Caso: Documentação crítica, poucos projetos

**Insight:** "Escolha depende de contexto (tamanho projeto, budget, velocidade desejada)"

**Notas do apresentador:**
- "Qual cabe no seu projeto?"
- "Qual é mais sustentável pro seu time?"

---

### **Slide 24-25: Discussão Facilitada — Qual Cabe em Você?**
**Layout:** Q&A visual  
**Título:** "Qual Abordagem Cabe Melhor no Seu Contexto?"

**Pergunta ao Público:**
"Olhando as 5 abordagens, qual se aproxima do que vocês precisam?"

**Opções de resposta (dar 2 min de reflexão silenciosa):**
- 🙋 Todos querem simples (scripts + templates)?
- 🙋 Alguém quer automação completa (PADTec)?
- 🙋 Alguém quer plugin de IDE?
- 🙋 Alguém quer controle total (checklist manual)?

**Próximo passo (você anota respostas):**
- Invite 2-3 respostas breves (30 seg cada)
- "Por que essa abordagem funciona pro seu time?"

**Transição:** "Agora é a sua vez de desenhar..."

---

## SEGMENTO 5: WORKSHOP PRÁTICO (Slides 26-27 + Materiais Físicos)

### **Slide 26: Instruções de Grupo**
**Layout:** Step-by-step  
**Título:** "Workshop Prático: Design Coletivo"

**Instruções Claras:**

```
👥 GRUPOS: 4-5 pessoas cada

🎯 TAREFA:
Vocês vão desenhar solução de documentação 
para UM tipo de projeto

⏱️ TEMPO: 25 minutos

📝 ENTREGA:
Canvas preenchido com:
  1. Esqueleto de seções para seu projeto
  2. Como detectar capacidades (procurar onde?)
  3. Nível mínimo viável (o que novo dev PRECISA?)
  4. Se automassem, qual abordagem escolheriam?

💬 FACILITADOR:
Circula entre grupos, faz perguntas-gatilho, 
não resolve, ajuda a pensar.

📸 Depois: Vocês apresentam 2 min cada
```

**Material Distribuído:**
- Canvas (impresso ou compartilhado digitalmente)
- Marcadores/canetas
- Post-its para notas

**Notas do apresentador:**
- "Grupos, sentem-se juntos"
- "Escolham um tipo de projeto que vocês conhecem"
- "Não precisa ser perfeito — é sketch"

---

### **Slide 27: Espaço para Apresentações**
**Layout:** Gallery walk / Carousel  
**Título:** "7 Minutos: Vocês Apresentam"

**Formato:**
```
Cada grupo: 2 minutos
Máximo 5 grupos: 10 minutos (isso sobra tempo)

Se > 5 grupos, combinar apresentações ou 
fazer 1 min por grupo
```

**Estrutura de cada apresentação:**
1. **Nome projeto + tipo** (15 seg)
2. **Seções principais** (45 seg)
3. **Como detectam capacidades** (45 seg)
4. **Que abordagem escolheram** (15 seg)

**Facilitador durante apresentações:**
- Anotar padrões comuns
- Pergunta rápida após cada: "Qual foi a capacidade mais difícil de detectar?"
- Prepare síntese pós-apresentações

---

## SEGMENTO 6: FECHAMENTO (Slides 28-31)

### **Slide 28: Padrões Emergentes**
**Layout:** Venn diagram / common ground  
**Título:** "Padrões Que Emergmos Hoje"

**Resumo Coletivo (você faz baseado em apresentações):**
```
Seções que TODOS os grupos tiveram:
✅ Visão Geral
✅ Arquitetura
✅ Stack

Seções que variaram (conforme projeto):
- Backend: DB, Auth
- Frontend: Componentes, States
- Automação: Fluxo, Triggers

Insight: "Sem propor, vocês chegaram no padrão universal"
```

**Conclusão:**
"Padrão emerge naturalmente quando você pensa estruturalmente. Não é prescritivo — é inevitável."

**Notas do apresentador:**
- Mostre convergência: "Olhem que legal — 5 grupos, 5 contextos diferentes, mesma estrutura base"
- Celebre: "Vocês acabam de descobrir o padrão"

---

### **Slide 29: Quando Usar Ferramenta vs. Padrão Manual**
**Layout:** Decision tree  
**Título:** "Como Escolher Entre Abordagens"

**Árvore de Decisão:**

```
Projeto é pequeno? (< 5 devs)
├─ SIM → Padrão manual (checklist + markdown)
└─ NÃO ↓
     Projeto é único ou múltiplos projetos?
     ├─ ÚNICO → Checklist manual ou scripts simples
     └─ MÚLTIPLOS ↓
          Doc precisa ficar viva? (atualizar frequente)
          ├─ SIM → Automação (PADTec ou script)
          └─ NÃO → Padrão manual (boa documentação é suficiente)
```

**Exemplos Concretos:**
- Equipe de 2 devs, 1 projeto: Padrão manual (15 min setup)
- 10 devs, 3 projetos ativos: Automação (2h setup, paga em semana)
- 50 devs, 20 projetos: Automação + governance (1 semana setup, economia 6 meses)

**Insight:** "A ferramenta não importa. O padrão importa."

**Notas do apresentador:**
- "Não é 'ferramenta boa' vs 'manual ruim'"
- "É escolher o jeito certo pro seu contexto"

---

### **Slide 30: Integração Ágil — Documentação é DoD**
**Layout:** Kanban board visual  
**Título:** "Definition of Done: Doc Faz Parte"

**Antes (Anti-padrão):**
```
✅ Código escrito
✅ Testes passam
❌ Documentação "depois" (nunca vem)
```

**Depois (Ágil + Doc):**
```
✅ Código escrito
✅ Testes passam
✅ Documentação viva (checklist 100%)
   └─ Seção afetada? Atualizada
   └─ Capacidade ativa? Documentada
```

**Implementação na Sprint:**
- Story: "+5 endpoints de pagamento"
- DoD também inclui: "Documentação de integração Stripe atualizada"
- Tempo: código 2h + doc 30min (reutiliza template)

**Mentalidade Ágil:**
"Documentação é parte da entrega, não épico separado"

**Notas do apresentador:**
- Pergunta ao público: "Alguém tem doc em DoD já?"
- Se sim, celebre. Se não, "esse é o próximo passo"

---

### **Slide 31: Convite + Próximos Passos**
**Layout:** CTA (call to action) large  
**Título:** "O Que Vocês Podem Fazer Segunda-Feira"

**3 Próximos Passos (escolham 1):**

**Opção 1: Implementar o Padrão (Semana 1)**
- Copie o esqueleto que vocês desenharam aqui
- Apliquem em 1 projeto real
- Preencham o checklist
- Resultado: doc estruturada

**Opção 2: Automatizar (Semana 2+)**
- Peguem ferramentas (PADTec, scripts próprios, etc.)
- Adaptem pra seu contexto
- Rode em 3 projetos
- Resultado: doc automática + reutilizável

**Opção 3: Desenhar Ferramenta Própria**
- Vocês têm padrão
- Vocês entendem o problema
- Podem codificar solução pro seu stack
- Exemplo: plugin VS Code, gerador Gatsby, agente customizado

---

**Recursos Disponíveis:**

📦 **PADTec v1.0.1** (open source, MIT)  
→ https://github.com/gersonvan/padtec

👥 **Comunidade Agilizem** (pós-evento)  
→ Slack/grupo: compartilhem o que vocês implementaram

📚 **Referências Técnicas**
- Sommerville, I. (2015). Software Engineering
- Tanenbaum, A. S. (2007). Modern Operating Systems
- ISO/IEC/IEEE 26514:2008 — User documentation of software and systems

---

**Mensagem Final (leia com tom de convite, não despedida):**

*"Vocês deixam daqui sabendo que documentação não é mágica — é arquitetura.*

*Estrutura bem, e tudo fica claro.*

*Vocês agora são designers de solução, não consumers de ferramenta.*

*Segunda-feira, implementem. Terça, compartilhem nos grupos.*

*A gente continua junto."*

---

## 📸 Orientações Visuais Gerais

- **Paleta de cores:** Azul corporativo (#0051BA), branco, cinza escuro (#333333), destaque verde (#2ECC71)
- **Tipografia:** Montserrat 48pt (títulos), Open Sans 24pt (subtítulos), Open Sans 16pt (corpo)
- **Ícones:** Unicode/Emoji (✅, ❌, 🔍, 🏗️, etc.) ou ícones customizados (Feather Icons)
- **Diagramas:** Mermaid ou Figma (isométrico para 3D cube, flowcharts para Engenharia Reversa, Venn para padrões emergentes)
- **Imagens:** Unsplash (código, colaboração, arquitetura) — use com transparência 20-30%


# Estrutura e Agenda Detalhada — 1h30 (90 minutos)

## 📋 Timeline Completa

### **SEGMENTO 1: ABERTURA (5 minutos — 09:00–09:05)**

**Objetivo:** Captar atenção, nomear o problema, propor a jornada.

**Roteiro:**
- **Slide 1-2** (1 min): Título + imagem impactante
  - "Documentação Técnica Automática: Do Manual Tedioso ao Padrão Inteligente"
  - Imagem sugerida: código ao fundo, pessoas colaborando em foreground

- **Slide 3** (2 min): O problema
  - Frase-gancho: *"Times ágeis entregam código em 2 semanas. Documentação leva 2 meses."*
  - Estrutura visual: lado esquerdo velocidade (ágil), lado direito lentidão (doc manual)
  - Pergunta provocadora: "Vocês enfrentam isso?"

- **Slide 4** (2 min): O que vai sair daqui
  - Três promessas:
    1. Entender padrão universal de doc (vale em qualquer projeto)
    2. Desenhar sua própria solução (não ferramenta prescritiva)
    3. Sair com checklist implementável
  - Tom: "Aqui vocês deixam de ser consumidores de ferramenta para ser designers de solução."

**Transição:** "Vamos começar entendendo três dimensões que aparecem em toda documentação..."

---

### **SEGMENTO 2: CONCEITOS (15 minutos — 09:05–09:20)**

**Objetivo:** Introduzir framework mental (3 dimensões + engenharia reversa).

#### **Bloco 2.1 — Três Dimensões (7 min)**

**Roteiro:**
- **Slide 5** (1 min): Título — "Documentação tem 3 dimensões"
  - Visual: cubo 3D com eixos rotulados

- **Slide 6-7** (2 min): Dimensão 1 — **Variante**
  - O que é: tipo de sistema (backend-api, frontend, automação, iac, etc.)
  - Por que importa: cada tipo tem seções universais diferentes
  - Exemplo: backend precisa de "Arquitetura de BD", frontend não
  - Visual: 5 colunas (ícones dos 5 tipos)

- **Slide 8-9** (2 min): Dimensão 2 — **Nível**
  - O que é: profundidade (L1-essencial, L2-completo, L3-aprofundado)
  - Por que importa: usuário diferente = profundidade diferente
  - Relação: L1 ⊂ L2 ⊂ L3 (inclusão, nunca redação duplicada)
  - Visual: pirâmide com 3 níveis

- **Slide 10** (2 min): Dimensão 3 — **Capacidades**
  - O que é: features que podem estar ou não no código (BD, cache, jobs, auth, etc.)
  - Por que importa: doc muda se você tem job ou não
  - Imagem: checklist (9 capacidades comuns)

**Checkpoint:** Pergunta ao público: "Algum de vocês já precisou de doc que cobre banco de dados e outro que não precisa?" (resposta esperada: sim — validação do modelo)

#### **Bloco 2.2 — Engenharia Reversa (8 min)**

**Roteiro:**
- **Slide 11** (1 min): O método — Engenharia Reversa
  - Título: "Como extrair verdade do código sem alucinação"

- **Slide 12** (2 min): O contrato anti-alucinação
  - Regra 1: Se você não encontra evidência, você marca "não identificado"
  - Regra 2: Nunca invente feature que você não viu
  - Regra 3: Quando dúvida, pergunte ao código ou time
  - Visual: ícone ✅ para encontrado, ❌ para não encontrado

- **Slide 13-14** (3 min): Exemplo prático
  - Cenário: analisar repositório de backend-api real
  - Mostrar: estrutura de pasta → seções esperadas
  - Demonstração ao vivo: "Onde está o banco de dados? (procure em migrations/) Onde está auth? (procure em middleware/)"
  - Resultado: checklist preenchido com evidências

- **Slide 15** (2 min): Por que isso importa para design de ferramenta
  - Se você automatiza doc, sua ferramenta **precisa fazer engenharia reversa**
  - Diferença: ferramenta que inventa vs. ferramenta que encontra

**Transição:** "Agora que entendemos as 3 dimensões e o método, vamos ver a estrutura universal..."

---

### **SEGMENTO 3: PADRÃO ESTRUTURAL (10 minutos — 09:20–09:30)**

**Objetivo:** Apresentar esqueleto canônico (universal) e como adaptá-lo.

**Roteiro:**
- **Slide 16** (1 min): Título — "Esqueleto Canônico de Documentação"
  - O que todo projeto precisa (universal)

- **Slide 17** (3 min): 9 Seções Universais
  - **Núcleo (sempre):**
    1. Visão Geral (what is this?)
    2. Arquitetura (how is it organized?)
    3. Stack e Dependências (what tech?)
  
  - **Conditional (se presente):**
    4. Banco de Dados (BD presente?)
    5. Cache (cache presente?)
    6. Autenticação (auth presente?)
    7. Fila/Async (jobs/async presente?)
    8. Armazenamento (storage presente?)
    9. Notificações (notifications presente?)
  
  - Visual: 3 núcleo em destaque + 6 condicionais com toggles

- **Slide 18** (2 min): Como estruturar doc em níveis
  - L1 = 3 seções essenciais (visão, arquitetura, stack)
  - L2 = L1 + seções condicionais baseadas em capacidades
  - L3 = L2 + detalhes aprofundados (exemplos, troubleshooting)
  - Visual: três arquivos com conteúdo cumulativo

- **Slide 19** (2 min): Exemplo: backend-api com BD + Auth
  - Mostrar que doc tem exatamente essas 5 seções (não mais, não menos)
  - Checklist: "Se você tem BD mas doc não menciona, você perdeu capacidade"
  - Insight: "Documentação é espelho de capacidades reais"

- **Slide 20** (2 min): Checklist objetivamente verificável
  - Para cada seção: "Essa seção responde X?" (sim/não)
  - Exemplo: "Seção Arquitetura responde: quais são os componentes principais? Sim/Não?"
  - Valor: Remove subjetividade — doc está completa ou não

**Transição:** "Agora vamos ver como diferentes equipes implementaram isso..."

---

### **SEGMENTO 4: IMPLEMENTAÇÕES E ALTERNATIVAS (10 minutos — 09:30–09:40)**

**Objetivo:** Mostrar PADTec como exemplo + abrir espaço para alternativas.

**Roteiro:**
- **Slide 21** (2 min): Caso de estudo — PADTec
  - O que é: ferramenta de geração de doc usando prompts + templates
  - Como funciona: agente lê código, executa prompts, preenche templates
  - Resultado: 3 níveis × 5 variantes × 9 capacidades condicionais = doc automática
  - Link: https://github.com/gersonvan/padtec

- **Slide 22** (1 min): Por que PADTec?
  - Nasceu do mesmo problema que vocês têm
  - Abordagem: padrão universal + automação

- **Slide 23-24** (4 min): Outras abordagens possíveis (brainstorm coletivo)
  - **Abordagem 1:** Scripts bash + templates markdown (simples, sem ferramenta)
  - **Abordagem 2:** Plugin de IDE (doc inline)
  - **Abordagem 3:** Gerador estático (tipo static site generator)
  - **Abordagem 4:** Agente customizado pra seu contexto (IA)
  - **Abordagem 5:** Checklist manual (sem automação, só padrão)
  - Insight: "A ferramenta não importa. O padrão importa."

- **Slide 25** (3 min): Discussão facilitada
  - Pergunta: "Qual desses cabe melhor no seu contexto?"
  - Deixar 2 min de silence para reflexão individual
  - Convidar 2-3 respostas rápidas

**Transição:** "Agora é a sua vez. Vocês vão desenhar..."

---

### **SEGMENTO 5: WORKSHOP PRÁTICO (35 minutos — 09:40–10:15)**

**Objetivo:** Grupos desenham sua própria solução (não código, desenho/canvas).

#### **Bloco 5.1 — Setup e Instruções (3 min)**

**Roteiro:**
- **Slide 26** (1 min): Instruções de grupo
  - Grupos de 4-5 pessoas
  - Cada grupo escolhe UM tipo de projeto (backend/frontend/automation/iac/escolha-própria)
  - Vocês têm 25 minutos para desenhar

- Distribuir canvas/templates (impresso ou digital compartilhado)

#### **Bloco 5.2 — Trabalho de Grupo (25 min)**

**Facilitador circula** respondendo perguntas. Não resolve, ajuda a pensar.

**Perguntas-gatilho para facilitar:**
- "Qual é o esqueleto de seções para [tipo de projeto]?"
- "Quais capacidades estão presentes no seu projeto?"
- "Como vocês descartam capacidades que não têm?"
- "Qual seria o nível mínimo viável para novo desenvolvedor entender?"
- "Alguém já tentou automatizar isso que vocês desenharam?"

**Canvas esperado (completado por grupo):**
```
PROJETO: [Nome]
TIPO: [Variante]

ESQUELETO DE SEÇÕES:
[ ] Visão Geral
[ ] Arquitetura
[ ] Stack
[ ] BD (ativo? sim/não)
[ ] Auth (ativo? sim/não)
[ ] Cache (ativo? sim/não)
[ ] [outras capacidades]

NÍVEL MÍNIMO VIÁVEL (L1):
[3-5 seções essenciais que novo dev PRECISA entender]

COMO DETECTAR CAPACIDADES:
[Onde procurar no código para saber se cada capacidade está presente]

FERRAMENTA/ABORDAGEM:
[Se implementássemos isso, como faríamos?]
```

#### **Bloco 5.3 — Apresentações de Grupo (7 min)**

**Regra:** 2 min por grupo (máximo 5 grupos em paralelo).

**Estrutura de apresentação:**
1. Nome + tipo de projeto (15 seg)
2. Esqueleto de seções (45 seg)
3. Como detectam capacidades (45 seg)
4. Ferramenta que escolheram/imaginariam (15 seg)

**Facilitador anota:** Padrões emergentes (seções repetidas, abordagens diferentes, etc.)

---

### **SEGMENTO 6: FECHAMENTO (15 minutos — 10:15–10:30)**

**Objetivo:** Síntese, padrões emergentes, empoderamento, próximos passos.

**Roteiro:**
- **Slide 27** (3 min): Padrões que emergimos hoje
  - Resumir: "Todos os grupos tiveram essas 3 seções em comum..."
  - Chamar atenção: "Sem propor, vocês chegaram no padrão universal"
  - Insight: "Padrão emerge naturalmente da estrutura do problema"

- **Slide 28** (2 min): Quando usar ferramenta vs. padrão manual
  - Ferramenta vale se: projeto grande, múltiplos times, doc precisa ser autom.
  - Padrão manual vale se: projeto pequeno, 1-2 devs, um README basta
  - Key: "O padrão é reutilizável independente de ferramenta"

- **Slide 29** (3 min): Integração ágil
  - Pergunta: "Isso entra em DoD (Definition of Done)?"
  - Sugestão: "Antes de mergear: ✅ Código + ✅ Teste + ✅ Doc viva"
  - Mentalidade: "Doc é parte da entrega, não épico separado"

- **Slide 30** (4 min): Convite + próximos passos
  - "O que vocês desenharam aqui pode virar realidade em [linguagem/stack dele]"
  - Compartilhar link PADTec + repositório de exemplos
  - Comunidade Agilizem contínua (Slack/grupo)
  - **Proposta:** "Implementem o padrão que vocês desenharam, e se quiserem, convertam em ferramenta depois"
  - Foto do grupo com canvas preenchido

- **Slide 31** (3 min): Encerramento + Q&A rápido
  - "Vocês deixam daqui sabendo que documentação não é mágica, é arquitetura."
  - Deixar 3 min aberto para perguntas rápidas (timeout aos 10:30)

---

## ⏱️ Checklist de Timing

| Segmento | Planejado | Real | Notas |
|----------|-----------|------|-------|
| Abertura | 5 min | ? | Não deixe passar 6 min |
| Conceitos | 15 min | ? | Se passar 17 min, corte 2 min bloco 2.2 |
| Padrão | 10 min | ? | Exemplo prático não pode durar > 2 min |
| Implementações | 10 min | ? | Discussão facilitada pode ser rápida |
| Prático | 35 min | ? | Crítico: 25 min grupos + 7 min apresentações |
| Fechamento | 15 min | ? | Q&A: máximo 3 min se apertar |
| **TOTAL** | **90 min** | ? | Zero folga |

---

## 🎤 Notas de Facilitação

### **Tom de voz:**
- Técnico, mas acessível (evitar jargão só de academia)
- Direto: cada frase deve responder "por quê?"
- Convidativo: "O que vocês acham?" em vez de "A resposta é..."

### **Gerenciamento de grupos:**
- Se grupo trava: fazer pergunta-gatilho (veja lista acima)
- Se grupo termina cedo: expandir para "Como vocês detectariam evolução dessa doc ao longo do tempo?"
- Se mais de 5 grupos: pedir que combinem apresentações ("Vocês têm 2 min, apresentem juntos")

### **Gestão de Q&A:**
- **Durante workshop:** Responda rápido (< 1 min), se ficar longo, convide pra depois
- **Fechamento:** Máximo 3 perguntas, 1 min cada

### **Backup / Contingência:**
- **Se apertar tempo:** Corte apresentações de grupo para 1 min, faça resumo coletivo você mesmo
- **Se sobrar tempo:** Expandir Slide 28 (quando usar ferramenta vs. padrão) com exemplos do público
- **Se internet cair:** Imprima exemplos PADTec beforehand; use quadro branco para diagrama 3D

---

## 📊 Materiais Necessários

- [ ] Projetor + áudio (teste dia anterior)
- [ ] Segundo monitor ou tablet para facilitador (agenda + exemplos)
- [ ] 20+ Impressões do canvas (se público > 20 pessoas)
- [ ] Marcadores/canetas (cores)
- [ ] Post-its (para notas rápidas)
- [ ] Câmera/celular (fotos das soluções dos grupos)
- [ ] Link compartilhável PADTec (QR code na slide 21)
- [ ] Repositório de exemplos preparado

---

## 🔔 2 Horas Antes do Workshop

- Testar projetor, som, wifi
- Preparar 5 grupos (intercalar experiência)
- Revisar agenda (essa checklist)
- Ter slides abertas em full screen
- Ter exemplos pronto em segundo monitor/aba
- Cronômetro visível para grupos (usar timer de celular projetado)

---

## 📝 Pós-Workshop (24h após)

Enviar por email para Agilizem (e para você):
1. Fotos dos 5 canvas
2. Resumo: "5 padrões emergentes que vimos"
3. Convite pra comunidade contínua
4. Link para feedback (typeform/pesquisa rápida)


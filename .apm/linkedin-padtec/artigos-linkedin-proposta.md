# Proposta de Artigos LinkedIn — PADTec

## Visão geral da estratégia

O PADTec é um projeto que converge três temas quentes em 2026: **documentação técnica** (problema crônico em engenharia), **agentes de IA** (ferramenta nascente com alto potencial) e **automação de processos** (necessidade universal). A estratégia é criar uma série de artigos que posicione você como especialista na interseção desses três domínios.

**Tom recomendado:** Técnico-acessível. Profundo o suficiente para engenheiros reconhecerem valor real, mas estruturado para que líderes e product managers também captem a relevância de negócio.

**Ritmo sugerido:** Um artigo a cada 7-10 dias durante 4-6 semanas. Permite construir narrativa e gerar tração sem parecer spam.

---

## Série 1: Apresentação do problema e proposta (Artigos 1-2)

### Artigo 1: "O paradoxo da documentação técnica em 2026"

**Ângulo narrativo:**  
A maioria das equipes de engenharia sabe que precisa de documentação, mas a qualidade é baixa e o mantimento é crônico. Documentação desatualizada é pior que nenhuma documentação. Por quê?

**Pontos-chave a desenvolver:**
- Documentação é vista como atividade secundária (versus feature, versus bug fix)
- Codificadores não gostam de documentar; documentação descola do código rapidamente
- Custo de produção é alto; custo de falha de comunicação também é alto
- Ferramentas tradicionais (Confluence, wikis, Markdown estático) deixam a responsabilidade no humano
- Problema amplifica com rotatividade de equipe (onboarding + institutional knowledge)

**Gancho emocional:**  
"Quantos projetos seus vocês conhecem onde a documentação é o primeiro lugar que alguém consulta? Agora quantos você conhece onde é o último?"

**Metáfora sugerida:**  
Documentação técnica é como mapas de rua: só é útil se for preciso *hoje*, não se foi preciso no ano passado.

**CTA (Call-to-action):**  
"Qual é o seu maior blocante: produzir ou manter? Comenta aí."

---

### Artigo 2: "Engenharia reversa documental: quando o código é a fonte de verdade"

**Ângulo narrativo:**  
Inverter o fluxo tradicional. Ao invés de "escrever documentação e manter código", usar "ler código como entrada principal e gerar documentação automaticamente".

**Pontos-chave a desenvolver:**
- O problema é epistemológico: documentação descola porque código é dinâmico, documentação é estática
- Solução: código como source-of-truth, não interpretação humana
- Exigência técnica: agente de IA lê artefatos do projeto (package.json, arquivos-chave, dependências, estrutura) e **infere**, não inventa
- Anti-alucinação: marcador explícito quando agente não encontra evidência ("CARÊNCIA: não identificado no código")
- Confiabilidade aumenta porque rastreabilidade é garantida

**Exemplo concreto sugerido:**  
Comparar documentação de arquitetura escrita manualmente (pode ter 6 meses de defasagem) versus extraída automaticamente do código (garante estar sincronizada).

**Visualização sugerida:**  
Diagrama simples mostrando o ciclo tradicional (escreve → código muda → desatualiza → problema) versus o novo (agente lê código sempre que chamado → atualiza documentação).

**CTA:**  
"Vocês já pensaram em usar IA não para gerar código, mas para *documentar* código? Qual seria o impacto na sua organização?"

---

## Série 2: Tecnicamente "como funciona" (Artigos 3-4)

### Artigo 3: "Três eixos de parametrização: como um agente entende contexto de projeto"

**Ângulo narrativo:**  
Um agente genérico não funciona. Para documentar bem, ele precisa saber: *que tipo* de projeto é, *quanto* detalhe você quer, e *que capacidades técnicas* estão presentes.

**Pontos-chave a desenvolver:**

1. **Variante (tipo de projeto):**
   - Full-stack web (frontend + backend no mesmo repositório)
   - Backend API (serviço isolado)
   - Frontend/SPA (aplicação de página única)
   - Automação/CLI (scripts e ferramentas)
   - IaC (infraestrutura como código)
   
   > Cada variante dispara um conjunto diferente de seções documentais. Um backend não precisa de "guia de componentes React"; uma SPA não precisa de "modelo de dados do servidor".

2. **Nível (profundidade):**
   - L1 Essencial (README + visão geral ~ 2-3 docs)
   - L2 Completo (arquitetura, modelo, operação ~ 10-14 docs; padrão)
   - L3 Aprofundado (+ quick-start, glossário, FAQ, troubleshooting ~ 30 docs)
   
   > Relação inclusão: L1 ⊂ L2 ⊂ L3. Todo conteúdo anterior existe, só muda profundidade.

3. **Capacidades condicionais (tecnologias detectadas):**
   - Banco de dados, cache, filas assíncronas, autenticação, integrações externas, storage, notificações, jobs agendados, multi-tenancy
   
   > Se o agente detecta "Redis" no código, ativa seção de cache. Se não detecta, omite. Sem invenção.

**Analogia sugerida:**  
"É como um médico. Ele não trata gripe da mesma forma que trata fratura. Primeiro diagnostica (qual é o projeto), depois decide a intensidade (quanto tempo/detalhe), depois trata as condições específicas (capacidades técnicas). O PADTec faz isso com documentação."

**Visualização sugerida:**  
Matriz 3D simples: eixo X (variantes), eixo Y (níveis), eixo Z (capacidades ativadas). Cada combinação produz um conjunto único de documentos.

**CTA:**  
"Qual é o 'tipo' do projeto que vocês mais gostariam de documentar? Qual nível de detalhe faz mais sentido no seu contexto?"

---

### Artigo 4: "Tool-calling nativo: por que IA precisa de acesso ao código para documentar bem"

**Ângulo narrativo:**  
A diferença entre um agente que *conversa sobre* código e um agente que *lê* código. Por que tool-calling nativo (GitHub Copilot, por exemplo) muda a qualidade da saída.

**Pontos-chave a desenvolver:**
- Prompt de chat genérico: "pode documentar?" → alucinação, improviso, imprecisão
- Tool-calling nativo: agente lê `package.json`, `main.ts`, dependências, estrutura de pastas → infere com evidência
- Não precisa colar código em chat; agente acessa filesystem diretamente
- Controle de qualidade embutido: "não acho evidência de X, então marco como CARÊNCIA"
- Reprodutibilidade: mesmos inputs (código) → mesma saída (docs), se agente for determinístico

**Exemplo concreto:**  
Diferenciar:
- ❌ Usuário: "Meu projeto usa cache. Documenta." → Agente acha "cache" e inventa tratamento de invalidação inexistente.
- ✅ Usuário: "Abre `padtec/prompts/00-mestre.md` em `meu-projeto/`" → Agente lê `package.json`, encontra `redis`, lê exemplos de uso no código, documenta o que realmente existe.

**Analogia sugerida:**  
"Documentação sem acesso ao código é como descrever um filme que você ouviu falar mas nunca assistiu. Documentação com tool-calling é como assistir o filme e escrever o resumo."

**CTA:**  
"Qual é o seu principal blocante para adotar IA na documentação: confiança na precisão, or medo de alucinação?"

---

## Série 3: Implementação prática (Artigos 5-7)

### Artigo 5: "De zero a documentação em 6 passos: o workflow PADTec"

**Ângulo narrativo:**  
Prático e direto. Não é complexo quando quebra em passos claros. Este é o "guia rápido" que engenheiros querem.

**Pontos-chave a desenvolver:**

1. Copiar pasta `padtec/` para raiz do projeto
2. Escolher nível (L1, L2, L3)
3. Invocar prompt mestre no chat do agente
4. Agente detecta variante + capacidades, gera docs em `docs/`
5. Validar com checklist de QA
6. (Opcional) Publicar no Confluence

**Visualização sugerida:**  
Sequência de screenshots (ou mockup) mostrando cada passo. Ou infográfico horizontal.

**Tom:**  
"Parece complexo? Não é. Aqui está o workflow real, do início ao fim."

**CTA:**  
"Qual das 6 etapas vocês gostariam de entender melhor? Faço um deep-dive se pedirem."

---

### Artigo 6: "Detectar variante e capacidades automaticamente: como o agente entende seu projeto"

**Ângulo narrativo:**  
O "segredo" técnico do PADTec: não é mágica. É detecção sistemática de padrões.

**Pontos-chave a desenvolver:**
- Detecção de variante: estrutura de pastas, presença de frontend + backend, tipo de arquivo principal
- Detecção de capacidades: scan de dependências (`package.json`, `requirements.txt`, `Gemfile`), sinais no código (import de `redis`, `@nestjs/database`, etc.), configuração de ambiente
- Cada capacidade ativa uma seção condicional no template
- Marcação de "não encontrado" é explícita (CARÊNCIA)
- Feedback ao usuário: "encontrei X, Y, Z; não achei W, então deixei marcado"

**Exemplo prático:**  
Projeto Node.js com:
- `package.json` com `express`, `axios`, `ioredis` → detecta backend-api, integração externa, cache
- Sem `@prisma` ou `typeorm` → não ativa seção de banco de dados (marca CARÊNCIA se template espera)

**Visualização sugerida:**  
Checklist visual: "✅ Detectei Express (backend-api)" | "✅ Detectei Redis (cache)" | "❌ Não achei autenticação (JWT, etc.)"

**CTA:**  
"Qual é o projeto mais complicado que vocês têm? Apostaria que metade das suas capacidades o agente consegue detectar automaticamente."

---

### Artigo 7: "Validação e qualidade: como garantir que documentação gerada é confiável"

**Ângulo narrativo:**  
QA de documentação é tão importante quanto QA de código. Mas como se faz?

**Pontos-chave a desenvolver:**
- Checklist objetivo (presente em `padtec/checklist-qa.md`)
- Verificações automáticas: arquivo existe? Markdown é válido? Todos os placeholders foram preenchidos?
- Verificações manuais: faz sentido? Está alinhado com a realidade do código? Tem lacunas óbvias?
- Ciclo: gera → valida → acha gap → pede correção ao agente → revalida
- Teto de qualidade: 100% de aprovação em checklist antes de entregar

**Exemplo prático:**  
Item de checklist: "Todas as seções condicionais acionadas têm evidência de código (sem CARÊNCIA)"  
→ Passa: documento menciona Redis e tem exemplo no código  
→ Falha: documento menciona "autenticação OAuth2" mas você não achou OAuth2 no código

**Visualização sugerida:**  
Template de checklist mostrando alguns itens. Ou foto de tela do resultado "✅ 15/15 itens aprovados".

**CTA:**  
"Qual é seu critério hoje para aceitar documentação? É subjetivo ou objetivo? Deveria ser híbrido."

---

## Série 4: Casos de uso e impacto (Artigos 8-9)

### Artigo 8: "Três cenários onde o PADTec faz mais diferença"

**Ângulo narrativo:**  
Nem todo projeto se beneficia igualmente. Aqui estão os cenários onde o ROI é mais claro.

**Cenários:**

1. **Equipe crescendo/rotatividade alta**  
   - Problema: novo integrante entra, onboarding leva 3-4 semanas porque não tem docs
   - Solução: em 1 dia (agente roda durante a noite), tem documentação completa. Onboarding passa para 3-5 dias.
   - Métrica: `(semanas economizadas × salário) × N contratações = ROI`

2. **Projeto legado com falta crônica de documentação**  
   - Problema: "ninguém sabe como funciona"; medo de refatorar; débito técnico invisível
   - Solução: engenharia reversa documental como primeiro passo de modernização
   - Métrica: documentação = entrada para refatoração planejada; reduz risco de breaking changes

3. **Múltiplos serviços micro, cada um documentado diferente**  
   - Problema: cada serviço tem estilo de doc diferente; buscar algo é difícil
   - Solução: aplicar PADTec a todos → padronização automática
   - Métrica: tempo para buscar informação por serviço; reduz de "15min" para "3min"

**Tom:**  
"Qual desses cenários mais parece com sua realidade? Leia e compare notas comigo."

**CTA:**  
"Qual cenário é seu gargalo hoje? Quer que eu explore a solução específica para seu caso?"

---

### Artigo 9: "Por que agentes de IA vão transformar a documentação técnica (mais que transformaram o código)"

**Ângulo narrativo:**  
Visão forward. Código é difícil de gerar com IA (requer contexto completo, testes, lógica). Documentação é mais viável: é síntese, não criação do zero. E é mais urgente.

**Pontos-chave a desenvolver:**
- Documentação é o "último quilômetro" de comunicação
- IA é especialmente bom em tarefas de leitura + síntese + parametrização (exatamente o que PADTec faz)
- Documentação gerada por IA = confiável quando tem rastreabilidade de código (tool-calling)
- Futuro previsível: cada projeto terá IA documentadora rodando continuamente, docs sempre fresh
- Implicação: engenheiros vão dedicar *menos* tempo a documentação e *mais* tempo a decisões arquiteturais (que alimentam os docs)

**Analogia sugerida:**  
"Se GitHub Copilot mudou o dia a dia de coding, imagine um 'Copilot de documentação' que roda toda semana. Não é ficção científica; é próximo."

**Metáfora sugerida:**  
Documentação é como respiração: necessária, mas ninguém quer passar 30% do dia respirando. IA tira esse peso.

**CTA:**  
"Qual é sua visão de documentação técnica em 2027? Vocês acham que IA vai ser central ou continua periférica?"

---

## Série 5: Reflexão e communidade-building (Artigo 10)

### Artigo 10: "O que aprendemos construindo um agente que lê código para documentar"

**Ângulo narrativo:**  
Conclusivo + reflexivo. Tira lições do processo de desenvolvimento do PADTec e abre espaço para comunidade.

**Pontos-chave a desenvolver:**
- Alucinação é o verdadeiro inimigo; rastreabilidade é o escudo
- Agentes são bons em parametrização (decidir "que doc gerar"), não em improviso
- Stack-independence em templates (núcleo) é difícil mas essencial
- Comunidade: cada projeto que usa PADTec pode contribuir variantes, extensions, refinamentos
- Open-source de documentação: PADTec é espécie de "npm para docs"

**Tom:**  
"Aqui está o que a gente aprendeu. Vocês veem outros ângulos?"

**Convite explícito:**  
- Artigo menciona que PADTec é autocontido e copiável
- Convida leitores a: experimentar, adaptar, compartilhar refinamentos
- "Se seu projeto é X (variante não coberta) ou usa Y (capacidade nova), vamos conversar"

**CTA:**  
"Qual foi a maior surpresa para vocês neste artigo? Qual é o maior gap que vocês veem na ideia?"

---

## Recomendações gerais de escrita

### Estrutura recomendada por artigo (LinkedIn)

1. **Hook (primeiro parágrafo, 1-2 linhas)**  
   Pergunta provocativa ou afirmação surpreendente.  
   Ex.: "Quantos bugs você já encontrou porque ninguém sabia como o código realmente funcionava?"

2. **Contexto (1-2 parágrafos)**  
   Por que este problema é real. Estatística, anedota, ou observação.

3. **Ideia central (2-3 parágrafos)**  
   O conceito ou técnica que você quer passar. Pode ter 1-2 exemplos.

4. **Aplicação prática (1-2 parágrafos)**  
   "Como usar isso" ou "que considerar". Concreto.

5. **Chamada à reflexão (1 parágrafo)**  
   CTA que incentiva comentário. Pergunta aberta.

**Comprimento ideal:** 300-500 palavras. LinkedIn favorece posts que cabem em 1-2 scrolls.

### Tom de voz

- **Tecnicamente preciso:** use termos corretos, não simplifique demais
- **Mas acessível:** evite jargão desnecessário; explique conceitos novos rapidamente
- **Ativo, não passivo:** "você descobre um problema" não "um problema é descoberto"
- **Exemplos concretos:** melhor que abstrações. "Express, Redis, Prisma" funciona melhor que "alguns frameworks"

### Recursos visuais (recomendação)

- Use 1 imagem / 1 diagrama por artigo (aumenta cliques 2-3x no LinkedIn)
- Alternativas:
  - Infográfico (Canva, Figma, até ASCII se bem-feito)
  - Screenshot anotado
  - Diagrama Mermaid ou flowchart simples
  - Foto sua na frente de quadro branco com sketch

### Hashtags

Para cada artigo, use 8-12 hashtags incluindo:
- `#DocumentaçãoTécnica`
- `#EngenhariaReverse` (ou `#EngenhariaDeSoftware`)
- `#InteligênciaArtificial` / `#IA`
- `#CópilotGitHub` (se aplicável)
- `#DevOps` / `#SoftwareArchitecture` (contexto específico)
- `#Portuguese` (segmenta para audiência PT-BR)
- Hashtags de nicho (ex.: `#FullStack`, `#Microserviços` conforme artigo)

---

## Plano de publicação sugerido

| Semana | Artigo | Tema |
|--------|--------|------|
| 1 | 1-2 | Problema + Solução |
| 2 | 3-4 | Tecnicamente "como funciona" |
| 3 | 5-6 | Prática (workflow + detecção) |
| 4 | 7-8 | Qualidade + Cenários |
| 5 | 9-10 | Visão forward + Comunidade |

**Cadência:** Publicar segunda ou quarta-feira, preferencialmente 10h-11h (horário BR, pico de atividade no LinkedIn).

---

## Próximas ações

1. **Escrever artigo 1** como prototipo; publicar e avaliar tração
2. **Coletar feedback** de comentários e mensagens diretas
3. **Adaptar série** conforme resposta da comunidade
4. **Considerar** long-form (LinkedIn Articles, Medium) para temas mais profundos
5. **Explorar** formatos alternativos: video (1-3 min), carrossel (5-10 slides)

---

**Autor da proposta:** Análise do PADTec + estratégia de posicionamento.  
**Data:** 2026-06-25  
**Status:** Proposta inicial para validação.

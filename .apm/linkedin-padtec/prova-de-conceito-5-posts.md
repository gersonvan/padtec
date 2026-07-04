# Prova de Conceito: 5 Posts LinkedIn — PADTec

## Estratégia

Testar o mercado com **5 posts de impacto** ao longo de 5-7 semanas. Depois, com base em feedback real, decidir:
- Continuar com mais posts?
- Expandir para articles long-form?
- Pivotar para outro ângulo?

**Objetivo:** Validar interesse, coletar feedback, identificar qual tópico gera mais tração.

---

## Os 5 Posts

### Post 1: "O paradoxo da documentação"
**Ângulo:** Problema universal  
**Comprimento:** 300-400 palavras  
**CTA:** Qual é seu blocante?  
**Semana:** 1

**Hook (escolha um):**
- "Levanta a mão quem trabalha com documentação de 6+ meses atrás. Agora levanta quem ainda confia nela."
- "Se código sem testes é débito técnico, o que é código sem documentação?"
- "Documentar é necessário. Ninguém quer fazer. Resultado? Ninguém tem."

**Estrutura:**
1. Hook provocativo
2. Três razões por que documentação morre (responsável é humano, código muda 1x/semana, docs revisadas 1x/6 meses, gap de conhecimento)
3. Custo de falha (onboarding lento, bugs, refatoração arriscada)
4. "Solução existe, próximo post"
5. CTA: "Qual é seu gargalo: produzir ou manter?"

**Visualização:** Gráfico "tempo até defasagem" — código vs documentação divergem progressivamente

---

### Post 2: "Engenharia reversa documental"
**Ângulo:** Solução (código como fonte de verdade)  
**Comprimento:** 350-400 palavras  
**CTA:** Já pensaram em usar IA assim?  
**Semana:** 2

**Hook (escolha um):**
- "E se invertêssemos? Em vez de 'escrever docs para refletir código', usar 'código como entrada para gerar docs'?"
- "Qual foi a última vez que você descobriu um bug na documentação? Aposto que o código estava certo."

**Estrutura:**
1. Hook (inversão de fluxo)
2. O problema: docs estáticas, código dinâmico → divergência é inevitável
3. Solução: código como single source of truth
   - Ler código (package.json, estrutura, dependências)
   - Inferir padrões
   - Gerar documentação que reflete estado atual
4. Por que funciona: rastreabilidade + atualização contínua + anti-alucinação (marca o que não encontra)
5. CTA: "Qual é a afirmação na sua doc que você tem CERTEZA que está atualizada?"

**Visualização:** Lado-a-lado: "Fluxo tradicional" (escreve → código muda → desatualiza) vs "Fluxo reverso" (agente lê → sempre sincroniza)

---

### Post 3: "Três eixos: como um agente entende seu projeto"
**Ângulo:** Técnica (parametrização)  
**Comprimento:** 350-400 palavras  
**CTA:** Qual combinação faz sentido pro seu projeto?  
**Semana:** 3

**Hook (escolha um):**
- "Um agente genérico falha em 80% dos casos. Aqui está por quê — e como consertar."
- "Se você documentaria um backend diferente de um frontend, por que seus prompts são os mesmos?"

**Estrutura:**
1. Hook (genérico não funciona)
2. Eixo 1: Variante (tipo de projeto)
   - Full-stack, backend isolado, frontend, CLI, IaC
   - Exemplo: "Backend não precisa de 'Componentes React'"
3. Eixo 2: Nível (profundidade)
   - L1 mínimo, L2 padrão, L3 completo
   - Relação inclusão: L1 ⊂ L2 ⊂ L3
4. Eixo 3: Capacidades (tecnologias detectadas)
   - 9 capacidades (database, cache, filas, auth, etc.)
   - Agente detecta o que existe, omite o que não existe
5. Resultado: matriz única = documentação perfeitamente calibrada
6. CTA: "Qual combinação faz mais sentido pro seu maior projeto?"

**Visualização:** Matriz ou tabela mostrando exemplos de combinações (Backend API + L2 + {database, auth, cache} = X documentos)

---

### Post 4: "6 passos de zero a documentação"
**Ângulo:** Prático (workflow)  
**Comprimento:** 300-350 palavras  
**CTA:** Qual passo é o mais 'mágico'?  
**Semana:** 4

**Hook (escolha um):**
- "Documentação automática não é ficção. Vou mostrar o workflow real que funciona hoje."
- "A curva de aprendizado é menor que você acha. Aqui estão os 6 passos."

**Estrutura:**
1. Hook (simplifica: apenas 6 passos)
2. Passo 1: Copie pasta `padtec/` (Ctrl+C)
3. Passo 2: Escolha nível (L1/L2/L3) — 1 minuto
4. Passo 3: Abra chat do agente, aponte para `padtec/prompts/00-mestre.md`
5. Passo 4: Agente detecta e gera docs em `docs/`
6. Passo 5: Valida com checklist (15 itens)
7. Passo 6: (Opcional) Publica no Confluence
8. Pronto
9. CTA: "Qual passo vocês acham mais 'mágico'? Qual querem que eu detalhasse?"

**Visualização:** Fluxo horizontal com 6 caixas: 1 → 2 → 3 → 4 → 5 → 6 → ✅

---

### Post 5: "Três cenários onde faz toda diferença"
**Ângulo:** Impacto (ROI)  
**Comprimento:** 350-400 palavras  
**CTA:** Qual é seu gargalo?  
**Semana:** 5-6

**Hook (escolha um):**
- "Nem todo projeto se beneficia igualmente. Aqui estão os 3 onde o impacto é explosivo."
- "Se você se identifica com um desses cenários, continue lendo; o ROI pode ser 10x."

**Estrutura:**
1. Hook
2. Cenário 1: Equipe crescendo/alta rotatividade
   - Problema: onboarding = 3-4 semanas
   - Solução: docs em 1 dia
   - Impacto: novo dev produtivo em 3-5 dias (75% mais rápido)
3. Cenário 2: Projeto legado, sem docs
   - Problema: "ninguém quer mexer aqui"
   - Solução: engenharia reversa como primeiro passo de modernização
   - Impacto: refatoração fica planejada, não caótica
4. Cenário 3: Múltiplos serviços, estilos diferentes
   - Problema: buscar coisa é loucura (15min por serviço)
   - Solução: aplicar em todos → padronização automática
   - Impacto: tempo → 3min por serviço
5. CTA: "Qual cenário mais parece seu dia a dia?"

**Visualização:** 3 colunas (Cenário 1 | Cenário 2 | Cenário 3), cada uma: Problema → Solução → Impacto

---

## Publicação

| Semana | Post | Dia | Horário BR | Tópico |
|--------|------|-----|-----------|--------|
| 1 | 1 | Segunda | 10-11h | Problema |
| 2 | 2 | Segunda | 10-11h | Solução |
| 3 | 3 | Segunda | 10-11h | Técnica |
| 4 | 4 | Segunda | 10-11h | Prática |
| 5-6 | 5 | Segunda | 10-11h | Impacto |

---

## Depois dos 5 posts: Decisão

**Semana 7-8: Análise**

Coleta dados de cada post:
- ✅ Quantos comentários?
- ✅ Qual é a pergunta mais frequente?
- ✅ Qual tópico gerou mais engajamento?
- ✅ Qual hook funcionou melhor?

**Próximas opções:**
1. **Continuar com mais 5 posts** (nova série sobre outros tópicos)
2. **Escrever 1-2 articles long-form** (aprofundar o que funcionou)
3. **Pivotar completamente** (feedback mostrou interesse em outro ângulo)
4. **Deixar descansar** e focar em outra estratégia

**Decisão é data-driven**, não adivinhação.

---

## Padrão de escrita por post

### Antes de escrever (5 min)
- [ ] Qual é meu hook em 1 frase?
- [ ] Qual é a ideia central em 1 frase?
- [ ] Qual é o CTA?
- [ ] Que visualização ajuda?

### Rascunho (20-30 min)
1. Escreva bullet points
2. Ordene logicamente
3. Expanda em frases
4. Leia em voz alta
5. Revise uma vez

### Polimento (10-15 min)
1. Gramática + acentuação (PT-BR)
2. Corte jargão desnecessário
3. Varia comprimento de sentença
4. Leitura final de 1 min — fica claro?

**Tempo total:** 40-60 min/post

---

## Hashtags (adapt por post)

**Sempre:** `#DocumentaçãoTécnica` `#IA` `#Portuguese`  
**Post 1 (problema):** `#EngenhariaReverse` `#SoftwareEngineering` `#TechDebt`  
**Post 2 (solução):** `#InteligênciaArtificial` `#CópilotGitHub` `#Automação`  
**Post 3 (técnica):** `#Arquitetura` `#Design` `#Engenharia`  
**Post 4 (prática):** `#DevOps` `#Workflow` `#Ferramentas`  
**Post 5 (impacto):** `#ROI` `#Produtividade` `#Liderança`  

Use 8-12 hashtags por post.

---

## Sucesso = ?

✅ **Métrica baixa:** 50+ reações por post, 10+ comentários  
✅ **Métrica média:** 150+ reações, 30+ comentários  
✅ **Métrica alta:** 300+ reações, 50+ comentários  

Foco não é viral, é **engagement qualitativo** (comentários úteis, perguntas, compartilhamentos entre peers).

---

## Status

**Criado:** 2026-06-25  
**Estratégia:** Prova de conceito (5 posts)  
**Próximo passo:** Escrever Post 1 em ~45 minutos  
**Decisão:** Semana 7-8, baseada em feedback real

---

Quer começar com o Post 1 ou prefere revisar essa estrutura antes?

# Guia prático de escrita — PADTec no LinkedIn

## Dicas de ouro para cada artigo

### Série 1: Apresentação do problema

#### Artigo 1 — "O paradoxo da documentação"

**Hook eficaz (escolha uma):**
- "Levanta a mão quem trabalha com documentação que foi escrita há 6+ meses. Agora levanta quem ainda confia nela."
- "Se código sem testes é débito técnico, o que é código sem documentação? (Spoiler: é pior.)"
- "Paradoxo: documentar é necessário. Ninguém quer fazer. Resultado: ninguém tem. Solução clássica: obrigar mais. Funciona? Não."

**Estrutura para este artigo:**
```
1. Hook (paradoxo explícito)
2. "Três razões por que documentação morre:"
   - Responsável primário é humano, mas prioridade do humano é feature, não doc
   - Código muda em 1 semana, documentação é "revisada" em 6 meses
   - Quem escreve docs não é quem mantém código; gap de conhecimento amplia
3. Custo de falha: onboarding lento, bugs por falta de contexto, refatoração arriscada
4. "Isso é reversível. Próximo post: como."
5. CTA: "Qual foi a última vez que você consultou documentação ANTES de fazer pergunta?"
```

**Dados que você pode mencionar (se tiver):**
- "Estudos mostram que X% dos problemas de onboarding vêm de falta de contexto, não de falta de skill"
- Ou anedota: "Passei 4h procurando como autenticar numa API; descobri depois que tava documentado mas com nome diferente"

**Imagem sugerida:**
- Gráfico mostrando "tempo até código ficar obsoleto" vs "frequência de atualização de docs" (documentação fica para trás rapidamente)
- Ou: linha do tempo mostrando desfasamento progressivo

---

#### Artigo 2 — "Engenharia reversa documental"

**Hook eficaz:**
- "E se a gente invertesse? Ao invés de 'escrever docs para refletir código', usar 'código como entrada para gerar docs'?"
- "Quando foi a última vez que você descobriu um bug na sua documentação? Aposto que o código estava certo e a doc mentindo."

**Estrutura:**
```
1. Hook (inversão de fluxo)
2. "O problema epistemológico:"
   - Docs são estáticas, código é dinâmico
   - Divergência é inevitável com fluxo tradicional
3. "Solução: código como single source of truth"
   - Ler código (package.json, imports, estrutura)
   - Inferir padrões e arquitetura
   - Gerar docs que refletem estado atual
4. "Por que funciona:"
   - Rastreabilidade: cada afirmação sobre arquitetura pode ser verificada no código
   - Atualização contínua: roda novamente quando código muda
   - Anti-alucinação: marca o que não encontra evidência
5. "Próximos posts: como fazer isso na prática."
6. CTA: "Qual é a afirmação na sua documentação que você tem CERTEZA de estar atualizada?"
```

**Conceptualmente é bom explorar:**
- Diferença entre "documentação descritiva" (escrever como você *acha* que é) e "documentação extraída" (ler e certificar que é)
- Exemplo: "Seu arquivo de config diz que usa PostgreSQL, ou você está assumindo porque alguém comentou?"

**Imagem sugerida:**
- Comparação lado-a-lado: "tradicional" (write → diverge) vs "reverso" (read → sempre sync)
- Ou: ícone de "seta para cima" (tradicional) vs "seta apontando para código" (reverso)

---

### Série 2: Tecnicamente "como funciona"

#### Artigo 3 — "Três eixos de parametrização"

**Hook eficaz:**
- "Um agente genérico falha em 80% dos casos. Aqui está por quê — e como consertar."
- "Se você fosse documentar um backend, documentaria diferente que um frontend? Óbvio. Então por que seus prompts são os mesmos?"

**Estrutura:**
```
1. Hook (genérico não funciona)
2. "Eixo 1: Variante (que tipo de projeto?)"
   - Full-stack, backend isolado, frontend, CLI, IaC
   - Exemplo: "Backend nunca precisa de seção 'Componentes React'"
3. "Eixo 2: Nível (quanto detalhe?)"
   - L1: mínimo; L2: padrão; L3: completo
   - Relação inclusão: L1 ⊂ L2 ⊂ L3
   - "É como contar história: primeira vez é resumo; segunda é detalhes"
4. "Eixo 3: Capacidades (quais techs vocês usam?)"
   - 9 capacidades possíveis; agente detecta o que existe
   - Exemplo: "Usa Redis? Ativa seção de cache. Não usa? Omite."
5. "Resultado: matriz = documentação perfeitamente calibrada"
6. CTA: "Qual combinação de eixos faz mais sentido pro seu maior projeto?"
```

**Visualização killer:**
- Tabela ou matriz 3D mostrando exemplos de combinações:
  - Backend API + L2 + {database, auth, cache} = Y docs
  - Frontend SPA + L1 + {auth, integração-externa} = X docs
  - Deixa claro que cada combinação é única

**Dados/analogias:**
- "Documentar sem conhecer variante é como dar diagnóstico médico sem saber que órgão está doente"
- "Escolher nível sem contexto é como escolher menu sem saber se é café ou banquete"

---

#### Artigo 4 — "Tool-calling nativo: acesso ao código muda tudo"

**Hook eficaz:**
- "Um agente que 'conversa sobre' código vs um agente que 'lê' código. A diferença é brutal."
- "Se seu agente não pode abrir `package.json`, está fazendo documentação às cegas. Literalmente."

**Estrutura:**
```
1. Hook (diferença entre "falar sobre" e "ler")
2. "Sem tool-calling (cenário antigo):"
   - Você: "Meu projeto usa cache"
   - Agente: assume, inventa, alucinação
   - Resultado: "seu projeto implementa estratégia de invalidação TTL" (talvez mentira)
3. "Com tool-calling (novo):"
   - Agente: abre package.json, acha Redis, busca uso no código
   - Encontra evidência → documenta com confiança
   - Não encontra → marca "CARÊNCIA: não identificado"
4. "Vantagens técnicas:"
   - Rastreabilidade: cada afirmação pode ser verificada
   - Reprodutibilidade: mesmo código = mesmo doc
   - Confiabilidade: dados vêm da realidade, não da imaginação
5. "Implicação prática:" leia o artigo anterior + este → agente virou máquina de gerar docs confiáveis
6. CTA: "Qual foi a alucinação mais grave que você viu IA cometer ao documentar algo?"
```

**Exemplo didático:**
- Cenário 1 (falha): "documenta meu sistema" → agente escreve sobre OAuth2, WebSockets, GraphQL... nenhum presente no código
- Cenário 2 (sucesso): agente lê código, acha Express, Axios, não acha OAuth → marca como CARÊNCIA, você fornece contexto, agente refina

**Imagem sugerida:**
- "Blind vs Sighted" — agente cego (sem file system access) vs agente que enxerga (com tool-calling)
- Ou: desenho simples mostrando IA "olhando" para o código

---

### Série 3: Implementação prática

#### Artigo 5 — "6 passos: de zero a documentação"

**Hook eficaz:**
- "A curva de aprendizado é menor que você acha. Aqui estão os 6 passos. Ninguém precisa saber Ruby/Python/Go."
- "Documentação automática não é ficção. Vou mostrar o workflow real que funciona hoje."

**Estrutura:**
```
1. Hook (simplifica: 6 passos)
2. "Passo 1: Copie a pasta padtec/ para seu projeto"
   - "É literalmente um Ctrl+C"
3. "Passo 2: Escolha nível (L1, L2, L3)"
   - 1-minuto decision
4. "Passo 3: Abra o chat do agente (Copilot, Claude, etc)"
   - Aponte para padtec/prompts/00-mestre.md
   - Diga o nível
5. "Passo 4: Agente rodeia detecção e gera docs"
   - Detecta variante automaticamente
   - Escaneia capacidades
   - Gera pasta docs/ com tudo
6. "Passo 5: Valida com checklist"
   - 15 itens objetivos, sim/não, cada um
7. "Passo 6: (Opcional) Publica no Confluence"
   - Se vocês usam Confluence
8. "Pronto. Documentação está viva."
9. CTA: "Qual passo vocês acham mais 'mágico'? Qual querem que eu detalhasse?"
```

**Ton neste artigo:**
- Não assusta. "Parece complexo? Não é."
- Mostra que cada passo é pequeno, independente, verificável

**Imagem sugerida:**
- Fluxo horizontal: 1 → 2 → 3 → 4 → 5 → 6 → ✅
- Ou: screenshot da conversa no chat mostrando agente rodando

**Dados/metáforas:**
- "Tempo total: 2-4 horas (incluindo validação)."
- "Comparar: documentação manual de um projeto médio leva 2-3 semanas."

---

#### Artigo 6 — "Detecção automática: como agente entende seu projeto"

**Hook eficaz:**
- "Seu agente consegue abrir `package.json` em 0.2s e decidir o que gerar. Você consegue?"
- "Aqui está como a máquina consegue entender seu projeto mais rápido (e com menos erros) que você."

**Estrutura:**
```
1. Hook (máquina entende projeto automaticamente)
2. "Como agente detecta variante:"
   - Estrutura de pastas (existe src/ + public/?)
   - Package.json: Express + Vue = full-stack; só Express = backend
   - Arquivo principal (package.json name, main field, scripts)
3. "Como agente detecta capacidades:"
   - Scanneia dependências (redis → cache, @prisma → database)
   - Busca patterns no código (import Redis, require mongo)
   - Olha .env, config files
   - Resultado: ✅ cache, ✅ auth, ❌ multi-tenancy
4. "Cada capacidade = seção acionada"
   - Cache detectado → "Seção 08: Caching" é instanciada
   - Cache não detectado → omite
5. "Transparência: você vê resultado"
   - Agente diz: "Encontrei Express, Postgres, JWT, Redis"
   - "Não achei: Elasticsearch, Kafka, GraphQL"
   - Você corrige: "Cria seção de Kafka mesmo assim", agente refina
6. CTA: "Qual capacidade você teria dúvida que agente conseguisse detectar no seu projeto?"
```

**Exemplo prático:**
```
Projeto: Node.js app
package.json: express, axios, ioredis, bcrypt, dotenv

Detecção:
✅ Backend API (Express)
✅ Cache (redis/ioredis)
✅ Integração externa (axios)
✅ Autenticação (bcrypt + JWT patterns no código)
❌ Banco de dados (não achou Prisma/TypeORM/Mongoose)
❌ Filas (não achou Bull/BullMQ/RabbitMQ)
❌ Storage (não achou AWS S3/Minio patterns)

Resultado: 
- Ativa 4 seções (backend, cache, integração, auth)
- Marca 3 como "CARÊNCIA" (database, queues, storage)
- Você valida: "OK, não temos queues mesmo", mas "temos Redis como DB temporária, documenta"
```

**Imagem sugerida:**
- Checklist visual com ✅ e ❌
- Ou: scanning animation mostrando agente "lendo" o código

---

#### Artigo 7 — "QA: como garantir documentação é confiável"

**Hook eficaz:**
- "Você testa código. Você deveria testar documentação. Aqui está como."
- "Documentação ruim é pior que nenhuma. Como identificar ruim? Aqui estão 15 checks objetivos."

**Estrutura:**
```
1. Hook (QA é tão importante quanto geração)
2. "Tipo 1: Verificações automáticas (agente faz)"
   - Todos os arquivos existem?
   - Sintaxe Markdown válida?
   - Todos os placeholders preenchidos (nenhum TODO solto)?
   - Nenhum "CARÊNCIA" não-explicado?
3. "Tipo 2: Verificações manuais (você faz)"
   - Lê a documentação: faz sentido?
   - Compara com código: está alinhado?
   - Arquitetura documentada bate com realidade?
   - Exemplos de código existem e funcionam?
4. "Ciclo de refinamento:"
   - Gera → Valida → Encontra gap → Pede correção → Revalida
   - Só aceita quando 100% passa
5. "Checklist template:"
   - Exemplo: "Cada capacidade detectada tem seção com exemplos"
   - "Não há CARÊNCIA marcado sem explicação"
   - "Glossário inclui 80% dos termos técnicos"
6. "Benefício:" documentação que você entrega tem selo de qualidade
7. CTA: "Qual é seu critério hoje para aceitar uma documentação como 'boa'?"
```

**Dados/Analogia:**
- "Sem QA: 40% das docs têm gaps significativos."
- "Com QA: <5% após ciclo de refinamento."

**Imagem sugerida:**
- Feedback loop: Gera → Valida → Falha? → Refina → Revalida → ✅
- Ou: scorecard mostrando "15/15 itens aprovados"

---

### Série 4: Casos de uso e impacto

#### Artigo 8 — "Três cenários onde agente muda tudo"

**Hook eficaz:**
- "Nem todo projeto se beneficia igualmente. Aqui estão os 3 onde o impacto é explosivo."
- "Se você se identifica com um desses cenários, continue lendo; o ROI pode ser 10x."

**Estrutura:**
```
1. Hook (nem todo projeto = mesmo benefício)
2. "Cenário 1: Equipe crescendo ou alta rotatividade"
   - Problema: onboarding novo dev = 3-4 semanas de questions
   - Causa: não há doc; conhecimento está só na cabeça de sêniors
   - Solução: documentação automática em 1 dia
   - Impacto: novo dev produtivo em 3-5 dias (75% mais rápido)
   - Métrica: (N novos devs/ano × 2 semanas economizadas × salário) = ROI
3. "Cenário 2: Projeto legado, falta de docs"
   - Problema: "ninguém quer mexer aqui; tá tudo na cabeça do João"
   - Risco: João sai, projeto vira black box
   - Solução: engenharia reversa como primeiro passo de modernização
   - Impacto: refatoração fica planejada, não caótica
   - Métrica: redução de time spent em "entender o código" de 40% para 15%
4. "Cenário 3: Múltiplos serviços, estilos diferentes"
   - Problema: cada serviço tem doc diferente; buscar coisa é loucura
   - Causa: não há template; cada equipe documentou do seu jeito
   - Solução: aplicar PADTec a todos os serviços
   - Impacto: padronização automática
   - Métrica: tempo para buscar informação por serviço: 15min → 3min
5. "Qual é seu gargalo?"
6. CTA: "Qual cenário mais parece seu dia a dia? Quer que eu explore a solução específica?"
```

**Dados concretos (se tiver):**
- "Estudos mostram que 30-40% do tempo de novo dev é perdido em investigação de código sem contexto"
- Ou estatística do seu negócio: "cada semana de onboarding custa ~R$ X"

**Imagem sugerida:**
- 3 colunas: Cenário 1 | Cenário 2 | Cenário 3
- Cada coluna: Problema → Solução → Impacto

---

#### Artigo 9 — "Por que IA vai transformar docs mais que código"

**Hook eficaz:**
- "GitHub Copilot mudou coding. Imagine um 'Copilot de documentação' rodando toda semana. Não é ficção."
- "Código é criação. Documentação é síntese. IA é infinitamente melhor em síntese."

**Estrutura:**
```
1. Hook (IA muda docs antes de código)
2. "Por que IA é mais viável em docs que em código:"
   - Código: requer lógica perfeita, testes, estrutura = difícil
   - Docs: síntese, parametrização, pattern-matching = natural para IA
   - Rastreabilidade: doc extraída de código é verificável; código gerado nem sempre é
3. "Janela de oportunidade:"
   - Agora: IA de código é mainstream; IA de docs é nicho
   - 2027: inversão; IA de docs é base, IA de código é especialista
   - Por quê: docs é problema maior e menos resolvido
4. "Futuro previsível:"
   - Cada projeto tem "documentador IA" rodando 1x/semana
   - Docs sempre fresh, sempre alinhado com código
   - Engenheiros dedicam menos tempo a "escrever docs", mais tempo a "decidir arquitetura"
5. "Transformação organizacional:"
   - Documentação deixa de ser "overhead" (chato, necessário mas ninguém quer fazer)
   - Vira "infraestrutura" (automática, confiável, esperada)
6. "Você está ready para essa mudança?"
7. CTA: "Qual é sua aposta: IA vai ser central em docs ou vai continuar periférica? Vote nos comentários."
```

**Tone:**
- Visionary, mas grounded em evidência
- "Não é ficção científica; é extensão lógica do que já está acontecendo"

**Imagem sugerida:**
- Timeline: 2024 (IA code generation boom) → 2025-26 (IA docs emerges) → 2027 (IA docs is standard)
- Ou: comparison chart mostrando "viabilidade de IA em X": code 60%, docs 85%

---

### Série 5: Comunidade e reflexão

#### Artigo 10 — "O que aprendemos documentando código com agentes"

**Hook eficaz:**
- "Depois de meses construindo um agente que lê código para documentar, aqui estão as 5 maiores lições."
- "Se você está pensando em fazer algo similar, evite nossos erros; aprenda com nossas descobertas."

**Estrutura:**
```
1. Hook (lessons learned)
2. "Lição 1: Alucinação é o inimigo #1; rastreabilidade é o escudo"
   - A gente aprendeu na marra: nunca gere sem evidência
   - Resultado: marcador explícito "CARÊNCIA" evita falsos positivos
3. "Lição 2: Parametrização > Improviso"
   - Agente genérico falha. Agente parametrizado vence.
   - 3 eixos (variante, nível, capacidades) cobrem 90% dos casos
4. "Lição 3: Stack-independence em templates é vital (e difícil)"
   - Temptação: mencionar "use Node.js" no template
   - Realidade: template precisa funcionar pra Python, Ruby, Go, C#, tudo
   - Solução: templates falam de "conceitos", não "tecnologias"
5. "Lição 4: Comunidade muda tudo"
   - Ideia inicial era proprietária; open-sourcing ampliou 10x
   - Agora: projeto é "npm para docs", cada um contribui refinamentos
6. "Lição 5: Documentação é *produto*, não overhead"
   - Quando você trata doc como produto (UX, QA, iteração), transforma tudo
7. "O que vem agora:"
   - Comunidade identificando gaps, contribuindo extensões
   - Variantes novos, capacidades novas
   - Feedback loop: usuários experimentam, sugerem, a gente refina
8. "Convite:"
   - Seu projeto é X (variante não coberto)?
   - Sua stack tem Y (capacidade não suportada)?
   - Vamos conversar; é colaborativo
9. CTA: "Qual foi a maior surpresa para vocês nesta série? Qual gap vocês veem que a gente deveria cobrir?"
```

**Ton:**
- Reflexivo, mas otimista
- Reconhece limitações, mas aponta para solução
- Convida colaboração

**Imagem sugerida:**
- Você + código (logo do projeto)
- Ou: "Lessons learned" em tipografia

**Chamada adicional:**
- Mencionar repositório / site / como experimentar
- "Se vocês querem testar, aqui está [link]"

---

## Estrutura mental para escrever rápido

### Antes de começar cada artigo

**Checklist pré-escrita:**
- [ ] Qual é meu hook em 1 frase?
- [ ] Qual é a ideia central em 1 frase?
- [ ] Qual é o CTA (ação que quero que leitor faça)?
- [ ] Que visualização (imagem, diagrama) ajuda?
- [ ] Que hashtags vão atrair minha audiência?

### Rascunho rápido (20-30 min)

1. Escreva bullet points sem polir (brainstorm)
2. Ordene logicamente
3. Expanda cada bullet em 1-2 frases
4. Leia em voz alta; ajuste ritmo
5. Adicione hook + CTA
6. Revise uma vez

### Polimento (10-15 min)

1. Gramática e acentuação (PT-BR)
2. Simplicidade: corte jargão desnecessário
3. Ritmo: varia comprimento de sentença (curta + curta + longa = ritmo bom)
4. Verificação final: a ideia principal fica clara em 1 minuto de leitura?

**Tempo total por artigo:** 40-60 minutos (incluindo visualização)

---

## Replicação de padrões bem-sucedidos

Se um artigo ficar viral (alta engagement, muitos comentários), replique a estrutura:

- Mesmo hook style?
- Mesmo comprimento?
- Mesma visualização (infográfico vs screenshot vs texto)?
- Mesma hora de publicação?
- Mesmos hashtags?

Você vai descobrir o que funciona no seu nicho.

---

## Próximas ações práticas

1. **Semana 1:** Escreva artigos 1-2 (problema + solução)
2. **Semana 2:** Escreva artigos 3-4 (tecnicamente como funciona)
3. **Semana 3:** Escreva artigos 5-6 (workflow + detecção)
4. **Feedback loop:** Leia comentários, extraia perguntas, adapte série
5. **Aceleração:** Use feedback para refinar tom, temas, formatos

**Dica dourada:** O primeiro artigo sempre é o mais difícil. Depois flui. Comece com Artigo 1 (paradoxo da documentação) — é o mais fácil de escrever porque o problema é universal.

---

Boa sorte com a série! 🚀

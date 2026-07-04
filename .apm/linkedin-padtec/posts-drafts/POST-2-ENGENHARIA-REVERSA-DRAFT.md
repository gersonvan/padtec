# Post 2: Engenharia Reversa Documental
**Padrão:** 🎣 Gancho + Artigo (link para Post 3)

---

## 📋 Análise estrutural

### Hook (provocação)
Questiona a abordagem clássica. Inverte perspectiva.

### Problema
Documentação estática vs código dinâmico = divergência inevitável

### Transição
"E se..." — oferece novo ângulo

### Solução
Código como fonte de verdade (não docs como fonte)

### Comprovação
3 razões por que funciona:
1. **Rastreabilidade:** Cada mudança no código é rastreável
2. **Atualização contínua:** Não pode ficar desatualizado, porque vive *dentro* do código
3. **Anti-hallucination:** Documenta fatos verificáveis, nunca inferências

### Gancho
"Mas como fazer isso na prática? Tem um framework..."

### CTA
Pergunta reflexiva + link para Post 3

---

## ✍️ DRAFT — Versão Pronta

**Comprimento alvo:** 350-400 palavras

---

### [TÍTULO]
**Engenharia Reversa Documental**

---

### [CORPO]

E se invertêssemos o problema?

Você provavelmente ouve isso em reunião de planejamento: "Vamos documentar assim que terminar a feature". E depois: "Vamos revisar documentação no Q3". E depois: crickets.

Porque você tentou fazer documentação *sobre* o código. Mas código muda toda semana. Documentação é revista a cada trimestre. A divergência é garantida.

**Agora inverta: e se documentação fosse *extraída do* código, não escrita *sobre* código?**

Isso chama engenharia reversa documental. Simples: o código é a fonte de verdade. Documentação não é prosa linda — é análise estruturada do que código *realmente faz*.

**Por que funciona:**

1. **Rastreabilidade:** Cada mudança no código deixa rastro. Quando dev refatora uma função, a documentação dessa função é automaticamente questionável. Você *sabe* que precisa revisar. Não é opcional, é evidência.

2. **Atualização contínua:** Documentação não vira stale porque ela vive *dentro* da estrutura de código. Não é arquivo separado. É interpretação estruturada do que está lá.

3. **Anti-hallucination:** Você documenta fatos, não inferências. "Esta função faz X" (verificável no código). Nunca "provavelmente faz Y" (adivinhação). Zero suposições.

**A diferença é brutal:**

- Abordagem clássica: "Documente tudo. Mantenha atualizado." (Impossível)
- Abordagem inversa: "Código fala. Extraia a verdade dele." (Rastreável)

Não é magia. É engenharia.

**Mas há um detalhe:** engenharia reversa só funciona se você tiver **framework claro** de como fazer. Por quê? Porque código não documenta a si mesmo — você precisa de lentes estruturadas pra ler.

Tem um framework disso. Três dimensões que cobrem qualquer projeto: **variante, nível, capacidades**.

No próximo post, vamos falar exatamente disso.

**Você já tentou extrair documentação direto do código? Como foi?** Comenta aí.

---

## 📊 Metadados

- **Comprimento:** 365 palavras ✅
- **Tom:** Técnico + provocador
- **Estrutura:** Problema invertido → Solução → 3 razões → Gancho → CTA
- **Padrão:** Com gancho
- **Próximo passo:** Post 3 (Três eixos)

---

## 🎯 Notas de refinamento

- [ ] Verificar se "engenharia reversa documental" é termo claro o suficiente
- [ ] Hook "E se invertêssemos" é bom, mas aberto — refinar se necessário
- [ ] "Anti-hallucination" é termo técnico demais? Testá-lo em comentários
- [ ] Gancho "Três dimensões" conecta bem com Post 3
- [ ] CTA é aberta — incentiva comentário pessoal

---

## 💡 Alternativas de hook

Se quiser testar outras provocações:

1. **"Qual é a última coisa que sua documentação disse que você sabe que é mentira?"**
   - Mais pessoal, mais visceral

2. **"Documentação desatualizada mata mais projetos que bugs."**
   - Mais dramático

3. **"O código nunca mente. Documentação mente todo dia."**
   - Mais polarizado

Use a que mais resoar com seu tom.

---

## 🔗 Posição na série

```
Post 1: O paradoxo (problema)
Post 2: Engenharia reversa (solução) ← VOCÊ ESTÁ AQUI
        └─ Gancho para Post 3
Post 3: Três eixos (técnica didática)
Post 4: 6 passos (prática)
        └─ Gancho para Post 5
Post 5: Três cenários (impacto)
```

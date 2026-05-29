<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.
-->

# Perguntas frequentes e diagnóstico

<!-- IA: agrupe perguntas frequentes e cenários de diagnóstico por área (instalação, execução local, conexão com dependências, falha em produção, dúvidas de domínio). Cada entrada tem sintoma → causa provável → diagnóstico → correção. Não inventar cenários sem evidência: apenas cenários observados (issues registradas, logs de erro recorrentes, comentários no código, decisões de design documentadas). -->

## Fluxo geral de triagem

<!-- IA: gere diagrama Mermaid `flowchart TB` representando o fluxo de triagem genérico: identificar sintoma → classificar área → consultar entrada correspondente → aplicar correção → verificar. -->

```mermaid
<<DIAGRAMA_MERMAID_FLUXO_DE_TRIAGEM>>
```

## Instalação e setup local

<!-- IA: cenários de erro durante instalação inicial. Reaproveite e detalhe a tabela curta de "Erros frequentes no setup" de `12-quick-start.md`. -->

### `<<TITULO_DO_CENARIO>>`

- **Sintoma:** `<<DESCRICAO_DO_SINTOMA_EXATO>>`
- **Causa provável:** `<<CAUSA>>`
- **Diagnóstico:** `<<PASSOS_DE_DIAGNOSTICO>>`
- **Correção:** `<<PROCEDIMENTO_DE_CORRECAO>>`
- **Evidência:** `<<ARQUIVO:LINHA_OU_LINK_PARA_REGISTRO>>`

## Execução em ambiente local

<!-- IA: cenários de erro durante execução em desenvolvimento (porta ocupada, dependência indisponível, configuração ausente). -->

### `<<TITULO_DO_CENARIO>>`

- **Sintoma:** `<<DESCRICAO_DO_SINTOMA_EXATO>>`
- **Causa provável:** `<<CAUSA>>`
- **Diagnóstico:** `<<PASSOS_DE_DIAGNOSTICO>>`
- **Correção:** `<<PROCEDIMENTO_DE_CORRECAO>>`
- **Evidência:** `<<ARQUIVO:LINHA>>`

## Conexão com dependências externas

<!-- IA: cenários de falha de integração com dependências externas (timeout, falha de autenticação, contrato divergente). Para detalhes da integração específica, ver `condicionais/condicional-integracoes-externas.md`. -->

### `<<TITULO_DO_CENARIO>>`

- **Sintoma:** `<<DESCRICAO_DO_SINTOMA_EXATO>>`
- **Causa provável:** `<<CAUSA>>`
- **Diagnóstico:** `<<PASSOS_DE_DIAGNOSTICO>>`
- **Correção:** `<<PROCEDIMENTO_DE_CORRECAO>>`
- **Evidência:** `<<ARQUIVO:LINHA>>`

## Falhas em produção

<!-- IA: cenários observados em produção, especialmente aqueles cobertos por alertas e procedimentos formais de resposta. -->

### `<<TITULO_DO_CENARIO>>`

- **Sintoma:** `<<DESCRICAO_DO_SINTOMA_EXATO>>`
- **Causa provável:** `<<CAUSA>>`
- **Diagnóstico:** `<<PASSOS_DE_DIAGNOSTICO>>`
- **Correção:** `<<PROCEDIMENTO_DE_CORRECAO>>`
- **Evidência:** `<<ARQUIVO:LINHA>>`

## Dúvidas frequentes de domínio

<!-- IA: dúvidas conceituais frequentes sobre o domínio do sistema (significado de termo, regra de negócio implícita, comportamento esperado em borda). -->

### `<<PERGUNTA>>`

- **Resposta:** `<<RESPOSTA>>`
- **Referência primária:** `<<ARQUIVO:LINHA_OU_DOCUMENTO>>`

## Quando escalar

<!-- IA: descreva quando o cenário deve ser escalado em vez de resolvido localmente: critérios objetivos, canal de escalação e informações mínimas a anexar. -->

<<POLITICA_DE_ESCALACAO>>

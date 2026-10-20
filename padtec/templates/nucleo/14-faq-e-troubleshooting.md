# Perguntas frequentes e diagnóstico

<!-- IA: agrupe perguntas frequentes e cenários de diagnóstico por área (instalação, execução local, conexão com dependências, falha em produção, dúvidas de domínio). Cada entrada tem sintoma → causa provável → diagnóstico → correção. Não inventar cenários sem evidência: apenas cenários observados (comentários TODO e FIXME, testes marcados como ignorados, tratamento de erro explícito e documentação existente no repositório). -->

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

<!-- IA: cenários de falha de integração com dependências externas (timeout, falha de autenticação, contrato divergente). Para detalhes da integração específica, ver `./condicional-integracoes-externas.md`. -->

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

## Defeitos conhecidos registrados no repositório

<!-- IA: liste apenas defeitos e limitações com registro textual no repositório: comentários `TODO`, `FIXME`, `HACK` e `XXX`, testes marcados como ignorados ou pendentes, contornos comentados no código, referências a chamados ou issues em comentários e em mensagens de commit recentes. Não diagnostique nem infira defeitos; quando não houver nenhum registro, escreva o marcador de carência. -->

| Defeito ou limitação | Onde | Tipo de registro | Evidência |
|---|---|---|---|
| `<<DESCRICAO_LITERAL_DO_REGISTRO>>` | `<<COMPONENTE_OU_ARQUIVO>>` | `<<TODO_FIXME_TESTE_IGNORADO_OU_CONTORNO>>` | `<<ARQUIVO:LINHA>>` |

## Quando escalar

<!-- IA: descreva quando o cenário deve ser escalado em vez de resolvido localmente: critérios objetivos, canal de escalação e informações mínimas a anexar. -->

<<POLITICA_DE_ESCALACAO>>

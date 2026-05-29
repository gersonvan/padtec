<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.
-->

# Guia de início rápido

<!-- IA: produza um guia de setup do zero em ambiente local, prescritivo e copiável. Cada comando deve ser literal (sem placeholders dentro do código), retirado de scripts existentes no repositório, manifestos ou documentação interna. Quando o repositório usa script orquestrador, citá-lo explicitamente em vez de duplicar passos. Não estimar duração. -->

## Pré-requisitos

<!-- IA: liste pré-requisitos como linguagem, motor de execução e ferramenta de empacotamento, com versão exata exigida (lockfile ou manifesto). Use a coluna "Verificação" para o comando que confirma a presença e a versão. -->

| Pré-requisito | Versão exigida | Verificação | Evidência |
|---|---|---|---|
| `<<NOME>>` | `<<VERSAO_EXATA>>` | `<<COMANDO_DE_VERIFICACAO>>` | `<<ARQUIVO:LINHA>>` |

## Sequência de instalação

<!-- IA: numere os passos de instalação na ordem exata de execução. Cada passo tem descrição + bloco de código com o comando literal. Cite a origem do comando (script ou manifesto). -->

1. `<<DESCRICAO_DO_PASSO_1>>`

   ```bash
   <<COMANDO_LITERAL>>
   ```

   Origem: `<<ARQUIVO:LINHA>>`

2. `<<DESCRICAO_DO_PASSO_2>>`

   ```bash
   <<COMANDO_LITERAL>>
   ```

   Origem: `<<ARQUIVO:LINHA>>`

## Inicialização do sistema

<!-- IA: liste o(s) comando(s) que inicializam o sistema em modo de desenvolvimento, com o resultado esperado (porta, mensagem, processo em primeiro plano ou segundo plano). -->

```bash
<<COMANDO_DE_INICIALIZACAO>>
```

Resultado esperado: `<<DESCRICAO_DO_RESULTADO_ESPERADO>>`

## Verificação de funcionamento

<!-- IA: liste as verificações que confirmam que o sistema está operacional (rota de verificação de saúde, comando de teste de fumaça, painel acessível). Cada verificação cita o ponto-alvo. -->

| Verificação | Como executar | Resultado esperado | Evidência |
|---|---|---|---|
| `<<NOME_DA_VERIFICACAO>>` | `<<COMANDO_OU_URL>>` | `<<RESULTADO_ESPERADO>>` | `<<ARQUIVO:LINHA>>` |

## Mapa do guia de início rápido

<!-- IA: gere diagrama Mermaid `flowchart TB` representando a sequência completa: pré-requisitos → instalação → inicialização → verificação. Use os nomes dos passos como rótulos dos nós. -->

```mermaid
<<DIAGRAMA_MERMAID_FLUXO_DO_QUICK_START>>
```

## Erros frequentes no setup

<!-- IA: liste erros comuns que aparecem no setup local, com sintoma exato (mensagem ou comportamento) e procedimento de correção. Quando o erro estiver coberto em detalhe em `14-faq-e-troubleshooting.md`, manter o item curto e referenciar a entrada lá. -->

| Sintoma | Causa provável | Correção | Referência detalhada |
|---|---|---|---|
| `<<SINTOMA>>` | `<<CAUSA>>` | `<<CORRECAO>>` | `<<14-faq-e-troubleshooting.md#ANCORA>>` |

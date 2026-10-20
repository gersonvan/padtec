<!--
Esta seção é condicional. Inclua-a na documentação do projeto somente se a capacidade `integracoes-externas` for detectada. Sinais típicos: clientes HTTP nomeados para sistemas externos, SDKs de terceiros (provedores de e-mail, sistemas acadêmicos, gateways de pagamento), configurações de timeout, disjuntor (circuit breaker) ou retentativa específicas para chamadas externas.
-->

# Integrações externas

<!-- IA: documente o catálogo de integrações com sistemas externos. Esta é uma seção condicional — citar nomes de produto, SDK ou serviço terceiro é permitido. Cobertura 100%. -->

## Catálogo de integrações

<!-- IA: liste todas as integrações com sistemas externos. Para cada uma, registre nome, propósito no domínio, criticidade operacional e ponto de configuração. -->

| Integração | Propósito | Criticidade | Ambiente onde existe | Evidência |
|---|---|---|---|---|
| `<<NOME>>` | `<<PROPOSITO>>` | `<<ALTA_MEDIA_BAIXA>>` | `<<DESENV_HOMOLOG_PROD>>` | `<<ARQUIVO:LINHA>>` |

## Contratos consumidos

<!-- IA: para cada integração, liste o contrato consumido (rota, mensagem, evento), tipo de transporte (HTTP, fila, arquivo, banco compartilhado), formato de payload e autenticação utilizada. -->

| Integração | Contrato | Transporte | Formato | Autenticação | Evidência |
|---|---|---|---|---|---|
| `<<NOME>>` | `<<RECURSO_OU_OPERACAO>>` | `<<TRANSPORTE>>` | `<<FORMATO>>` | `<<TIPO>>` | `<<ARQUIVO:LINHA>>` |

## Tratamento de timeout, retentativa e disjuntor

<!-- IA: para cada integração, registre o timeout configurado, política de retentativa e configuração de disjuntor quando existir. -->

| Integração | Timeout | Política de retentativa | Disjuntor (limiar, janela, recuperação) | Evidência |
|---|---|---|---|---|
| `<<NOME>>` | `<<DURACAO>>` | `<<POLITICA>>` | `<<CONFIGURACAO>>` | `<<ARQUIVO:LINHA>>` |

## Plano de contingência por integração

<!-- IA: para cada integração crítica, descreva o plano de contingência: fallback degradado, fila de armazenamento temporário, alerta operacional, procedimento manual. -->

| Integração | Cenário de falha | Plano de contingência | Responsável | Evidência |
|---|---|---|---|---|
| `<<NOME>>` | `<<CENARIO>>` | `<<PLANO>>` | `<<EQUIPE_RESPONSAVEL>>` | `<<ARQUIVO:LINHA>>` |

## Mapa visual das integrações

<!-- IA: gere diagrama Mermaid `flowchart LR` mostrando o sistema central e as integrações externas como nós ao redor, com setas indicando direção do tráfego e rótulos com o contrato principal. -->

```mermaid
<<DIAGRAMA_MERMAID_FLOWCHART_INTEGRACOES_EXTERNAS>>
```

## Versionamento de contratos externos

<!-- IA: descreva como o sistema lida com versionamento dos contratos externos consumidos (pinning de versão, tolerância a campos novos, política diante de mudança incompatível). -->

<<POLITICA_DE_VERSIONAMENTO_DE_CONTRATOS_EXTERNOS>>

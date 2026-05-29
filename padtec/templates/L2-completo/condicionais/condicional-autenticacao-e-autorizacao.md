<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.

Esta seção é condicional. Inclua-a na documentação do projeto somente se a capacidade `auth` for detectada. Sinais típicos: bibliotecas de autenticação (Passport, JWT, OAuth2, OpenID Connect), guardas de rota, middlewares de sessão, provedores externos de identidade, fluxos de troca de credencial codificados no projeto.
-->

# Autenticação e autorização

<!-- IA: documente o modelo de identidade, fluxos de autenticação suportados e política de autorização. Esta é uma seção condicional — referências a bibliotecas e protocolos específicos (Passport, JWT, OAuth2, OpenID Connect, SAML) são permitidas quando refletem o uso real no projeto. Inspire-se na profundidade observada em documentações com fluxo de login detalhado passo a passo. -->

## Modelo de identidade

<!-- IA: descreva como o sistema representa uma identidade (entidade, atributos, identificadores estáveis, provedor de origem). Cite a entidade ou o tipo correspondente em código. -->

| Atributo | Tipo | Origem | Evidência |
|---|---|---|---|
| `<<ATRIBUTO>>` | `<<TIPO>>` | `<<PROVEDOR>>` | `<<ARQUIVO:LINHA>>` |

## Fluxos de autenticação suportados

<!-- IA: liste os fluxos de autenticação implementados (credenciais locais, OAuth2 com terceiros, troca de tokens entre serviços, autenticação por chave de serviço, autenticação federada). Cobertura 100% obrigatória. -->

| Fluxo | Iniciador | Provedor de identidade | Tipo de credencial emitida | Evidência |
|---|---|---|---|---|
| `<<NOME>>` | `<<ATOR>>` | `<<PROVEDOR>>` | `<<TIPO>>` | `<<ARQUIVO:LINHA>>` |

## Fluxo de autenticação principal — passo a passo

<!-- IA: documente o fluxo de autenticação principal como sequência numerada de passos detalhada (referência: cobertura passo a passo de 15 a 25 passos quando o fluxo justificar). Cite componentes por `arquivo:linha`. -->

1. `<<PASSO_1>>` — `<<ARQUIVO:LINHA>>`
2. `<<PASSO_2>>` — `<<ARQUIVO:LINHA>>`
3. `<<PASSO_3>>` — `<<ARQUIVO:LINHA>>`

## Diagrama de sequência do fluxo principal

<!-- IA: gere diagrama Mermaid `sequenceDiagram` cobrindo o fluxo principal de autenticação, incluindo o provedor de identidade externo quando aplicável, emissão da credencial, validação subsequente e caminho de erro. -->

```mermaid
<<DIAGRAMA_MERMAID_SEQUENCEDIAGRAM_FLUXO_AUTENTICACAO>>
```

## Política de autorização

<!-- IA: descreva o modelo de autorização adotado (controle por papéis, controle por atributos, listas de controle de acesso, escopos por recurso). Liste papéis ou atributos relevantes e o ponto de imposição. -->

| Papel ou atributo | Capacidades concedidas | Ponto de imposição | Evidência |
|---|---|---|---|
| `<<PAPEL_OU_ATRIBUTO>>` | `<<CAPACIDADES>>` | `<<GUARDA_OU_MIDDLEWARE>>` | `<<ARQUIVO:LINHA>>` |

## Gestão de sessões e renovação de credenciais

<!-- IA: descreva a duração de vida da credencial principal (token de acesso), da credencial de renovação (token de atualização), estratégia de renovação e revogação. -->

| Item | Valor | Evidência |
|---|---|---|
| Duração da credencial de acesso | `<<DURACAO>>` | `<<ARQUIVO:LINHA>>` |
| Duração da credencial de renovação | `<<DURACAO>>` | `<<ARQUIVO:LINHA>>` |
| Estratégia de renovação | `<<ESTRATEGIA>>` | `<<ARQUIVO:LINHA>>` |
| Mecanismo de revogação | `<<MECANISMO>>` | `<<ARQUIVO:LINHA>>` |

## Armazenamento de credenciais sensíveis

<!-- IA: descreva como senhas, chaves privadas e segredos de assinatura são armazenados e protegidos. Nunca registrar valor de segredo. -->

<<POLITICA_DE_ARMAZENAMENTO_DE_CREDENCIAIS>>

## Trilhas de auditoria

<!-- IA: descreva quais eventos relacionados à identidade são auditados (login, falha de login, troca de senha, alteração de papel), formato do registro e destino. Quando ausente, registrar `// CARÊNCIA: não identificado no código`. -->

| Evento | Estrutura do registro | Destino | Evidência |
|---|---|---|---|
| `<<EVENTO>>` | `<<ESTRUTURA>>` | `<<DESTINO>>` | `<<ARQUIVO:LINHA>>` |

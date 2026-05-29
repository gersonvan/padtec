<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.
-->

# Interface externa

<!-- IA: documente todos os contratos públicos do sistema com o mundo externo: endpoints síncronos, mensagens consumidas, eventos publicados, contratos de lote. Cobertura exaustiva é obrigatória — toda rota e todo manipulador de mensagem devem aparecer em alguma tabela. -->

## Inventário de endpoints síncronos

<!-- IA: liste todos os endpoints expostos pelo sistema (independente do tipo de transporte). Para cada um, registre método, caminho, exigência de autenticação, formato de requisição e resposta, classes de erro. Cobertura 100%. -->

| Método | Caminho | Autenticação | Formato de requisição | Formato de resposta | Erros documentados | Evidência |
|---|---|---|---|---|---|---|
| `<<METODO>>` | `<<CAMINHO>>` | `<<SIM_OU_NAO_E_TIPO>>` | `<<FORMATO>>` | `<<FORMATO>>` | `<<LISTA_DE_ERROS>>` | `<<ARQUIVO:LINHA>>` |

## Inventário de mensagens consumidas e publicadas

<!-- IA: liste filas, tópicos e canais consumidos ou publicados pelo sistema. Quando o sistema não consome nem publica mensagens, registre apenas "Não aplicável". Para detalhes da infraestrutura de mensageria, ver `condicionais/condicional-filas-async.md`. -->

| Direção | Canal | Esquema da mensagem | Garantia de entrega | Evidência |
|---|---|---|---|---|
| `<<CONSUMIDO_OU_PUBLICADO>>` | `<<NOME_DO_CANAL>>` | `<<ESQUEMA>>` | `<<NO_MAXIMO_UMA_VEZ_OU_PELO_MENOS_UMA_VEZ>>` | `<<ARQUIVO:LINHA>>` |

## Mapa de chamadores externos

<!-- IA: identifique os consumidores conhecidos da interface externa do sistema. Cite a evidência em código ou configuração (lista de origens autorizadas, registros de cliente, configuração de chaves de acesso). Quando o consumidor for inferido sem evidência, registre `// CARÊNCIA: não identificado no código`. -->

| Consumidor | Endpoints utilizados | Modo de autenticação | Evidência |
|---|---|---|---|
| `<<NOME_DO_CONSUMIDOR>>` | `<<LISTA_DE_ENDPOINTS>>` | `<<MODO>>` | `<<ARQUIVO:LINHA>>` |

## Visão de fluxo entre chamador e sistema

<!-- IA: gere diagrama Mermaid `sequenceDiagram` mostrando a interação típica entre um chamador externo e o sistema para o endpoint mais representativo do contrato externo. Inclua autenticação, requisição, validação, retorno bem-sucedido e retorno de erro. -->

```mermaid
<<DIAGRAMA_MERMAID_SEQUENCEDIAGRAM_INTERFACE_EXTERNA>>
```

## Versionamento da interface

<!-- IA: descreva como o sistema versiona sua interface externa (versão no caminho, no cabeçalho, no esquema). Quando não houver política, registrar `// CARÊNCIA: não identificado no código`. -->

<<POLITICA_DE_VERSIONAMENTO_DA_INTERFACE>>

## Política de erros

<!-- IA: descreva o modelo de erros adotado: códigos, estrutura do corpo de resposta de erro, mapeamento entre exceções internas e respostas externas. -->

| Código | Significado | Estrutura do corpo | Evidência |
|---|---|---|---|
| `<<CODIGO>>` | `<<SIGNIFICADO>>` | `<<ESTRUTURA>>` | `<<ARQUIVO:LINHA>>` |

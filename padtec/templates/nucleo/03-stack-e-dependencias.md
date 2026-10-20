# Stack tecnológico e dependências

<!-- IA: produza um inventário completo das tecnologias em uso, organizado por camada. Toda linha deve declarar versão exata resolvida no arquivo de bloqueio de dependências (lockfile); quando o manifesto contiver range, registrar o literal do manifesto na coluna própria ao lado da versão resolvida. Nunca substituir versão por estimativa. -->

## Inventário por camada

<!-- IA: preencha a tabela cobrindo todas as camadas. Cada item deve apontar `arquivo:linha` no manifesto de dependências (e, quando aplicável, no lockfile). Categorize cada tecnologia em uma das categorias: linguagem, motor de execução, framework de aplicação, mecanismo de persistência, serviço de plataforma, biblioteca estrutural, ferramenta de build, ferramenta de teste. Não invente nomes de produto: extraia somente do manifesto. -->

| Camada | Categoria | Tecnologia | Versão resolvida | Literal no manifesto | Evidência |
|---|---|---|---|---|---|
| `<<CAMADA>>` | `<<CATEGORIA>>` | `<<NOME>>` | `<<VERSAO_RESOLVIDA>>` | `<<RANGE_OU_LITERAL>>` | `<<ARQUIVO:LINHA>>` |

## Dependências runtime

<!-- IA: a partir do manifesto de dependências, liste apenas as dependências carregadas em tempo de execução. Exclua dependências de desenvolvimento. Versões exatas obrigatórias. -->

| Nome | Versão resolvida | Literal no manifesto | Propósito | Evidência |
|---|---|---|---|---|
| `<<NOME>>` | `<<VERSAO_RESOLVIDA>>` | `<<LITERAL_NO_MANIFESTO>>` | `<<PROPOSITO>>` | `<<ARQUIVO:LINHA>>` |

## Dependências de desenvolvimento

<!-- IA: liste as dependências usadas apenas em ambiente de desenvolvimento, teste ou build. Versões exatas obrigatórias. -->

| Nome | Versão resolvida | Literal no manifesto | Propósito | Evidência |
|---|---|---|---|---|
| `<<NOME>>` | `<<VERSAO_RESOLVIDA>>` | `<<LITERAL_NO_MANIFESTO>>` | `<<PROPOSITO>>` | `<<ARQUIVO:LINHA>>` |

## Serviços de plataforma

<!-- IA: liste serviços de plataforma utilizados pelo sistema (armazenamento gerenciado, fila gerenciada, autenticação gerenciada, etc.) sem citar nome de produto comercial — use categoria genérica. O nome específico do produto fica documentado nas seções condicionais correspondentes em `condicional-<slug>.md`. -->

| Categoria | Função no sistema | Modo de consumo | Evidência |
|---|---|---|---|
| `<<CATEGORIA>>` | `<<FUNCAO>>` | `<<CONTRATO_OU_BIBLIOTECA>>` | `<<ARQUIVO:LINHA>>` |

## Política de atualização

<!-- IA: descreva como o projeto trata atualizações de dependências (frequência declarada em código de automação, política de pinning, processo de revisão). Quando não houver evidência, registrar `// CARÊNCIA: não identificado no código`. -->

<<POLITICA_DE_ATUALIZACAO_DE_DEPENDENCIAS>>

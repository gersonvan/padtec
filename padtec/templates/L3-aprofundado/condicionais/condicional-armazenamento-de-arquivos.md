<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.

Esta seção é condicional. Inclua-a na documentação do projeto somente se a capacidade `storage` for detectada. Sinais típicos: SDKs de armazenamento de objetos (Azure Blob Storage, AWS S3, Google Cloud Storage, MinIO), bibliotecas de upload (multer, busboy), uso de URLs assinadas (SAS, presigned URLs) para acesso direto.
-->

# Armazenamento de arquivos

<!-- IA: documente a estratégia de armazenamento de arquivos. Esta é uma seção condicional — citar produto (Azure Blob Storage, AWS S3, Google Cloud Storage, MinIO) e SDK é permitido. -->

## Serviço de armazenamento

<!-- IA: identifique o serviço utilizado, versão do SDK e ambiente onde existe. -->

| Serviço | SDK | Versão do SDK | Ambiente | Evidência |
|---|---|---|---|---|
| `<<SERVICO>>` | `<<SDK>>` | `<<VERSAO>>` | `<<DESENV_HOMOLOG_PROD>>` | `<<ARQUIVO:LINHA>>` |

## Organização lógica

<!-- IA: descreva a organização lógica do armazenamento: contêineres, baldes (buckets), prefixos por domínio, convenção de nomenclatura de objetos. -->

| Contêiner ou balde | Conteúdo | Padrão de chave | Evidência |
|---|---|---|---|
| `<<NOME>>` | `<<CONTEUDO>>` | `<<PADRAO>>` | `<<ARQUIVO:LINHA>>` |

## Padrão de envio e recuperação

<!-- IA: descreva como arquivos chegam ao armazenamento (upload via servidor intermediário, upload direto via URL assinada, ingestão por evento) e como são recuperados (download via servidor, link assinado de leitura, distribuição via CDN). -->

| Operação | Padrão adotado | Componente responsável | Evidência |
|---|---|---|---|
| Envio | `<<PADRAO>>` | `<<COMPONENTE>>` | `<<ARQUIVO:LINHA>>` |
| Recuperação | `<<PADRAO>>` | `<<COMPONENTE>>` | `<<ARQUIVO:LINHA>>` |

## Credenciais temporárias para acesso direto

<!-- IA: descreva o uso de credenciais temporárias para acesso direto (URLs assinadas como SAS ou presigned URLs): tempo de vida, escopo, operações permitidas. -->

| Tipo de credencial | Operações permitidas | Tempo de vida | Evidência |
|---|---|---|---|
| `<<TIPO>>` | `<<OPERACOES>>` | `<<DURACAO>>` | `<<ARQUIVO:LINHA>>` |

## Ciclo de vida e retenção

<!-- IA: descreva regras de ciclo de vida aplicadas (transição de classe de armazenamento, expiração automática, arquivamento) e política de retenção por contêiner. Quando ausente, registrar `// CARÊNCIA: não identificado no código`. -->

| Contêiner ou balde | Regra de ciclo de vida | Política de retenção | Evidência |
|---|---|---|---|
| `<<NOME>>` | `<<REGRA>>` | `<<RETENCAO>>` | `<<ARQUIVO:LINHA>>` |

## Tratamento de falhas e integridade

<!-- IA: descreva como o sistema lida com falhas no armazenamento (retentativa, verificação de integridade por soma de verificação, registro auditável de operações). -->

<<TRATAMENTO_DE_FALHAS_E_INTEGRIDADE>>

# Sub-prompt PADTec — Extensão: Armazenamento de arquivos

## Parâmetros recebidos do orquestrador

Os seis parâmetros (`nível`, `variante`, `pasta-de-saída`, `capacidades-ativas`, `modo-monorepo`, `raiz-do-projeto-destino`) chegam conforme o contrato de invocação de `prompts/00-mestre.md`, detalhado em `prompts/_comum.md`, que também fixa o procedimento comum de preenchimento e a guarda por nível.

Este sub-prompt é despachado apenas quando o slug `storage` está em `capacidades-ativas`.

## Template a preencher

Leia integralmente `templates/condicionais/condicional-storage.md`. Capacidades condicionais não existem em `L1`; se `nível` for `L1`, retorne sem produzir saída.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique a tecnologia de armazenamento em uso. Sinais técnicos típicos: SDKs como `@aws-sdk/client-s3`, `@azure/storage-blob`, `@google-cloud/storage`; bibliotecas como `multer`, `formidable`, `busboy` para upload; uso de `fs-extra`/`fs` para gravação local persistente de arquivos enviados por usuário; configuração de bucket/contêiner em variáveis de ambiente.
2. Catalogue os **escopos de armazenamento**: bucket/contêiner por finalidade (uploads de usuário, exportações, anexos, mídia), naming convention, ambiente.
3. Catalogue o **padrão de envio**: upload direto pelo cliente (via URL pré-assinada), upload pelo backend (proxy), upload em chunks. Cite `arquivo:linha` da implementação.
4. Catalogue o **padrão de recuperação**: download via URL pré-assinada temporária, streaming pelo backend, link público com CDN. Inclua tempo de expiração de URLs pré-assinadas quando declarado.
5. Identifique a **política de ciclo de vida e retenção**: regras de transição entre classes de armazenamento, expiração automática, versionamento, política de exclusão.
6. Identifique restrições de upload: tamanho máximo, tipos MIME aceitos, validações de conteúdo, antivírus quando declarado.

## Procedimento de preenchimento

Além do procedimento comum de `prompts/_comum.md`:

1. Quando o template pedir diagrama Mermaid (ex.: fluxo de upload com URL pré-assinada), gere-o a partir do código real.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **sete regras duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta extensão, atenção especial a:

- **Regra 1 (Evidência rastreável):** cada bucket/contêiner, padrão de envio e política cita `arquivo:linha`.
- **Regra 2 (Anti-alucinação):** quando a política de retenção não estiver declarada (em código ou em configuração de bucket consultável), registre `// CARÊNCIA`.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/condicional-storage.md`, com escopos catalogados, padrão de envio e recuperação documentados, política de ciclo de vida descrita, restrições de upload listadas.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, gere o documento por app que utilize storage (`<pasta-de-saída>/apps/<nome-do-app>/condicional-storage.md`). Quando o storage é compartilhado entre apps via pacote comum, registre o padrão na visão de workspace e referencie nos apps consumidores.

# Sub-prompt PADTec — Extensão: Armazenamento de arquivos

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

Este sub-prompt é despachado apenas quando o slug `storage` está em `capacidades-ativas`.

## Template a preencher

Leia integralmente `templates/<nível-resolvido>/condicionais/condicional-armazenamento-de-arquivos.md`, onde `<nível-resolvido>` é `L2-completo` ou `L3-aprofundado`. Capacidades condicionais não existem em `L1`; se `nível` for `L1`, retorne sem produzir saída.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique a tecnologia de armazenamento em uso. Sinais técnicos típicos: SDKs como `@aws-sdk/client-s3`, `@azure/storage-blob`, `@google-cloud/storage`; bibliotecas como `multer`, `formidable`, `busboy` para upload; uso de `fs-extra`/`fs` para gravação local persistente de arquivos enviados por usuário; configuração de bucket/contêiner em variáveis de ambiente.
2. Catalogue os **escopos de armazenamento**: bucket/contêiner por finalidade (uploads de usuário, exportações, anexos, mídia), naming convention, ambiente.
3. Catalogue o **padrão de envio**: upload direto pelo cliente (via URL pré-assinada), upload pelo backend (proxy), upload em chunks. Cite `arquivo:linha` da implementação.
4. Catalogue o **padrão de recuperação**: download via URL pré-assinada temporária, streaming pelo backend, link público com CDN. Inclua tempo de expiração de URLs pré-assinadas quando declarado.
5. Identifique a **política de ciclo de vida e retenção**: regras de transição entre classes de armazenamento, expiração automática, versionamento, política de exclusão.
6. Identifique restrições de upload: tamanho máximo, tipos MIME aceitos, validações de conteúdo, antivírus quando declarado.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Quando o template pedir diagrama Mermaid (ex.: fluxo de upload com URL pré-assinada), gere-o a partir do código real.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta extensão, atenção especial a:

- **Regra 1 (Evidência rastreável):** cada bucket/contêiner, padrão de envio e política cita `arquivo:linha`.
- **Regra 2 (Anti-alucinação):** quando a política de retenção não estiver declarada (em código ou em configuração de bucket consultável), registre `// CARÊNCIA`.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/storage.md`, com escopos catalogados, padrão de envio e recuperação documentados, política de ciclo de vida descrita, restrições de upload listadas.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, gere o documento por app que utilize storage (`<pasta-de-saída>/apps/<nome-do-app>/storage.md`). Quando o storage é compartilhado entre apps via pacote comum, registre o padrão na visão de workspace e referencie nos apps consumidores.

# Sub-prompt PADTec — Extensão: Integrações externas

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

Este sub-prompt é despachado apenas quando o slug `integracoes-externas` está em `capacidades-ativas`.

## Template a preencher

Leia integralmente `templates/<nível-resolvido>/condicionais/condicional-integracoes-externas.md`, onde `<nível-resolvido>` é `L2-completo` ou `L3-aprofundado`. Capacidades condicionais não existem em `L1`; se `nível` for `L1`, retorne sem produzir saída.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique **todas** as integrações externas. Sinais técnicos típicos: clientes HTTP nomeados por integração (instâncias com baseURL fixa apontando a domínio externo), SDKs oficiais de terceiros (provedores de pagamento, mensageria, mapas, IA, telefonia, e-mail transacional), bibliotecas que encapsulam comunicação com sistema externo, configuração explícita de URLs de serviços externos.
2. Para cada integração, catalogue: nome do sistema externo, propósito de negócio, módulo/arquivo de cliente, endpoints/recursos consumidos, credencial/método de autenticação (sem expor valor), formato dos dados trocados.
3. Identifique o **tratamento de timeout** declarado para cada integração: tempo configurado, comportamento ao expirar.
4. Identifique a **política de retentativa**: presença de retry, número de tentativas, backoff, condições que disparam retry vs falha definitiva.
5. Identifique a presença de **disjuntor** (circuit breaker) e seus parâmetros, ou de fallback declarado por integração.
6. Identifique o **plano de contingência por integração** quando documentado: chave de feature para desabilitar a integração, modo degradado, integração alternativa.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Quando o template pedir diagrama Mermaid (ex.: arquitetura de integrações com o sistema no centro e os externos ao redor), gere-o a partir das integrações reais.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta extensão, atenção especial a:

- **Regra 4 (Cobertura exaustiva):** **toda** integração externa identificada aparece no documento.
- **Regra 1 (Evidência rastreável):** cada integração, timeout, retry e fallback cita `arquivo:linha`.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/integracoes-externas.md`, com catálogo exaustivo de integrações, política de timeout/retry/disjuntor por integração, plano de contingência quando documentado.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, gere o documento por app que tenha integrações próprias (`<pasta-de-saída>/apps/<nome-do-app>/integracoes-externas.md`). Integrações encapsuladas em pacote compartilhado em `packages/` entram no documento de workspace e são referenciadas pelos apps consumidores.

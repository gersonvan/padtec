# Sub-prompt PADTec — Extensão: Integrações externas

## Parâmetros recebidos do orquestrador

Os seis parâmetros (`nível`, `variante`, `pasta-de-saída`, `capacidades-ativas`, `modo-monorepo`, `raiz-do-projeto-destino`) chegam conforme o contrato de invocação de `prompts/00-mestre.md`, detalhado em `prompts/_comum.md`, que também fixa o procedimento comum de preenchimento e a guarda por nível.

Este sub-prompt é despachado apenas quando o slug `integracoes-externas` está em `capacidades-ativas`.

## Template a preencher

Leia integralmente `templates/condicionais/condicional-integracoes-externas.md`. Capacidades condicionais não existem em `L1`; se `nível` for `L1`, retorne sem produzir saída.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique **todas** as integrações externas. Sinais técnicos típicos: clientes HTTP nomeados por integração (instâncias com baseURL fixa apontando a domínio externo), SDKs oficiais de terceiros (provedores de pagamento, mensageria, mapas, IA, telefonia, e-mail transacional), bibliotecas que encapsulam comunicação com sistema externo, configuração explícita de URLs de serviços externos.
2. Para cada integração, catalogue: nome do sistema externo, propósito de negócio, módulo/arquivo de cliente, endpoints/recursos consumidos, credencial/método de autenticação (sem expor valor), formato dos dados trocados.
3. Identifique o **tratamento de timeout** declarado para cada integração: tempo configurado, comportamento ao expirar.
4. Identifique a **política de retentativa**: presença de retry, número de tentativas, backoff, condições que disparam retry vs falha definitiva.
5. Identifique a presença de **disjuntor** (circuit breaker) e seus parâmetros, ou de fallback declarado por integração.
6. Identifique o **plano de contingência por integração** quando documentado: chave de feature para desabilitar a integração, modo degradado, integração alternativa.

## Procedimento de preenchimento

Além do procedimento comum de `prompts/_comum.md`:

1. Quando o template pedir diagrama Mermaid (ex.: arquitetura de integrações com o sistema no centro e os externos ao redor), gere-o a partir das integrações reais.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **sete regras duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta extensão, atenção especial a:

- **Regra 4 (Cobertura exaustiva):** **toda** integração externa identificada aparece no documento.
- **Regra 1 (Evidência rastreável):** cada integração, timeout, retry e fallback cita `arquivo:linha`.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/condicional-integracoes-externas.md`, com catálogo exaustivo de integrações, política de timeout/retry/disjuntor por integração, plano de contingência quando documentado.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, gere o documento por app que tenha integrações próprias (`<pasta-de-saída>/apps/<nome-do-app>/condicional-integracoes-externas.md`). Integrações encapsuladas em pacote compartilhado em `packages/` entram no documento de workspace e são referenciadas pelos apps consumidores.

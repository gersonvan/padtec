# Sub-prompt PADTec — Extensão: Autenticação e autorização

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

Este sub-prompt é despachado apenas quando o slug `auth` está em `capacidades-ativas`.

## Template a preencher

Leia integralmente `templates/<nível-resolvido>/condicionais/condicional-autenticacao-e-autorizacao.md`, onde `<nível-resolvido>` é `L2-completo` ou `L3-aprofundado`. Capacidades condicionais não existem em `L1`; se `nível` for `L1`, retorne sem produzir saída.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique a tecnologia de autenticação em uso. Sinais técnicos típicos: dependências como Passport, `@nestjs/passport`, `jsonwebtoken`, `bcrypt`/`argon2`, OAuth libraries, OpenID Connect clients, MSAL, `@auth0/*`, `firebase-auth`, SDKs de provedores de identidade; arquivos de configuração de estratégia de autenticação; arquivos de configuração de cookies de sessão.
2. Identifique os **fluxos de autenticação** suportados: login com usuário/senha, OAuth/OIDC com provedor externo, magic link, MFA. Para cada fluxo, mapeie endpoint(s) envolvido(s) e cite `arquivo:linha`.
3. Identifique o **modelo de identidade**: entidade de usuário (do modelo de domínio), atributos relevantes para identidade (e-mail, identificador externo, papel), tabela/coleção que armazena credenciais.
4. Identifique a **política de autorização**: baseada em papéis (RBAC), baseada em atributos (ABAC), baseada em permissões granulares; guards/middlewares/decoradores que aplicam a política aos endpoints; matriz papel × endpoint quando inferível.
5. Identifique a **gestão de sessões e credenciais**: formato de token (JWT, opaque, cookie de sessão), tempo de vida do token, mecanismo de refresh, política de revogação, armazenamento de refresh tokens.
6. Identifique a **política de senhas** quando aplicável: algoritmo de hash, parâmetros de custo, requisitos de complexidade declarados em validação.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Quando o template pedir diagrama Mermaid (ex.: sequência de login OAuth, sequência de validação de token), gere-o a partir do código real.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta extensão, atenção especial a:

- **Regra 1 (Evidência rastreável):** cada fluxo, política e tempo de vida cita `arquivo:linha`.
- **Regra 2 (Anti-alucinação):** **nunca** documente segredos, parâmetros sensíveis (chaves privadas, client secrets) ou políticas inferidas sem evidência clara. Registre `// CARÊNCIA` em vez de presumir.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/auth.md`, com fluxos catalogados, modelo de identidade descrito, política de autorização documentada (com matriz papel × endpoint quando aplicável), gestão de sessões e política de senhas cobertas.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, gere o documento por app que aplique autorização (`<pasta-de-saída>/apps/<nome-do-app>/auth.md`). Quando a autenticação é centralizada por gateway compartilhado, registre o modelo central na visão de workspace e referencie em cada app.

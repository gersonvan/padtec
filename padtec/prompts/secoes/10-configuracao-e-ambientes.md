# Sub-prompt PADTec — Configuração e ambientes

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

## Template a preencher

Leia integralmente `templates/<nível-resolvido>/10-configuracao-e-ambientes.md`, onde `<nível-resolvido>` é `L2-completo` para `L2` ou `L3-aprofundado` para `L3`. Esta seção não existe em `L1`.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique **todas** as variáveis de ambiente lidas pelo sistema. Combine fontes: a) arquivos de exemplo (`.env.example`, `.env.sample`, `env.example.json`, equivalentes); b) leituras explícitas em código (chamadas a APIs de leitura de variáveis de ambiente do runtime); c) arquivos de configuração que declaram quais variáveis são esperadas (schemas de validação de config). A união das três fontes é a lista de verdade.
2. Para cada variável, extraia: nome, propósito (inferido pelo nome e pelo uso, sem extrapolar), valor padrão quando declarado, perfil/ambiente onde se aplica, e se é exposta ao cliente (em projetos frontend, observe o prefixo convencional usado pelo framework).
3. Identifique os perfis de execução suportados: arquivos de configuração por perfil (`config.development.*`, `config.production.*`, `appsettings.<env>.json`, equivalentes), variável que seleciona o perfil (tipicamente `NODE_ENV`, `APP_ENV`, `ASPNETCORE_ENVIRONMENT`).
4. Identifique a estratégia de tratamento de segredos: leitura direta de variável de ambiente, integração com cofre/gerenciador de segredos, arquivos `.env.local` em `.gitignore`, montagem por orquestrador de containers.
5. Identifique arquivos de configuração não-ambiente (ex.: `config/*.yaml`, `appsettings.json` base, arquivos de configuração de feature flags) e descreva seu papel.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Preencha a tabela de variáveis de ambiente com **cobertura completa** das variáveis identificadas. Nunca inclua valor real de segredo no documento — apenas o nome, propósito e perfil.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 1 (Evidência rastreável):** cada variável cita o arquivo de exemplo ou o ponto de leitura no código.
- **Regra 4 (Cobertura exaustiva):** toda variável referenciada em código ou em exemplo aparece na tabela; cobertura parcial é falha de QA.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/10-configuracao-e-ambientes.md`, com tabela exaustiva de variáveis, perfis catalogados, estratégia de segredos descrita e arquivos de configuração não-ambiente listados.

## Comportamento por nível

Existe apenas em `L2` e `L3`. Em `L3`, o template pode pedir detalhamento adicional (matriz variável × ambiente, política de rotação de segredos quando documentada); siga o template. Se invocado com `nível` igual a `L1` (ou fora de `L1|L2|L3`), retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, esta seção é gerada por app aplicacional (`<pasta-de-saída>/apps/<nome-do-app>/10-configuracao-e-ambientes.md`), com a tabela específica daquele app. Variáveis compartilhadas (ex.: definidas no `.env.example` da raiz) entram em todos os apps que as consomem e também em um documento de workspace, quando houver, em `<pasta-de-saída>/10-configuracao-e-ambientes.md`.

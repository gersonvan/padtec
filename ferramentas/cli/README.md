# ferramentas/cli — CLI do PADTec

Ferramental de linha de comando do PADTec. Hoje oferece o comando
`padtec detect`, que lê o projeto destino e produz um contexto de detecção
(variante, capacidades, padrão estrutural, pasta de saída e seções previstas)
para o agente confirmar antes de executar o prompt mestre. O detector de
padrão estrutural, que começou como protótipo, continua disponível como
biblioteca e como CLI própria.

Requisitos: Node.js 18 ou superior, sem dependências externas.

```bash
node ferramentas/cli/padtec.js detect [raiz] [--nivel L1|L2|L3] [--saida <pasta>] [--json]
```

## Comando detect

### Uso

```bash
node ferramentas/cli/padtec.js detect                      # raiz = diretório atual
node ferramentas/cli/padtec.js detect ./meu-projeto --nivel L2
node ferramentas/cli/padtec.js detect . --nivel L3 --saida documentacao/ --json
node ferramentas/cli/padtec.js --help
```

| Opção              | Efeito                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------ |
| `[raiz]`           | Caminho do projeto destino; padrão `.`                                                     |
| `--nivel <L1\|L2\|L3>` | Nível de documentação; define `sections` e `conditionalSections` (sem ele, ficam vazios) |
| `--saida <pasta>`  | Pasta de saída da documentação; sobrepõe a detecção de `docs/`, `documentation/`, `documentacao/` |
| `--json`           | Imprime também o `context.json` em `stdout`                                                |

O comando grava, sobrescrevendo e criando as pastas:

- `<raiz>/.padtec/run/context.json` — o contexto completo, em JSON;
- `<raiz>/.padtec/run/detection-report.md` — relatório legível, em
  português, com resumo, evidências por decisão e avisos.

Códigos de saída: `0` detecção concluída (inclusive com variante
indeterminada ou avisos); `2` uso incorreto ou raiz inexistente/não
diretório; `1` erro inesperado. Mensagens de erro vão para `stderr`.

### Campos do context.json

| Campo                  | Tipo         | Descrição                                                                                                   |
| ---------------------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| `schemaVersion`        | string       | `"1.0"`                                                                                                     |
| `padtecVersion`        | string\|null | Conteúdo de `<raiz>/padtec/VERSION`, ou `null` quando o pacote não está copiado no projeto                  |
| `generatedAt`          | string       | Data e hora da execução (ISO 8601, UTC)                                                                     |
| `projectRoot`          | string       | Raiz exatamente como informada                                                                              |
| `projectRootResolved`  | string       | Raiz absoluta e resolvida                                                                                   |
| `outputDir`            | string       | Pasta de saída detectada (`docs/`, `documentation/` ou `documentacao/`), `docs/` como proposta, ou `--saida` |
| `level`                | string\|null | `L1`, `L2`, `L3` ou `null`                                                                                  |
| `variant`              | string\|null | Um dos cinco slugs do mestre, ou `null` quando nenhuma regra casou                                          |
| `variantCandidates`    | string[]     | As cinco opções, apenas quando `variant` é `null`; vazio nos demais casos                                   |
| `capabilities`         | string[]     | Slugs das capacidades ativas, na ordem da tabela do mestre                                                  |
| `monorepo`             | objeto       | `{ active, apps }`: ativo quando o padrão estrutural é `monorepo-apps-e-pacotes`; `apps` lista `apps[].path` |
| `structuralPattern`    | objeto       | Saída integral do detector estrutural: `structuralPattern`, `evidence`, `apps` (em monorepos), `warnings`   |
| `sections`             | string[]     | Arquivos do núcleo previstos para o nível (nomes reais de `padtec/templates/nucleo/`); vazio sem nível       |
| `conditionalSections`  | string[]     | `condicional-<slug>.md` por capacidade ativa, apenas em L2 e L3                                             |
| `evidence`             | objeto       | `variant` (regras testadas e sinais), `capabilities` (sinais por capacidade) e `outputDir` (o que foi verificado) |
| `warnings`             | objeto[]     | Avisos do próprio comando (`{ code, path, message }`): manifesto inválido, limites da varredura, variante indeterminada |

Exemplo abreviado para um serviço NestJS com TypeORM e Redis, nível L2:

```json
{
  "schemaVersion": "1.0",
  "padtecVersion": "v1.0.1",
  "generatedAt": "2026-10-20T12:00:00.000Z",
  "projectRoot": ".",
  "projectRootResolved": "/caminho/do/servico",
  "outputDir": "documentation/",
  "level": "L2",
  "variant": "backend-api",
  "variantCandidates": [],
  "capabilities": ["banco-de-dados", "cache"],
  "monorepo": { "active": false, "apps": [] },
  "structuralPattern": {
    "structuralPattern": "modular-por-dominio",
    "evidence": ["src/modules"],
    "warnings": []
  },
  "sections": [
    "01-visao-geral.md", "02-arquitetura.md", "03-stack-e-dependencias.md",
    "04-estrutura-do-projeto.md", "05-modelo-de-dominio.md", "06-fluxos-de-negocio.md",
    "07-interface-externa.md", "08-frontend.md", "09-backend.md",
    "10-configuracao-e-ambientes.md", "11-infraestrutura-e-deployment.md", "13-glossario.md"
  ],
  "conditionalSections": ["condicional-banco-de-dados.md", "condicional-cache.md"],
  "evidence": {
    "variant": {
      "matchedRule": 3,
      "rules": [
        { "order": 1, "variant": "iac", "matched": false, "reason": "nenhum manifesto de IaC (*.bicep, *.tf, playbook Ansible, CloudFormation)" },
        { "order": 2, "variant": "frontend-site", "matched": false, "reason": "nenhum package.json com next, nuxt, vite, svelte ou astro" },
        { "order": 3, "variant": "backend-api", "matched": true, "reason": "backend (package.json (dependencies: @nestjs/core ^10.0.0)) sem frontend acoplado" },
        { "order": 4, "variant": "full-stack-web", "matched": false, "reason": "não há frontend e backend simultaneamente" },
        { "order": 5, "variant": "automacao-script", "matched": false, "reason": "há manifesto de aplicação ou de IaC" }
      ],
      "signals": {
        "iac": [],
        "applicationManifests": [{ "kind": "manifesto", "signal": "package.json", "file": "package.json", "aplicacional": true, "detail": "6 dependência(s) de runtime" }],
        "frontend": [],
        "backend": [{ "kind": "manifesto", "signal": "@nestjs/core", "file": "package.json", "detail": "dependencies: @nestjs/core ^10.0.0" }],
        "scripts": [],
        "directories": ["src/"]
      }
    },
    "capabilities": {
      "banco-de-dados": [
        { "kind": "manifesto", "signal": "typeorm", "file": "package.json", "detail": "dependencies: typeorm ^0.3.20" },
        { "kind": "arquivo", "signal": "pasta de migrations", "file": "src/migrations" },
        { "kind": "texto", "signal": "entidade ou schema de persistência", "file": "src/modules/usuarios/usuario.entity.ts", "line": 3, "excerpt": "@Entity(\"usuarios\")" }
      ],
      "cache": [{ "kind": "manifesto", "signal": "ioredis", "file": "package.json", "detail": "dependencies: ioredis ^5.4.0" }],
      "filas-async": [], "auth": [], "integracoes-externas": [], "storage": [],
      "notificacoes": [], "jobs-agendados": [], "multi-tenancy": []
    },
    "outputDir": {
      "source": "detectada",
      "checked": [
        { "dir": "docs/", "exists": false },
        { "dir": "documentation/", "exists": true },
        { "dir": "documentacao/", "exists": false }
      ],
      "found": "documentation/",
      "note": "Primeira pasta existente na ordem docs/, documentation/, documentacao/."
    }
  },
  "warnings": []
}
```

Cada item de evidência tem `kind` (`manifesto`, `arquivo`, `diretorio`,
`texto` ou `estrutura`), `signal` (o sinal reconhecido), `file` (caminho
relativo à raiz, com `/`) e, conforme o tipo, `detail` (escopo e versão da
dependência) ou `line` e `excerpt` (linha e trecho curto da busca textual).

### Como a variante é decidida

As regras vêm do prompt mestre, `padtec/prompts/00-mestre.md`, bloco iii
("Procedimento de detecção de variante"), e são aplicadas na mesma ordem,
parando na primeira que casa:

1. `iac` — há `*.bicep`, `*.tf`, `*.tfstate`, playbook Ansible ou template
   CloudFormation, e nenhum manifesto de aplicação. Um `package.json` só
   com `devDependencies` de ferramentas (sem dependência de runtime nem
   framework) não conta como aplicação.
2. `frontend-site` — `package.json` com `next`, `nuxt`, `vite`, `svelte` ou
   `astro` em `dependencies` ou `devDependencies`, sem sinal de backend.
3. `backend-api` — `package.json` com `@nestjs/core`, `express`, `fastify`
   ou `koa`, ou manifesto backend não-JS (`pom.xml`, `build.gradle`,
   `*.csproj`/`*.sln`, `requirements.txt`/`pyproject.toml` com Django,
   FastAPI ou Flask, `go.mod` com framework HTTP ou uso de `net/http`,
   `composer.json` com framework PHP, `Cargo.toml` com framework web), sem
   sinal de frontend.
4. `full-stack-web` — frontend e backend no mesmo repositório, seja na mesma
   raiz, seja em apps distintos (`apps/web` + `apps/api`). Nomes de app
   típicos (`web`, `frontend`, `api`, `backend`) contam como sinal
   estrutural.
5. `automacao-script` — nenhum manifesto de aplicação nem de IaC, mas há
   arquivos em `scripts/`, `bin/` ou `cmd/`, ou um único arquivo executável
   de entrada na raiz.

Quando nenhuma regra casa, `variant` é `null`, `variantCandidates` traz as
cinco opções e o relatório pede que o agente pergunte ao usuário, como o
mestre determina. Os manifestos considerados são os da raiz, os de cada app
devolvido pelo detector estrutural e os das subpastas imediatas de `apps/`
e `packages/`; `*.csproj` e `*.sln` são aceitos até três níveis.

### Como as capacidades são decididas

A tabela do bloco iv do mestre ("Procedimento de detecção de capacidades")
é a fonte dos sinais. Para cada uma das nove capacidades o comando procura:

- **dependências** nos manifestos reconhecidos: os produtos citados pelo
  mestre (TypeORM, Prisma, Redis, Bull, passport, multer, nodemailer,
  `@nestjs/schedule` etc.) e seus equivalentes nos ecossistemas JS, Python,
  JVM, .NET, Go, PHP e Rust;
- **arquivos e pastas**: `*.sql`, `migrations/`, `schema.prisma`, arquivos
  de configuração de ORM, `crontab`;
- **texto no código e na configuração**: decorators e padrões citados pelo
  mestre (`@Process`, guards de auth, `axios` com `baseURL`, `@Cron`,
  resolvers de tenant, conexões nomeadas), variáveis de ambiente
  (`REDIS_URL`, `SMTP_HOST`, `JWT_SECRET`) e serviços declarados em
  `docker-compose`.

Um único sinal ativa a capacidade: o mestre manda documentar a mais em vez
de omitir, então uma dependência presente no manifesto basta, mesmo sem uso
aparente. SDKs genéricos de nuvem (`@aws-sdk/*`, `@azure/*`, `boto3`)
contam como `integracoes-externas` apenas quando não são reivindicados por
capacidade mais específica (`@aws-sdk/client-s3` é `storage`,
`@azure/service-bus` é `filas-async`).

A busca textual é limitada para não explodir em árvores grandes: ignora
`node_modules`, `.git`, `dist`, `build`, `vendor`, `.apm`, `.padtec` e
pastas de cache/saída usuais; desce até dez níveis; lê só extensões de
código e configuração comuns; pula arquivos acima de 512 KiB, lockfiles e
minificados; e para após 5.000 arquivos ou 64 MiB lidos, registrando aviso.
Cada sinal guarda no máximo cinco ocorrências.

### Seções previstas por nível

Conforme o bloco vi.2 do mestre: L1 gera `01`, `02`, `03` e `13`; L2 gera
`01` a `11` e `13`; L3 gera `01` a `15`. Os nomes de arquivo vêm de
`padtec/templates/nucleo/` (a cópia do projeto destino, ou a do
repositório-fonte quando o comando roda nele). As seções condicionais
(`condicional-<slug>.md`) entram apenas em L2 e L3. Omissões por variante
(por exemplo, `08-frontend.md` em `backend-api`) são decididas pelos
sub-prompts, não pelo comando.

### Limitações

- Tudo é heurístico. O `context.json` é uma proposta: o agente confirma
  variante, capacidades e pasta de saída ao executar o prompt mestre, que
  continua sendo a fonte de verdade.
- A árvore de decisão é literal ao mestre: um `package.json` com
  dependências de runtime mas sem framework reconhecido (uma CLI Node, por
  exemplo) resulta em `variant: null`, não em `automacao-script`.
- Sinais citados pelo mestre por nome de produto foram mapeados para nomes
  de pacote; produtos fora da tabela podem passar despercebidos.
- Busca textual por expressão regular gera falsos positivos (um comentário
  com a palavra `tenant` ativa `multi-tenancy`), o que é coerente com o
  viés de documentar a mais.

## Detector de padrão estrutural

Classifica a organização de diretórios de um projeto em um de quatro
padrões e, em monorepos, detalha cada app. É consumido pelo comando
`detect` (campo `structuralPattern`) e pode ser usado isoladamente.

### Propósito

O gerador de documentação precisa saber como o projeto está organizado
para escolher o template e as perguntas certas. Este detector responde a
isso só olhando nomes de diretórios (nunca o conteúdo dos arquivos), de
forma determinística e barata.

| Padrão                    | Critério                                                                                                                                      |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `monorepo-apps-e-pacotes` | Duas ou mais raízes de app com manifesto próprio, dentro de `apps/`/`packages/` ou como pastas irmãs quando a raiz do projeto não tem manifesto |
| `modular-por-dominio`     | Alguma pasta `modules/`, `features/`, `domains/`, `contexts/` ou `bounded-contexts/` com pelo menos dois subdiretórios de domínio               |
| `mvc-classico`            | Pasta `controller(s)/` correlacionada com `model(s)/` ou `view(s)/` sob a mesma raiz de app (mesmo primeiro segmento do caminho)                |
| `indefinido`              | Nenhuma das convenções acima                                                                                                                  |

A ordem de precedência numa raiz é: modular, depois MVC, depois indefinido.
Monorepo é decidido antes, pela presença das raízes de app.

Manifestos reconhecidos: `package.json`, `composer.json`, `requirements.txt`,
`pyproject.toml`, `go.mod`, `pom.xml`, `build.gradle`, `build.gradle.kts`,
`Cargo.toml`, `*.csproj`, `*.sln`.

### Uso

Como CLI:

```bash
node ferramentas/cli/lib/structural-pattern-detection.js <caminho-do-projeto>
node ferramentas/cli/lib/structural-pattern-detection.js --help
```

Sem argumento, usa o diretório atual. A saída é JSON em `stdout`; mensagens
de erro vão para `stderr`.

Como biblioteca:

```js
const { detectStructuralPattern } = require("./ferramentas/cli/lib/structural-pattern-detection");

const resultado = detectStructuralPattern("/caminho/absoluto/do/projeto");
// { structuralPattern, evidence, warnings } e, em monorepos, apps[]
```

A função lança `Error` com `code = "ERR_PROJETO_INVALIDO"` quando o caminho
não existe ou não é um diretório.

### Formato de saída

Campos sempre presentes na saída da CLI:

| Campo              | Tipo       | Descrição                                                                                  |
| ------------------ | ---------- | ------------------------------------------------------------------------------------------ |
| `projectRootInput` | string     | O caminho exatamente como foi passado na linha de comando                                  |
| `projectRoot`      | string     | O mesmo caminho, absoluto e resolvido                                                      |
| `structuralPattern`| string     | Um dos quatro padrões                                                                      |
| `evidence`         | string[]   | Caminhos relativos a `projectRoot`, sempre com `/` como separador (inclusive no Windows)    |
| `warnings`         | objeto[]   | Diretórios que não puderam ser lidos (`{ code, path, message }`); vazio quando não há aviso |

Campo presente apenas em monorepos:

| Campo  | Tipo     | Descrição                                                                                   |
| ------ | -------- | ------------------------------------------------------------------------------------------- |
| `apps` | objeto[] | Um item por raiz de app: `{ path, structuralPattern, evidence }`, com `evidence` relativa ao app |

Em monorepos, `evidence` da raiz lista as raízes de app encontradas (os
mesmos valores de `apps[].path`). A biblioteca devolve os mesmos campos,
exceto `projectRootInput` e `projectRoot`.

Exemplo de monorepo com um app MVC e outro sem convenção reconhecível:

```json
{
  "projectRootInput": "./exemplo",
  "projectRoot": "/home/usuario/exemplo",
  "structuralPattern": "monorepo-apps-e-pacotes",
  "evidence": ["apps/api", "apps/web"],
  "apps": [
    {
      "path": "apps/api",
      "structuralPattern": "mvc-classico",
      "evidence": ["src/controllers", "src/models"]
    },
    {
      "path": "apps/web",
      "structuralPattern": "indefinido",
      "evidence": []
    }
  ],
  "warnings": []
}
```

Exemplo de projeto modular com um diretório sem permissão de leitura:

```json
{
  "projectRootInput": ".",
  "projectRoot": "/home/usuario/servico",
  "structuralPattern": "modular-por-dominio",
  "evidence": ["src/modules"],
  "warnings": [
    {
      "code": "EACCES",
      "path": "src/privado",
      "message": "Sem permissão para ler o diretório; ele foi ignorado na detecção."
    }
  ]
}
```

A ordem de `evidence` e de `apps` é determinística: busca em profundidade
com filhos em ordem alfabética.

### Códigos de saída

| Código | Situação                                                                 |
| ------ | ------------------------------------------------------------------------ |
| `0`    | Detecção concluída (inclusive quando o resultado é `indefinido` ou há `warnings`) |
| `1`    | Erro inesperado (a mensagem vai para `stderr`)                           |
| `2`    | Caminho informado não existe ou não é um diretório                       |

### Calibração externa

A suíte de testes usa apenas fixtures sintéticos. Para conferir o detector
contra projetos reais da sua máquina sem versionar caminhos locais, crie um
JSON e aponte a variável `PADTEC_CALIBRACAO` para ele. O nome convencional
é `ferramentas/cli/calibracao.local.json`, já listado no `.gitignore` desta
pasta.

```json
[
  {
    "label": "serviço de cobrança",
    "projectPath": "../../../meus-projetos/cobranca",
    "expected": "modular-por-dominio"
  }
]
```

Regras de validação:

- o arquivo deve conter um array;
- cada item precisa de `label` (string não vazia), `projectPath` (string
  não vazia) e `expected` (um dos quatro padrões);
- `projectPath` relativo é resolvido a partir do diretório do próprio JSON.

Arquivo inexistente ou inválido encerra a suíte com código de saída `2`
antes de criar qualquer fixture.

```bash
PADTEC_CALIBRACAO=ferramentas/cli/calibracao.local.json node ferramentas/cli/lib/structural-pattern-detection.test.js
```

### Limitações conhecidas

- Olha apenas nomes de diretórios até sete níveis de profundidade
  (suficiente para `src/main/java/com/empresa/app/controller`). Nada abaixo
  disso conta como evidência.
- Pastas ruidosas são ignoradas comparando em minúsculas: `node_modules`,
  `.git`, `.apm`, `dist`, `build`, `vendor`, `storage`, `wwwroot`, `.next`,
  `coverage`, `venv`, `.venv`, `__pycache__`, `bin`, `obj`, `target`. A
  lista não vale para o nível imediato de `apps/` e `packages/` na raiz,
  então um app chamado `storage` ou `bin` continua sendo um app.
- Em MVC, a correlação exige o mesmo primeiro segmento de caminho. Em
  Laravel, `resources/views` fica fora da evidência porque não compartilha
  o segmento com `app/Http/Controllers`; a classificação continua correta
  graças a `app/Models`.
- `features/` com apenas `step_definitions/` e `support/` (Cucumber) e
  pastas modulares com um único subdiretório não contam como modular.
- Subpastas de `apps/`/`packages/` sem manifesto próprio não são raízes de
  app (um projeto Django com `apps/users` e `apps/billing` não é monorepo).
- Pastas irmãs só viram apps quando a raiz do projeto não tem manifesto:
  uma solução .NET com `.sln` na raiz e vários `.csproj` é um projeto só.
- Links simbólicos para diretório são seguidos, com proteção contra ciclos
  pelo caminho real; links quebrados são ignorados.
- Diretórios sem permissão de leitura (`EACCES`/`EPERM`) não interrompem a
  detecção: entram em `warnings` e são ignorados.

## Como rodar os testes

```bash
cd ferramentas/cli && npm test
```

Ou, arquivo a arquivo:

```bash
node --check ferramentas/cli/padtec.js
node --check ferramentas/cli/lib/padtec-detect.js
node --check ferramentas/cli/lib/structural-pattern-detection.js
node ferramentas/cli/lib/structural-pattern-detection.test.js
node ferramentas/cli/lib/padtec-detect.test.js
```

As duas suítes criam fixtures em `os.tmpdir()` (prefixo `padtec-fixture-`)
e os removem ao final, inclusive quando algum caso lança exceção ou a
calibração externa é inválida. O caso de permissão negada do detector
estrutural é pulado no Windows e quando a suíte roda como root.

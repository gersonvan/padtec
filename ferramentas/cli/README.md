# ferramentas/cli — detector de padrão estrutural

Protótipo da detecção de `structuralPattern`, base do futuro comando
`padtec detect`. Classifica a organização de diretórios de um projeto em
um de quatro padrões e, em monorepos, detalha cada app.

Requisitos: Node.js 18 ou superior, sem dependências externas.

## Propósito

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

## Uso

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

## Formato de saída

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

## Códigos de saída

| Código | Situação                                                                 |
| ------ | ------------------------------------------------------------------------ |
| `0`    | Detecção concluída (inclusive quando o resultado é `indefinido` ou há `warnings`) |
| `1`    | Erro inesperado (a mensagem vai para `stderr`)                           |
| `2`    | Caminho informado não existe ou não é um diretório                       |

## Calibração externa

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

## Limitações conhecidas

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
node --check ferramentas/cli/lib/structural-pattern-detection.js
node --check ferramentas/cli/lib/structural-pattern-detection.test.js
node ferramentas/cli/lib/structural-pattern-detection.test.js
```

A suíte cria fixtures em `os.tmpdir()` (prefixo `padtec-fixture-`) e os
remove ao final, inclusive quando algum caso lança exceção ou a calibração
externa é inválida. O caso de permissão negada é pulado no Windows e quando
a suíte roda como root.

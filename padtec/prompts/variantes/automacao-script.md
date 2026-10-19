<!--
Variante PADTec — automacao-script.
Arquivos de variante NÃO são núcleo: podem citar exemplos de framework/biblioteca/runtime.
-->

# Variante `automacao-script`

## 1. Identidade

Este arquivo orienta o orquestrador quando a variante resolvida é `automacao-script` do PADTec v1.0.1. O orquestrador `00-mestre.md` carregou este arquivo após detectar que o projeto destino é uma **coleção de scripts ou utilitário de automação** sem servidor longo-rodando e sem frontend — tipicamente sem manifestos aplicacionais de framework, com diretórios `scripts/`, `bin/`, `cmd/` ou um único arquivo executável de entrada.

Esta variante orienta a geração das seções do núcleo enfatizando **entrada de execução**, **fluxo de processamento** e **configuração**, em substituição a "API exposta" e "frontend".

## 2. Seções específicas que estendem o núcleo

Ênfases obrigatórias:

- `02-arquitetura.md` — o diagrama de arquitetura representa o **fluxo de processamento**: pontos de entrada (CLI, gatilho agendado, evento externo) → leitura de entrada → transformação/processamento → produção de saída (arquivo, banco, mensagem, log).
- `06-fluxos-de-negocio.md` — para cada script ou tarefa relevante, descrever passo a passo a invocação (comando ou gatilho), parâmetros aceitos, etapas de execução, saída produzida, caminhos de erro e código de retorno esperado.
- `07-interface-externa.md` — esta variante **redefine** o significado de "interface externa" para **interface de invocação**:
  - Tabela de **comandos CLI / pontos de entrada**: nome do executável, argumentos posicionais, flags, variáveis de ambiente lidas, código de saída por classe de resultado, evidência (`arquivo:linha`).
  - Tabela de **integrações de entrada e saída**: fontes lidas (arquivos, APIs, filas) e destinos escritos (arquivos, APIs, filas, banco).
  - Quando o script não expõe interface HTTP, a tabela de endpoints HTTP recebe `// CARÊNCIA: não aplicável a esta variante`.
- `09-backend.md` — adapte para descrever a **organização interna do código de processamento**: módulos por responsabilidade, padrão de tratamento de erro, padrão de logging, estratégia de teste.
- `10-configuracao-e-ambientes.md` — inventário de variáveis de ambiente lidas, arquivos de configuração (ex.: `.env`, YAML, TOML), parâmetros aceitos via CLI.

A seção `08-frontend.md`, quando presente no nível alvo (L2/L3), recebe `// CARÊNCIA: não aplicável a esta variante` — registre essa carência conforme regra dura 2.

Capacidades comuns nesta variante: `banco-de-dados`, `storage`, `filas-async`, `integracoes-externas`, `jobs-agendados`.

## 3. Exemplos de stack típicos

- **Scripts Python** (`argparse`, `click`, `typer`) — ETL, automação de dados, integração entre sistemas.
- **Node CLIs** (`commander`, `yargs`, `oclif`) — utilitários de build, geradores, automação.
- **Shell scripts** (Bash, Zsh) — provisioning, deploy, plumbing entre ferramentas.
- **Go CLIs** (`cobra`, `urfave/cli`) — utilitários binários nativos.
- **Processadores ETL** dedicados (scripts que leem fonte, transformam e gravam destino).
- **Rust binaries** (`clap`).
- **PowerShell** ou **Make**/`justfile` para orquestração.

Identifique a stack efetiva pela estrutura de diretórios, pelos shebangs nos arquivos executáveis e pelos eventuais manifestos de dependências (`requirements.txt`, `package.json` com `bin`, `go.mod`).

## 4. Referências cruzadas a templates

Caminhos relativos a `padtec/`.

- `templates/<nível-resolvido>/02-arquitetura.md` — fluxo de processamento (entrada → transformação → saída).
- `templates/<nível-resolvido>/03-stack-e-dependencias.md` — runtime, gerenciador de pacotes, dependências usadas.
- `templates/<nível-resolvido>/06-fluxos-de-negocio.md` — passo a passo por script/tarefa, com parâmetros e códigos de saída.
- `templates/<nível-resolvido>/07-interface-externa.md` — adaptado para tabela de comandos CLI e fontes/destinos.
- `templates/<nível-resolvido>/09-backend.md` — organização interna do código de processamento.
- `templates/<nível-resolvido>/10-configuracao-e-ambientes.md` — variáveis e arquivos de configuração.
- `templates/L3-aprofundado/12-quick-start.md` — instalação de dependências e exemplo de invocação representativa.
- `templates/<nível-resolvido>/condicionais/condicional-jobs-agendados.md` — quando capacidade `jobs-agendados` ativa (cron, agendador externo).

Quando o nível alvo é `L1`, apenas `01`, `02` e `03` são gerados.

## 5. Modo monorepo

**Não aplicável** como caso típico. Quando detectado, trate cada subpasta de script como uma unidade independente: gere uma subpasta de saída por unidade documentada.

## 6. Regras de qualidade

Aplicam-se integralmente as **sete regras duras de qualidade** definidas no bloco vii do `prompts/00-mestre.md`. Não as reproduza neste arquivo nem nas saídas: o `00-mestre.md` é a referência autoritativa.

---

**Fim da variante `automacao-script`.**

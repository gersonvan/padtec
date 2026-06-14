# PADTec

**Padrão Documental Técnico** — pacote de engenharia reversa documental.

## Identidade

O PADTec é um pacote autocontido que orienta um agente de codificação com acesso direto ao código-fonte a produzir, a partir desse código, documentação técnica padronizada de um sistema de software. A direção de geração é estritamente **código → documentação**: o pacote não gera código, não modifica o sistema-alvo e não infere comportamento sem evidência rastreável no código.

O modelo de distribuição é por **cópia integral**: a pasta `padtec/` deste pacote é copiada para a raiz do projeto destino e passa a fazer parte dele. Cada projeto destino mantém sua própria cópia, podendo evoluí-la independentemente. Não há instalação, dependência externa nem servidor.

## Três eixos ortogonais de parametrização

A geração documental é configurada por três escolhas independentes:

1. **Variante.** O tipo de sistema sendo documentado. Determina quais sub-prompts de seção são acionados e quais omitidos.
2. **Nível.** A profundidade da documentação produzida. Determina o volume de arquivos gerados e a extensão de cada um.
3. **Capacidades condicionais.** Recursos técnicos efetivamente presentes no código-fonte (banco de dados, cache, filas, etc.). Detectadas automaticamente; cada capacidade detectada aciona uma seção condicional adicional.

### Variantes

| Slug | Aplicação típica |
|---|---|
| `full-stack-web` | Aplicação web com backend de API e frontend acoplados no mesmo repositório ou organização |
| `backend-api` | Serviço de API isolado, sem frontend próprio |
| `frontend-site` | Aplicação de página única (SPA) ou site estático/server-side rendering |
| `automacao-script` | Ferramentas de linha de comando, scripts de automação, utilitários de processamento em lote |
| `iac` | Infraestrutura como código (Bicep, Terraform, ARM) |

### Níveis

| Nível | Pasta | Volume aproximado |
|---|---|---|
| L1 — Essencial | `templates/L1-essencial/` | README robusto e um documento de visão geral |
| L2 — Completo | `templates/L2-completo/` | 10 a 14 documentos cobrindo arquitetura, modelo, interface externa e operação |
| L3 — Aprofundado | `templates/L3-aprofundado/` | Aproximadamente 30 documentos, com quick-start, glossário extenso, FAQ e guia de manutenção da documentação |

Relação de inclusão: `L1 ⊂ L2 ⊂ L3`. Todo conteúdo de um nível inferior aparece nos níveis superiores, sempre com profundidade incremental.

### Capacidades condicionais

| Slug | Domínio coberto |
|---|---|
| `banco-de-dados` | Persistência estruturada |
| `cache` | Armazenamento em memória de alta velocidade |
| `filas-async` | Processamento assíncrono via filas e tópicos |
| `auth` | Autenticação e autorização |
| `integracoes-externas` | Consumo ou exposição de contratos com sistemas externos |
| `storage` | Armazenamento de arquivos e blobs |
| `notificacoes` | Envio de e-mail, SMS, notificações push |
| `jobs-agendados` | Tarefas periódicas com gatilho temporal |
| `multi-tenancy` | Isolamento de dados e recursos por tenant |

Quando uma capacidade é detectada no código, uma seção condicional correspondente é instanciada nos templates do nível escolhido.

## Estrutura do pacote

```
padtec/
├── README.md                          identidade, eixos, estrutura, entrada
├── VERSION                            versão semântica do pacote
├── guia-humano.md                     passo a passo operacional do usuário
├── prompts/
│   ├── 00-mestre.md                   prompt orquestrador chamado no Copilot Chat
│   ├── variantes/                     sub-prompts específicos por variante
│   ├── secoes/                        sub-prompts genéricos por seção do núcleo
│   └── extensoes/                     sub-prompts por capacidade condicional
├── templates/
│   ├── L1-essencial/                  esqueletos de arquivos para nível L1
│   ├── L2-completo/                   esqueletos de arquivos para nível L2
│   └── L3-aprofundado/                esqueletos de arquivos para nível L3
├── checklist-qa.md                    verificações objetivas de qualidade
├── glossario-base.md                  vocabulário-semente para estender no destino
└── confluence-mermaid-package/        ferramental opcional Markdown → Confluence
```

Resumo dos artefatos raiz:

- `README.md`. Este arquivo. Apresenta o pacote e seus eixos. Primeira leitura para qualquer leitor.
- `VERSION`. Versão semântica do pacote, leitura por inspeção rápida ou automação.
- `guia-humano.md`. Roteiro passo a passo do usuário que vai aplicar o pacote a um projeto. Entrada operacional principal.
- `prompts/`. Conteúdo executado por um agente com tool-calling nativo no ambiente do projeto destino. O orquestrador é `00-mestre.md`; sub-prompts complementares ficam em `variantes/`, `secoes/` e `extensoes/`.
- `templates/`. Esqueletos de arquivos por nível. O agente preenche estes esqueletos com conteúdo extraído do código-fonte.
- `checklist-qa.md`. Lista de verificações objetivas a serem executadas sobre a documentação gerada antes de declarar a entrega aceita.
- `glossario-base.md`. Conjunto inicial de termos recorrentes. O glossário gerado em cada projeto destino estende esta base com termos específicos do domínio do projeto.
- `confluence-mermaid-package/`. Ferramental opcional que converte arquivos Markdown produzidos pela geração em formato pronto para publicação no Atlassian Confluence, preservando blocos Mermaid.

## Como começar

A entrada operacional do pacote é o arquivo [guia-humano.md](guia-humano.md). Ele descreve, em sequência executável, as ações que um usuário precisa realizar para aplicar o PADTec a um projeto: copiar o pacote, escolher o nível, invocar o prompt mestre em um ambiente de agente com tool-calling nativo e validar a documentação gerada.

## Bibliografia e fontes técnicas recomendadas

Estas fontes servem como base conceitual para os princípios de documentação técnica, engenharia reversa documental e arquitetura de software adotados pelo PADTec. São referências de apoio para apresentação ou estudo, não citações diretas de conteúdo já gerado.

- Ian Sommerville, *Software Engineering*, 10ª edição, Addison-Wesley, 2015.
- Andrew S. Tanenbaum, *Modern Operating Systems*, 4ª edição, Pearson, 2015.
- ISO/IEC/IEEE 26514:2008, *Systems and software engineering — Requirements for designers and developers of user documentation*.
- Martin Fowler, *Refactoring: Improving the Design of Existing Code*, 2ª edição, Addison-Wesley, 2018.

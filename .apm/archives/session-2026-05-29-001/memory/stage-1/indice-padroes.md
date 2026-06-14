# Índice de Padrões — Stage 1, Task 1.1

Síntese organizada dos padrões destilados das fontes de referência listadas na Task 1.1. Cada entrada inclui caminho real verificado, função na destilação e padrões extraídos (estrutura de seções, tabelas, diagramas Mermaid, indicadores de cobertura por nível e sinais de capacidades técnicas).

> **Nota de discrepância de caminhos.** O Task Prompt grafou as fontes como `../Projetos AVP/<projeto>/...`. O caminho real é `../<projeto>/...` — o diretório-pai do workspace já é `Projetos AVP/`. Os caminhos abaixo refletem o real.
>
> **Nota sobre `APM_RULES.md`.** O Task Prompt referenciou `../Processos_docentes/APM_RULES.md`, inexistente. O arquivo equivalente na convenção atual é `../Processos_docentes/AGENTS.md` (mesma função normativa). Adotado como substituto.

---

## 1. Documentos-fonte inventariados

| # | Caminho real | Tipo | Volume | Função na destilação |
|---|---|---|---|---|
| 1 | `../SiteUnigrande/apm-complete-guide-phases-1-7.md` | Arquivo | 1 arquivo | Insumo histórico de processo APM (fases 1–7); base para conteúdo L3 de templates |
| 2 | `../SiteUnigrande/apm-7-confluence-documentation-template.md` | Arquivo | 1 arquivo | Base estrutural do template de publicação Confluence (hierarquia de 6 seções, ordem canônica) |
| 3 | `../PortalDoAlunoUGD/confluence-mermaid-package/` | Diretório | 1 pacote Node.js + 4 exemplos | Versão de referência primária do ferramental Markdown→ADF (canônica) |
| 4 | `../SiteUnigrande/confluence-mermaid-package/` | Diretório | 1 pacote idêntico + `tmp_extract_stats.ps1` | Versão alternativa do ferramental (acrescenta script auxiliar de extração de estatísticas) |
| 5 | `../Processos_docentes/AGENTS.md` (substitui `APM_RULES.md` inexistente) | Arquivo | 1 arquivo | Referência estrutural de estilo e regras de escrita (`APM_RULES { ... }`) |
| 6 | `../siteavp-docs/docs/00-baseline-referencia-siteavp-docs.md` | Arquivo | 1 arquivo | Insumo meta-documental: baseline, referências autorizadas, precedência e convenções mínimas |
| 7 | `../siteavp-docs/docs/01-estrutura-canonica-documental.md` | Arquivo | 1 arquivo | Insumo meta-documental: estrutura canônica alvo, naming, ordenação, regras de qualidade |
| 8 | `../SiteUnigrande/docs/` | Diretório | 32 arquivos `.md` | Amostra de documentação L3 madura (referência alta) |
| 9 | `../PortalDoAlunoUGD/documentation/` | Diretório | 11 arquivos `.md` | Amostra de documentação L2 (referência intermediária) |
| 10 | `../DocBox/docs/` | Diretório | 25 arquivos `.md` | Amostra com diagramas Mermaid e evidências visuais; documentação por fases |

**Cobertura:** 10/10 fontes inventariadas e referenciadas.

---

## 2. Padrões de estrutura de seções

### 2.1 Cabeçalhos e hierarquia

- **H1 único por documento**, contendo o título principal. Convergência em 10/10 fontes.
- **H2 como espinha temática** do documento. Em L3 (`SiteUnigrande/docs/`, `DocBox/docs/`) os H2 levam emojis funcionais de categoria; em L2 (`PortalDoAlunoUGD/documentation/`) e em metadocumentos (`siteavp-docs/`) os H2 são textuais.
- **H3 para subseções operacionais**: conteúdo esperado, configuração, exemplos, troubleshooting.
- **Profundidade efetiva** raramente excede H4. Recomendação consolidada: até três níveis de hierarquia visual em prosa, exceto índices e tabelas internas.

### 2.2 Seções recorrentes ao longo das fontes

| Seção | Recorrência | Nível típico | Observação |
|---|---|---|---|
| Visão geral / arquitetura | 10/10 | L1 | Sempre primeira; descreve camadas, contexto e atores |
| Estrutura do projeto | 7/10 | L2 | Diretórios, convenções de naming, padrões de módulo |
| Stack tecnológico (inventário) | 8/10 | L1 | Camada × tecnologia × versão; em L3 vem com versões detalhadas |
| Backend (interno) | 8/10 | L2/L3 | Módulos, serviços, padrões; em L3 modular e profundo |
| Frontend (interno) | 7/10 | L2/L3 | Roteamento, componentes, estado |
| Banco de dados | 8/10 | L2/L3 | Entidades, views, relacionamentos; condicional à capacidade |
| Cache e processamento assíncrono | 5/10 | L2/L3 | Aparece dedicado em L3 (`SiteUnigrande/docs/cache-processamento-assincrono.md`) |
| Integrações externas | 7/10 | L2/L3 | Tabelas de endpoints, fluxos de autenticação cliente-fornecedor |
| Fluxos de negócio end-to-end | 8/10 | L2 | Diagramas de sequência em L3; descrição textual em L2 |
| Infraestrutura e deployment | 6/10 | L2 | Ambientes, CI/CD, observabilidade |
| Guia de início rápido | 4/10 | L3 | Apenas em L3; setup de 15–30 min |
| Glossário | 6/10 | L3 | 100+ termos com categoria/definição/exemplo |
| FAQ e troubleshooting | 7/10 | L3 | 10–50 cenários Q/A |
| Governança e baseline | 3/10 (apenas metadocs e DocBox) | L1 | Matriz de precedência, referências autorizadas |
| Manutenção da documentação | 3/10 | L3 | Quando atualizar, padrões de escrita, checklist |

### 2.3 Convenções de nomenclatura de arquivos

- **Metadocumentos e L2 sequencial** (`siteavp-docs/docs/`, `PortalDoAlunoUGD/documentation/`): padrão `NN-slug-em-kebab-case.md` com dois dígitos numéricos prefixados. Imposto pelo `00-baseline-referencia-siteavp-docs.md` como regra obrigatória.
- **L3 tema-cêntrico** (`SiteUnigrande/docs/`): padrão `prefixo-tematico-descricao.md` sem numeração frontal (`backend-*`, `frontend-*`, `integracao-*`, `cache-*`, `guia-*`).
- **DocBox** combina os dois estilos e adiciona prefixos de fase (`fase1-*`, `fase5-*`).
- **Convergência sobre slug:** sempre minúsculo, sem acentos, separador hífen. Sem exceções.

**Decisão para o esqueleto canônico:** adotar `NN-slug-em-kebab-case.md` (formato com numeração frontal) — coerente com `01-estrutura-canonica-documental.md` que é o documento mais próximo do propósito do PADTec, e elimina ambiguidade de ordem de leitura.

---

## 3. Padrões de tabelas

Tabelas são o principal artefato denso de informação técnica nas fontes. Foram identificados 10 tipos recorrentes; cada tipo tem colunas canônicas estabelecidas em pelo menos três fontes.

| Tipo de tabela | Colunas canônicas | Onde aparece (exemplos) | Função |
|---|---|---|---|
| Stack tecnológico | Camada \| Tecnologia \| Versão | `apm-complete-guide-phases-1-7.md`, `01-visao-geral-arquitetura.md` (L2), `visao-geral-arquitetura.md` (L3, DocBox) | Inventário de dependências |
| Rotas / endpoints | Método \| Path \| Autenticação \| Descrição | `backend-endpoints-api.md` (L3 — 26+ endpoints), `02-backend-servicos.md` (L2), DocBox | Inventário funcional do contrato externo |
| Módulos | Módulo \| Propósito \| Endpoints \| Dependências | `backend-arquitetura-nestjs.md` (L3), `02-backend-servicos.md` (L2) | Mapa de responsabilidades internas |
| Componentes de interface | Nome \| Tipo \| Propósito \| Localização | `frontend-componentes-biblioteca.md` (L3), `03-frontend-interface.md` (L2) | Catálogo de componentes |
| Entidades / views | Nome \| Objeto BD \| Propósito \| Uso | `backend-entidades-typeorm.md` (L3), `06-estruturas-bancos.md` (L2) | Modelo de dados |
| Variáveis de ambiente | Chave \| Valor padrão \| Descrição \| Ambiente | `guia-quick-start.md` (L3), `04-infraestrutura-integracoes.md` (L2) | Configuração |
| Conexões de banco | Alias \| Host \| Banco \| Credencial \| Modo | `arquitetura-banco-dados.md` (L3), `06-estruturas-bancos.md` (L2) | Topologia de persistência |
| Comparações / decisões | Característica \| Opção A \| Opção B \| Notas | `integracao-frontend-backend.md` (L3, SSR vs CSR) | Justificativa de decisões |
| Recomendações / roadmap | ID \| Título \| Prioridade \| Estimativa \| Descrição | `apm-complete-guide-phases-1-7.md` | Backlog priorizado |
| Glossário | Termo \| Categoria \| Definição \| Exemplo | `glossario.md` (L2 e L3) | Referência |
| Matriz de precedência | Tema \| Regra consolidada \| Categoria \| Fonte vencedora \| Evidências | `00-baseline-referencia-siteavp-docs.md` | Resolução de conflitos entre fontes |

**Convergência sobre largura:** 4–5 colunas; quando excede 6, divide-se em duas tabelas relacionadas. Reforçado pelo guia APM ("máx 4 colunas para legibilidade").

---

## 4. Padrões de diagramas Mermaid

### 4.1 Suporte ferramental

Os dois pacotes `confluence-mermaid-package` (PortalDoAlunoUGD e SiteUnigrande) implementam o mesmo núcleo de conversão Markdown→ADF para publicação Confluence. Suportam **12 tipos** de diagramas Mermaid documentados no `MERMAID-GUIDE.md`:

| Tipo Mermaid | Uso recomendado pelo pacote |
|---|---|
| `flowchart` (graph TD/TB/LR/BT/RL) | Fluxos de processo, dependências, decisões |
| `sequenceDiagram` | Fluxos de autenticação, chamadas entre serviços, integrações externas |
| `classDiagram` | Modelos orientados a objeto, hierarquias de entidades |
| `stateDiagram-v2` | Máquinas de estado, ciclo de vida de recursos |
| `erDiagram` | Modelos relacionais com cardinalidades e chaves |
| `gantt` | Roadmaps, cronogramas, dependências temporais |
| `pie` | Distribuição percentual |
| `journey` | Jornada do usuário com etapas e satisfação |
| `gitGraph` | Estratégia de branches, merges, releases |
| `mindmap` | Decomposição hierárquica de conceitos |
| `timeline` | Cronologia de eventos |
| `quadrantChart` | Matriz 2×2 de classificação |

**Recomendação de versão canônica do ferramental:** `PortalDoAlunoUGD/confluence-mermaid-package/` (mais limpo, pronto para distribuição como template). O `tmp_extract_stats.ps1` da versão SiteUnigrande é candidato a ferramenta opcional em pasta de extensões futura.

### 4.2 Uso efetivo nos corpora

| Corpus | Uso de Mermaid | Tipos predominantes |
|---|---|---|
| `SiteUnigrande/docs/` (L3) | 15+ diagramas formais | `flowchart` (8), `sequenceDiagram` (4), `erDiagram`, `classDiagram`, `C4Context` (1) |
| `DocBox/docs/` | Presente, complementado por ASCII art | `erDiagram` (15+ entidades), `sequenceDiagram` (fluxo de login com 20+ passos), `flowchart` |
| `PortalDoAlunoUGD/documentation/` (L2) | Zero diagramas Mermaid | Arquitetura descrita só em prosa |
| Metadocs e guias APM | Zero | Estrutura de árvore em ASCII, sem Mermaid |

**Achado:** o salto qualitativo entre L2 e L3 inclui a adoção sistemática de Mermaid. O esqueleto canônico deve prever, em seções L3, presença de pelo menos um diagrama Mermaid relevante.

### 4.3 Convenções de uso observadas

- **ASCII art** para visão de camadas e topologia geral (sobrevive em DocBox).
- **Mermaid** para fluxos dinâmicos (sequência, decisões) e modelos de dados (ER, classe).
- **Numeração de fluxos**: `Fluxo 01`, `Fluxo 02` (DocBox), com diagrama + sequência textual passo a passo.
- **Naming de nós**: entidades em `UPPER_CASE` em `erDiagram`; serviços em `PascalCase` em `sequenceDiagram`.

---

## 5. Cobertura por nível (L1/L2/L3)

Três níveis emergem das fontes, mesmo quando não nomeados explicitamente. Adotam-se nomes neutros para o esqueleto:

| Nível | Propósito | Público | Detalhamento típico | Evidência nas fontes |
|---|---|---|---|---|
| **L1 — Estratégico** | Visão de sistema, decisões arquiteturais, contexto | Arquitetos, decisores, novos integrantes em onboarding | 5–15 min de leitura; diagramas de alto nível; tabelas de stack | `apm-7-confluence-documentation-template.md` (root page), `00-baseline-referencia-siteavp-docs.md` |
| **L2 — Tático** | Modelo de domínio, contratos, fluxos, módulos | Tech leads, desenvolvedores sênior | Tabelas de endpoints, módulos, entidades; diagramas de sequência e ER | `PortalDoAlunoUGD/documentation/` (corpus inteiro), `apm-complete-guide-phases-1-7.md` (Phase 2–5) |
| **L3 — Operacional** | Setup, comandos, exemplos executáveis, troubleshooting | Desenvolvedores júnior, sustentação, plantão | Code blocks executáveis; variáveis de ambiente concretas; FAQ detalhado; guia de manutenção da própria documentação | `SiteUnigrande/docs/` (corpus inteiro), `DocBox/docs/`, `apm-complete-guide-phases-1-7.md` (Phase 6–7) |

**Relação de inclusão:** L1 ⊂ L2 ⊂ L3. Toda seção que aparece em L1 reaparece em L2 e L3 com profundidade incremental. Seções que aparecem em L2 podem não estar em L1 (ex.: detalhamento de módulos). Seções operacionais (quick-start, FAQ, manutenção da documentação) aparecem apenas em L3.

### 5.1 Diferenças concretas L2 → L3 (achado mais valioso)

| Aspecto | L2 (`PortalDoAlunoUGD/documentation/`) | L3 (`SiteUnigrande/docs/`) |
|---|---|---|
| Quantidade de arquivos | 11 | 32 |
| Estratégia de organização | Sequencial linear (01–08 + auxiliares) | Tema-cêntrica, sem numeração frontal |
| Diagramas Mermaid | 0 | 15+ |
| Endpoints documentados | Tabela agregada | Documento dedicado (`backend-endpoints-api.md`) |
| Quick-start dedicado | Não | Sim |
| Guia de manutenção da própria documentação | Não | Sim |
| FAQ | ~10 entradas | 50+ entradas |
| Auditoria de gaps documentais | Sim (`AUDITORIA-DOCS-20260209.md`) | Não |

O PADTec deve oferecer, no mínimo, paridade com L3 em diagramas, quick-start, FAQ e guia de manutenção; e absorver de L2 a prática de **auditoria de gaps** como artefato opcional.

---

## 6. Sinais técnicos das nove capacidades

Mapeamento de sinais observados (no código e na documentação dos corpora) por capacidade. Estes sinais são consumidos pelo prompt detector na fase de geração de documentação, e definem quando uma seção condicional deve ser instanciada.

| Capacidade | Slug | Sinais observados nos corpora |
|---|---|---|
| Banco de dados | `banco-de-dados` | Entidades TypeORM, arquivos `.sql`, migrations, views SQL, conexões nomeadas em arquivos de configuração |
| Cache | `cache` | Bibliotecas Redis (`ioredis`, `cache-manager`), decorators de cache, métricas hit/miss documentadas |
| Filas / processamento assíncrono | `filas-async` | Bull/BullMQ, processors decorados, RabbitMQ, Kafka, SQS, retry/DLQ documentados |
| Autenticação e autorização | `auth` | Passport, JWT, OAuth, guards de autenticação, middlewares de sessão, fluxo de login documentado |
| Integrações externas | `integracoes-externas` | Clientes HTTP nomeados (Lyceum, SendGrid), SDKs de terceiros, documentos `integracao-*.md` |
| Armazenamento de arquivos | `storage` | Azure Blob Storage, AWS S3, multer, `fs-extra` usado em upload, URLs assinadas (SAS) |
| Notificações | `notificacoes` | SendGrid, Twilio, nodemailer, SMTP, push SDKs, templates de e-mail |
| Jobs agendados | `jobs-agendados` | `@nestjs/schedule`, `node-cron`, cron jobs declarados, planilha de schedule |
| Multi-tenancy | `multi-tenancy` | Múltiplas conexões nomeadas, schemas dinâmicos, tenant resolvers, isolamento por `collegeId`/`tenantId` |

**Cobertura nos corpora:** L3 documenta 8/9 capacidades com profundidade alta; multi-tenancy aparece com profundidade alta apenas em DocBox (isolamento por `collegeId`). O esqueleto canônico deve prover seção condicional para todas as nove, mesmo as menos representadas, para garantir reaproveitabilidade em projetos futuros.

---

## 7. Convenções de estilo destiladas

Convergência em ≥7 das fontes (regras obrigatórias) ou ≥4 das fontes (regras recomendadas):

| Categoria | Regra | Classificação | Fontes-suporte |
|---|---|---|---|
| Idioma | Português do Brasil com acentuação correta | Obrigatória | `AGENTS.md`, `00-baseline-referencia`, `01-estrutura-canonica`, AGENTS.md do workspace |
| Tom | Técnico-formal | Obrigatória | `AGENTS.md`, AGENTS.md do workspace |
| Emojis | Decorativos proibidos; funcionais permitidos (`✅`, `❌`, alertas) | Obrigatória | `AGENTS.md` do Processos_docentes, AGENTS.md do workspace |
| Naming de arquivos | `NN-slug-em-kebab-case.md` (dois dígitos) | Obrigatória | `00-baseline-referencia`, `01-estrutura-canonica` |
| Evidência | Toda afirmação técnica relevante aponta caminho de arquivo verificável | Obrigatória | `00-baseline-referencia`, `01-estrutura-canonica` |
| Independência de stack | Núcleo sem nomes de framework/lib/runtime | Obrigatória (apenas núcleo) | AGENTS.md do workspace |
| Tabelas | Até 4–5 colunas; dividir quando exceder | Recomendada | `apm-complete-guide-phases-1-7.md`, L3 SiteUnigrande |
| Code blocks | Sempre com `language spec`; até ~30 linhas | Recomendada | `apm-complete-guide-phases-1-7.md`, L3 SiteUnigrande |
| Diagramas Mermaid | Pelo menos um por documento L3 estrutural | Recomendada | L3 SiteUnigrande, DocBox |
| Caminhos internos | Sempre relativos à raiz do pacote/projeto, nunca absolutos | Obrigatória | AGENTS.md do workspace, `AGENTS.md` Processos_docentes |
| Mensagens de commit | `<tipo>: <descrição imperativa>` em pt-BR, sem identificadores APM | Obrigatória | AGENTS.md do workspace, `AGENTS.md` Processos_docentes |

---

## 8. Pendências e lacunas registradas

| # | Lacuna | Implicação | Encaminhamento sugerido |
|---|---|---|---|
| 1 | Versionamento da própria documentação (v1.0, v2.0) não aparece em nenhuma fonte | Pacote PADTec não nasce com política de versão | Manager decide se inclui na próxima Task |
| 2 | Workflow de revisão/aprovação descrito em regras (`00-baseline`) mas não em template operacional | Não há checklist concreto reaproveitável | Avaliar artefato condicional em Stage 2 |
| 3 | Multi-tenancy só aparece com profundidade em DocBox | Risco de seção condicional pobre em exemplos | Reforçar a partir de DocBox no template condicional |
| 4 | Cobertura de autenticação superficial em L2 e L3 (SiteUnigrande/PortalDoAlunoUGD); robusta apenas em DocBox | Template condicional `auth` deve incorporar DocBox como exemplo principal | — |
| 5 | Pacote ferramental Mermaid no SiteUnigrande inclui `tmp_extract_stats.ps1` sem documentação | Função inferida (análise de estatísticas) não confirmada | Não adotar sem documentar; tratar como extensão opcional |

---

## 9. Síntese para derivação do esqueleto canônico

A partir das convergências acima, o esqueleto canônico definido em [esqueleto-canonico.md](esqueleto-canonico.md) reflete:

- **Quinze seções de núcleo** com naming `NN-slug-em-kebab-case.md`, cobrindo L1, L2 e L3.
- **Nove seções condicionais** com prefixo `condicional-` (vivem em `padtec/templates/<nivel>/condicionais/`), uma por capacidade, com nível mínimo L2.
- **Independência de stack** rigorosa nos arquivos do núcleo: descritivos genéricos, sem nomes de framework/lib/runtime.
- **Mapeamento explícito**: cada capacidade é referenciada por exatamente uma seção condicional; nenhuma seção do núcleo é vinculada a capacidade específica.

---

**Fim do índice de padrões.**

# Glossário-base — PADTec

Vocabulário-semente para o glossário do projeto destino. Cada termo tem definição curta de uma a três linhas. O glossário gerado em cada projeto estende esta base com termos específicos do domínio do projeto destino — esta lista cobre vocabulário recorrente identificado nos projetos AVP de referência (educação, arquitetura técnica, processos internos).

A entrada segue o formato `- **Termo.** Definição curta.`.

## Domínio — educação e gestão acadêmica AVP

- **Aluno.** Pessoa física matriculada em curso oferecido pela instituição, identificada por matrícula única e vinculada a uma ou mais ofertas.
- **Matrícula.** Vínculo formal entre um aluno e um curso ou disciplina em um período letivo específico; carrega situação acadêmica e financeira.
- **Oferta de disciplina.** Instância concreta de uma disciplina disponibilizada em um período letivo, polo e turma, com vagas e plano de ensino próprios.
- **Plano de ensino.** Documento estruturado que descreve ementa, objetivos, conteúdo programático e bibliografia de uma oferta de disciplina.
- **Polo.** Unidade física ou virtual onde alunos recebem suporte presencial; relevante para cursos a distância e semipresenciais.
- **Disciplina.** Componente curricular com identidade própria (código, carga horária, ementa); instanciada como oferta a cada período letivo.
- **Curso.** Programa acadêmico de graduação, pós-graduação ou extensão composto por um conjunto de disciplinas obrigatórias e eletivas.
- **Unidade.** Subdivisão organizacional da instituição (centro, faculdade, escola) responsável por oferecer cursos e disciplinas.
- **Professor.** Pessoa que ministra disciplinas em ofertas específicas; pode acumular papéis de coordenador ou tutor.
- **Coordenador.** Pessoa responsável administrativa e pedagogicamente por um curso, unidade ou polo.
- **Período letivo.** Janela temporal (semestre, trimestre, módulo) durante a qual ofertas de disciplina ocorrem.
- **Lyceum.** Sistema acadêmico de gestão (ERP) integrado pelos sistemas AVP como fonte autoritativa de dados acadêmicos e cadastrais.
- **Diploma digital.** Documento de conclusão de curso emitido em formato eletrônico assinado digitalmente, conforme regulamentação aplicável.
- **Ementa.** Texto que descreve sucintamente o conteúdo de uma disciplina; parte do plano de ensino.

## Arquitetura — termos técnicos transversais

- **Módulo.** Unidade de organização interna de um sistema que agrupa funcionalidades relacionadas; tem fronteira e dependências explícitas.
- **Controlador.** Componente responsável por receber requisições da interface externa, validar entrada e delegar para a camada de serviço.
- **Serviço.** Componente que implementa lógica de aplicação, orquestra operações e coordena chamadas a repositórios e integrações.
- **Repositório.** Componente responsável por encapsular o acesso a um mecanismo de persistência e expor operações de domínio sobre entidades.
- **Entidade.** Objeto de domínio com identidade própria, mapeado em uma estrutura de persistência.
- **View (banco de dados).** Consulta nomeada e armazenada que combina uma ou mais tabelas e é consumida como se fosse uma tabela.
- **Migração.** Script versionado que aplica uma alteração estrutural ao mecanismo de persistência, registrado em sequência reversível.
- **Endpoint.** Ponto de entrada exposto pela interface externa de um sistema, identificado por método e caminho ou por contrato equivalente.
- **Rota.** Mapeamento entre um endpoint e o controlador ou função responsável por atendê-lo.
- **Fila.** Estrutura intermediária que recebe mensagens de um produtor e as entrega a um ou mais consumidores de forma assíncrona.
- **Tópico.** Canal lógico ao qual mensagens são publicadas para entrega a múltiplos consumidores subscritos.
- **Cache.** Camada de armazenamento de alta velocidade usada para servir respostas previamente computadas dentro de uma janela de tempo definida.
- **Tempo de vida.** Janela de validade de um item armazenado em cache, após a qual o item é considerado obsoleto.
- **JWT.** Padrão de token de portador autocontido, assinado, usado para transportar afirmações sobre uma identidade entre componentes.
- **Sessão.** Vínculo de estado entre uma identidade autenticada e o sistema, persistido por intervalo definido.
- **Tenant.** Cliente lógico de um sistema multi-tenant cujos dados e recursos são isolados dos demais tenants.
- **Job agendado.** Execução periódica disparada por gatilho temporal (calendário ou intervalo) sem interação direta de usuário.
- **Mermaid.** Linguagem de marcação textual para descrição de diagramas (fluxo, sequência, entidade-relacionamento, classe, estado) renderizados visualmente.
- **ADF.** Atlassian Document Format; representação JSON de conteúdo rico aceita pelas APIs do Confluence.

## Processo — vocabulário PADTec e APM

- **PADTec.** Padrão Documental Técnico; este pacote, voltado a engenharia reversa documental de sistemas de software.
- **Engenharia reversa documental.** Processo de produzir documentação técnica a partir do código-fonte existente, com direção estrita código → documentação.
- **Variante.** Tipo de sistema sendo documentado; um dos cinco valores fixos do pacote (`full-stack-web`, `backend-api`, `frontend-site`, `automacao-script`, `iac`).
- **Nível.** Profundidade da documentação produzida; um de três valores (`L1`, `L2`, `L3`) com relação de inclusão `L1 ⊂ L2 ⊂ L3`.
- **Capacidade condicional.** Recurso técnico (banco de dados, cache, fila, etc.) cuja documentação só é gerada quando o pacote detecta sinais correspondentes no código.
- **Prompt mestre.** Arquivo `padtec/prompts/00-mestre.md`, ponto de entrada da geração documental; orquestra detecção e despacho de sub-prompts.
- **Sub-prompt de seção.** Arquivo em `padtec/prompts/secoes/` que orienta a geração de uma seção específica do núcleo documental.
- **Sub-prompt de variante.** Arquivo em `padtec/prompts/variantes/` que orienta a geração de seções específicas a um tipo de sistema.
- **Sub-prompt de extensão.** Arquivo em `padtec/prompts/extensoes/` que orienta a geração de uma seção condicional para uma capacidade detectada.
- **Evidência rastreável.** Citação no formato `arquivo:linha` ou `arquivo` que ancora uma afirmação técnica do conteúdo gerado a um ponto verificável do código.
- **Marcador de carência.** Texto literal `// CARÊNCIA: não identificado no código`, gravado em seções para as quais o código não fornece evidência suficiente.
- **Cobertura exaustiva.** Regra de qualidade que exige que todo elemento estrutural do código (rota, controlador, entidade, job) apareça em alguma tabela do conteúdo gerado.
- **APM.** Agentic Project Management; framework de coordenação de execução por agentes adotado no desenvolvimento deste pacote.
- **Stage.** Etapa de execução do APM, agrupa Tasks relacionadas dentro de um Plan.
- **Task.** Unidade de trabalho atribuída pelo Manager a um Worker no APM, com objetivo, instruções, critérios de validação e log.
- **Worker.** Agente do APM dedicado à execução de Tasks de uma especialidade.
- **Baseline.** Conjunto de referências autorizadas usadas como ponto de partida para uma síntese documental; documento que registra essa escolha.

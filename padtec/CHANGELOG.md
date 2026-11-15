# Histórico de versões do PADTec

A versão instalada em um projeto está em `VERSION`, na raiz desta pasta. Este arquivo registra o que mudou em cada versão, o que exige atenção de quem atualiza uma cópia antiga e como fazer a atualização.

## v2.0.0 — 2026-11-15

A versão principal mudou porque a estrutura do pacote e os nomes de alguns documentos gerados mudaram: uma cópia `v1.0.1` não pode ser atualizada copiando a nova por cima.

### Mudanças que exigem atenção ao atualizar

- **Estrutura dos templates.** As pastas `templates/L1-essencial/`, `templates/L2-completo/` e `templates/L3-aprofundado/` deram lugar a uma fonte única: `templates/nucleo/` (dezesseis seções) e `templates/condicionais/` (nove capacidades). O nível escolhido seleciona quais seções são preenchidas.
- **Nomes das seções condicionais.** Toda seção condicional é gravada como `condicional-<slug>.md`. Mudaram de nome `condicional-autenticacao-e-autorizacao.md` (agora `condicional-auth.md`), `condicional-armazenamento-de-arquivos.md` (agora `condicional-storage.md`) e os arquivos `<slug>.md` sem prefixo que algumas cópias anteriores gravavam (`auth.md`, `banco-de-dados.md` e os demais).
- **Publicação no Confluence fora do pacote.** A pasta `confluence-mermaid-package/` deixou de fazer parte de `padtec/`. O ferramental é distribuído à parte, em `ferramentas/confluence-mermaid-package/` no repositório-fonte.
- **Glossário em todos os níveis.** `13-glossario.md` passa a ser gerado também em `L1`.
- **Escrita fora da pasta de documentação.** Toda execução grava um bloco delimitado por `<!-- PADTec:início -->` e `<!-- PADTec:fim -->` em `AGENTS.md`, na raiz do projeto. O texto fora dos marcadores é preservado.
- **Stack real na documentação gerada.** Os documentos passam a nomear frameworks, bibliotecas e produtos efetivamente usados pelo projeto, com evidência. A independência de stack vale para o pacote, não para a documentação de um sistema concreto.
- **Variante de projetos com código de servidor.** Um projeto de framework de frontend que também executa código de servidor (rotas de servidor, diretiva `"use server"`, acesso direto a banco) é resolvido como `full-stack-web`, não mais como `frontend-site`. A documentação de backend desses projetos deixa de ser marcada como não aplicável.

### Novidades

- **Mapa para agentes.** Nova seção `16-mapa-para-agentes`, gerada por último em todos os níveis: índice de qual documento responde a qual pergunta, onde cada coisa vive, regras de uso e como regenerar.
- **Adaptadores por agente.** Pasta `adaptadores/` com apontadores opcionais para Claude Code, GitHub Copilot, Antigravity, Gemini CLI e Gemini Code Assist.
- **Documentos órfãos na reexecução.** Arquivos de uma execução anterior que saíram do conjunto gerado (nome de versão anterior, capacidade que deixou de estar ativa, seção fora do nível) são listados ao usuário, com os arquivos que os referenciam, e só são removidos com confirmação.
- **Detecção de variante ampliada.** Manifestos em pastas como `server/`, `backend/` e `frontend/`; backend sem framework (servidor HTTP da biblioteca padrão, funções serverless); site estático por página HTML de entrada; ferramenta de linha de comando por executável declarado no manifesto; mais frameworks reconhecidos.
- **Detecção de capacidades ampliada.** A capacidade vale pela função, não pela biblioteca: autenticação própria, integração por chamada HTTP nativa ou por acesso remoto, armazenamento oferecido pela plataforma e agendamento fora do código da aplicação ativam a capacidade. Testes, documentação existente e a própria pasta `padtec/` não contam como evidência.
- **Novas seções nos documentos.** "Onde cada coisa vive" em `01`, "Ritos" em `12`, "Defeitos conhecidos registrados no repositório" em `14` e "Auto-manutenção" em `15`.
- **QA mecânico pelo agente.** Ao final da execução, o agente roda os itens mecânicos de `checklist-qa.md` e reporta o resultado; os itens de amostragem e leitura continuam com o humano.
- **Contrato comum dos sub-prompts.** `prompts/_comum.md` concentra parâmetros, procedimento de preenchimento e guarda por nível; as sete regras de qualidade têm fonte única no prompt mestre.
- **Despacho paralelo opcional.** O mestre declara o grafo de dependências entre seções; a execução em série continua sendo o padrão.

### Como atualizar a partir da v1.0.1

1. Apague a pasta `padtec/` do projeto e copie a nova inteira. Não copie por cima.
2. Se o projeto usava `padtec/confluence-mermaid-package/`, obtenha o ferramental em `ferramentas/confluence-mermaid-package/` no repositório-fonte e guarde suas credenciais fora do pacote.
3. Reexecute o prompt mestre. Os documentos com nome antigo aparecem na lista de órfãos, ao lado do documento que os substitui; decida ali se devem ser removidos.
4. Confira o bloco gravado em `AGENTS.md` e, se o seu agente usa outro arquivo de instruções, siga o adaptador correspondente em `adaptadores/`.

## v1.0.1

Versão de referência anterior: templates organizados por nível, quinze seções de núcleo, nove capacidades condicionais e ferramental de publicação no Confluence dentro do pacote.

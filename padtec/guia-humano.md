# Guia humano — aplicar o PADTec a um projeto

Este guia descreve, em sequência executável, como aplicar o PADTec a um projeto de software para produzir documentação técnica a partir do código-fonte. O guia é direcionado a um leitor humano sem contexto prévio sobre o pacote. Toda execução técnica é feita por um agente de codificação com tool-calling nativo — isto é, capaz de ler e gravar arquivos do projeto diretamente; o usuário humano apenas dispara, acompanha e valida.

## Resumo executivo

1. **Copiar** a pasta `padtec/` para a raiz do projeto destino.
2. **Escolher o nível:** `L1` (essencial), `L2` (completo, padrão) ou `L3` (aprofundado).
3. **Invocar** no chat do agente de codificação, com o projeto destino aberto, em uma mensagem só: apontar para `padtec/prompts/00-mestre.md` e informar o nível.
4. **Aguardar** o agente detectar variante e capacidades e gerar os arquivos em `docs/`. Lacunas aparecem como `// CARÊNCIA: não identificado no código`.
5. **Validar** com `padtec/checklist-qa.md`, incluindo a revisão de português do Brasil e acentuação. Pedir correção dos itens reprovados até zerar.
6. **(Opcional) Publicar** no Confluence com o ferramental `confluence-mermaid-package`, mantido no repositório-fonte do PADTec em `ferramentas/` (não integra a cópia de `padtec/`; copie-o para o projeto quando for publicar).

Detalhes de cada passo nas seções abaixo.

## Pré-requisitos

- Repositório do projeto destino aberto em um ambiente que ofereça acesso nativo aos arquivos do projeto.
- Agente de chat habilitado e funcional, capaz de usar tool-calling nativo para ler e gravar arquivos.
- O projeto destino tem código-fonte válido a ser documentado (a documentação reflete o estado atual do código).
- Permissão de escrita na raiz do projeto destino (o pacote é copiado para lá).
- Referências de apoio estão listadas na seção “Bibliografia e fontes técnicas recomendadas” do [README.md](README.md).

## Passo 1 — Copiar a pasta `padtec/` para a raiz do projeto destino

Copie a pasta `padtec/` deste pacote integralmente para a raiz do projeto que será documentado. Após a cópia, a raiz do projeto destino contém uma subpasta `padtec/` com a mesma estrutura interna do pacote original.

Não modifique o conteúdo interno da pasta `padtec/` no projeto destino antes da primeira execução. Caso pretenda ajustar o pacote para particularidades do projeto, faça isso após uma primeira geração bem-sucedida, para ter base de comparação.

## Passo 2 — Escolher o nível alvo

Decida qual dos três níveis de profundidade documental deseja produzir nesta execução:

- **L1 — Essencial.** Use quando o objetivo é dar a um novo integrante a visão mínima do sistema em poucos minutos de leitura. Saída: quatro documentos (visão geral, arquitetura, stack e glossário). Recomendado para protótipos, scripts pequenos ou primeiras versões de documentação.
- **L2 — Completo.** Use quando o sistema é de produção e precisa de documentação técnica de referência (arquitetura, modelo de domínio, interface externa, fluxos principais, operação). Saída: onze documentos de núcleo, glossário e até nove seções condicionais. Recomendado como padrão para a maioria dos sistemas em uso.
- **L3 — Aprofundado.** Use quando o sistema é crítico, tem alta rotatividade de equipe ou precisa de onboarding acelerado. Saída: quinze documentos de núcleo e até nove seções condicionais, com quick-start operacional, glossário extenso, FAQ e guia de manutenção da própria documentação. Recomendado para sistemas centrais da organização.

Critério prático de escolha: comece em L2. Promova a L3 quando o sistema tiver mais de uma equipe interagindo com ele ou quando o custo de uma decisão errada por falta de documentação for alto. Reserve L1 para projetos pequenos ou efêmeros.

## Passo 3 — Invocar o prompt mestre no ambiente de agente

Com o projeto destino aberto no ambiente do agente, abra o painel de chat do agente. No campo de mensagem, invoque o prompt mestre do PADTec apontando para o arquivo `padtec/prompts/00-mestre.md` da cópia que você fez no Passo 1. Informe explicitamente, na mesma mensagem, o nível alvo escolhido no Passo 2 (`L1`, `L2` ou `L3`).

Exemplos de mensagem aceitos pelo prompt mestre:

> "Execute o PADTec no nível L2 nesta pasta."
> "Rode o PADTec L3 e grave em `documentacao/`."
> "Gere documentação L1 e publique no Confluence."

Parâmetros opcionais na mesma mensagem: a pasta de saída (padrão: a pasta de documentação existente, ou `docs/`) e a publicação no Confluence (padrão: não).

O prompt mestre é projetado para um agente com tool-calling nativo — ou seja, o agente lerá os arquivos do projeto e do pacote diretamente. Não cole código nem conteúdo de arquivos na conversa; o agente já tem acesso ao sistema de arquivos.

## Passo 4 — Aguardar a detecção automática e a geração

Durante a execução, o agente realiza, em ordem:

1. **Detecção da variante.** Analisa a estrutura do projeto e determina qual das cinco variantes se aplica (`full-stack-web`, `backend-api`, `frontend-site`, `automacao-script`, `iac`).
2. **Detecção das capacidades.** Inspeciona dependências, configurações e código em busca de sinais técnicos das nove capacidades condicionais (banco de dados, cache, filas, autenticação, integrações externas, armazenamento, notificações, jobs agendados, multi-tenancy). Cada capacidade detectada habilita uma seção condicional adicional na geração (nos níveis L2 e L3).
3. **Geração da documentação.** Produz os arquivos previstos para o nível escolhido na pasta de saída da raiz do projeto destino: `docs/`, `documentation/` ou `documentacao/`, a que existir (ou a informada na invocação); `docs/` é criada quando nenhuma existe. O agente usa a pasta existente e preserva arquivos já presentes que não façam parte do escopo do PADTec.

Acompanhe a execução pelo chat. O agente exibe progresso seção a seção e pausa quando precisa de decisão humana. Quando uma seção do template requisita conteúdo que o agente não encontra evidência no código-fonte, o conteúdo gerado registra o marcador literal `// CARÊNCIA: não identificado no código` em vez de inventar — esse marcador é parte do contrato anti-alucinação do pacote.

## Passo 5 — Validar a saída com o checklist de QA

Ao final da geração, execute as verificações descritas em [checklist-qa.md](checklist-qa.md). O checklist combina verificações automáticas (que o próprio agente executa ao final) e verificações que o usuário deve confirmar visualmente. Cada item é objetivamente verificável (sim/não, contagem numérica ou presença/ausência de arquivo).

Quando algum item falha, peça ao agente a correção indicando o item específico do checklist. Repita até que todos os itens estejam aprovados. Apenas então considere a entrega aceita.

## Passo 6 — Publicar no Confluence (opcional)

Se a documentação for publicada no Atlassian Confluence, utilize o ferramental `confluence-mermaid-package`, mantido no repositório-fonte do PADTec em `ferramentas/confluence-mermaid-package/` — ele não integra a cópia de `padtec/`; copie-o para o projeto quando for publicar. Esse pacote converte os arquivos Markdown gerados em formato ADF (Atlassian Document Format) preservando blocos Mermaid, e oferece scripts para atualizar páginas existentes ou criar novas. O ponto de entrada operacional é [QUICKSTART.md](../ferramentas/confluence-mermaid-package/QUICKSTART.md); para instalação completa do ferramental, consulte [INSTALL.md](../ferramentas/confluence-mermaid-package/INSTALL.md).

## Após a primeira geração

A documentação gerada é propriedade do projeto destino. A partir deste ponto:

- **Atualização contínua.** Reexecute o prompt mestre quando o código sofrer alterações estruturais relevantes. O agente regenera integralmente os documentos do conjunto gerado com base no novo estado do código e não altera outros arquivos da pasta de saída.
- **Extensão do glossário.** O `glossario-base.md` do pacote é uma semente. O glossário gerado em `docs/` cresce com termos específicos do domínio do projeto.
- **Customizações.** Ajustes ao pacote para refletir particularidades do projeto destino (capacidades adicionais, convenções internas) devem ser feitos na cópia local de `padtec/`, não na cópia-fonte deste pacote.

# Checklist de QA — documentação gerada pelo PADTec

Verificações objetivas a executar sobre a documentação produzida pelo PADTec antes de declarar a entrega aceita. Cada item é binário (sim/não), uma contagem numérica ou uma checagem de presença/ausência de arquivo. Itens estão organizados em duas partes: regras duras de qualidade e verificações estruturais por nível.

Registre ao lado de cada item o resultado (aprovado ou reprovado) e, quando o item exigir contagem ou amostra, o valor observado. `<pasta-de-saída>` é a pasta de documentação resolvida pelo prompt mestre (`docs/`, `documentation/` ou `documentacao/`; padrão `docs/`).

---

## Parte A — Regras duras de qualidade

### A.1 Evidência rastreável

Toda afirmação técnica em conteúdo gerado cita `arquivo:linha` quando se refere a um ponto específico do código, ou `arquivo` quando se refere a um artefato estrutural.

- [ ] Selecionar três documentos gerados de forma aleatória.
- [ ] Em cada documento, amostrar dez afirmações técnicas (por exemplo: "o endpoint X aceita o parâmetro Y", "o serviço Z usa a estratégia W").
- [ ] Para cada afirmação amostrada, verificar a presença de uma citação `arquivo:linha` ou `arquivo` em parêntese, nota de rodapé ou link.
- [ ] Aprovado quando **trinta de trinta** afirmações têm citação. Reprovado caso contrário; registrar quantas falharam.

### A.2 Anti-alucinação

Quando o sub-prompt requisita uma seção mas o código não fornece evidência, o conteúdo gerado registra o marcador literal `// CARÊNCIA: não identificado no código` no lugar do conteúdo. Seções vazias sem o marcador são proibidas.

- [ ] Executar busca em todos os arquivos gerados: `grep -rE "^##? " <pasta-de-saída>/ | wc -l` para contar seções totais.
- [ ] Executar busca por seções com conteúdo vazio (cabeçalho seguido imediatamente por outro cabeçalho ou pelo fim do arquivo).
- [ ] Para cada seção vazia, verificar a presença do marcador `// CARÊNCIA: não identificado no código`.
- [ ] Aprovado quando **toda** seção vazia contém o marcador. Reprovado se houver seção vazia sem marcador; listar arquivos.

### A.3 Glossário mínimo

O arquivo `13-glossario.md`, gerado em todos os níveis, contém o número mínimo de termos exigido pelo nível alvo.

| Nível | Mínimo de termos |
|---|---|
| L1 | 30 |
| L2 | 60 |
| L3 | 100 |

- [ ] Executar contagem: `grep -cE "^\| [^|-]" <pasta-de-saída>/13-glossario.md` e descontar uma linha de cabeçalho por tabela (o template tem seis tabelas, uma por categoria).
- [ ] Aprovado quando a contagem é maior ou igual ao mínimo do nível alvo. Reprovado caso contrário; registrar a contagem observada.

### A.4 Cobertura exaustiva

Toda rota HTTP, endpoint, módulo, classe-controlador, entidade de persistência, fila, job e integração presentes no código aparecem em pelo menos uma tabela de algum documento gerado.

- [ ] Extrair do código a lista total de rotas HTTP (decoradores ou roteamento declarado).
- [ ] Extrair do código a lista total de classes anotadas como controlador ou equivalente.
- [ ] Extrair do código a lista total de entidades de persistência (classes anotadas como entidade, schemas, modelos).
- [ ] Extrair do código a lista total de jobs (tarefas agendadas, processadores de fila).
- [ ] Extrair do código a lista total de filas, tópicos e canais de mensageria (produtores e consumidores declarados).
- [ ] Extrair do código a lista total de integrações externas (clientes HTTP nomeados, SDKs de terceiros configurados).
- [ ] Para cada item extraído, verificar presença do nome em alguma tabela de algum arquivo `.md` em `<pasta-de-saída>/`.
- [ ] Aprovado quando **cem por cento** dos itens extraídos aparecem em tabela. Reprovado caso contrário; listar omissões.

### A.5 Versões exatas

Toda menção a versão de runtime, framework ou biblioteca-chave usa a versão exata (fixada conforme o manifesto). Ranges (`^1.2.0`, `~3.4`, `>=2`) só aparecem citados literalmente entre crases e devem vir acompanhados da versão resolvida do lockfile.

- [ ] Amostrar cinco citações de versão no documento de stack tecnológico (`03-stack-e-dependencias.md` ou equivalente).
- [ ] Para cada citação, confirmar uma de duas formas: ou é versão exata, ou é um range entre crases seguido da versão resolvida.
- [ ] Aprovado quando **cinco de cinco** citações cumprem o critério. Reprovado caso contrário.

### A.6 Sem estimativas

Conteúdo gerado não contém estimativas de tempo, custo, esforço, projeção financeira nem cronograma. O pacote documenta o sistema como ele é, não como ele será.

- [ ] Executar: `grep -irE 'estimativa|cronograma|R\$|USD|dias úteis|horas-pessoa' <pasta-de-saída>/`.
- [ ] Aprovado quando o retorno é **vazio**. Reprovado se houver qualquer ocorrência; tratar caso a caso.

### A.7 Português do Brasil e acentuação

Todo texto narrativo, título, tabela e legenda é redigido em português do Brasil, com a ortografia e a acentuação da norma-padrão. Identificadores técnicos, nomes próprios, comandos, URLs, caminhos e trechos literais de código preservam sua grafia original e não devem ser tratados como erro.

- [ ] Selecionar três documentos gerados, incluindo ao menos uma tabela e um diagrama com legenda, quando existirem.
- [ ] Ler integralmente títulos, resumos, tabelas e legendas desses documentos, procurando palavras em português sem a acentuação obrigatória ou com ortografia incompatível com o português do Brasil.
- [ ] Registrar termos técnicos, identificadores e nomes próprios que foram mantidos intencionalmente na grafia original.
- [ ] Aprovado quando não houver erro de português ou acentuação no conteúdo narrativo amostrado. Reprovado caso contrário; listar arquivo, trecho e correção necessária.

---

## Parte B — Verificações estruturais por nível

### B.1 Presença de arquivos esperados

Cada nível alvo tem um conjunto mínimo de arquivos cuja presença é obrigatória. Os nomes seguem o padrão `NN-slug-em-kebab-case.md`.

**L1 — Essencial** (três seções do núcleo e o glossário):

- [ ] `<pasta-de-saída>/01-visao-geral.md` presente.
- [ ] `<pasta-de-saída>/02-arquitetura.md` presente.
- [ ] `<pasta-de-saída>/03-stack-e-dependencias.md` presente.
- [ ] `<pasta-de-saída>/13-glossario.md` presente (gerado em todos os níveis).

**L2 — Completo:** além dos arquivos de L1,

- [ ] `<pasta-de-saída>/04-estrutura-do-projeto.md` presente.
- [ ] `<pasta-de-saída>/05-modelo-de-dominio.md` presente.
- [ ] `<pasta-de-saída>/06-fluxos-de-negocio.md` presente.
- [ ] `<pasta-de-saída>/07-interface-externa.md` presente.
- [ ] `<pasta-de-saída>/08-frontend.md` presente (apenas se a variante incluir frontend).
- [ ] `<pasta-de-saída>/09-backend.md` presente (apenas se a variante incluir backend).
- [ ] `<pasta-de-saída>/10-configuracao-e-ambientes.md` presente.
- [ ] `<pasta-de-saída>/11-infraestrutura-e-deployment.md` presente.

**L3 — Aprofundado:** além dos arquivos de L2,

- [ ] `<pasta-de-saída>/12-quick-start.md` presente.
- [ ] `<pasta-de-saída>/14-faq-e-troubleshooting.md` presente.
- [ ] `<pasta-de-saída>/15-manutencao-da-documentacao.md` presente.

**Seções condicionais (todos os níveis ≥ L2):** para cada capacidade detectada pelo agente, o arquivo `<pasta-de-saída>/condicional-<slug>.md` correspondente deve existir.
Slugs válidos (os mesmos da tabela de capacidades do `README.md`): `banco-de-dados`, `cache`, `filas-async`, `auth`, `integracoes-externas`, `storage`, `notificacoes`, `jobs-agendados`, `multi-tenancy`.

- [ ] Listar capacidades detectadas (o agente reporta ao final da execução).
- [ ] Para cada capacidade na lista, confirmar a presença do arquivo `condicional-<slug>.md`.

### B.2 Contagem de seções por documento

Documentos do núcleo seguem estrutura mínima de seções definida pelos templates. Discrepância para baixo indica geração incompleta.

- [ ] Para cada documento gerado, contar cabeçalhos de nível dois (`grep -cE "^## " <pasta-de-saída>/<arquivo>`).
- [ ] Comparar com a contagem mínima esperada do template correspondente (ver o template em `padtec/templates/nucleo/` ou `padtec/templates/condicionais/`).
- [ ] Aprovado quando a contagem é **maior ou igual** ao mínimo para todo documento. Reprovado caso contrário; listar.

### B.3 Diagramas obrigatórios

Certos documentos exigem diagramas Mermaid mínimos em todos os níveis em que existem.

- [ ] `01-visao-geral.md` contém o diagrama de contexto e `02-arquitetura.md` contém o diagrama de componentes internos (`flowchart` ou equivalente).
- [ ] `05-modelo-de-dominio.md` contém ao menos um `erDiagram` ou `classDiagram`.
- [ ] `06-fluxos-de-negocio.md` contém ao menos um `sequenceDiagram` por fluxo documentado.
- [ ] Todo arquivo condicional cujo template traz bloco Mermaid (`condicional-auth.md`, `condicional-banco-de-dados.md`, `condicional-filas-async.md`, `condicional-integracoes-externas.md`, `condicional-multi-tenancy.md`) contém o diagrama correspondente.
- [ ] Aprovado quando **todos** os diagramas mínimos estão presentes. Reprovado caso contrário; listar omissões.

### B.4 Glossário com estrutura mínima

Cada entrada do glossário ocupa uma linha de tabela com o termo na primeira coluna, a definição na segunda e, quando aplicável, exemplo de uso e evidência nas colunas seguintes.

- [ ] Amostrar dez entradas do `13-glossario.md`.
- [ ] Para cada uma, verificar presença de termo destacado e definição.
- [ ] Aprovado quando **dez de dez** entradas estão bem formadas.

---

## Procedimento de execução

1. Executar a Parte A na ordem listada. Reprovação em qualquer item da Parte A bloqueia a aceitação da entrega e exige correção pelo agente.
2. Executar a Parte B. Reprovação em itens estruturais também bloqueia.
3. Registrar o resultado de cada item ao lado da caixa de verificação. Manter o arquivo preenchido como evidência da revisão.
4. Quando todos os itens aprovados estiverem marcados, declarar a entrega aceita.

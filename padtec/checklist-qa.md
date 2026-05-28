# Checklist de QA — documentação gerada pelo PADTec

Verificações objetivas a executar sobre a documentação produzida pelo PADTec antes de declarar a entrega aceita. Cada item é binário (sim/não), uma contagem numérica ou uma checagem de presença/ausência de arquivo. Itens estão organizados em duas partes: regras-duras de qualidade e verificações estruturais por nível.

Notação: `✅` aprovado; `❌` reprovado; quando o item requer contagem ou amostra, registre o valor observado ao lado.

---

## Parte A — Regras-duras de qualidade

### A.1 Evidência rastreável

Toda afirmação técnica em conteúdo gerado cita `arquivo:linha` quando refere-se a um ponto específico do código, ou `arquivo` quando refere-se a um artefato estrutural.

- [ ] Selecionar três documentos gerados de forma aleatória.
- [ ] Em cada documento, amostrar dez afirmações técnicas (por exemplo: "o endpoint X aceita o parâmetro Y", "o serviço Z usa a estratégia W").
- [ ] Para cada afirmação amostrada, verificar a presença de uma citação `arquivo:linha` ou `arquivo` em parêntese, nota de rodapé ou link.
- [ ] Aprovado quando **trinta de trinta** afirmações têm citação. Reprovado caso contrário; registrar quantas falharam.

### A.2 Anti-alucinação

Quando o sub-prompt requisita uma seção mas o código não fornece evidência, o conteúdo gerado registra o marcador literal `// CARÊNCIA: não identificado no código` no lugar do conteúdo. Seções vazias sem o marcador são proibidas.

- [ ] Executar busca em todos os arquivos gerados: `grep -rE "^##? " docs/ | wc -l` para contar seções totais.
- [ ] Executar busca por seções com conteúdo vazio (cabeçalho seguido imediatamente por outro cabeçalho ou pelo fim do arquivo).
- [ ] Para cada seção vazia, verificar a presença do marcador `// CARÊNCIA: não identificado no código`.
- [ ] Aprovado quando **toda** seção vazia contém o marcador. Reprovado se houver seção vazia sem marcador; listar arquivos.

### A.3 Glossário mínimo

O arquivo `13-glossario.md` (ou equivalente conforme o nível) contém o número mínimo de termos exigido pelo nível alvo.

| Nível | Mínimo de termos |
|---|---|
| L1 | 30 |
| L2 | 60 |
| L3 | 100 |

- [ ] Executar contagem: `grep -cE "^- \*\*" docs/13-glossario.md` (ou padrão equivalente adotado pelo template).
- [ ] Aprovado quando a contagem é maior ou igual ao mínimo do nível alvo. Reprovado caso contrário; registrar a contagem observada.

### A.4 Cobertura exaustiva

Toda rota HTTP, endpoint, módulo, classe-controlador, entidade de persistência e job presente no código aparece em pelo menos uma tabela de algum documento gerado.

- [ ] Extrair do código a lista total de rotas HTTP (decoradores ou roteamento declarado).
- [ ] Extrair do código a lista total de classes anotadas como controlador ou equivalente.
- [ ] Extrair do código a lista total de entidades de persistência (classes anotadas como entidade, schemas, modelos).
- [ ] Extrair do código a lista total de jobs (tarefas agendadas, processadores de fila).
- [ ] Para cada item extraído, verificar presença do nome em alguma tabela de algum arquivo `.md` em `docs/`.
- [ ] Aprovado quando **cem por cento** dos itens extraídos aparecem em tabela. Reprovado caso contrário; listar omissões.

### A.5 Versões exatas

Toda menção a versão de runtime, framework ou biblioteca-chave usa a versão exata (pinada conforme o manifesto). Ranges (`^1.2.0`, `~3.4`, `>=2`) só aparecem citados literalmente entre crases e devem vir acompanhados da versão resolvida do lockfile.

- [ ] Amostrar cinco citações de versão no documento de stack tecnológico (`03-stack-e-dependencias.md` ou equivalente).
- [ ] Para cada citação, confirmar uma de duas formas: ou é versão exata, ou é um range entre crases seguido da versão resolvida.
- [ ] Aprovado quando **cinco de cinco** citações cumprem o critério. Reprovado caso contrário.

### A.6 Sem estimativas

Conteúdo gerado não contém estimativas de tempo, custo, esforço, projeção financeira nem cronograma. O pacote documenta o sistema como ele é, não como ele será.

- [ ] Executar: `grep -irE 'estimativa|cronograma|R\$|USD|dias úteis|horas-pessoa' docs/`.
- [ ] Aprovado quando o retorno é **vazio**. Reprovado se houver qualquer ocorrência; tratar caso a caso.

---

## Parte B — Verificações estruturais por nível

### B.1 Presença de arquivos esperados

Cada nível alvo tem um conjunto mínimo de arquivos cuja presença é obrigatória. Os nomes seguem o padrão `NN-slug-em-kebab-case.md`.

**L1 — Essencial:**

- [ ] `README.md` na raiz do projeto destino, atualizado pelo agente ou criado.
- [ ] `docs/01-visao-geral.md` presente.

**L2 — Completo:** além dos arquivos de L1,

- [ ] `docs/02-arquitetura.md` presente.
- [ ] `docs/03-stack-e-dependencias.md` presente.
- [ ] `docs/04-estrutura-do-projeto.md` presente.
- [ ] `docs/05-modelo-de-dominio.md` presente.
- [ ] `docs/06-fluxos-de-negocio.md` presente.
- [ ] `docs/07-interface-externa.md` presente.
- [ ] `docs/08-frontend.md` presente (apenas se a variante incluir frontend).
- [ ] `docs/09-backend.md` presente (apenas se a variante incluir backend).
- [ ] `docs/10-configuracao-e-ambientes.md` presente.
- [ ] `docs/11-infraestrutura-e-deployment.md` presente.

**L3 — Aprofundado:** além dos arquivos de L2,

- [ ] `docs/12-quick-start.md` presente.
- [ ] `docs/13-glossario.md` presente.
- [ ] `docs/14-faq-e-troubleshooting.md` presente.
- [ ] `docs/15-manutencao-da-documentacao.md` presente.

**Seções condicionais (todos os níveis ≥ L2):** para cada capacidade detectada pelo agente, o arquivo `docs/condicional-<slug>.md` correspondente deve existir.

- [ ] Listar capacidades detectadas (o agente reporta ao final da execução).
- [ ] Para cada capacidade na lista, confirmar a presença do arquivo `condicional-<slug>.md`.

### B.2 Contagem de seções por documento

Documentos do núcleo seguem estrutura mínima de seções definida pelos templates. Discrepância para baixo indica geração incompleta.

- [ ] Para cada documento gerado, contar cabeçalhos de nível dois (`grep -cE "^## " docs/<arquivo>`).
- [ ] Comparar com a contagem mínima esperada do template correspondente (ver template do nível em `padtec/templates/L<N>-*/`).
- [ ] Aprovado quando a contagem é **maior ou igual** ao mínimo para todo documento. Reprovado caso contrário; listar.

### B.3 Diagramas obrigatórios

A partir do nível L2, certos documentos exigem diagramas Mermaid mínimos.

- [ ] `02-arquitetura.md` contém ao menos um diagrama de contexto (`flowchart` ou equivalente) e um diagrama de componentes internos.
- [ ] `05-modelo-de-dominio.md` contém ao menos um `erDiagram` ou `classDiagram`.
- [ ] `06-fluxos-de-negocio.md` contém ao menos um `sequenceDiagram` por fluxo documentado.
- [ ] No nível L3, todo arquivo condicional habilitado contém ao menos um diagrama Mermaid relevante à capacidade.
- [ ] Aprovado quando **todos** os diagramas mínimos estão presentes. Reprovado caso contrário; listar omissões.

### B.4 Glossário com estrutura mínima

Cada entrada do glossário tem termo em negrito seguido de definição curta, e quando aplicável, exemplo de uso ou categoria.

- [ ] Amostrar dez entradas do `13-glossario.md`.
- [ ] Para cada uma, verificar presença de termo destacado e definição.
- [ ] Aprovado quando **dez de dez** entradas estão bem formadas.

---

## Procedimento de execução

1. Executar a Parte A na ordem listada. Reprovação em qualquer item da Parte A bloqueia a aceitação da entrega e exige correção pelo agente.
2. Executar a Parte B. Reprovação em itens estruturais também bloqueia.
3. Registrar o resultado de cada item ao lado da caixa de verificação. Manter o arquivo preenchido como evidência da revisão.
4. Quando todos os itens aprovados estiverem marcados, declarar a entrega aceita.

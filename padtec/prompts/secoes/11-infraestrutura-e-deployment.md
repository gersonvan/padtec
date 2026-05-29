# Sub-prompt PADTec — Infraestrutura e deployment

## Parâmetros recebidos do orquestrador

Este sub-prompt é invocado por `prompts/00-mestre.md` conforme o **Contrato de invocação de sub-prompts** ali definido. Assume valores resolvidos para:

- `nível` — `L1`, `L2` ou `L3`.
- `variante` — slug da variante resolvida.
- `pasta-de-saída` — caminho relativo no projeto destino onde gravar o documento gerado.
- `capacidades-ativas` — lista de slugs separados por vírgula, ou vazio.
- `modo-monorepo` — `sim` ou `não`.
- `raiz-do-projeto-destino` — caminho absoluto ou `.`.

## Template a preencher

Leia integralmente `templates/<nível-resolvido>/11-infraestrutura-e-deployment.md`, onde `<nível-resolvido>` é `L2-completo` para `L2` ou `L3-aprofundado` para `L3`. Esta seção não existe em `L1`.

## Procedimento de extração de evidências

Execute, em `raiz-do-projeto-destino`:

1. Identifique a topologia de implantação: manifestos de infraestrutura como código em `infra/`, `bicep/`, `terraform/` ou equivalente; manifestos de orquestrador de containers (`Dockerfile`, `docker-compose.yml`, manifestos de Kubernetes); declarações de plataforma serverless. Liste os recursos provisionados e a relação entre eles.
2. Identifique o pipeline de integração e entrega contínua: arquivos em `.github/workflows/`, `.gitlab-ci.yml`, `azure-pipelines.yml`, `Jenkinsfile`, equivalentes. Catalogue por etapa (lint, build, test, deploy) e por ambiente alvo.
3. Identifique os ambientes-alvo (desenvolvimento, homologação, produção) e os critérios de promoção entre eles: aprovações manuais, branches que disparam deploys, tags, ambientes nomeados em pipelines.
4. Identifique a estratégia de observabilidade em produção: configuração de logging (formato, destino), métricas exportadas, tracing distribuído, dashboards quando declarados em código.
5. Identifique o procedimento de retorno seguro a versão anterior: estratégia de rollback do pipeline, política de versionamento de artefatos de release, scripts de migração reversíveis.

## Procedimento de preenchimento

1. Para cada placeholder `<<...>>` no template, substitua pelo conteúdo correspondente extraído.
2. Para cada diretiva `<!-- IA: ... -->`, execute a diretiva e remova o comentário do documento final.
3. Quando o template pedir diagrama de topologia Mermaid, gere-o a partir dos manifestos reais.
4. Quando uma evidência requerida não puder ser localizada, registre o marcador literal `// CARÊNCIA: não identificado no código` no lugar daquela afirmação. Proibido inferir.

## Regras de qualidade aplicáveis

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas em `prompts/00-mestre.md` §vii. Para esta seção, atenção especial a:

- **Regra 1 (Evidência rastreável):** cada recurso, etapa de pipeline e ambiente cita o manifesto ou o arquivo de pipeline que o evidencia.
- **Regra 6 (Sem estimativas):** não inclua estimativas de tempo de build, janela de deploy ou prazo de rollback. Descreva o procedimento; não previsões.

## Saída esperada

Documento markdown gravado em `<pasta-de-saída>/11-infraestrutura-e-deployment.md`, com topologia descrita, pipeline catalogado por etapa, ambientes-alvo identificados, observabilidade documentada, procedimento de rollback descrito.

## Comportamento por nível

Existe apenas em `L2` e `L3`. Em `L3`, o template pode pedir detalhamento adicional (matriz pipeline × ambiente, políticas de aprovação, drift detection); siga o template. Se invocado com `nível` igual a `L1` (ou fora de `L1|L2|L3`), retorne sem produzir saída.

## Comportamento sob `modo-monorepo: sim`

Em monorepo, esta seção é tipicamente **única no workspace** (`<pasta-de-saída>/11-infraestrutura-e-deployment.md`), pois o pipeline e a infraestrutura costumam ser compartilhados. Quando há pipelines independentes por app, gere o documento adicional por app em `<pasta-de-saída>/apps/<nome-do-app>/11-infraestrutura-e-deployment.md`.

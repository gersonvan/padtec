<!--
Variante PADTec — iac.
Arquivos de variante NÃO são núcleo: podem citar exemplos de framework/biblioteca/runtime.
-->

# Variante `iac`

## 1. Identidade

Você é o prompt da variante `iac` (Infrastructure as Code) do PADTec v1.0.1. O orquestrador `00-mestre.md` invocou este prompt após detectar que o projeto destino é um **repositório de infraestrutura como código** — manifestos `*.bicep`, `*.tf`/`*.tfstate`, templates ARM, CloudFormation, ou playbooks Ansible — **sem** código aplicacional acoplado (sem `package.json` aplicacional, sem servidor longo-rodando).

Esta variante orienta a geração das seções do núcleo enfatizando **recursos provisionados**, **dependências entre recursos**, **parametrização por ambiente** e **pipeline de aplicação**.

## 2. Seções específicas que estendem o núcleo

Ênfases obrigatórias:

- `02-arquitetura.md` — o diagrama de arquitetura representa a **topologia de recursos provisionados**: rede, computação, armazenamento, banco, identidade, observabilidade, suas relações e fronteiras (escopo de implantação, grupos de recursos, projetos, contas). Inclua o **diagrama de dependências entre módulos/stacks**.
- `03-stack-e-dependencias.md` — adapte "stack" para: linguagem da IaC (Bicep, HCL Terraform, YAML CloudFormation, YAML Ansible), versão do CLI, versão dos providers/módulos importados, registry de módulos (público ou interno), provider de nuvem alvo.
- `07-interface-externa.md` — esta variante **redefine** "interface externa" como **interface de operação da infraestrutura**:
  - Tabela de **inputs/parâmetros** que a IaC aceita por ambiente (nome, tipo, propósito, valor por ambiente, evidência).
  - Tabela de **outputs** que a IaC publica (nome do output, consumidor previsto, evidência).
  - Tabela de **endpoints/resultados expostos** pelos recursos provisionados (ex.: nome DNS de uma App Service, URL de um endpoint, ARN de uma fila), correlacionados ao módulo que os provisiona.
  - Quando alguma dessas tabelas não se aplica, registre `// CARÊNCIA: não aplicável a esta variante`.
- `10-configuracao-e-ambientes.md` — inventário de **arquivos de parâmetros por ambiente** (ex.: `parameters.dev.json`, `terraform.tfvars` por workspace), variáveis usadas pela pipeline, tratamento de segredos (cofre de chaves, gerenciador de segredos), convenções de nomenclatura de recursos por ambiente.
- `11-infraestrutura-e-deployment.md` — esta seção é **central** na variante: backend de estado (quando aplicável: estado remoto Terraform, deployment stacks Bicep, change sets CloudFormation), pipeline de validação e aplicação (lint, plan/what-if, apply), política de aprovação manual, política de rollback, drift detection.

A seção `08-frontend.md` (quando presente no nível alvo) recebe `// CARÊNCIA: não aplicável a esta variante`. A seção `09-backend.md` é adaptada para descrever a **organização interna da IaC** (módulos, composição, convenções de nomenclatura interna).

Capacidades aplicáveis: nesta variante, as nove capacidades aparecem como **recursos provisionados**, não como código que as utiliza. Quando o orquestrador detectar a capacidade (ex.: módulo provisionando banco gerenciado), o sub-prompt de extensão correspondente é despachado e descreve **o recurso provisionado e seus parâmetros**, não o consumo aplicacional.

## 3. Exemplos de stack típicos

- **Bicep** (Azure, sintaxe declarativa, integração com Resource Manager e Deployment Stacks).
- **Terraform** (HCL, multi-cloud, state remoto em backend dedicado).
- **ARM templates** (JSON, Azure, legado mas ainda em uso).
- **CloudFormation** (YAML/JSON, AWS, change sets e stack sets).
- **Pulumi** (linguagens gerais — TypeScript, Python, Go, C#).
- **Ansible** (YAML, foco em configuração de hosts, complementar a IaC declarativa).
- **AWS CDK** ou **Azure CDK** (síntese para CloudFormation/ARM via linguagem geral).
- **Crossplane** (Kubernetes-native, declaração de recursos via CRDs).

Identifique a stack efetiva pelos manifestos presentes no repositório (`.bicep`, `.tf`, templates ARM, etc.) e pela pipeline de deploy.

## 4. Referências cruzadas a templates

Caminhos relativos a `padtec/`.

- `templates/L1-essencial/02-arquitetura.md` — topologia de recursos e dependências entre módulos/stacks.
- `templates/L1-essencial/03-stack-e-dependencias.md` — linguagem IaC, versões de CLI e providers, registry de módulos.
- `templates/L2-completo/07-interface-externa.md` — adaptado para inputs/outputs/endpoints expostos pela infraestrutura.
- `templates/L2-completo/10-configuracao-e-ambientes.md` — parâmetros por ambiente, segredos, convenções de nomenclatura.
- `templates/L2-completo/11-infraestrutura-e-deployment.md` — backend de estado, pipeline, aprovação, rollback, drift.
- `templates/L3-aprofundado/12-quick-start.md` — pré-requisitos (CLIs, credenciais), comando de validação local (lint, plan/what-if), comando de aplicação em ambiente de desenvolvimento.

Quando o nível alvo é `L1`, apenas `01`, `02` e `03` do núcleo são gerados; mesmo assim, `02` mostra topologia de recursos e `03` registra a stack IaC.

## 5. Modo monorepo

**Não aplicável** como caso típico. Repositórios de IaC frequentemente possuem múltiplos diretórios por ambiente ou por aplicação — trate cada conjunto como uma unidade de documentação, descrevendo a organização do repositório em `04-estrutura-do-projeto.md` (quando o nível for L2+).

## 6. Regras de qualidade

Aplicam-se integralmente as **seis regras-duras de qualidade** definidas no bloco vii do `prompts/00-mestre.md`. Não as reproduza neste arquivo nem nas saídas: o `00-mestre.md` é a referência autoritativa.

---

**Fim da variante `iac`.**

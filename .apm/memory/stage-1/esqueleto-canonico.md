# Esqueleto Canônico do Núcleo Documental — PADTec

Contrato de seções do núcleo documental consumido pelas Tasks 1.2, 2.1, 2.2 e 2.3. Define o conjunto fixo de arquivos de seção que comporão `padtec/templates/` (núcleo e condicionais), com nível mínimo de aparição, propósito e mapeamento para capacidades aplicáveis.

## Princípios

- **Naming.** Todo arquivo do núcleo obedece ao padrão `NN-slug-em-kebab-case.md`, com dois dígitos numéricos iniciais que definem ordem de leitura recomendada. Slugs em minúsculo, sem acentos, separador hífen. Arquivos de seção condicional adotam o prefixo `condicional-` seguido do slug da capacidade.
- **Níveis.** Três níveis de cobertura por documentação, com relação de inclusão `L1 ⊂ L2 ⊂ L3`. O nível mínimo registrado abaixo é o menor nível em que a seção deve existir; níveis superiores estendem a profundidade da mesma seção.
- **Independência de stack.** As seções do núcleo descrevem categorias genéricas de informação. Nomes de framework, biblioteca, runtime ou produto específico não aparecem neste arquivo nem nos templates do núcleo. Exemplos com nome de produto são reservados a `padtec/prompts/variantes/`, `padtec/prompts/extensoes/` e `padtec/templates/<nível>/condicionais/`.
- **Capacidades vinculadas.** Aplicáveis somente a seções condicionais. As nove capacidades (`banco-de-dados`, `cache`, `filas-async`, `auth`, `integracoes-externas`, `storage`, `notificacoes`, `jobs-agendados`, `multi-tenancy`) são cobertas exatamente uma vez no conjunto condicional, garantindo mapeamento completo.

---

## Núcleo — seções de cobertura universal

| Ordem | Nome do arquivo | Nível mínimo | Descrição | Capacidades vinculadas |
|---|---|---|---|---|
| 01 | `01-visao-geral.md` | L1 | Contexto do sistema, objetivo, escopo, atores principais, proposta de valor e visão de alto nível em parágrafos curtos. Primeira leitura recomendada para qualquer integrante. | — |
| 02 | `02-arquitetura.md` | L1 | Diagrama de arquitetura em camadas, fronteiras e responsabilidades de cada camada, fluxo principal de uma requisição, decisões de design e seus motivos. | — |
| 03 | `03-stack-e-dependencias.md` | L1 | Inventário tecnológico do sistema organizado por camada: linguagens, motores de execução, frameworks de aplicação, mecanismos de persistência, serviços de plataforma e bibliotecas estruturais, sempre com a versão em uso. | — |
| 04 | `04-estrutura-do-projeto.md` | L2 | Organização de diretórios do código-fonte, convenções de nomenclatura por tipo de artefato, padrão de módulo adotado e regras de fronteira entre módulos. | — |
| 05 | `05-modelo-de-dominio.md` | L2 | Entidades principais do domínio, relacionamentos e cardinalidades, invariantes de negócio e vocabulário ubíquo associado a cada entidade. | — |
| 06 | `06-fluxos-de-negocio.md` | L2 | Fluxos end-to-end dos casos de uso principais, descritos passo a passo e ilustrados por diagrama de sequência, incluindo caminhos de erro relevantes. | — |
| 07 | `07-interface-externa.md` | L2 | Contratos públicos do sistema com o mundo externo: endpoints, mensagens, eventos publicados ou consumidos, método de consumo, formato de requisição e resposta, semântica de erro. | — |
| 08 | `08-frontend.md` | L2 | Roteamento, composição de telas e páginas, padrão de gerência de estado, integração com a interface externa do sistema e estratégia de renderização adotada. | — |
| 09 | `09-backend.md` | L2 | Organização interna do backend, camadas e padrões aplicados, ciclo de vida de uma requisição, pontos de extensão e convenções de tratamento de erro. | — |
| 10 | `10-configuracao-e-ambientes.md` | L2 | Variáveis de ambiente do sistema com nome, propósito, valor padrão e ambiente onde se aplicam; perfis de execução (desenvolvimento, homologação, produção); arquivos de configuração e tratamento de segredos. | — |
| 11 | `11-infraestrutura-e-deployment.md` | L2 | Topologia de implantação, recursos de plataforma utilizados, pipeline de integração e entrega contínua, observabilidade do sistema em produção e procedimento de retorno seguro a versão anterior. | — |
| 12 | `12-quick-start.md` | L3 | Setup do zero em ambiente local: pré-requisitos, sequência de comandos de instalação e inicialização, verificação de que o sistema responde, tempo esperado de até trinta minutos. | — |
| 13 | `13-glossario.md` | L3 | Dicionário de termos técnicos e de negócio com categoria, definição curta e exemplo de uso; ordenação alfabética dentro de cada categoria. | — |
| 14 | `14-faq-e-troubleshooting.md` | L3 | Cenários comuns de erro encontrados na operação ou desenvolvimento, com sintoma, causa provável, diagnóstico e procedimento de correção. | — |
| 15 | `15-manutencao-da-documentacao.md` | L3 | Convenções de escrita adotadas, quando a documentação deve ser atualizada em função de alteração no código, checklist de qualidade por seção e governança de revisão. | — |

**Cobertura por nível.** L1: três seções (01, 02, 03). L2: oito seções adicionais (04 a 11). L3: quatro seções adicionais (12 a 15). Total núcleo: quinze seções.

---

## Núcleo — seções condicionais por capacidade

Aplicáveis apenas quando a capacidade correspondente é detectada no projeto-alvo. Cada seção condicional cobre uma capacidade exclusivamente; cada capacidade tem exatamente um arquivo associado.

| Nome do arquivo | Nível mínimo | Descrição | Capacidades vinculadas |
|---|---|---|---|
| `condicional-banco-de-dados.md` | L2 | Estratégia de persistência adotada, modelo físico, padrão de migrações, política de transações, padrões de acesso a dados e otimizações estruturais. | `banco-de-dados` |
| `condicional-cache.md` | L2 | Camadas de cache empregadas, esquema de chaves, política de tempo de vida e invalidação, métricas de acerto e perda, e estratégia diante de inconsistência transitória. | `cache` |
| `condicional-filas-async.md` | L2 | Filas e tópicos do sistema, produtores e consumidores, política de retentativa e fila de mensagens não processadas, garantias de entrega e idempotência. | `filas-async` |
| `condicional-autenticacao-e-autorizacao.md` | L2 | Modelo de identidade, fluxos de autenticação suportados, política de autorização baseada em papéis ou atributos, gestão de sessões e renovação de credenciais. | `auth` |
| `condicional-integracoes-externas.md` | L2 | Catálogo de integrações com sistemas externos, contratos consumidos, tratamento de timeout, retentativa e disjuntor, e plano de contingência por integração. | `integracoes-externas` |
| `condicional-armazenamento-de-arquivos.md` | L2 | Estratégia de armazenamento de arquivos, padrão de envio e recuperação, uso de credenciais temporárias para acesso direto, ciclo de vida e retenção. | `storage` |
| `condicional-notificacoes.md` | L2 | Canais de notificação suportados, modelo de templates, rastreamento de entrega e tratamento de falha de envio. | `notificacoes` |
| `condicional-jobs-agendados.md` | L2 | Tarefas agendadas e periódicas do sistema, gatilho e calendário de execução, observabilidade da execução, tolerância a falhas e procedimento de re-execução manual. | `jobs-agendados` |
| `condicional-multi-tenancy.md` | L2 | Modelo de isolamento por tenant, resolução do tenant na entrada de requisição, roteamento de dados por tenant, segregação de recursos compartilhados. | `multi-tenancy` |

**Cobertura de capacidades.** Nove seções condicionais para nove capacidades, mapeamento um-para-um. As nove capacidades listadas pelo plano aparecem exatamente uma vez:

- `banco-de-dados` → `condicional-banco-de-dados.md`
- `cache` → `condicional-cache.md`
- `filas-async` → `condicional-filas-async.md`
- `auth` → `condicional-autenticacao-e-autorizacao.md`
- `integracoes-externas` → `condicional-integracoes-externas.md`
- `storage` → `condicional-armazenamento-de-arquivos.md`
- `notificacoes` → `condicional-notificacoes.md`
- `jobs-agendados` → `condicional-jobs-agendados.md`
- `multi-tenancy` → `condicional-multi-tenancy.md`

---

## Resumo quantitativo

| Conjunto | Quantidade | Nível predominante |
|---|---|---|
| Núcleo universal | 15 arquivos | L2 (oito), L3 (quatro), L1 (três) |
| Núcleo condicional | 9 arquivos | L2 (nove) |
| **Total** | **24 arquivos** | — |

**Fim do esqueleto canônico.**

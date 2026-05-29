<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.
-->

# Estrutura do projeto

<!-- IA: descreva como o código-fonte está organizado em diretórios e quais convenções regem a nomenclatura. O foco é permitir que um leitor recém-chegado localize um arquivo a partir do seu propósito. Não inventar pastas — listar apenas o que existe no repositório. -->

## Árvore de diretórios de primeiro nível

<!-- IA: liste os diretórios de primeiro nível do repositório com propósito e responsável funcional. Use uma tabela enxuta. Quando um diretório for puramente de configuração, registre-o assim. -->

| Diretório | Propósito | Tipo (código, configuração, teste, automação, documentação) | Evidência |
|---|---|---|---|
| `<<CAMINHO>>` | `<<PROPOSITO>>` | `<<TIPO>>` | `<<ARQUIVO:LINHA_OU_DIRETORIO>>` |

## Convenções de nomenclatura por tipo de artefato

<!-- IA: a partir da inspeção do repositório, identifique os padrões de nomenclatura adotados por tipo de artefato (entidade, controlador, serviço, repositório, componente de interface, arquivo de teste, etc.). Cada linha deve referenciar exemplos reais por `arquivo:linha`. -->

| Tipo de artefato | Padrão observado | Exemplo no repositório |
|---|---|---|
| `<<TIPO>>` | `<<PADRAO>>` | `<<ARQUIVO:LINHA>>` |

## Padrão de módulo adotado

<!-- IA: descreva o padrão de modularização: como uma feature é organizada do ponto de vista de pastas (módulo, agregado, camada vertical, etc.). Aponte um módulo de referência no repositório como exemplo canônico (`arquivo:linha`). -->

<<DESCRICAO_DO_PADRAO_DE_MODULO>>

## Regras de fronteira entre módulos

<!-- IA: identifique e liste as regras de fronteira entre módulos: o que um módulo pode importar de outro, o que é proibido, como dependências cíclicas são tratadas. Quando essas regras estão automatizadas (via configuração de lint, regras de import), citar `arquivo:linha`. Quando não houver evidência, registrar `// CARÊNCIA: não identificado no código`. -->

| Regra | Aplicação automatizada (sim ou não) | Evidência |
|---|---|---|
| `<<REGRA>>` | `<<SIM_OU_NAO>>` | `<<ARQUIVO:LINHA>>` |

## Arquivos sensíveis e pontos de entrada

<!-- IA: liste os arquivos que servem como ponto de entrada do sistema (binários principais, manifestos de orquestração) e os arquivos sensíveis cuja modificação afeta o repositório inteiro. -->

| Arquivo | Função | Risco de modificação | Evidência |
|---|---|---|---|
| `<<CAMINHO>>` | `<<FUNCAO>>` | `<<DESCRICAO_DO_RISCO>>` | `<<ARQUIVO:LINHA>>` |

<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.
-->

# Configuração e ambientes

<!-- IA: documente as variáveis de ambiente, perfis de execução e arquivos de configuração do sistema. Cobertura 100% das variáveis de ambiente referenciadas no código. Nunca documentar valores reais de segredos — usar marcador `<segredo gerenciado externamente>`. -->

## Inventário de variáveis de ambiente

<!-- IA: liste todas as variáveis de ambiente lidas pelo sistema. Para cada uma, declare nome, propósito, valor padrão (quando houver no código), obrigatoriedade, ambientes em que se aplica e ponto de leitura. -->

| Variável | Propósito | Valor padrão | Obrigatória | Ambientes aplicáveis | Evidência |
|---|---|---|---|---|---|
| `<<NOME>>` | `<<PROPOSITO>>` | `<<VALOR_OU_VAZIO>>` | `<<SIM_OU_NAO>>` | `<<DESENV_HOMOLOG_PROD>>` | `<<ARQUIVO:LINHA>>` |

## Perfis de execução

<!-- IA: liste os perfis de execução suportados (desenvolvimento, homologação, produção, outros). Para cada perfil, descreva como ele é ativado e quais arquivos de configuração específicos se aplicam. -->

| Perfil | Modo de ativação | Arquivos de configuração específicos | Evidência |
|---|---|---|---|
| `<<NOME_DO_PERFIL>>` | `<<MODO_DE_ATIVACAO>>` | `<<ARQUIVOS>>` | `<<ARQUIVO:LINHA>>` |

## Arquivos de configuração

<!-- IA: liste todos os arquivos de configuração efetivos do sistema (manifestos, definições de ambiente, modelos de variáveis). Para cada um, registre função, escopo e ambiente em que é consumido. -->

| Arquivo | Função | Escopo | Ambiente | Evidência |
|---|---|---|---|---|
| `<<CAMINHO>>` | `<<FUNCAO>>` | `<<GLOBAL_OU_LOCAL>>` | `<<AMBIENTE>>` | `<<ARQUIVO:LINHA>>` |

## Tratamento de segredos

<!-- IA: descreva como segredos são tratados: onde são armazenados, como são injetados no processo em cada ambiente, quem tem acesso. Nunca registrar valor de segredo. Quando não houver política, registrar `// CARÊNCIA: não identificado no código`. -->

| Categoria de segredo | Origem | Mecanismo de injeção | Evidência |
|---|---|---|---|
| `<<CATEGORIA>>` | `<<COFRE_OU_VARIAVEL>>` | `<<MECANISMO>>` | `<<ARQUIVO:LINHA>>` |

## Validação de configuração na inicialização

<!-- IA: descreva se e como o sistema valida sua configuração ao subir (esquema obrigatório, verificação de presença, falha rápida). Cite o ponto de validação. -->

<<DESCRICAO_DA_VALIDACAO_DE_CONFIGURACAO>>

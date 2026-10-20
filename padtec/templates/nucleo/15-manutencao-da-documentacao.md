# Manutenção da documentação

<!-- IA: descreva como esta documentação é mantida ao longo do tempo: convenções de escrita, gatilhos de atualização, checklist de qualidade por seção e governança de revisão. Esta seção é instrumental — a IA que produz cada seção deve consultá-la antes de submeter mudanças. -->

## Convenções de escrita

<!-- IA: enumere as convenções de escrita adotadas: idioma, tom, ortografia, formatação, proibição de emojis decorativos, links internos, citação de evidências. -->

| Convenção | Regra | Exemplo |
|---|---|---|
| `<<CONVENCAO>>` | `<<REGRA>>` | `<<EXEMPLO>>` |

## Gatilhos de atualização da documentação

<!-- IA: liste as mudanças no código que disparam atualização obrigatória de seções específicas. Cada gatilho deve identificar o tipo de alteração no código, as seções afetadas e o responsável funcional pela atualização. -->

<!-- IA: registre o responsável apenas quando constar no código ou em arquivo de propriedade do repositório (por exemplo, CODEOWNERS); caso contrário, use o marcador de carência. Não registre prazos. -->

| Tipo de mudança no código | Seções afetadas | Responsável funcional | Evidência da regra |
|---|---|---|---|
| `<<TIPO_DE_MUDANCA>>` | `<<LISTA_DE_SECOES>>` | `<<RESPONSAVEL_OU_CARENCIA>>` | `<<ARQUIVO:LINHA_OU_POLITICA>>` |

## Checklist de qualidade por seção

<!-- IA: para cada seção do núcleo (`01-` a `15-`) e cada condicional, registre os critérios objetivos de aceitação. A coluna "Verificação" deve indicar o comando ou a inspeção que confirma o critério. -->

| Seção | Critério | Verificação | Severidade |
|---|---|---|---|
| `<<SECAO>>` | `<<CRITERIO>>` | `<<COMANDO_OU_INSPECAO>>` | `<<BLOQUEANTE_OU_RECOMENDADO>>` |

## Fluxo de revisão e governança

<!-- IA: gere diagrama Mermaid `flowchart LR` representando o fluxo: proposta de mudança → revisão técnica → revisão editorial → consolidação → publicação. -->

```mermaid
<<DIAGRAMA_MERMAID_FLUXO_DE_REVISAO>>
```

## Política de versionamento da documentação

<!-- IA: descreva como a documentação é versionada (vínculo com versão do código, marcadores de revisão por seção, histórico de mudanças relevantes). Quando inexistente, registrar `// CARÊNCIA: não identificado no código`. -->

<<POLITICA_DE_VERSIONAMENTO_DA_DOCUMENTACAO>>

## Auditoria de gaps documentais

<!-- IA: descreva o procedimento de auditoria periódica que identifica lacunas: rotas sem documentação, entidades sem entrada em glossário, configurações sem descrição. Mantenha o procedimento prescritivo. -->

<!-- IA: registre o responsável apenas quando constar no código ou em arquivo de propriedade do repositório (por exemplo, CODEOWNERS); caso contrário, use o marcador de carência. Não registre prazos. -->

| Categoria de gap | Detecção | Encaminhamento |
|---|---|---|
| `<<CATEGORIA>>` | `<<COMANDO_OU_CONSULTA>>` | `<<RESPONSAVEL_OU_CARENCIA>>` |

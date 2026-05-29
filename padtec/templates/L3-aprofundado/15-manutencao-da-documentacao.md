<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.
-->

# Manutenção da documentação

<!-- IA: descreva como esta documentação é mantida ao longo do tempo: convenções de escrita, gatilhos de atualização, checklist de qualidade por seção e governança de revisão. Esta seção é instrumental — a IA que produz cada seção deve consultá-la antes de submeter mudanças. -->

## Convenções de escrita

<!-- IA: enumere as convenções de escrita adotadas: idioma, tom, ortografia, formatação, uso de emojis funcionais, links internos, citação de evidências. -->

| Convenção | Regra | Exemplo |
|---|---|---|
| `<<CONVENCAO>>` | `<<REGRA>>` | `<<EXEMPLO>>` |

## Gatilhos de atualização da documentação

<!-- IA: liste as mudanças no código que disparam atualização obrigatória de seções específicas. Cada gatilho deve identificar o tipo de alteração no código, as seções afetadas e o responsável funcional pela atualização. -->

| Tipo de mudança no código | Seções afetadas | Responsável funcional | Evidência da regra |
|---|---|---|---|
| `<<TIPO_DE_MUDANCA>>` | `<<LISTA_DE_SECOES>>` | `<<RESPONSAVEL>>` | `<<ARQUIVO:LINHA_OU_POLITICA>>` |

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

| Categoria de gap | Detecção | Encaminhamento |
|---|---|---|
| `<<CATEGORIA>>` | `<<COMANDO_OU_CONSULTA>>` | `<<RESPONSAVEL_E_PRAZO_DE_TRATAMENTO>>` |

<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.
-->

# Modelo de domínio

<!-- IA: documente o modelo de domínio do sistema: entidades principais, relacionamentos com cardinalidades, invariantes de negócio e vocabulário ubíquo. Toda entidade declarada deve existir no código (entidade mapeada, classe, agregado ou estrutura equivalente). Não invente entidades. -->

## Inventário de entidades

<!-- IA: liste todas as entidades de domínio identificadas no código. Para cada uma, descreva sua responsabilidade no domínio em uma linha e cite `arquivo:linha` da definição. A tabela deve cobrir 100% das entidades — cobertura exaustiva. -->

| Entidade | Responsabilidade no domínio | Evidência |
|---|---|---|
| `<<NOME_DA_ENTIDADE>>` | `<<RESPONSABILIDADE>>` | `<<ARQUIVO:LINHA>>` |

## Relacionamentos e cardinalidades

<!-- IA: gere diagrama Mermaid `erDiagram` cobrindo todas as entidades inventariadas e seus relacionamentos com cardinalidade correta. Use vocabulário do domínio nos rótulos dos relacionamentos. Quando o número de entidades exceder doze, agrupe por subdomínio em diagramas separados e renomeie esta seção para "Relacionamentos por subdomínio". -->

```mermaid
<<DIAGRAMA_MERMAID_ERDIAGRAM_RELACIONAMENTOS>>
```

## Invariantes de negócio

<!-- IA: liste as invariantes de negócio relevantes — regras que devem ser preservadas em qualquer ponto do ciclo de vida de uma entidade. Cada invariante deve apontar o código que a impõe (validador, restrição de banco, regra de domínio). Quando a invariante existe na prática mas não está codificada, registrar `// CARÊNCIA: não identificado no código`. -->

| Invariante | Entidade afetada | Ponto de imposição | Evidência |
|---|---|---|---|
| `<<DESCRICAO_DA_INVARIANTE>>` | `<<ENTIDADE>>` | `<<CONTROLADOR_OU_DOMINIO_OU_PERSISTENCIA>>` | `<<ARQUIVO:LINHA>>` |

## Vocabulário ubíquo

<!-- IA: liste os termos do domínio com a definição usada pelo sistema (não o significado em geral, mas o significado neste sistema). Cite onde o termo é codificado (nome de classe, enum, coluna). Esta seção é insumo direto do glossário em `13-glossario.md`. -->

| Termo | Definição neste sistema | Codificação | Evidência |
|---|---|---|---|
| `<<TERMO>>` | `<<DEFINICAO_LOCAL>>` | `<<CLASSE_OU_ENUM_OU_COLUNA>>` | `<<ARQUIVO:LINHA>>` |

## Agregados e raízes

<!-- IA: quando o sistema adotar padrão de agregado, identifique as raízes de agregado e as entidades contidas em cada raiz. Quando não houver evidência desse padrão no código, registrar `// CARÊNCIA: não identificado no código` e omitir a tabela. -->

| Raiz de agregado | Entidades contidas | Invariante de agregado | Evidência |
|---|---|---|---|
| `<<RAIZ>>` | `<<LISTA_DE_ENTIDADES>>` | `<<INVARIANTE_DE_CONSISTENCIA>>` | `<<ARQUIVO:LINHA>>` |

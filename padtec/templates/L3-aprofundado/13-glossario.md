<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.
-->

# Glossário

<!-- IA: o glossário deve conter, no mínimo, 100 termos em L3, 60 em L2 e 30 em L1 (este nível). Organize por categoria (Domínio, Arquitetura, Operação, Dados, Interface, Segurança). Dentro de cada categoria, ordene alfabeticamente. Cada termo deve apontar o ponto de codificação (`arquivo:linha`) quando o termo for materializado no código. Definição local prevalece sobre definição genérica. -->

## Como ler

<!-- IA: explique em poucas linhas a estrutura do glossário, o significado das colunas e a relação com `05-modelo-de-dominio.md` (que define o vocabulário ubíquo). -->

<<NOTA_DE_USO_DO_GLOSSARIO>>

## Mapa de categorias

<!-- IA: gere diagrama Mermaid `mindmap` ou `flowchart LR` mostrando as categorias do glossário e a contagem de termos por categoria. Mantenha enxuto. -->

```mermaid
<<DIAGRAMA_MERMAID_MAPA_DE_CATEGORIAS_DO_GLOSSARIO>>
```

## Domínio

<!-- IA: termos do domínio de negócio (entidades, processos, papéis). -->

| Termo | Definição neste sistema | Exemplo de uso | Evidência |
|---|---|---|---|
| `<<TERMO>>` | `<<DEFINICAO>>` | `<<EXEMPLO>>` | `<<ARQUIVO:LINHA>>` |

## Arquitetura

<!-- IA: termos arquiteturais (camadas, módulos, padrões aplicados). -->

| Termo | Definição neste sistema | Exemplo de uso | Evidência |
|---|---|---|---|
| `<<TERMO>>` | `<<DEFINICAO>>` | `<<EXEMPLO>>` | `<<ARQUIVO:LINHA>>` |

## Dados

<!-- IA: termos relacionados à camada de dados (entidades persistidas, identificadores, chaves naturais). -->

| Termo | Definição neste sistema | Exemplo de uso | Evidência |
|---|---|---|---|
| `<<TERMO>>` | `<<DEFINICAO>>` | `<<EXEMPLO>>` | `<<ARQUIVO:LINHA>>` |

## Interface

<!-- IA: termos da interface externa (recursos, mensagens, eventos, códigos de erro nomeados). -->

| Termo | Definição neste sistema | Exemplo de uso | Evidência |
|---|---|---|---|
| `<<TERMO>>` | `<<DEFINICAO>>` | `<<EXEMPLO>>` | `<<ARQUIVO:LINHA>>` |

## Operação

<!-- IA: termos operacionais (ambientes, perfis, sinais de observabilidade, eventos de implantação). -->

| Termo | Definição neste sistema | Exemplo de uso | Evidência |
|---|---|---|---|
| `<<TERMO>>` | `<<DEFINICAO>>` | `<<EXEMPLO>>` | `<<ARQUIVO:LINHA>>` |

## Segurança

<!-- IA: termos de segurança (identidade, papel, escopo, política, segredo, cofre). -->

| Termo | Definição neste sistema | Exemplo de uso | Evidência |
|---|---|---|---|
| `<<TERMO>>` | `<<DEFINICAO>>` | `<<EXEMPLO>>` | `<<ARQUIVO:LINHA>>` |

<!--
Regras de qualidade aplicáveis a este documento:
1. Evidência rastreável: toda afirmação técnica cita `arquivo:linha` ou intervalo verificável no código-fonte.
2. Anti-alucinação: quando não houver evidência no código, registrar `// CARÊNCIA: não identificado no código` em vez de inferir.
3. Glossário mínimo conforme nível: L1 com 30 termos, L2 com 60 termos, L3 com 100 termos.
4. Cobertura exaustiva: toda rota, endpoint, módulo, entidade, fila, job ou integração documentada deve aparecer em alguma tabela.
5. Versões exatas: registrar a versão resolvida (do lockfile) sem usar ranges; quando o manifesto usar range, citar o literal do manifesto e a versão resolvida.
6. Sem estimativas de tempo, custo ou esforço: descrever procedimentos sem prazos.

Esta seção é condicional. Inclua-a na documentação do projeto somente se a capacidade `cache` for detectada. Sinais típicos: clientes Redis (`ioredis`, `node-redis`, `redis-py`), gerenciadores como `cache-manager`, decoradores de cache, anotações de cache em controladores ou serviços, métricas de acerto e perda emitidas pela aplicação.
-->

# Cache

<!-- IA: documente as camadas de cache empregadas. Esta é uma seção condicional — exemplos de produto e biblioteca específicos (por exemplo, Redis, Memcached, cache em memória do processo) são permitidos quando refletem o uso real no projeto. -->

## Camadas de cache em uso

<!-- IA: identifique cada camada de cache: cache em memória do processo, cache distribuído, cache de borda. Inclua o produto (por exemplo, Redis, Memcached, cache interno do framework), versão e biblioteca cliente. -->

| Camada | Produto | Versão | Biblioteca cliente | Versão da biblioteca | Evidência |
|---|---|---|---|---|---|
| `<<CAMADA>>` | `<<PRODUTO>>` | `<<VERSAO>>` | `<<BIBLIOTECA>>` | `<<VERSAO>>` | `<<ARQUIVO:LINHA>>` |

## Esquema de chaves

<!-- IA: descreva a convenção de nomenclatura das chaves do cache (prefixos por domínio, separadores, inclusão de identificadores de tenant ou versão). Liste exemplos reais extraídos do código. -->

| Domínio | Padrão de chave | Exemplo concreto | Evidência |
|---|---|---|---|
| `<<DOMINIO>>` | `<<PADRAO>>` | `<<EXEMPLO>>` | `<<ARQUIVO:LINHA>>` |

## Política de tempo de vida e invalidação

<!-- IA: liste o tempo de vida padrão por categoria de chave e o gatilho de invalidação (expiração natural, invalidação por evento, invalidação manual). -->

| Categoria | Tempo de vida padrão | Gatilho de invalidação | Evidência |
|---|---|---|---|
| `<<CATEGORIA>>` | `<<DURACAO>>` | `<<GATILHO>>` | `<<ARQUIVO:LINHA>>` |

## Métricas de acerto e perda

<!-- IA: descreva quais métricas são emitidas (taxa de acerto, taxa de perda, latência de leitura) e onde são consumidas. Quando inexistentes, registrar `// CARÊNCIA: não identificado no código`. -->

| Métrica | Significado | Destino | Evidência |
|---|---|---|---|
| `<<METRICA>>` | `<<SIGNIFICADO>>` | `<<COLETOR>>` | `<<ARQUIVO:LINHA>>` |

## Estratégia diante de inconsistência transitória

<!-- IA: descreva como o sistema lida com a janela de inconsistência entre cache e fonte de verdade (leitura sem cache em rotas críticas, cache aside, write-through, write-behind). -->

<<ESTRATEGIA_DE_CONSISTENCIA>>

## Tratamento de falha do cache

<!-- IA: descreva o comportamento do sistema quando o cache falha (degradação para fonte de verdade, circuito aberto, falha rápida). Cite o componente que implementa a política. -->

<<TRATAMENTO_DE_FALHA_DO_CACHE>>

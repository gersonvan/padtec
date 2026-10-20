# Guia de Mermaid para Confluence

Referência de sintaxe dos tipos de diagrama mais usados em documentação técnica, com boas práticas para páginas do Confluence. Para converter e publicar, veja o [README.md](README.md).

## Introdução

Mermaid é uma linguagem de diagramação baseada em texto. Entre as vantagens para documentação versionada:

- o diagrama é texto puro, com diff legível no controle de versão;
- não exige ferramenta gráfica;
- integra-se ao Markdown como bloco de código;
- renderiza no Confluence pela macro Mermaid for Confluence.

## Sintaxe básica

Um diagrama é um bloco de código com a linguagem `mermaid`. A primeira linha declara o tipo:

````markdown
```mermaid
TIPO
    definições
    relações
```
````

Tipos tratados neste guia: `graph`/`flowchart`, `sequenceDiagram`, `classDiagram`, `stateDiagram-v2`, `erDiagram`, `gantt`. A macro também renderiza `pie`, `journey`, `gitGraph`, `mindmap`, `timeline` e `quadrantChart`; há exemplos de todos em `examples/all-diagrams.md`.

## Tipos de diagrama

### Fluxogramas

Direções: `TD` ou `TB` (de cima para baixo), `LR` (da esquerda para a direita), `BT` e `RL`.

Formas de nó:

```mermaid
graph LR
    A[Retângulo]
    B(Arredondado)
    C([Estádio])
    D[[Sub-rotina]]
    E[(Banco de dados)]
    F((Círculo))
    G>Bandeira]
    H{Losango}
    I{{Hexágono}}
    J[/Paralelogramo/]
    K[\Paralelogramo invertido\]
    L[/Trapézio\]
    M[\Trapézio invertido/]
```

Tipos de seta:

```mermaid
graph LR
    A --> B
    C --- D
    E -.-> F
    G ==> H
    I --texto--> J
    K -.texto.-> L
    M ==texto==> N
```

Subgrafos:

````markdown
```mermaid
graph TB
    subgraph "Frontend"
        A[React]
        B[Vue]
    end

    subgraph "Backend"
        C[Node]
        D[Python]
    end

    A --> C
    B --> D
```
````

### Diagramas de sequência

Elementos principais:

````markdown
```mermaid
sequenceDiagram
    participant A as Alice
    participant B as Bob

    A->>B: Mensagem síncrona
    B-->>A: Resposta
    A-)B: Mensagem assíncrona
    B--)A: Resposta assíncrona
```
````

Recursos adicionais (numeração, ativação, alternativas, laços e notas):

````markdown
```mermaid
sequenceDiagram
    autonumber

    participant U as Usuário
    participant S as Sistema

    Note over U,S: Início da interação

    U->>S: Requisição
    activate S
    S->>S: Processa
    S-->>U: Resposta
    deactivate S

    alt Sucesso
        U->>S: Confirma
    else Erro
        U->>S: Tenta novamente
    end

    opt Opcional
        U->>S: Registra
    end

    loop Cada item
        S->>S: Processa item
    end
```
````

Tipos de seta:

- `->` linha sólida sem ponta
- `-->` linha pontilhada sem ponta
- `->>` linha sólida com ponta
- `-->>` linha pontilhada com ponta
- `-x` linha sólida com X (erro)
- `--x` linha pontilhada com X
- `-)` linha sólida assíncrona
- `--)` linha pontilhada assíncrona

### Diagramas de classes

````markdown
```mermaid
classDiagram
    class Animal {
        +String nome
        +int idade
        -String id
        #String especie
        +comer()
        +dormir()
    }

    class Cachorro {
        +String raca
        +latir()
    }

    class Gato {
        +miar()
    }

    Animal <|-- Cachorro : herda
    Animal <|-- Gato : herda
    Cachorro --> Dono : pertence a
    Dono "1" --> "*" Cachorro : possui
```
````

Visibilidade: `+` pública, `-` privada, `#` protegida, `~` de pacote.

Relações: `<|--` herança, `*--` composição, `o--` agregação, `-->` associação, `--` ligação, `..>` dependência, `..|>` realização.

Cardinalidade: `"1"` exatamente um, `"0..1"` zero ou um, `"1..*"` um ou mais, `"*"` muitos, `"n"` variável.

### Diagramas de estado

````markdown
```mermaid
stateDiagram-v2
    [*] --> Inativo

    Inativo --> Ativo : Ativar
    Ativo --> Processando : Iniciar
    Processando --> Concluído : Finalizar
    Processando --> Erro : Falhar
    Erro --> Processando : Tentar novamente
    Concluído --> [*]

    state Processando {
        [*] --> Validando
        Validando --> Executando
        Executando --> [*]
    }

    note right of Erro
        Máximo de 3 tentativas
    end note
```
````

### Diagramas entidade-relacionamento

````markdown
```mermaid
erDiagram
    CLIENTE ||--o{ PEDIDO : faz
    PEDIDO ||--|{ ITEM : contem
    PRODUTO ||--o{ ITEM : aparece_em

    CLIENTE {
        string id PK
        string nome
        string email UK "único"
    }

    PEDIDO {
        int id PK
        string cliente_id FK
        date data
        float total
    }
```
````

Cardinalidade: `||` exatamente um, `|o` zero ou um, `}|` um ou muitos, `}o` zero ou muitos.

Atributos: `PK` chave primária, `FK` chave estrangeira, `UK` chave única.

### Gráficos de Gantt

````markdown
```mermaid
gantt
    title Cronograma do projeto
    dateFormat YYYY-MM-DD

    section Planejamento
    Requisitos           :done, a1, 2026-01-01, 10d
    Design               :active, a2, after a1, 5d

    section Desenvolvimento
    Backend              :b1, after a2, 20d
    Frontend             :b2, after a2, 20d

    section Testes
    Testes unitários     :c1, after b1, 5d
    Testes de integração :c2, after c1, 7d

    section Implantação
    Homologação          :milestone, d1, after c2, 0d
    Produção             :milestone, d2, after d1, 1d
```
````

Estados: `done` concluído, `active` em andamento, `crit` crítico, `milestone` marco.

## Estilização

Cores por nó:

````markdown
```mermaid
graph LR
    A[Normal]
    B[Sucesso]
    C[Erro]
    D[Aviso]

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#9f9,stroke:#333,stroke-width:4px
    style C fill:#f99,stroke:#333,stroke-width:2px
    style D fill:#ff9,stroke:#333,stroke-width:2px
```
````

Classes de estilo reutilizáveis:

````markdown
```mermaid
graph LR
    A:::destaque --> B
    B --> C:::destaque

    classDef destaque fill:#f96,stroke:#333,stroke-width:4px
```
````

Paleta sugerida para semântica consistente entre diagramas:

```text
fill:#90EE90   verde claro, sucesso
fill:#FFB6C1   rosa claro, erro
fill:#FFD700   amarelo, aviso
fill:#87CEEB   azul claro, informação
fill:#DDA0DD   roxo claro, destaque
```

Temas (a diretiva precisa ser a primeira linha do bloco):

````markdown
```mermaid
%%{init: {'theme':'forest'}}%%
graph TD
    A[Nó] --> B[Nó]
```
````

Temas disponíveis: `default`, `forest`, `dark`, `neutral`, `base`.

## Boas práticas

Recomendado:

1. Manter cada diagrama com uma responsabilidade e no máximo 15 a 20 nós; dividir quando crescer.
2. Usar nomes descritivos nos nós (`ServicoDeUsuarios`, não `SU`).
3. Agrupar elementos relacionados em subgrafos.
4. Manter uma direção consistente (de cima para baixo ou da esquerda para a direita).
5. Usar estilo apenas para destacar o que importa, com a mesma paleta em todas as páginas.
6. Validar a sintaxe no [Mermaid Live Editor](https://mermaid.live/) antes de publicar.

Evitar:

1. Diagramas com dezenas de nós em uma única figura.
2. Abreviações que só o autor entende.
3. Misturar níveis de abstração (arquitetura de alto nível com detalhes de implementação) no mesmo diagrama.
4. Setas cruzadas em todas as direções; reordenar os nós ou usar subgrafos resolve a maioria dos casos.

## Solução de problemas

### O diagrama não renderiza

Causas prováveis: erro de sintaxe, macro Mermaid for Confluence não instalada no site, ou ADF gerado sem o nó de macro. Teste a sintaxe no Live Editor, confirme a macro com o administrador do site e gere o ADF com o conversor do pacote.

### Texto cortado ou sobreposto

Rótulos longos. Quebre o texto com aspas e `<br/>`:

````markdown
```mermaid
graph LR
    A["Este é um texto<br/>longo que precisa<br/>quebrar"]
```
````

### Setas confusas

Muitas conexões cruzadas. Reorganize a ordem de declaração dos nós ou agrupe em subgrafos.

## Exemplos práticos

### Autenticação

````markdown
```mermaid
sequenceDiagram
    autonumber
    participant U as Usuário
    participant F as Frontend
    participant B as Backend
    participant DB as Banco de dados

    U->>F: Envia credenciais
    F->>B: POST /auth/login
    B->>DB: Consulta usuário
    alt Usuário encontrado
        DB-->>B: Dados do usuário
        B->>B: Valida senha
        B-->>F: Token JWT
        F-->>U: Redireciona
    else Não encontrado
        DB-->>B: Vazio
        B-->>F: 401
        F-->>U: Credenciais inválidas
    end
```
````

### Máquina de estados de um pedido

````markdown
```mermaid
stateDiagram-v2
    [*] --> Carrinho
    Carrinho --> Checkout : Iniciar checkout
    Checkout --> AguardandoPagamento : Confirmar
    AguardandoPagamento --> Pago : Pagamento aprovado
    AguardandoPagamento --> Cancelado : Tempo esgotado
    Pago --> EmSeparacao : Processar
    EmSeparacao --> Enviado : Enviar
    Enviado --> Entregue : Entregar
    Entregue --> [*]
    Cancelado --> [*]
```
````

### Arquitetura de microsserviços

````markdown
```mermaid
graph TB
    subgraph "Clientes"
        Web[Aplicação web]
        Mobile[Aplicativo móvel]
    end

    subgraph "Borda"
        Gateway[API Gateway]
    end

    subgraph "Serviços"
        Auth[Autenticação]
        User[Usuários]
        Product[Produtos]
        Order[Pedidos]
    end

    subgraph "Dados"
        DB1[(Auth DB)]
        DB2[(Users DB)]
        DB3[(Products DB)]
        DB4[(Orders DB)]
        Cache[(Redis)]
    end

    Web --> Gateway
    Mobile --> Gateway
    Gateway --> Auth
    Gateway --> User
    Gateway --> Product
    Gateway --> Order

    Auth --> DB1
    User --> DB2
    Product --> DB3
    Order --> DB4

    User --> Cache
    Product --> Cache
```
````

## Links em nós

Nós podem apontar para URLs. A abertura do link depende da macro e das permissões do site:

````markdown
```mermaid
graph LR
    A[Documentação] --> B[API]
    click A "https://docs.exemplo.com" "Documentação"
    click B "https://api.exemplo.com" "Referência da API"
```
````

## Referências

- [Documentação do Mermaid](https://mermaid.js.org/)
- [Referência de sintaxe](https://mermaid.js.org/intro/syntax-reference.html)
- [Mermaid Live Editor](https://mermaid.live/)
- [Mermaid for Confluence](https://marketplace.atlassian.com/apps/1222792/mermaid-for-confluence)
- [Confluence REST API v2](https://developer.atlassian.com/cloud/confluence/rest/v2/intro/)

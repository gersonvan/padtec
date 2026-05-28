# 📘 Guia Completo de Mermaid para Confluence

**Tudo que você precisa saber sobre diagramas Mermaid no Confluence**

---

## 🎯 Introdução

Mermaid é uma linguagem de diagramação baseada em texto que permite criar:
- Fluxogramas
- Diagramas de sequência
- Diagramas de classes
- Diagramas ER
- Gráficos Gantt
- E muito mais!

**Vantagens:**
- ✅ Versionável (texto puro)
- ✅ Fácil de editar
- ✅ Sem ferramentas gráficas necessárias
- ✅ Integração perfeita com Markdown
- ✅ Renderização automática no Confluence

---

## 🚀 Sintaxe Básica

### Estrutura de um Diagrama

````markdown
```mermaid
TIPO
    conteúdo do diagrama
    definições
    relações
```
````

**Tipos disponíveis:**
- `graph` (fluxograma)
- `sequenceDiagram`
- `classDiagram`
- `stateDiagram-v2`
- `erDiagram`
- `gantt`
- `pie`
- `journey`
- `gitGraph`
- `mindmap`
- `timeline`
- `quadrantChart`

---

## 📊 Tipos de Diagramas Detalhados

### 1. Fluxogramas (Flowcharts)

**Direções:**
- `TD` / `TB` = Top to bottom (vertical)
- `LR` = Left to right (horizontal)
- `BT` = Bottom to top
- `RL` = Right to left

**Formas de nós:**

```mermaid
graph LR
    A[Retângulo]
    B(Arredondado)
    C([Stadium])
    D[[Subroutine]]
    E[(Database)]
    F((Círculo))
    G>Flag]
    H{Losango}
    I{{Hexágono}}
    J[/Paralelograma/]
    K[\Paralelograma invertido\]
    L[/Trapézio\]
    M[\Trapézio invertido/]
```

**Tipos de setas:**

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

**Subgrafos:**

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

---

### 2. Diagramas de Sequência

**Elementos principais:**

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

**Recursos avançados:**

````markdown
```mermaid
sequenceDiagram
    autonumber
    
    participant U as Usuário
    participant S as Sistema
    
    Note over U,S: Início da interação
    
    U->>S: Request
    activate S
    S->>S: Processa
    S-->>U: Response
    deactivate S
    
    alt Sucesso
        U->>S: Confirma
    else Erro
        U->>S: Tenta novamente
    end
    
    opt Opcional
        U->>S: Log
    end
    
    loop Cada item
        S->>S: Process
    end
```
````

**Tipos de setas:**
- `->` linha sólida sem seta
- `-->` linha pontilhada sem seta
- `->>` linha sólida com seta
- `-->>` linha pontilhada com seta
- `-x` linha sólida com X (erro)
- `--x` linha pontilhada com X
- `-)` linha sólida assíncrona
- `--)` linha pontilhada assíncrona

---

### 3. Diagramas de Classes

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

**Visibilidade:**
- `+` Public
- `-` Private
- `#` Protected
- `~` Package

**Tipos de relações:**
- `<|--` Herança
- `*--` Composição
- `o--` Agregação
- `-->` Associação
- `--` Link (linha sólida)
- `..>` Dependência
- `..|>` Realização

**Cardinalidade:**
- `"1"` exatamente um
- `"0..1"` zero ou um
- `"1..*"` um ou mais
- `"*"` muitos
- `"n"` n (variável)

---

### 4. Diagramas de Estado

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
        Máximo 3 tentativas
    end note
```
````

---

### 5. Diagramas ER (Entity-Relationship)

````markdown
```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    PRODUCT ||--o{ LINE-ITEM : ordered
    
    CUSTOMER {
        string id PK
        string name
        string email UK "unique"
    }
    
    ORDER {
        int id PK
        string customer_id FK
        date order_date
        float total
    }
```
````

**Cardinalidade:**
- `||` exatamente um
- `|o` zero ou um
- `}|` um ou muitos
- `}o` zero ou muitos

**Atributos:**
- `PK` Primary Key
- `FK` Foreign Key
- `UK` Unique Key

---

### 6. Gráficos Gantt

````markdown
```mermaid
gantt
    title Cronograma do Projeto
    dateFormat YYYY-MM-DD
    
    section Planejamento
    Requisitos           :done, a1, 2026-01-01, 10d
    Design               :active, a2, after a1, 5d
    
    section Desenvolvimento
    Backend              :b1, after a2, 20d
    Frontend             :b2, after a2, 20d
    
    section Testes
    Testes unitários     :c1, after b1, 5d
    Testes integração    :c2, after c1, 7d
    
    section Deploy
    Homologação          :milestone, d1, after c2, 0d
    Produção             :milestone, d2, after d1, 1d
```
````

**Status:**
- `done` Concluído (verde)
- `active` Em progresso (azul)
- `crit` Crítico (vermelho)
- `milestone` Marco (diamante)

---

## 🎨 Estilização e Customização

### Cores e Estilos

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

### Classes de Estilo

````markdown
```mermaid
graph LR
    A:::someclass --> B
    B --> C:::someclass
    
    classDef someclass fill:#f96,stroke:#333,stroke-width:4px
```
````

### Cores Pré-definidas

```css
/* Cores comuns */
fill:#90EE90  /* Verde claro - Sucesso */
fill:#FFB6C1  /* Rosa claro - Erro */
fill:#FFD700  /* Amarelo - Aviso */
fill:#87CEEB  /* Azul claro - Info */
fill:#DDA0DD  /* Roxo claro - Destaque */
```

---

## 💡 Dicas e Boas Práticas

### ✅ DO - Faça

1. **Mantenha diagramas simples**
   - Máximo 15-20 nós por diagrama
   - Se ficar muito grande, divida em múltiplos diagramas

2. **Use nomes descritivos**
   ```mermaid
   graph LR
       UserService --> DatabaseConnection
       DatabaseConnection --> PostgreSQL
   ```

3. **Adicione notas explicativas**
   ```mermaid
   graph TD
       A[Processo] --> B[Validação]
       note right of B: Valida contra regex
   ```

4. **Agrupe elementos relacionados**
   ```mermaid
   graph TB
       subgraph "Camada de Apresentação"
           A[Controller]
       end
       subgraph "Camada de Negócio"
           B[Service]
       end
   ```

5. **Use estilos para destacar**
   ```mermaid
   graph LR
       A[Input] --> B{Valid?}
       B -->|Yes| C[Process]
       B -->|No| D[Error]
       style D fill:#f99
   ```

### ❌ DON'T - Não faça

1. **Não crie diagramas muito complexos**
   ```
   ❌ 50+ nós em um único diagrama
   ✅ Múltiplos diagramas menores e focados
   ```

2. **Não use abreviações obscuras**
   ```
   ❌ graph LR; USR --> DB
   ✅ graph LR; UserService --> Database
   ```

3. **Não misture conceitos**
   ```
   ❌ Misturar arquitetura de alto nível com detalhes de implementação
   ✅ Um diagrama para arquitetura, outro para implementação
   ```

4. **Não ignore a direção**
   ```
   ❌ Setas indo em todas as direções (confuso)
   ✅ Fluxo consistente (top-down ou left-right)
   ```

---

## 🔧 Troubleshooting

### Problema: Diagrama não renderiza

**Possíveis causas:**
1. Sintaxe incorreta
2. Macro não instalado
3. ADF estruturado incorretamente

**Soluções:**
1. Teste no [Mermaid Live Editor](https://mermaid.live/)
2. Instale [Mermaid for Confluence](https://marketplace.atlassian.com/apps/1222792/)
3. Use o conversor deste pacote

---

### Problema: Texto cortado ou sobreposto

**Causa:** Nomes muito longos

**Solução:** Use quebras de linha ou abreviações
```mermaid
graph LR
    A["Este é um texto
    muito longo que
    precisa quebrar"]
```

---

### Problema: Setas confusas

**Causa:** Muitas conexões cruzadas

**Solução:** Reorganize a ordem dos nós ou use subgrafos

---

## 📚 Exemplos Práticos

### Sistema de Autenticação

````markdown
```mermaid
sequenceDiagram
    autonumber
    participant U as Usuário
    participant F as Frontend
    participant B as Backend
    participant DB as Database
    
    U->>F: Submete login
    F->>B: POST /auth/login
    B->>DB: SELECT * FROM users
    alt Usuário encontrado
        DB-->>B: User data
        B->>B: Valida senha
        B-->>F: JWT token
        F-->>U: Redireciona
    else Não encontrado
        DB-->>B: Null
        B-->>F: 401 Unauthorized
        F-->>U: Erro: Credenciais inválidas
    end
```
````

---

### Máquina de Estados de Pedido

````markdown
```mermaid
stateDiagram-v2
    [*] --> Carrinho
    Carrinho --> Checkout : Iniciar checkout
    Checkout --> AguardandoPagamento : Confirmar
    AguardandoPagamento --> Pago : Pagamento OK
    AguardandoPagamento --> Cancelado : Timeout
    Pago --> EmSeparacao : Processar
    EmSeparacao --> Enviado : Enviar
    Enviado --> Entregue : Entregar
    Entregue --> [*]
    Cancelado --> [*]
```
````

---

### Arquitetura de Microserviços

````markdown
```mermaid
graph TB
    subgraph "Client Layer"
        Web[Web App]
        Mobile[Mobile App]
    end
    
    subgraph "API Layer"
        Gateway[API Gateway<br/>Kong]
    end
    
    subgraph "Service Layer"
        Auth[Auth Service]
        User[User Service]
        Product[Product Service]
        Order[Order Service]
    end
    
    subgraph "Data Layer"
        DB1[(Auth DB)]
        DB2[(User DB)]
        DB3[(Product DB)]
        DB4[(Order DB)]
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

---

## 🌟 Recursos Avançados

### Links Clicáveis

````markdown
```mermaid
graph LR
    A[Docs] --> B[API]
    click A "https://docs.example.com" "Documentação"
    click B "https://api.example.com" "API Reference"
```
````

### Callbacks (Interatividade)

````markdown
```mermaid
graph LR
    A[Click me] --> B[Result]
    click A callback "alert('Clicked!')"
```
````

### Temas

````markdown
```mermaid
%%{init: {'theme':'forest'}}%%
graph TD
    A[Node] --> B[Node]
```
````

**Temas disponíveis:**
- `default`
- `forest`
- `dark`
- `neutral`
- `base`

---

## 📖 Referências

### Documentação Oficial
- **Mermaid:** https://mermaid.js.org/
- **Sintaxe:** https://mermaid.js.org/intro/syntax-reference.html
- **Exemplos:** https://mermaid.js.org/ecosystem/tutorials.html

### Ferramentas Úteis
- **Live Editor:** https://mermaid.live/
- **VS Code Extension:** Markdown Preview Mermaid Support
- **IntelliJ Plugin:** Mermaid

### Confluence
- **Macro:** https://marketplace.atlassian.com/apps/1222792/
- **Confluence API:** https://developer.atlassian.com/cloud/confluence/

---

## ✨ Próximos Passos

1. **Pratique:** Use o [Live Editor](https://mermaid.live/)
2. **Explore:** Teste todos os tipos de diagramas
3. **Documente:** Crie diagramas para seu projeto
4. **Compartilhe:** Ensine sua equipe

---

**Autor:** Documentação baseada na experiência do projeto Unigrande  
**Versão:** 1.0  
**Data:** Fevereiro 2026

*Happy Diagramming!* 🎨📊✨

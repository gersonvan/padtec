# Arquitetura de Microserviços - Sistema de E-commerce

## Visão Geral

Documentação técnica da arquitetura de microserviços do sistema de e-commerce.

---

## Arquitetura Geral

```mermaid
graph TB
    subgraph "Cliente"
        WEB[Web App]
        MOBILE[Mobile App]
    end
    
    subgraph "API Gateway"
        GATEWAY[Kong API Gateway]
    end
    
    subgraph "Microserviços"
        AUTH[Auth Service]
        USER[User Service]
        PRODUCT[Product Service]
        ORDER[Order Service]
        PAYMENT[Payment Service]
        NOTIFICATION[Notification Service]
    end
    
    subgraph "Dados"
        DB1[(Auth DB)]
        DB2[(Users DB)]
        DB3[(Products DB)]
        DB4[(Orders DB)]
        CACHE[(Redis Cache)]
    end
    
    subgraph "Mensageria"
        QUEUE[RabbitMQ]
    end
    
    subgraph "Infraestrutura"
        MONITOR[Prometheus]
        LOG[ELK Stack]
    end
    
    WEB --> GATEWAY
    MOBILE --> GATEWAY
    
    GATEWAY --> AUTH
    GATEWAY --> USER
    GATEWAY --> PRODUCT
    GATEWAY --> ORDER
    GATEWAY --> PAYMENT
    
    AUTH --> DB1
    USER --> DB2
    PRODUCT --> DB3
    ORDER --> DB4
    
    PRODUCT --> CACHE
    USER --> CACHE
    
    ORDER --> QUEUE
    PAYMENT --> QUEUE
    QUEUE --> NOTIFICATION
    
    AUTH -.-> MONITOR
    USER -.-> MONITOR
    PRODUCT -.-> MONITOR
    ORDER -.-> MONITOR
    PAYMENT -.-> MONITOR
    
    AUTH -.-> LOG
    USER -.-> LOG
    PRODUCT -.-> LOG
    ORDER -.-> LOG
    PAYMENT -.-> LOG
```

---

## Fluxo de Checkout

```mermaid
sequenceDiagram
    autonumber
    participant U as Usuário
    participant F as Frontend
    participant G as API Gateway
    participant A as Auth Service
    participant O as Order Service
    participant P as Payment Service
    participant N as Notification Service
    participant Q as Queue
    
    U->>F: Clica "Finalizar Compra"
    F->>G: POST /orders/checkout
    
    Note over G: Valida token JWT
    G->>A: Verifica autenticação
    A-->>G: Token válido
    
    G->>O: Cria pedido
    O->>O: Valida estoque
    O->>O: Calcula total
    O-->>G: Order ID criado
    
    G->>P: Processa pagamento
    P->>P: Valida cartão
    P->>P: Processa transação
    P-->>G: Pagamento aprovado
    
    G-->>F: 201 Created
    F-->>U: Mostra confirmação
    
    P->>Q: Publica evento payment.approved
    Q->>O: Atualiza status do pedido
    Q->>N: Envia email de confirmação
    
    N->>U: Email: "Pedido confirmado"
```

---

## Modelo de Dados

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : references
    ORDER ||--|| PAYMENT : has
    ORDER ||--o{ SHIPMENT : has
    
    USER {
        uuid id PK
        string email UK
        string name
        string password_hash
        datetime created_at
        boolean active
    }
    
    PRODUCT {
        uuid id PK
        string sku UK
        string name
        text description
        decimal price
        int stock
        uuid category_id FK
        boolean active
    }
    
    ORDER {
        uuid id PK
        uuid user_id FK
        datetime created_at
        string status
        decimal subtotal
        decimal shipping
        decimal total
    }
    
    ORDER_ITEM {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        int quantity
        decimal unit_price
        decimal total
    }
    
    PAYMENT {
        uuid id PK
        uuid order_id FK
        string method
        string status
        decimal amount
        datetime processed_at
        string transaction_id UK
    }
    
    SHIPMENT {
        uuid id PK
        uuid order_id FK
        string tracking_code UK
        string status
        datetime shipped_at
        datetime delivered_at
    }
```

---

## Estados do Pedido

```mermaid
stateDiagram-v2
    [*] --> Criado
    
    Criado --> AguardandoPagamento : Iniciar pagamento
    AguardandoPagamento --> Pago : Pagamento aprovado
    AguardandoPagamento --> Cancelado : Pagamento recusado
    AguardandoPagamento --> Cancelado : Timeout (30 min)
    
    Pago --> EmSeparacao : Processar pedido
    EmSeparacao --> Enviado : Iniciar envio
    
    Enviado --> EmTransito : Em rota de entrega
    EmTransito --> Entregue : Confirmar entrega
    EmTransito --> ProblemaNaEntrega : Falha na entrega
    
    ProblemaNaEntrega --> EmTransito : Tentar novamente
    ProblemaNaEntrega --> Devolvido : 3 tentativas falhadas
    
    Entregue --> [*]
    Devolvido --> Reembolsado : Processar reembolso
    Reembolsado --> [*]
    Cancelado --> [*]
    
    note right of AguardandoPagamento
        Timeout: 30 minutos
        sem confirmação
    end note
    
    note right of ProblemaNaEntrega
        Máximo 3 tentativas
        de entrega
    end note
```

---

## Hierarquia de Serviços

```mermaid
classDiagram
    class BaseService {
        <<abstract>>
        +Logger logger
        +Config config
        +initialize()
        +shutdown()
        +healthCheck()
    }
    
    class AuthService {
        -JWTManager jwt
        -PasswordHasher hasher
        +login(credentials)
        +logout(token)
        +refreshToken(token)
        +validateToken(token)
    }
    
    class UserService {
        -UserRepository repo
        -CacheManager cache
        +createUser(data)
        +updateUser(id, data)
        +getUser(id)
        +deleteUser(id)
    }
    
    class OrderService {
        -OrderRepository repo
        -EventPublisher events
        +createOrder(data)
        +updateOrderStatus(id, status)
        +getOrder(id)
        +cancelOrder(id)
    }
    
    class PaymentService {
        -PaymentGateway gateway
        -EventPublisher events
        +processPayment(order)
        +refundPayment(payment)
        +getPaymentStatus(id)
    }
    
    class NotificationService {
        -EmailProvider email
        -SMSProvider sms
        -EventConsumer consumer
        +sendEmail(recipient, template)
        +sendSMS(phone, message)
        +processEvent(event)
    }
    
    BaseService <|-- AuthService
    BaseService <|-- UserService
    BaseService <|-- OrderService
    BaseService <|-- PaymentService
    BaseService <|-- NotificationService
```

---

## Cronograma de Implementação

```mermaid
gantt
    title Roadmap de Desenvolvimento - E-commerce Microservices
    dateFormat YYYY-MM-DD
    
    section Fase 1 - Base
    Setup infraestrutura       :a1, 2026-02-01, 10d
    API Gateway                :a2, after a1, 7d
    Auth Service               :a3, after a1, 10d
    User Service               :a4, after a3, 10d
    
    section Fase 2 - Core
    Product Service            :b1, after a4, 14d
    Order Service              :b2, after b1, 14d
    Payment Service            :b3, after b2, 14d
    
    section Fase 3 - Features
    Notification Service       :c1, after b3, 10d
    Search Service             :c2, after c1, 14d
    Recommendation Service     :c3, after c2, 14d
    
    section Fase 4 - Observability
    Monitoring (Prometheus)    :d1, after b1, 7d
    Logging (ELK)              :d2, after d1, 7d
    Tracing (Jaeger)           :d3, after d2, 7d
    
    section Fase 5 - Testes & Deploy
    Testes de integração       :e1, after c3, 14d
    Testes de carga            :e2, after e1, 7d
    Deploy homologação         :milestone, e3, after e2, 0d
    Testes de aceitação        :e4, after e3, 10d
    Deploy produção            :milestone, e5, after e4, 0d
```

---

## Tecnologias Utilizadas

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| **Runtime** | Node.js | 20.x |
| **Framework** | NestJS | 10.x |
| **API Gateway** | Kong | 3.x |
| **Banco de Dados** | PostgreSQL | 15.x |
| **Cache** | Redis | 7.x |
| **Mensageria** | RabbitMQ | 3.12 |
| **Monitoring** | Prometheus + Grafana | Latest |
| **Logging** | ELK Stack | 8.x |
| **Containerização** | Docker | 24.x |
| **Orquestração** | Kubernetes | 1.28 |

---

## Padrões de Comunicação

### Síncrona (REST)
- User → Auth Service
- Frontend → API Gateway
- Gateway → Microserviços

### Assíncrona (Message Queue)
- Payment → Notification
- Order → Inventory
- Audit events

---

## Próximos Passos

1. ✅ Implementar Auth Service
2. ✅ Implementar User Service
3. 🔄 Implementar Product Service
4. ⏳ Implementar Order Service
5. ⏳ Implementar Payment Service
6. ⏳ Setup monitoring
7. ⏳ Testes de carga

---

**Documentado por:** Equipe de Arquitetura  
**Última atualização:** Fevereiro 2026  
**Versão:** 2.0

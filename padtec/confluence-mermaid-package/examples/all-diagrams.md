# Guia Completo de Diagramas Mermaid

Exemplos de todos os tipos de diagramas Mermaid suportados.

---

## 1. Fluxograma (Flowchart)

```mermaid
graph TD
    A[Início] --> B{Usuário autenticado?}
    B -->|Sim| C[Dashboard]
    B -->|Não| D[Página de Login]
    D --> E[Submete credenciais]
    E --> F{Válido?}
    F -->|Sim| C
    F -->|Não| G[Erro: Credenciais inválidas]
    G --> D
    C --> H[Fim]
```

---

## 2. Diagrama de Sequência

```mermaid
sequenceDiagram
    autonumber
    participant U as Usuário
    participant F as Frontend
    participant API as API Gateway
    participant Auth as Auth Service
    participant DB as Database
    
    U->>F: Clica em "Login"
    F->>API: POST /auth/login
    API->>Auth: Valida credenciais
    Auth->>DB: SELECT * FROM users
    DB-->>Auth: User data
    Auth-->>API: JWT Token
    API-->>F: 200 OK + Token
    F->>F: Salva no localStorage
    F-->>U: Redireciona para /dashboard
```

---

## 3. Diagrama de Classes

```mermaid
classDiagram
    class Usuario {
        +String id
        +String nome
        +String email
        +String senha
        +Date criadoEm
        +login()
        +logout()
        +atualizarPerfil()
    }
    
    class Produto {
        +String id
        +String nome
        +String descricao
        +Number preco
        +Number estoque
        +calcularDesconto()
        +verificarDisponibilidade()
    }
    
    class Pedido {
        +String id
        +Date data
        +String status
        +Number total
        +calcularTotal()
        +processar()
        +cancelar()
    }
    
    class ItemPedido {
        +String id
        +Number quantidade
        +Number precoUnitario
        +calcularSubtotal()
    }
    
    Usuario "1" --> "*" Pedido : faz
    Pedido "1" --> "*" ItemPedido : contém
    Produto "1" --> "*" ItemPedido : referencia
```

---

## 4. Diagrama de Estado

```mermaid
stateDiagram-v2
    [*] --> Rascunho
    
    Rascunho --> EmRevisao : Submeter
    EmRevisao --> Aprovado : Aprovar
    EmRevisao --> Rejeitado : Rejeitar
    EmRevisao --> Rascunho : Devolver
    
    Rejeitado --> Rascunho : Editar
    Rejeitado --> [*] : Arquivar
    
    Aprovado --> Publicado : Publicar
    Publicado --> Arquivado : Arquivar
    Arquivado --> [*]
    
    note right of EmRevisao
        Aguardando aprovação
        do gerente
    end note
```

---

## 5. Diagrama ER (Entity-Relationship)

```mermaid
erDiagram
    CLIENTE ||--o{ PEDIDO : faz
    PEDIDO ||--|{ ITEM_PEDIDO : contem
    PRODUTO ||--o{ ITEM_PEDIDO : referencia
    CATEGORIA ||--o{ PRODUTO : agrupa
    ENDERECO }o--|| CLIENTE : tem
    
    CLIENTE {
        uuid id PK
        string nome
        string email UK
        string cpf UK
        datetime criado_em
        boolean ativo
    }
    
    PEDIDO {
        uuid id PK
        uuid cliente_id FK
        datetime data
        string status
        decimal total
        datetime criado_em
    }
    
    PRODUTO {
        uuid id PK
        uuid categoria_id FK
        string nome
        text descricao
        decimal preco
        int estoque
        boolean ativo
    }
    
    CATEGORIA {
        uuid id PK
        string nome
        string slug UK
        int ordem
    }
    
    ITEM_PEDIDO {
        uuid id PK
        uuid pedido_id FK
        uuid produto_id FK
        int quantidade
        decimal preco_unitario
    }
    
    ENDERECO {
        uuid id PK
        uuid cliente_id FK
        string rua
        string cidade
        string estado
        string cep
        boolean principal
    }
```

---

## 6. Gráfico de Gantt

```mermaid
gantt
    title Cronograma do Projeto Site Institucional
    dateFormat YYYY-MM-DD
    
    section Planejamento
    Levantamento de requisitos    :a1, 2026-01-01, 14d
    Prototipação                   :a2, after a1, 10d
    Aprovação do design            :milestone, a3, after a2, 0d
    
    section Desenvolvimento
    Setup do ambiente              :b1, after a2, 5d
    Desenvolvimento Frontend       :b2, after b1, 30d
    Desenvolvimento Backend        :b3, after b1, 30d
    Integração                     :b4, after b2, 10d
    
    section Testes
    Testes unitários               :c1, after b3, 7d
    Testes de integração           :c2, after b4, 7d
    Testes de aceitação            :c3, after c2, 5d
    
    section Deploy
    Deploy em homologação          :milestone, d1, after c3, 0d
    Correções                      :d2, after d1, 10d
    Deploy em produção             :milestone, d3, after d2, 0d
```

---

## 7. Gráfico de Pizza (Pie Chart)

```mermaid
pie title Distribuição de Tráfego por Dispositivo
    "Desktop" : 45
    "Mobile" : 35
    "Tablet" : 15
    "Outros" : 5
```

---

## 8. Jornada do Usuário (User Journey)

```mermaid
journey
    title Jornada de Compra Online
    
    section Descoberta
      Pesquisa no Google: 3: Cliente
      Visita o site: 4: Cliente
      Navega produtos: 5: Cliente
      
    section Avaliação
      Lê descrição: 4: Cliente
      Vê fotos: 5: Cliente
      Lê avaliações: 4: Cliente
      Compara preços: 3: Cliente
      
    section Decisão
      Adiciona ao carrinho: 5: Cliente
      Calcula frete: 4: Cliente, Sistema
      Escolhe pagamento: 4: Cliente
      
    section Compra
      Preenche dados: 3: Cliente
      Confirma pedido: 5: Cliente, Sistema
      Recebe confirmação: 5: Cliente
      
    section Pós-venda
      Acompanha entrega: 4: Cliente, Sistema
      Recebe produto: 5: Cliente
      Avalia compra: 5: Cliente
```

---

## 9. Git Graph

```mermaid
gitGraph
    commit id: "Initial commit"
    commit id: "Add README"
    branch develop
    checkout develop
    commit id: "Setup project"
    commit id: "Add auth module"
    branch feature/user-profile
    checkout feature/user-profile
    commit id: "Create profile page"
    commit id: "Add edit form"
    checkout develop
    merge feature/user-profile
    commit id: "Update tests"
    checkout main
    merge develop tag: "v1.0.0"
    commit id: "Hotfix: fix login bug"
```

---

## 10. Mindmap

```mermaid
mindmap
  root((Projeto Web))
    Frontend
      React
        Components
        Hooks
        Context API
      Next.js
        SSR
        Routing
      Tailwind CSS
    Backend
      Node.js
      NestJS
        Modules
        Controllers
        Services
      TypeORM
    Infrastructure
      AWS
        EC2
        S3
        RDS
      Docker
      CI/CD
```

---

## 11. Timeline

```mermaid
timeline
    title História do Projeto
    2024-Q1 : Concepção do projeto
            : Formação da equipe
    2024-Q2 : Prototipação
            : Aprovação do orçamento
    2024-Q3 : Início desenvolvimento
            : Sprint 1-5
    2024-Q4 : Beta testing
            : Ajustes finais
    2025-Q1 : Lançamento oficial
            : Versão 1.0
    2025-Q2 : Feature updates
            : Versão 1.5
    2026-Q1 : Major release
            : Versão 2.0
```

---

## 12. Quadrantes

```mermaid
quadrantChart
    title Priorização de Features
    x-axis Baixo Esforço --> Alto Esforço
    y-axis Baixo Impacto --> Alto Impacto
    quadrant-1 Fazer Primeiro
    quadrant-2 Estratégico
    quadrant-3 Evitar
    quadrant-4 Fazer Depois
    
    Dashboard: [0.8, 0.9]
    Autenticação: [0.7, 0.95]
    Notificações: [0.3, 0.7]
    Relatórios: [0.6, 0.8]
    Dark Mode: [0.2, 0.3]
    Exportação PDF: [0.5, 0.5]
    Chat Interno: [0.7, 0.6]
    Multi-idioma: [0.8, 0.4]
```

---

## Dicas de Uso

1. **Simplicidade**: Mantenha diagramas simples e focados
2. **Cores**: Use estilos para destacar elementos importantes
3. **Legendas**: Adicione notas explicativas quando necessário
4. **Tamanho**: Evite diagramas muito grandes (max 20-25 nós)
5. **Consistência**: Use nomenclatura consistente

---

**Referências:**
- [Documentação Oficial Mermaid](https://mermaid.js.org/)
- [Mermaid Live Editor](https://mermaid.live/)
- [Confluence Mermaid Macro](https://marketplace.atlassian.com/apps/1222792/)

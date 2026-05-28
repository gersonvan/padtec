# 🚀 Instalação Rápida

## Para Novos Projetos

### 1. Copie o pacote (5 segundos)

```bash
# Windows PowerShell
Copy-Item -Recurse "C:\Projetos AVP\SiteUnigrande\confluence-mermaid-package" "C:\Seu\Novo\Projeto\"

# Linux/Mac
cp -r "/caminho/confluence-mermaid-package" "/seu/novo/projeto/"
```

### 2. Configure credenciais (2 minutos)

```bash
cd seu-novo-projeto/confluence-mermaid-package
cp config.template.js config.js
```

Edite `config.js` e preencha:
- **email**: seu-email@dominio.com
- **token**: [Gere aqui](https://id.atlassian.com/manage-profile/security/api-tokens)
- **cloudId**: `2045e6ff-7af5-435c-ad95-082238314feb` (exemplo)
- **spaceId**: `917506` (exemplo)

### 3. Pronto! Use agora (30 segundos)

```bash
# Criar documento
echo "# Minha Documentação" > documento.md

# Adicionar diagrama
echo '```mermaid' >> documento.md
echo 'graph TD' >> documento.md
echo '    A[Início] --> B[Fim]' >> documento.md
echo '```' >> documento.md

# Converter
node scripts/convert-md-to-adf.js documento.md

# Publicar (substitua 123456 pelo ID da sua página)
node scripts/update-confluence-page.js -p 123456 -a documento.adf.json
```

**🎉 Feito!** Sua página está atualizada com Mermaid renderizado.

---

## Comandos Essenciais

```bash
# Converter arquivo único
node scripts/convert-md-to-adf.js arquivo.md

# Converter diretório inteiro
node scripts/convert-md-to-adf.js meus-docs/

# Atualizar página única
node scripts/update-confluence-page.js -p 123456 -a arquivo.adf.json

# Atualizar múltiplas páginas (configure PAGE_MAPPING primeiro)
node scripts/batch-update-pages.js
```

---

## Estrutura do Projeto

```
seu-projeto/
├── confluence-mermaid-package/
│   ├── config.js              ← Suas credenciais (criar)
│   ├── scripts/               ← Scripts Node.js
│   ├── examples/              ← Exemplos de uso
│   └── docs/                  ← Documentação completa
└── documentacao/
    ├── arquivo1.md            ← Seus documentos
    ├── arquivo2.md
    └── .adf-output/           ← ADF gerados (auto)
        ├── arquivo1.adf.json
        └── arquivo2.adf.json
```

---

## Troubleshooting Rápido

### ❌ "config.js não encontrado"
```bash
cp config.template.js config.js
# Edite config.js com suas credenciais
```

### ❌ "401 Unauthorized"
- Token expirou → Gere novo em: https://id.atlassian.com/manage-profile/security/api-tokens
- Atualize em `config.js`

### ❌ Mermaid não renderiza
- Instale o macro: https://marketplace.atlassian.com/apps/1222792/

---

## Documentação Completa

- **README.md** - Documentação completa (6000+ palavras)
- **QUICKSTART.md** - Guia rápido de 15 minutos
- **MERMAID-GUIDE.md** - Guia completo de Mermaid
- **CHANGELOG.md** - Histórico de mudanças

---

## Suporte

**Problemas?** Veja:
1. README.md (seção Troubleshooting)
2. QUICKSTART.md (problemas comuns)
3. examples/ (exemplos funcionais)

---

**Tempo total:** ~8 minutos  
**Dificuldade:** ⭐☆☆☆☆ (Muito fácil)

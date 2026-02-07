# 👗 Moda Feminina - Loja Online

Sistema completo de vitrine para loja de roupas femininas com Firebase, design profissional (ShadCN UI) e integração com WhatsApp.

## ✨ Características

### 🎨 Design Profissional
- ✅ **ShadCN UI** - Design system moderno e acessível
- ✅ **Radix UI** - Componentes primitivos de alta qualidade
- ✅ **Tailwind CSS** - Estilização utilitária
- ✅ **Responsivo** - Funciona perfeitamente em mobile, tablet e desktop

### 🛍️ Funcionalidades
- ✅ **Vitrine de produtos** com filtros por categoria e busca
- ✅ **Badges para tamanhos** (não mais texto simples)
- ✅ **Multi-select intuitivo** para tamanhos no admin
- ✅ **Select único** para categorias
- ✅ **Formatação automática de preços** (100 → 100,00)
- ✅ **Upload de imagens** para Firebase Storage
- ✅ **Integração com WhatsApp** - Mensagem personalizada por produto
- ✅ **Painel admin protegido** com autenticação Firebase

### 🔥 Firebase
- ✅ **Firestore** - Banco de dados em tempo real
- ✅ **Storage** - Armazenamento de imagens
- ✅ **Authentication** - Login seguro de administradores
- ✅ **Performance** - Carregamento rápido (~200-300ms)

---

## 🚀 Começando

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Firebase

Siga o guia completo em **`SETUP-GUIDE.md`**

Resumo:
1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Ative **Firestore Database**
3. Ative **Storage**
4. Ative **Authentication** (Email/Senha)
5. Crie um usuário admin
6. Copie as credenciais

### 3. Configurar Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o .env e cole suas credenciais do Firebase
nano .env  # ou use seu editor preferido
```

Cole suas credenciais:
```env
VITE_FIREBASE_API_KEY=sua_chave_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
# ... etc
```

### 4. Rodar Localmente

```bash
npm run dev
```

Acesse: `http://localhost:5173`

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes ShadCN (button, input, etc)
│   ├── layout/          # Header e Footer
│   ├── FilterBar.tsx    # Filtros de categoria e busca
│   ├── ProductCard.tsx  # Card de produto
│   ├── ProductForm.tsx  # Formulário add/edit
│   └── LoginForm.tsx    # Tela de login
├── pages/
│   ├── Home.tsx         # Página principal (vitrine)
│   └── Admin.tsx        # Painel administrativo
├── services/
│   ├── firebase.ts      # Inicialização Firebase
│   ├── auth.ts          # Autenticação
│   ├── products.ts      # CRUD de produtos
│   └── storage.ts       # Upload de imagens
├── hooks/
│   ├── useAuth.ts       # Hook de autenticação
│   └── useProducts.ts   # Hook de produtos
├── config/
│   ├── constants.ts     # Configurações gerais
│   ├── categories.ts    # Categorias disponíveis
│   └── sizes.ts         # Tamanhos disponíveis
├── types/
│   └── index.ts         # TypeScript types
├── utils/
│   ├── formatters.ts    # Formatação de preços, datas
│   └── whatsapp.ts      # Integração WhatsApp
├── App.tsx              # Componente principal
├── main.tsx             # Entry point
└── index.css            # Estilos globais
```

---

## 🎯 Como Usar

### Para Clientes

1. Acessam o site normalmente
2. Filtram por categoria ou buscam por nome
3. Visualizam produtos com todas as informações
4. Clicam em "Tenho Interesse"
5. São redirecionados ao WhatsApp com mensagem automática

### Para Administradores

1. Acessam `/admin` na URL
2. Fazem login com email e senha
3. Adicionam/editam/excluem produtos
4. Fazem upload de imagens
5. Produtos aparecem instantaneamente na vitrine

---

## 🔧 Customização

### Adicionar Nova Categoria

Edite `src/config/categories.ts`:

```typescript
export const CATEGORIES: SelectOption[] = [
  { value: 'blusa', label: 'Blusa' },
  { value: 'nova-categoria', label: 'Nova Categoria' }, // ← Adicione aqui
  // ...
];
```

### Adicionar Novo Tamanho

Edite `src/config/sizes.ts`:

```typescript
export const SIZES: SelectOption[] = [
  { value: 'P', label: 'P' },
  { value: 'NOVO', label: 'NOVO' }, // ← Adicione aqui
  // ...
];
```

### Alterar Informações da Loja

Edite o arquivo `.env`:

```env
VITE_STORE_NAME=Minha Loja
VITE_STORE_TAGLINE=As melhores ofertas
VITE_WHATSAPP_NUMBER=5515999999999
```

### Customizar Cores

Edite `src/index.css` e `tailwind.config.js`

---

## 📱 Deploy na Vercel

### Via GitHub (Recomendado)

1. Crie um repositório no GitHub
2. Faça push do código:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/seu-usuario/seu-repo.git
git push -u origin main
```

3. Acesse [Vercel](https://vercel.com)
4. Clique em "New Project"
5. Importe seu repositório
6. **Configure as variáveis de ambiente** (copie do `.env`)
7. Deploy!

### Adicionar Variáveis de Ambiente na Vercel

No dashboard da Vercel:
1. Vá em **Settings** > **Environment Variables**
2. Adicione TODAS as variáveis do seu `.env`
3. Clique em "Save"
4. Faça um novo deploy

---

## 🔐 Regras de Segurança Firebase

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{product} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{imageName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

---

## 📦 Tecnologias

- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool super rápida
- **Firebase** - Backend completo
- **Tailwind CSS** - Framework CSS
- **ShadCN UI** - Design system
- **Radix UI** - Componentes primitivos
- **Lucide React** - Ícones

---

## 💡 Dicas

### Otimizar Imagens

Antes de fazer upload:
- Redimensione para 800x800px
- Comprima para ~200KB
- Use formatos modernos (WebP, JPG)

### Backup de Dados

Os dados estão no Firebase, mas é bom:
- Exportar produtos periodicamente
- Manter backup das imagens

### Performance

- Firebase é rápido (~200-300ms)
- CDN global incluso
- HTTPS automático

---

## ❓ Problemas Comuns

### Botão WhatsApp não funciona

Verifique o número no `.env`:
```env
VITE_WHATSAPP_NUMBER=5515999999999  # ← Sem espaços ou caracteres
```

### Não consigo fazer login

1. Verifique se criou o usuário no Firebase Authentication
2. Confira email e senha
3. Veja se as credenciais do `.env` estão corretas

### Imagens não aparecem

1. Verifique se ativou o Firebase Storage
2. Confira as regras de segurança
3. Veja o console do navegador (F12) para erros

---

## 📝 Licença

Livre para uso comercial e pessoal.

---

## 🎉 Pronto!

Agora você tem uma loja online completa e profissional!

**Próximos passos:**
1. ✅ Configure o Firebase
2. ✅ Adicione produtos
3. ✅ Teste o WhatsApp
4. ✅ Faça deploy na Vercel
5. ✅ Compartilhe com clientes

**Boas vendas! 🛍️**
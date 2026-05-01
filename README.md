# 📋💨 Quick List

Uma aplicação web fullstack para criar e gerenciar listas de compras compartilháveis.

🌐 **Site:** https://murilopava.github.io/quick-list/

---

## Sobre o Projeto

O Quick List é um projeto fullstack desenvolvido para praticar conceitos modernos de desenvolvimento web. A aplicação permite criar listas, adicionar e gerenciar items, e compartilhar listas com outras pessoas através de um código único — sem necessidade de cadastro ou autenticação.

Este projeto foi criado com fins educacionais, focando em:

- Construção de APIs REST com Node.js e Fastify
- Modelagem de banco de dados relacional com Prisma ORM e PostgreSQL
- Tipagem estática com TypeScript no frontend e backend
- Gerenciamento de estado no React com hooks
- Integração frontend-backend com Fetch API
- Persistência local com localStorage
- Compartilhamento de listas via código único (NanoID)
- Ótimas práticas de desenvolvimento fullstack

---

## Funcionalidades

### Gerenciamento de Listas
- **Criar lista** — cria uma nova lista e gera automaticamente um código único de compartilhamento
- **Entrar numa lista existente** — acessa uma lista digitando o código compartilhado por outra pessoa
- **Remover lista** — remove a lista do dispositivo local
- **Histórico local** — listas acessadas ficam salvas no dispositivo via localStorage, com nome e data de criação
- **Compartilhamento** — qualquer pessoa com o código pode visualizar e editar a lista

### Gerenciamento de Items
- **Adicionar item** — adiciona itens à lista com validação de campo vazio e duplicatas
- **Marcar como comprado** — alterna o status do item com efeito visual de tachado
- **Controle de quantidade** — incrementa ou decrementa a quantidade com botões + e −
- **Remover item** — remove o item da lista (disponível apenas após marcar como comprado)
- **Persistência em banco** — todos os itens são salvos no PostgreSQL em tempo real

### Validações
- Campo vazio não é aceito
- Itens duplicados são bloqueados (comparação case-insensitive)
- Lista inexistente retorna erro 404
- Feedback visual de erros ao usuário

---

## Tecnologias Utilizadas

### Frontend
- **React 19** — biblioteca para construção de interfaces
- **TypeScript** — tipagem estática
- **React Router** — navegação entre páginas
- **Tailwind CSS** — estilização
- **Vite** — bundler e servidor de desenvolvimento

### Backend
- **Node.js** — ambiente de execução
- **Fastify** — framework web
- **TypeScript** — tipagem estática
- **Prisma ORM** — acesso ao banco de dados
- **PostgreSQL** — banco de dados relacional
- **NanoID** — geração de códigos únicos de compartilhamento

---

## Arquitetura

```
client/                  # Frontend React
├── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/           # Páginas da aplicação
│   ├── types/           # Interfaces TypeScript
│   └── utils/           # Funções utilitárias

server/                  # Backend Node.js
├── routes/              # Rotas da API
├── db/                  # Queries do banco de dados
├── lib/                 # Configurações (Prisma Client)
└── prisma/              # Schema e migrations
```

---

## API REST

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/lists` | Criar uma nova lista |
| `GET` | `/lists/:shareId` | Buscar lista com itens |
| `DELETE` | `/lists/:shareId` | Deletar lista |
| `POST` | `/lists/:shareId/items` | Adicionar item |
| `PATCH` | `/lists/:shareId/items/:id` | Atualizar item |
| `DELETE` | `/lists/:shareId/items/:id` | Remover item |

## Rotas do Frontend

| Rota | Descrição |
|------|-----------|
| `/lists` | Home — listas salvas no dispositivo |
| `/items/:shareId` | Itens da lista |

---

## Como Usar

### Pré-requisitos
- Node.js 18+
- PostgreSQL instalado e rodando

### Instalação

Clone o repositório:
```bash
git clone https://github.com/murilopava/quick-list.git
cd quick-list
```

**Backend:**
```bash
cd server
npm install
```

Crie o arquivo `.env` na pasta `server`:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/quicklist"
```

Rode as migrations:
```bash
npx prisma migrate dev
```

Inicie o servidor:
```bash
npm run dev
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

Acesse `http://localhost:5173` no navegador.

---

## Fluxo da Aplicação

1. O usuário acessa a Home e cria uma nova lista digitando um nome
2. A lista é criada no banco e um código único é gerado automaticamente
3. O código é salvo no localStorage do dispositivo
4. O usuário é redirecionado para a lista e pode adicionar itens
5. Para compartilhar, basta passar o código para outra pessoa
6. Qualquer pessoa com o código pode acessar e editar a lista

---

## Autor

Desenvolvido por **Murilo Pavanello**

> Projeto desenvolvido para fins de estudo e aprendizado de desenvolvimento fullstack.


Logo o projeto inteiro será hospedado, incluindo front-end, back-end e banco de dados.
# 🎓 Radar Acadêmico

> Conectando estudantes e proporcionando uma experiência acadêmica mais transparente e colaborativa.

## 📋 Visão Geral

O **Radar Acadêmico** é uma plataforma web desenvolvida em Next.js que conecta estudantes universitários, permitindo compartilhar experiências sobre disciplinas, professores e grades curriculares. O projeto possui uma arquitetura escalável que suporta múltiplas instituições de ensino.

## ✨ Funcionalidades

### 🔐 Autenticação

- **Login/Registro** com Supabase
- **Multi-step signup** com validações
- **Recuperação de senha**
- **Sessões persistentes**

### 🏫 Instituições e Cursos

- **Suporte a múltiplas instituições** (UFMG, UFES, UFLA, CEFET-MG)
- **Grades curriculares** organizadas por períodos
- **Disciplinas obrigatórias e optativas**
- **Sistema de pré-requisitos**

### 📊 Progresso Acadêmico

- **Acompanhamento de disciplinas** aprovadas/reprovadas
- **Cálculo automático de progresso**
- **Disciplinas disponíveis** baseadas em pré-requisitos
- **Estatísticas detalhadas**

### 🎨 Interface Moderna

- **Design responsivo** e acessível
- **Identidade visual consistente** (vermelho, preto, cinza)
- **Animações e efeitos neon**
- **Componentes reutilizáveis**

## 🚀 Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Autenticação**: Supabase
- **Estilização**: CSS Global + Tailwind CSS
- **Testes**: Jest + Testing Library
- **Formatação**: Prettier + ESLint
- **Git Hooks**: Husky + lint-staged

## 📁 Estrutura do Projeto

```
radar-next/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── auth/           # Páginas de autenticação
│   │   ├── components/     # Componentes específicos da app
│   │   ├── globals.css     # Estilos globais
│   │   └── layout.tsx      # Layout raiz
│   ├── components/         # Componentes reutilizáveis
│   │   ├── ui/            # Componentes base (Button, Input, etc.)
│   │   └── auth/          # Componentes de autenticação
│   ├── contexts/          # Contextos React
│   │   └── AuthContext.tsx
│   ├── lib/               # Utilitários e serviços
│   │   ├── services/      # Serviços organizados
│   │   ├── templates/     # Templates para dados
│   │   ├── types.ts       # Interfaces TypeScript
│   │   └── supabase.ts    # Configuração Supabase
│   └── data/              # Dados estáticos JSON
│       └── institutions/  # Dados das instituições
├── public/                # Arquivos estáticos
│   ├── assets/           # Imagens e ícones
│   └── data/             # Dados públicos
└── docs/                 # Documentação
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Supabase

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/radar-next.git
cd radar-next
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### 4. Execute o projeto

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

## 📝 Scripts Disponíveis

| Script                 | Descrição                          |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Inicia servidor de desenvolvimento |
| `npm run build`        | Gera build de produção             |
| `npm run start`        | Inicia servidor de produção        |
| `npm run lint`         | Executa ESLint                     |
| `npm run test`         | Executa testes                     |
| `npm run format`       | Formata código com Prettier        |
| `npm run format:check` | Verifica formatação                |

## 🏗️ Arquitetura

### Estrutura de Dados

O projeto segue uma hierarquia escalável:

```
Instituição → Departamentos → Cursos → Grades → Períodos → Disciplinas
```

### Componentes

- **Componentes UI**: Reutilizáveis e tipados
- **Componentes de Layout**: Header, Footer, Sidebar
- **Componentes de Formulário**: Específicos para autenticação
- **Componentes de Grade**: Visualização de grades curriculares

### Serviços

- **AuthService**: Gerenciamento de autenticação
- **GradeService**: Operações com grades curriculares
- **DataService**: Acesso a dados estáticos

## 🎨 Design System

### Cores

- **Primária**: `#f21628` (Vermelho neon)
- **Secundária**: `#8c0410` (Vermelho escuro)
- **Fundo**: `#0d0d0d` (Preto)
- **Texto**: `#f2f2f2` (Branco)

### Componentes

- **Button**: Múltiplas variantes (primary, secondary, outline, ghost)
- **Input**: Com validação e estados de erro/sucesso
- **Select**: Para formulários complexos

## 🔧 Configuração de Desenvolvimento

### Prettier

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2
}
```

### ESLint

Configurado com `eslint-config-next` para Next.js.

### Husky

Git hooks configurados para:

- Formatação automática antes do commit
- Lint automático antes do commit

## 📊 Dados

### Estrutura de Instituições

```json
{
  "id": "cefet-mg",
  "name": "Centro Federal de Educação Tecnológica de Minas Gerais",
  "acronym": "CEFET-MG",
  "city": "Belo Horizonte",
  "state": "MG",
  "region": "Sudeste"
}
```

### Estrutura de Grades

```json
{
  "id": "nova",
  "name": "Grade 2023",
  "year": "2023",
  "periods": [
    {
      "number": 1,
      "title": "1º Período",
      "subjects": [...]
    }
  ]
}
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:

- Netlify
- Railway
- Heroku
- AWS Amplify

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript para todos os arquivos
- Siga as convenções do ESLint
- Escreva testes para novas funcionalidades
- Documente APIs e componentes complexos

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **Gabriel Carvalho** - Desenvolvimento inicial

## 🙏 Agradecimentos

- Comunidade Next.js
- Supabase pela infraestrutura
- Todos os contribuidores

---

**Radar Acadêmico** - Conectando o futuro da educação! 🎓✨

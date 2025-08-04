# 🏗️ Estrutura Escalável do Radar Acadêmico

## 📋 Visão Geral

O Radar Acadêmico foi projetado para ser **100% escalável**, permitindo adicionar facilmente novas instituições, cursos e grades sem modificar o código existente. A estrutura segue o princípio de **composição hierárquica**:

```
Instituição → Departamentos → Cursos → Grades → Períodos → Disciplinas
```

## 🗂️ Estrutura de Dados

### 1. **Instituições** (`/src/data/institutions/`)

```
institutions/
├── cefet-mg/
│   ├── info.json              # Dados da instituição
│   ├── departments/           # Departamentos
│   ├── courses/              # Cursos
│   │   ├── engenharia-computacao/
│   │   │   ├── info.json
│   │   │   ├── grades/
│   │   │   │   ├── nova.json
│   │   │   │   └── antiga.json
│   │   │   └── subjects/     # Disciplinas individuais
│   │   └── engenharia-mecanica/
│   └── professors/           # Professores
├── ufmg/
└── ufla/
```

### 2. **Interfaces TypeScript** (`/src/lib/types.ts`)

- `Institution`: Dados da instituição
- `Department`: Departamentos acadêmicos
- `Course`: Cursos oferecidos
- `Grade`: Grades curriculares
- `Subject`: Disciplinas
- `Professor`: Professores
- `User`: Usuários e progresso

### 3. **Serviços** (`/src/lib/services/`)

- `dataService.ts`: Gerenciamento de dados
- Hooks React para carregamento assíncrono
- Lógica de pré-requisitos e progresso

## 🔄 Como Replicar para Nova Instituição

### Passo 1: Criar Estrutura de Pastas

```bash
mkdir -p src/data/institutions/NOVA-INSTITUICAO/{departments,courses,professors}
```

### Passo 2: Criar Arquivo de Informações

```json
// src/data/institutions/NOVA-INSTITUICAO/info.json
{
  "id": "nova-instituicao",
  "name": "Nome da Instituição",
  "acronym": "SIGLA",
  "city": "Cidade",
  "state": "UF",
  "region": "Região",
  "website": "https://www.instituicao.edu.br",
  "description": "Descrição da instituição",
  "departments": [
    {
      "id": "computacao",
      "name": "Departamento de Computação",
      "acronym": "DECOM",
      "institutionId": "nova-instituicao",
      "description": "Descrição do departamento"
    }
  ]
}
```

### Passo 3: Criar Curso

```json
// src/data/institutions/NOVA-INSTITUICAO/courses/engenharia-computacao/info.json
{
  "id": "engenharia-computacao",
  "name": "Engenharia de Computação",
  "acronym": "EC",
  "institutionId": "nova-instituicao",
  "departmentId": "computacao",
  "duration": 10,
  "totalHours": 3600,
  "description": "Descrição do curso",
  "grades": [
    {
      "id": "2023",
      "name": "Grade 2023",
      "year": "2023",
      "courseId": "engenharia-computacao",
      "isActive": true
    }
  ]
}
```

### Passo 4: Criar Grade

```json
// src/data/institutions/NOVA-INSTITUICAO/courses/engenharia-computacao/grades/2023.json
{
  "id": "2023",
  "name": "Grade 2023",
  "year": "2023",
  "courseId": "engenharia-computacao",
  "isActive": true,
  "periods": [
    {
      "number": 1,
      "title": "1º Período",
      "subjects": [
        {
          "id": "calculo-1",
          "name": "Cálculo 1",
          "acronym": "Cálculo 1",
          "hours": 90,
          "prerequisites": [],
          "unlocks": ["calculo-2"],
          "difficulty": "hard",
          "obrigatoria": true,
          "courseId": "engenharia-computacao",
          "gradeId": "2023",
          "periodNumber": 1
        }
      ]
    }
  ]
}
```

## 🎯 Componentes Reutilizáveis

### 1. **GradeViewer** (`/src/components/GradeViewer.tsx`)

- Exibe qualquer grade de qualquer instituição
- Suporte a progresso do usuário
- Cores dinâmicas baseadas no status
- Clique em disciplinas para ações
- **Novo**: Distinção entre disciplinas obrigatórias e optativas

### 2. **GradeStats** (`/src/components/GradeStats.tsx`)

- Estatísticas detalhadas da grade
- Contagem de disciplinas obrigatórias vs optativas
- Progresso por tipo de disciplina
- Barra de progresso visual
- Detalhes por período

### 2. **Templates** (`/src/lib/templates/`)

- `createInstitutionTemplate()`: Cria nova instituição
- `createCourseTemplate()`: Cria novo curso
- `createGradeTemplate()`: Cria nova grade
- `createSubjectTemplate()`: Cria nova disciplina

## 🔧 Funcionalidades Escaláveis

### 1. **Disciplinas Obrigatórias vs Optativas**

```typescript
// Campo obrigatoria na interface Subject
interface Subject {
  // ... outros campos
  obrigatoria: boolean; // true = obrigatória, false = optativa
}

// Exemplo de uso
const obrigatorias = subjects.filter((s) => s.obrigatoria);
const optativas = subjects.filter((s) => !s.obrigatoria);
```

### 2. **Lógica de Pré-requisitos**

```typescript
// Verifica se disciplina está disponível
const availableSubjects = dataService.getAvailableSubjects(
  approvedSubjects,
  gradeId
);

// Verifica disciplinas bloqueadas
const blockedSubjects = dataService.getBlockedSubjects(
  approvedSubjects,
  gradeId
);
```

### 3. **Progresso do Usuário**

```typescript
// Estatísticas de progresso
const stats = dataService.getProgressStats(
  approvedSubjects,
  failedSubjects,
  gradeId
);
```

### 4. **Filtros Dinâmicos**

```typescript
// Filtros por região, instituição, curso
const institutions = await dataService.getInstitutions({
  region: "Sudeste",
  difficulty: "hard",
});
```

## 📊 Exemplo de Uso

### Adicionar UFMG

1. Copiar estrutura do CEFET-MG
2. Modificar dados específicos
3. Usar mesmo componente `GradeViewer`
4. Funcionalidades automáticas

### Adicionar Novo Curso

1. Criar pasta do curso
2. Adicionar `info.json`
3. Criar grades
4. Usar templates existentes

## 🚀 Vantagens da Estrutura

### ✅ **Escalabilidade**

- Adicionar instituições sem modificar código
- Reutilização total de componentes
- Templates padronizados

### ✅ **Manutenibilidade**

- Dados separados do código
- Interfaces TypeScript consistentes
- Serviços centralizados

### ✅ **Flexibilidade**

- Suporte a múltiplas grades
- Lógica de pré-requisitos dinâmica
- Progresso personalizado

### ✅ **Performance**

- Carregamento sob demanda
- Cache inteligente
- Otimização de consultas

## 🎯 Próximos Passos

1. **Completar CEFET-MG** (períodos 4-10)
2. **Adicionar UFMG** como exemplo
3. **Implementar autenticação**
4. **Criar sistema de feedbacks**
5. **Adicionar upload de provas**

## 📝 Notas Importantes

- **IDs únicos**: Cada elemento tem ID único
- **Relacionamentos**: Usar IDs para referências
- **Consistência**: Seguir padrões estabelecidos
- **Validação**: Verificar dados antes de usar

---

**A estrutura está pronta para escalar para 69+ universidades federais! 🚀**

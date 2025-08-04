import { Institution, Course, Grade, Subject } from "../types";

// ===== TEMPLATE PARA NOVAS INSTITUIÇÕES =====

export const createInstitutionTemplate = (
  id: string,
  name: string,
  acronym: string,
  city: string,
  state: string,
  region: string,
  website: string,
  description: string
): Institution => {
  return {
    id,
    name,
    acronym,
    city,
    state,
    region,
    website,
    description,
    departments: [],
  };
};

export const createDepartmentTemplate = (
  id: string,
  name: string,
  acronym: string,
  institutionId: string,
  description: string
) => {
  return {
    id,
    name,
    acronym,
    institutionId,
    description,
  };
};

export const createCourseTemplate = (
  id: string,
  name: string,
  acronym: string,
  institutionId: string,
  departmentId: string,
  duration: number,
  totalHours: number,
  description: string
): Course => {
  return {
    id,
    name,
    acronym,
    institutionId,
    departmentId,
    duration,
    totalHours,
    description,
    grades: [],
  };
};

export const createGradeTemplate = (
  id: string,
  name: string,
  year: string,
  courseId: string,
  isActive: boolean = false
): Grade => {
  return {
    id,
    name,
    year,
    courseId,
    isActive,
    periods: [],
  };
};

export const createSubjectTemplate = (
  id: string,
  name: string,
  acronym: string,
  hours: number,
  prerequisites: string[],
  unlocks: string[],
  difficulty: "easy" | "medium" | "hard",
  obrigatoria: boolean,
  courseId: string,
  gradeId: string,
  periodNumber: number
): Subject => {
  return {
    id,
    name,
    acronym,
    hours,
    prerequisites,
    unlocks,
    difficulty,
    obrigatoria,
    courseId,
    gradeId,
    periodNumber,
  };
};

// ===== TEMPLATE PARA ESTRUTURA COMPLETA =====

export const createInstitutionStructure = (
  institutionData: {
    id: string;
    name: string;
    acronym: string;
    city: string;
    state: string;
    region: string;
    website: string;
    description: string;
  },
  departments: Array<{
    id: string;
    name: string;
    acronym: string;
    description: string;
  }>,
  courses: Array<{
    id: string;
    name: string;
    acronym: string;
    departmentId: string;
    duration: number;
    totalHours: number;
    description: string;
    grades: Array<{
      id: string;
      name: string;
      year: string;
      isActive: boolean;
      periods: Array<{
        number: number;
        title: string;
        subjects: Array<{
          id: string;
          name: string;
          acronym: string;
          hours: number;
          prerequisites: string[];
          unlocks: string[];
          difficulty: "easy" | "medium" | "hard";
          obrigatoria: boolean;
        }>;
      }>;
    }>;
  }>
) => {
  const institution = createInstitutionTemplate(
    institutionData.id,
    institutionData.name,
    institutionData.acronym,
    institutionData.city,
    institutionData.state,
    institutionData.region,
    institutionData.website,
    institutionData.description
  );

  // Adicionar departamentos
  institution.departments = departments.map((dept) =>
    createDepartmentTemplate(
      dept.id,
      dept.name,
      dept.acronym,
      institution.id,
      dept.description
    )
  );

  return {
    institution,
    courses: courses.map((course) => {
      const courseTemplate = createCourseTemplate(
        course.id,
        course.name,
        course.acronym,
        institution.id,
        course.departmentId,
        course.duration,
        course.totalHours,
        course.description
      );

      // Adicionar grades
      courseTemplate.grades = course.grades.map((grade) => {
        const gradeTemplate = createGradeTemplate(
          grade.id,
          grade.name,
          grade.year,
          course.id,
          grade.isActive
        );

        // Adicionar períodos e disciplinas
        gradeTemplate.periods = grade.periods.map((period) => ({
          number: period.number,
          title: period.title,
          subjects: period.subjects.map((subject) =>
            createSubjectTemplate(
              subject.id,
              subject.name,
              subject.acronym,
              subject.hours,
              subject.prerequisites,
              subject.unlocks,
              subject.difficulty,
              subject.obrigatoria,
              course.id,
              grade.id,
              period.number
            )
          ),
        }));

        return gradeTemplate;
      });

      return courseTemplate;
    }),
  };
};

// ===== EXEMPLO DE USO =====

export const exampleInstitutionStructure = () => {
  return createInstitutionStructure(
    {
      id: "ufmg",
      name: "Universidade Federal de Minas Gerais",
      acronym: "UFMG",
      city: "Belo Horizonte",
      state: "MG",
      region: "Sudeste",
      website: "https://www.ufmg.br",
      description: "Universidade federal de referência em Minas Gerais.",
    },
    [
      {
        id: "computacao",
        name: "Departamento de Ciência da Computação",
        acronym: "DCC",
        description: "Departamento responsável pelos cursos de computação.",
      },
    ],
    [
      {
        id: "ciencia-computacao",
        name: "Ciência da Computação",
        acronym: "CC",
        departmentId: "computacao",
        duration: 8,
        totalHours: 2880,
        description: "Curso focado em fundamentos da computação.",
        grades: [
          {
            id: "2023",
            name: "Grade 2023",
            year: "2023",
            isActive: true,
            periods: [
              {
                number: 1,
                title: "1º Período",
                subjects: [
                  {
                    id: "calculo-1",
                    name: "Cálculo 1",
                    acronym: "Cálculo 1",
                    hours: 90,
                    prerequisites: [],
                    unlocks: ["calculo-2"],
                    difficulty: "hard",
                    obrigatoria: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ]
  );
};

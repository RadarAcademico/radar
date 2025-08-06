import {
  Institution,
  Course,
  Grade,
  Subject,
  Professor,
  FilterOptions,
} from "../types";
import { useState, useEffect } from "react";

// ===== SERVIÇO DE DADOS ESCALÁVEL =====

class DataService {
  private institutions: Map<string, Institution> = new Map();
  private courses: Map<string, Course> = new Map();
  private grades: Map<string, Grade> = new Map();
  private subjects: Map<string, Subject> = new Map();
  private professors: Map<string, Professor> = new Map();

  // ===== CARREGAMENTO DE DADOS =====

  async loadInstitution(institutionId: string): Promise<Institution | null> {
    try {
      const response = await fetch(`/api/institutions/${institutionId}`);
      if (!response.ok) return null;

      const institution = await response.json();
      this.institutions.set(institutionId, institution);
      return institution;
    } catch (error) {
      console.error(`Erro ao carregar instituição ${institutionId}:`, error);
      return null;
    }
  }

  async loadCourse(
    institutionId: string,
    courseId: string
  ): Promise<Course | null> {
    try {
      const response = await fetch(
        `/api/institutions/${institutionId}/courses/${courseId}`
      );
      if (!response.ok) return null;

      const course = await response.json();
      this.courses.set(courseId, course);
      return course;
    } catch (error) {
      console.error(`Erro ao carregar curso ${courseId}:`, error);
      return null;
    }
  }

  async loadGrade(
    institutionId: string,
    courseId: string,
    gradeId: string
  ): Promise<Grade | null> {
    try {
      // Para o MVP, vamos carregar diretamente dos arquivos JSON
      const response = await fetch(
        `/data/institutions/${institutionId}/courses/${courseId}/grades/${gradeId}.json`
      );
      if (!response.ok) return null;

      const grade = await response.json();
      this.grades.set(gradeId, grade);

      // Carregar disciplinas da grade
      grade.periods.forEach((period: any) => {
        if (period.subjects) {
          period.subjects.forEach((subject: Subject) => {
            this.subjects.set(subject.id, subject);
          });
        }
      });

      return grade;
    } catch (error) {
      console.error(`Erro ao carregar grade ${gradeId}:`, error);
      return null;
    }
  }

  // ===== BUSCA E FILTRAGEM =====

  async getInstitutions(filters?: FilterOptions): Promise<Institution[]> {
    const institutions = Array.from(this.institutions.values());

    if (!filters) return institutions;

    return institutions.filter(institution => {
      if (filters.region && institution.region !== filters.region) return false;
      return true;
    });
  }

  async getCourses(institutionId: string): Promise<Course[]> {
    const courses = Array.from(this.courses.values());
    return courses.filter(course => course.institutionId === institutionId);
  }

  async getGrades(courseId: string): Promise<Grade[]> {
    const grades = Array.from(this.grades.values());
    return grades.filter(grade => grade.courseId === courseId);
  }

  async getAvailableGrades(
    institutionId: string,
    courseId: string
  ): Promise<Grade[]> {
    try {
      // Para o MVP, vamos retornar as grades disponíveis baseado nos arquivos que sabemos que existem
      const grades: Grade[] = [];

      // Tentar carregar grade nova
      const novaGrade = await this.loadGrade(institutionId, courseId, "nova");
      if (novaGrade) grades.push(novaGrade);

      // Tentar carregar grade antiga
      const antigaGrade = await this.loadGrade(
        institutionId,
        courseId,
        "antiga"
      );
      if (antigaGrade) grades.push(antigaGrade);

      return grades;
    } catch (error) {
      console.error("Erro ao carregar grades disponíveis:", error);
      return [];
    }
  }

  async getSubjects(gradeId: string): Promise<Subject[]> {
    const subjects = Array.from(this.subjects.values());
    return subjects.filter(subject => subject.gradeId === gradeId);
  }

  // ===== LÓGICA DE PRÉ-REQUISITOS =====

  async getAvailableSubjects(
    approvedSubjects: string[],
    gradeId: string
  ): Promise<Subject[]> {
    const subjects = await this.getSubjects(gradeId);

    return subjects.filter(subject => {
      // Se já foi aprovado, não está disponível
      if (approvedSubjects.includes(subject.id)) return false;

      // Verificar se todos os pré-requisitos foram aprovados
      const hasAllPrerequisites = subject.prerequisites.every(prereqId =>
        approvedSubjects.includes(prereqId)
      );

      return hasAllPrerequisites;
    });
  }

  async getBlockedSubjects(
    approvedSubjects: string[],
    gradeId: string
  ): Promise<Subject[]> {
    const subjects = await this.getSubjects(gradeId);

    return subjects.filter(subject => {
      // Se já foi aprovado, não está bloqueado
      if (approvedSubjects.includes(subject.id)) return false;

      // Verificar se algum pré-requisito não foi aprovado
      const hasMissingPrerequisites = subject.prerequisites.some(
        prereqId => !approvedSubjects.includes(prereqId)
      );

      return hasMissingPrerequisites;
    });
  }

  async getUnlockedSubjects(
    approvedSubjects: string[],
    gradeId: string
  ): Promise<string[]> {
    const subjects = await this.getSubjects(gradeId);
    const unlocked: string[] = [];

    subjects.forEach(subject => {
      if (approvedSubjects.includes(subject.id)) {
        unlocked.push(...subject.unlocks);
      }
    });

    // Remove duplicatas sem usar Set
    const uniqueUnlocked = unlocked.filter(
      (item, index) => unlocked.indexOf(item) === index
    );
    return uniqueUnlocked;
  }

  // ===== ESTATÍSTICAS =====

  async getProgressStats(
    approvedSubjects: string[],
    failedSubjects: string[],
    gradeId: string
  ): Promise<{
    total: number;
    approved: number;
    failed: number;
    progress: number;
    remaining: number;
  }> {
    const subjects = await this.getSubjects(gradeId);
    const totalSubjects = subjects.length;
    const approvedCount = approvedSubjects.length;
    const failedCount = failedSubjects.length;
    const progressPercentage = (approvedCount / totalSubjects) * 100;

    return {
      total: totalSubjects,
      approved: approvedCount,
      failed: failedCount,
      progress: progressPercentage,
      remaining: totalSubjects - approvedCount - failedCount,
    };
  }

  // ===== CACHE E OTIMIZAÇÃO =====

  clearCache() {
    this.institutions.clear();
    this.courses.clear();
    this.grades.clear();
    this.subjects.clear();
    this.professors.clear();
  }

  // ===== UTILITÁRIOS =====

  getSubjectById(subjectId: string): Subject | null {
    return this.subjects.get(subjectId) || null;
  }

  getInstitutionById(institutionId: string): Institution | null {
    return this.institutions.get(institutionId) || null;
  }

  getCourseById(courseId: string): Course | null {
    return this.courses.get(courseId) || null;
  }

  getGradeById(gradeId: string): Grade | null {
    return this.grades.get(gradeId) || null;
  }
}

// Instância singleton do serviço
export const dataService = new DataService();

// ===== HOOKS PARA REACT =====

export const useInstitution = (institutionId: string) => {
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInstitution = async () => {
      setLoading(true);
      const data = await dataService.loadInstitution(institutionId);
      setInstitution(data);
      setLoading(false);
    };

    loadInstitution();
  }, [institutionId]);

  return { institution, loading };
};

export const useCourse = (institutionId: string, courseId: string) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      const data = await dataService.loadCourse(institutionId, courseId);
      setCourse(data);
      setLoading(false);
    };

    loadCourse();
  }, [institutionId, courseId]);

  return { course, loading };
};

export const useGrade = (
  institutionId: string,
  courseId: string,
  gradeId: string
) => {
  const [grade, setGrade] = useState<Grade | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGrade = async () => {
      setLoading(true);
      const data = await dataService.loadGrade(
        institutionId,
        courseId,
        gradeId
      );
      setGrade(data);
      setLoading(false);
    };

    loadGrade();
  }, [institutionId, courseId, gradeId]);

  return { grade, loading };
};

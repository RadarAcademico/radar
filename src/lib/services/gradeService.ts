import {
  Institution,
  Course,
  Grade,
  Subject,
  FilterOptions,
} from "@/lib/types";

export class GradeService {
  /**
   * Obtém todas as instituições
   */
  static async getInstitutions(
    filters?: FilterOptions
  ): Promise<Institution[]> {
    try {
      // Simula chamada à API - em produção seria uma chamada real
      const response = await fetch("/api/institutions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar instituições");
      }

      const institutions: Institution[] = await response.json();

      // Aplica filtros se fornecidos
      if (filters) {
        return institutions.filter(institution => {
          if (filters.region && institution.region !== filters.region) {
            return false;
          }
          return true;
        });
      }

      return institutions;
    } catch (error) {
      console.error("Erro ao buscar instituições:", error);
      return [];
    }
  }

  /**
   * Obtém cursos de uma instituição
   */
  static async getCourses(institutionId: string): Promise<Course[]> {
    try {
      const response = await fetch(
        `/api/institutions/${institutionId}/courses`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar cursos");
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
      return [];
    }
  }

  /**
   * Obtém grades de um curso
   */
  static async getGrades(courseId: string): Promise<Grade[]> {
    try {
      const response = await fetch(`/api/courses/${courseId}/grades`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar grades");
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar grades:", error);
      return [];
    }
  }

  /**
   * Obtém uma grade específica
   */
  static async getGrade(gradeId: string): Promise<Grade | null> {
    try {
      const response = await fetch(`/api/grades/${gradeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar grade");
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar grade:", error);
      return null;
    }
  }

  /**
   * Obtém disciplinas de uma grade
   */
  static async getSubjects(gradeId: string): Promise<Subject[]> {
    try {
      const response = await fetch(`/api/grades/${gradeId}/subjects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar disciplinas");
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
      return [];
    }
  }

  /**
   * Calcula estatísticas de uma grade
   */
  static calculateGradeStats(grade: Grade) {
    const totalSubjects = grade.periods.reduce(
      (total, period) => total + period.subjects.length,
      0
    );

    const obrigatorias = grade.periods.reduce(
      (total, period) =>
        total + period.subjects.filter(subject => subject.obrigatoria).length,
      0
    );

    const optativas = totalSubjects - obrigatorias;

    const totalHours = grade.periods.reduce(
      (total, period) =>
        total +
        period.subjects.reduce((sum, subject) => sum + subject.hours, 0),
      0
    );

    return {
      totalSubjects,
      obrigatorias,
      optativas,
      totalHours,
      periods: grade.periods.length,
    };
  }

  /**
   * Verifica disciplinas disponíveis baseado em pré-requisitos
   */
  static getAvailableSubjects(
    approvedSubjects: string[],
    grade: Grade
  ): Subject[] {
    const allSubjects = grade.periods.flatMap(period => period.subjects);

    return allSubjects.filter(subject => {
      // Se não tem pré-requisitos, está disponível
      if (subject.prerequisites.length === 0) {
        return true;
      }

      // Verifica se todos os pré-requisitos foram aprovados
      return subject.prerequisites.every(prerequisite =>
        approvedSubjects.includes(prerequisite)
      );
    });
  }

  /**
   * Verifica disciplinas bloqueadas
   */
  static getBlockedSubjects(
    approvedSubjects: string[],
    grade: Grade
  ): Subject[] {
    const allSubjects = grade.periods.flatMap(period => period.subjects);

    return allSubjects.filter(subject => {
      // Se não tem pré-requisitos, não está bloqueada
      if (subject.prerequisites.length === 0) {
        return false;
      }

      // Verifica se algum pré-requisito não foi aprovado
      return !subject.prerequisites.every(prerequisite =>
        approvedSubjects.includes(prerequisite)
      );
    });
  }

  /**
   * Calcula progresso do usuário
   */
  static calculateProgress(
    approvedSubjects: string[],
    failedSubjects: string[],
    grade: Grade
  ) {
    const allSubjects = grade.periods.flatMap(period => period.subjects);
    const totalSubjects = allSubjects.length;
    const approvedCount = approvedSubjects.length;
    const failedCount = failedSubjects.length;
    const progressPercentage = (approvedCount / totalSubjects) * 100;

    return {
      totalSubjects,
      approvedCount,
      failedCount,
      progressPercentage,
      remainingSubjects: totalSubjects - approvedCount - failedCount,
    };
  }
}

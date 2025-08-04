// ===== INTERFACES PRINCIPAIS =====

export interface Institution {
  id: string;
  name: string;
  acronym: string;
  city: string;
  state: string;
  region: string;
  website: string;
  logo?: string;
  description: string;
  departments: Department[];
}

export interface Department {
  id: string;
  name: string;
  acronym: string;
  institutionId: string;
  description: string;
}

export interface Course {
  id: string;
  name: string;
  acronym: string;
  institutionId: string;
  departmentId: string;
  duration: number; // em períodos
  totalHours: number;
  description: string;
  grades: Grade[];
}

export interface Grade {
  id: string;
  name: string;
  year: string;
  courseId: string;
  isActive: boolean;
  periods: Period[];
}

export interface Period {
  number: number;
  title: string;
  subjects: Subject[];
}

export interface Subject {
  id: string;
  name: string;
  acronym: string;
  hours: number;
  prerequisites: string[]; // IDs das disciplinas pré-requisito
  unlocks: string[]; // IDs das disciplinas que esta libera
  difficulty: "easy" | "medium" | "hard";
  obrigatoria: boolean; // Se a disciplina é obrigatória ou optativa
  courseId: string;
  gradeId: string;
  periodNumber: number;
}

export interface Professor {
  id: string;
  name: string;
  email?: string;
  departmentId: string;
  institutionId: string;
  specialties: string[]; // IDs das disciplinas que leciona
  rating: number;
  totalRatings: number;
  approvalRate: number;
  subjects: ProfessorSubject[];
}

export interface ProfessorSubject {
  professorId: string;
  subjectId: string;
  institutionId: string;
  courseId: string;
  gradeId: string;
  isActive: boolean;
}

// ===== INTERFACES DE FEEDBACK =====

export interface SubjectFeedback {
  id: string;
  subjectId: string;
  professorId?: string;
  userId: string;
  rating: number;
  difficulty: number;
  workload: number;
  didactics: number;
  comment: string;
  createdAt: Date;
  isAnonymous: boolean;
}

export interface ProfessorFeedback {
  id: string;
  professorId: string;
  userId: string;
  rating: number;
  difficulty: number;
  workload: number;
  didactics: number;
  comment: string;
  createdAt: Date;
  isAnonymous: boolean;
}

// ===== INTERFACES DE USUÁRIO =====

export interface User {
  id: string;
  name: string;
  email: string;
  institutionId: string;
  courseId: string;
  gradeId: string;
  enrollmentYear: number;
  progress: UserProgress;
}

export interface UserProgress {
  userId: string;
  approvedSubjects: string[]; // IDs das disciplinas aprovadas
  failedSubjects: string[]; // IDs das disciplinas reprovadas
  currentSubjects: string[]; // IDs das disciplinas cursando
  goals: UserGoal[];
}

export interface UserGoal {
  id: string;
  userId: string;
  subjectId: string;
  targetGrade: number;
  targetPeriod: number;
  isCompleted: boolean;
}

// ===== INTERFACES DE PROVAS =====

export interface Exam {
  id: string;
  subjectId: string;
  professorId?: string;
  userId: string;
  title: string;
  year: number;
  period: number;
  fileUrl: string;
  fileType: string;
  downloads: number;
  isApproved: boolean;
  createdAt: Date;
}

// ===== INTERFACES DE GAMIFICAÇÃO =====

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "subject" | "period" | "course" | "special";
  requirements: AchievementRequirement[];
}

export interface AchievementRequirement {
  type:
    | "subjects_approved"
    | "periods_completed"
    | "feedback_given"
    | "exams_uploaded";
  value: number;
  subjectIds?: string[];
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  earnedAt: Date;
}

// ===== TIPOS UTILITÁRIOS =====

export type Difficulty = "easy" | "medium" | "hard";
export type Region = "Norte" | "Nordeste" | "Centro-Oeste" | "Sudeste" | "Sul";
export type FeedbackType = "subject" | "professor";

// ===== INTERFACES DE FILTROS =====

export interface FilterOptions {
  region?: string;
  institution?: string;
  course?: string;
  grade?: string;
  difficulty?: Difficulty;
}

// ===== INTERFACES DE ESTATÍSTICAS =====

export interface SubjectStats {
  subjectId: string;
  totalFeedbacks: number;
  averageRating: number;
  averageDifficulty: number;
  averageWorkload: number;
  totalExams: number;
  professorsCount: number;
}

export interface ProfessorStats {
  professorId: string;
  totalFeedbacks: number;
  averageRating: number;
  averageDifficulty: number;
  averageWorkload: number;
  approvalRate: number;
  subjectsCount: number;
}

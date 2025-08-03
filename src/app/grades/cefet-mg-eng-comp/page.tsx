"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface DisciplinaData {
  nome: string;
  sigla: string;
  cargaHoraria: number;
  requisitos: string[];
  libera: string[];
  dificuldade: "easy" | "medium" | "hard";
  resumo?: string;
  professores?: ProfessorData[];
}

interface ProfessorData {
  nome: string;
  avaliacao: number;
  totalAvaliacoes: number;
  aprovacao: number;
}

interface PeriodoData {
  numero: number;
  titulo: string;
  disciplinas: DisciplinaData[];
}

interface GradeData {
  id: string;
  nome: string;
  ano: string;
  periodos: PeriodoData[];
}

export default function CEFETMGEngCompPage() {
  const [selectedGrade, setSelectedGrade] = useState("nova");
  const [filteredGrade, setFilteredGrade] = useState<GradeData | null>(null);
  const [expandedDisciplina, setExpandedDisciplina] = useState<string | null>(
    null
  );

  // Dados das grades do CEFET-MG
  const gradesData: GradeData[] = [
    {
      id: "nova",
      nome: "Grade Nova",
      ano: "2023 em diante",
      periodos: [
        {
          numero: 1,
          titulo: "1º Período",
          disciplinas: [
            {
              nome: "Cálculo com Funções de Uma Variável Real",
              sigla: "CFUVR",
              cargaHoraria: 90,
              requisitos: ["Nenhum"],
              libera: ["IS"],
              dificuldade: "hard",
              resumo:
                "Resumo em construção. Esta disciplina aborda os fundamentos do cálculo diferencial e integral de funções de uma variável real.",
              professores: [
                {
                  nome: "Prof. Silva",
                  avaliacao: 4.2,
                  totalAvaliacoes: 156,
                  aprovacao: 89,
                },
                {
                  nome: "Prof. Santos",
                  avaliacao: 3.8,
                  totalAvaliacoes: 98,
                  aprovacao: 75,
                },
                {
                  nome: "Prof. Oliveira",
                  avaliacao: 4.5,
                  totalAvaliacoes: 203,
                  aprovacao: 92,
                },
              ],
            },
            {
              nome: "Geometria Analítica e Álgebra Linear",
              sigla: "GAAL",
              cargaHoraria: 90,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "hard",
              resumo:
                "Resumo em construção. Estuda vetores, retas, planos e transformações lineares.",
              professores: [
                {
                  nome: "Prof. Costa",
                  avaliacao: 4.1,
                  totalAvaliacoes: 134,
                  aprovacao: 82,
                },
                {
                  nome: "Prof. Lima",
                  avaliacao: 3.9,
                  totalAvaliacoes: 87,
                  aprovacao: 78,
                },
              ],
            },
            {
              nome: "Matemática Discreta",
              sigla: "Discreta",
              cargaHoraria: 60,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "medium",
              resumo:
                "Resumo em construção. Fundamentos da matemática discreta aplicada à computação.",
              professores: [
                {
                  nome: "Prof. Ferreira",
                  avaliacao: 4.3,
                  totalAvaliacoes: 112,
                  aprovacao: 85,
                },
              ],
            },
            {
              nome: "Lógica de Programação",
              sigla: "LDP",
              cargaHoraria: 60,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "medium",
              resumo:
                "Resumo em construção. Introdução aos conceitos fundamentais de programação.",
              professores: [
                {
                  nome: "Prof. Almeida",
                  avaliacao: 4.6,
                  totalAvaliacoes: 189,
                  aprovacao: 94,
                },
                {
                  nome: "Prof. Rodrigues",
                  avaliacao: 4.0,
                  totalAvaliacoes: 145,
                  aprovacao: 88,
                },
              ],
            },
            {
              nome: "Laboratório de Lógica de Programação",
              sigla: "Lab LDP",
              cargaHoraria: 30,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "medium",
              resumo:
                "Resumo em construção. Práticas de programação em laboratório.",
              professores: [
                {
                  nome: "Prof. Almeida",
                  avaliacao: 4.6,
                  totalAvaliacoes: 189,
                  aprovacao: 94,
                },
                {
                  nome: "Prof. Rodrigues",
                  avaliacao: 4.0,
                  totalAvaliacoes: 145,
                  aprovacao: 88,
                },
              ],
            },
            {
              nome: "Metodologia Científica",
              sigla: "Metodologia",
              cargaHoraria: 30,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "medium",
              resumo:
                "Resumo em construção. Métodos e técnicas de pesquisa científica.",
              professores: [
                {
                  nome: "Prof. Martins",
                  avaliacao: 4.1,
                  totalAvaliacoes: 76,
                  aprovacao: 91,
                },
              ],
            },
            {
              nome: "Contexto Social e Profissional da Engenharia de Computação",
              sigla: "Contexto",
              cargaHoraria: 30,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "easy",
              resumo:
                "Resumo em construção. Aspectos sociais e profissionais da engenharia.",
              professores: [
                {
                  nome: "Prof. Pereira",
                  avaliacao: 4.4,
                  totalAvaliacoes: 89,
                  aprovacao: 96,
                },
              ],
            },
          ],
        },
        {
          numero: 2,
          titulo: "2º Período",
          disciplinas: [
            {
              nome: "Cálculo com Funções de Várias Variáveis Reais 1",
              sigla: "CFVVR1",
              cargaHoraria: 90,
              requisitos: ["CFUVR", "GAAL"],
              libera: ["Cálculo III", "Física II"],
              dificuldade: "hard",
              resumo:
                "Resumo em construção. Extensão do cálculo para funções de múltiplas variáveis.",
              professores: [
                {
                  nome: "Prof. Silva",
                  avaliacao: 4.2,
                  totalAvaliacoes: 156,
                  aprovacao: 89,
                },
                {
                  nome: "Prof. Santos",
                  avaliacao: 3.8,
                  totalAvaliacoes: 98,
                  aprovacao: 75,
                },
              ],
            },
            {
              nome: "Integração e Séries",
              sigla: "IS",
              cargaHoraria: 90,
              requisitos: ["CFUVR"],
              libera: ["Estatística"],
              dificuldade: "hard",
              resumo:
                "Resumo em construção. Técnicas de integração e séries numéricas.",
              professores: [
                {
                  nome: "Prof. Costa",
                  avaliacao: 4.1,
                  totalAvaliacoes: 134,
                  aprovacao: 82,
                },
              ],
            },
            {
              nome: "Fundamentos de Mecânica",
              sigla: "Fund Mec",
              cargaHoraria: 90,
              requisitos: ["CFUVR", "GAAL"],
              libera: [
                "Fundamentos de Oscilações, Fluidos e Termodinâmica (OFT)",
                "Física Experimental - MOFT",
              ],
              dificuldade: "hard",
              resumo:
                "Resumo em construção. Princípios fundamentais da mecânica clássica.",
              professores: [
                {
                  nome: "Prof. Lima",
                  avaliacao: 3.9,
                  totalAvaliacoes: 87,
                  aprovacao: 78,
                },
                {
                  nome: "Prof. Ferreira",
                  avaliacao: 4.3,
                  totalAvaliacoes: 112,
                  aprovacao: 85,
                },
              ],
            },
            {
              nome: "Programação Orientada a Objetos",
              sigla: "POO",
              cargaHoraria: 60,
              requisitos: ["LDP", "Lab LDP"],
              libera: ["Estruturas de Dados"],
              dificuldade: "medium",
              resumo:
                "Resumo em construção. Paradigmas de programação orientada a objetos.",
              professores: [
                {
                  nome: "Prof. Almeida",
                  avaliacao: 4.6,
                  totalAvaliacoes: 189,
                  aprovacao: 94,
                },
                {
                  nome: "Prof. Rodrigues",
                  avaliacao: 4.0,
                  totalAvaliacoes: 145,
                  aprovacao: 88,
                },
              ],
            },
            {
              nome: "Laboratório de Programação Orientada a Objetos",
              sigla: "Lab POO",
              cargaHoraria: 30,
              requisitos: ["LDP", "Lab LDP"],
              libera: [],
              dificuldade: "medium",
              resumo: "Resumo em construção. Práticas de POO em laboratório.",
              professores: [
                {
                  nome: "Prof. Almeida",
                  avaliacao: 4.6,
                  totalAvaliacoes: 189,
                  aprovacao: 94,
                },
                {
                  nome: "Prof. Rodrigues",
                  avaliacao: 4.0,
                  totalAvaliacoes: 145,
                  aprovacao: 88,
                },
              ],
            },
            {
              nome: "Sistemas Digitais para Computação",
              sigla: "SD",
              cargaHoraria: 60,
              requisitos: ["LDP", "Lab LDP"],
              libera: [],
              dificuldade: "medium",
              resumo:
                "Resumo em construção. Fundamentos de sistemas digitais e lógica.",
              professores: [
                {
                  nome: "Prof. Martins",
                  avaliacao: 4.1,
                  totalAvaliacoes: 76,
                  aprovacao: 91,
                },
                {
                  nome: "Prof. Pereira",
                  avaliacao: 4.4,
                  totalAvaliacoes: 89,
                  aprovacao: 96,
                },
              ],
            },
            {
              nome: "Laboratório de Sistemas Digitais para Computação",
              sigla: "Lab SD",
              cargaHoraria: 30,
              requisitos: ["LDP", "Lab LDP"],
              libera: [],
              dificuldade: "medium",
              resumo:
                "Resumo em construção. Práticas de sistemas digitais em laboratório.",
              professores: [
                {
                  nome: "Prof. Martins",
                  avaliacao: 4.1,
                  totalAvaliacoes: 76,
                  aprovacao: 91,
                },
                {
                  nome: "Prof. Pereira",
                  avaliacao: 4.4,
                  totalAvaliacoes: 89,
                  aprovacao: 96,
                },
              ],
            },
            {
              nome: "Filosofia da Tecnologia",
              sigla: "Filo Tec",
              cargaHoraria: 30,
              requisitos: [],
              libera: [],
              dificuldade: "easy",
              resumo:
                "Resumo em construção. Reflexões filosóficas sobre tecnologia.",
              professores: [
                {
                  nome: "Prof. Costa",
                  avaliacao: 4.1,
                  totalAvaliacoes: 134,
                  aprovacao: 82,
                },
              ],
            },
          ],
        },
        {
          numero: 3,
          titulo: "3º Período",
          disciplinas: [
            {
              nome: "Cálculo com Funções de Várias Variáveis Reais 2",
              sigla: "CFVVR2",
              cargaHoraria: 60,
              requisitos: ["CFVVR1", "IS"],
              libera: [],
              dificuldade: "hard",
              resumo:
                "Resumo em construção. Continuação do cálculo multivariável.",
              professores: [
                {
                  nome: "Prof. Silva",
                  avaliacao: 4.2,
                  totalAvaliacoes: 156,
                  aprovacao: 89,
                },
                {
                  nome: "Prof. Santos",
                  avaliacao: 3.8,
                  totalAvaliacoes: 98,
                  aprovacao: 75,
                },
              ],
            },
            {
              nome: "Equações Diferenciais Ordinárias",
              sigla: "EDO",
              cargaHoraria: 60,
              requisitos: ["CFVVR1", "IS"],
              libera: ["Sinais e Sistemas", "Laboratório de Sinais e Sistemas"],
              dificuldade: "hard",
              resumo:
                "Resumo em construção. Resolução e aplicações de equações diferenciais.",
              professores: [
                {
                  nome: "Prof. Costa",
                  avaliacao: 4.1,
                  totalAvaliacoes: 134,
                  aprovacao: 82,
                },
                {
                  nome: "Prof. Lima",
                  avaliacao: 3.9,
                  totalAvaliacoes: 87,
                  aprovacao: 78,
                },
              ],
            },
            {
              nome: "Algoritmos e Estruturas de Dados 1",
              sigla: "AEDS1",
              cargaHoraria: 60,
              requisitos: ["POO", "Lab POO"],
              libera: [],
              dificuldade: "hard",
              resumo:
                "Resumo em construção. Estruturas de dados e algoritmos fundamentais.",
              professores: [
                {
                  nome: "Prof. Almeida",
                  avaliacao: 4.6,
                  totalAvaliacoes: 189,
                  aprovacao: 94,
                },
                {
                  nome: "Prof. Rodrigues",
                  avaliacao: 4.0,
                  totalAvaliacoes: 145,
                  aprovacao: 88,
                },
              ],
            },
            {
              nome: "Laboratório de Algoritmos e Estruturas de Dados 1",
              sigla: "Lab AEDS1",
              cargaHoraria: 30,
              requisitos: ["POO", "Lab POO"],
              libera: [],
              dificuldade: "hard",
              resumo:
                "Resumo em construção. Implementação prática de estruturas de dados.",
              professores: [
                {
                  nome: "Prof. Almeida",
                  avaliacao: 4.6,
                  totalAvaliacoes: 189,
                  aprovacao: 94,
                },
                {
                  nome: "Prof. Rodrigues",
                  avaliacao: 4.0,
                  totalAvaliacoes: 145,
                  aprovacao: 88,
                },
              ],
            },
            {
              nome: "Arquitetura e Organização de Computadores 1",
              sigla: "AOC1",
              cargaHoraria: 60,
              requisitos: ["SD", "Lab SD"],
              libera: ["Teoria da Computação"],
              dificuldade: "medium",
              resumo:
                "Resumo em construção. Arquitetura interna dos computadores.",
              professores: [
                {
                  nome: "Prof. Martins",
                  avaliacao: 4.1,
                  totalAvaliacoes: 76,
                  aprovacao: 91,
                },
                {
                  nome: "Prof. Pereira",
                  avaliacao: 4.4,
                  totalAvaliacoes: 89,
                  aprovacao: 96,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "antiga",
      nome: "Grade Antiga",
      ano: "até 2022",
      periodos: [
        {
          numero: 1,
          titulo: "1º Período",
          disciplinas: [
            {
              nome: "Cálculo 1",
              sigla: "Cálculo 1",
              cargaHoraria: 90,
              requisitos: ["Nenhum"],
              libera: ["Cálculo 2", "Física 1"],
              dificuldade: "hard",
              resumo:
                "Resumo em construção. Cálculo diferencial e integral básico.",
              professores: [
                {
                  nome: "Prof. Silva",
                  avaliacao: 4.2,
                  totalAvaliacoes: 156,
                  aprovacao: 89,
                },
                {
                  nome: "Prof. Santos",
                  avaliacao: 3.8,
                  totalAvaliacoes: 98,
                  aprovacao: 75,
                },
              ],
            },
            {
              nome: "Geometria Analítica e Álgebra Vetorial",
              sigla: "GAAV",
              cargaHoraria: 90,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "hard",
              resumo:
                "Resumo em construção. Vetores, retas, planos e transformações.",
              professores: [
                {
                  nome: "Prof. Costa",
                  avaliacao: 4.1,
                  totalAvaliacoes: 134,
                  aprovacao: 82,
                },
                {
                  nome: "Prof. Lima",
                  avaliacao: 3.9,
                  totalAvaliacoes: 87,
                  aprovacao: 78,
                },
              ],
            },
            {
              nome: "Matemática Discreta",
              sigla: "Discreta",
              cargaHoraria: 60,
              requisitos: ["Nenhum"],
              libera: ["Cálculo II"],
              dificuldade: "medium",
              resumo:
                "Resumo em construção. Matemática discreta para computação.",
              professores: [
                {
                  nome: "Prof. Ferreira",
                  avaliacao: 4.3,
                  totalAvaliacoes: 112,
                  aprovacao: 85,
                },
              ],
            },
            {
              nome: "Programação de Computadores I",
              sigla: "PC",
              cargaHoraria: 60,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "medium",
              resumo:
                "Resumo em construção. Introdução à programação estruturada.",
              professores: [
                {
                  nome: "Prof. Almeida",
                  avaliacao: 4.6,
                  totalAvaliacoes: 189,
                  aprovacao: 94,
                },
                {
                  nome: "Prof. Rodrigues",
                  avaliacao: 4.0,
                  totalAvaliacoes: 145,
                  aprovacao: 88,
                },
              ],
            },
            {
              nome: "Laboratório de Programação de Computadores I",
              sigla: "Lab PC",
              cargaHoraria: 60,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "medium",
              resumo:
                "Resumo em construção. Práticas de programação em laboratório.",
              professores: [
                {
                  nome: "Prof. Almeida",
                  avaliacao: 4.6,
                  totalAvaliacoes: 189,
                  aprovacao: 94,
                },
                {
                  nome: "Prof. Rodrigues",
                  avaliacao: 4.0,
                  totalAvaliacoes: 145,
                  aprovacao: 88,
                },
              ],
            },
            {
              nome: "Introdução à Engenharia de Computação",
              sigla: "IEC",
              cargaHoraria: 30,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "easy",
              resumo:
                "Resumo em construção. Visão geral da engenharia de computação.",
              professores: [
                {
                  nome: "Prof. Martins",
                  avaliacao: 4.1,
                  totalAvaliacoes: 76,
                  aprovacao: 91,
                },
              ],
            },
            {
              nome: "Português Instrumental",
              sigla: "Português",
              cargaHoraria: 30,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "easy",
              resumo: "Resumo em construção. Comunicação técnica e científica.",
              professores: [
                {
                  nome: "Prof. Pereira",
                  avaliacao: 4.4,
                  totalAvaliacoes: 89,
                  aprovacao: 96,
                },
              ],
            },
            {
              nome: "Metodologia Cientifica",
              sigla: "Metodologia",
              cargaHoraria: 30,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "medium",
              resumo: "Resumo em construção. Métodos de pesquisa científica.",
              professores: [
                {
                  nome: "Prof. Martins",
                  avaliacao: 4.1,
                  totalAvaliacoes: 76,
                  aprovacao: 91,
                },
              ],
            },
          ],
        },
        {
          numero: 2,
          titulo: "2º Período",
          disciplinas: [
            {
              nome: "Cálculo 2",
              sigla: "Cálculo 2",
              cargaHoraria: 90,
              requisitos: ["Cálculo I"],
              libera: ["Cálculo III", "Física I"],
              dificuldade: "hard",
              resumo: "Resumo em construção. Cálculo integral e aplicações.",
              professores: [
                {
                  nome: "Prof. Silva",
                  avaliacao: 4.2,
                  totalAvaliacoes: 156,
                  aprovacao: 89,
                },
                {
                  nome: "Prof. Santos",
                  avaliacao: 3.8,
                  totalAvaliacoes: 98,
                  aprovacao: 75,
                },
              ],
            },
            {
              nome: "Física I",
              sigla: "Física I",
              cargaHoraria: 90,
              requisitos: ["Cálculo I"],
              libera: ["Física II"],
              dificuldade: "hard",
              resumo:
                "Resumo em construção. Mecânica clássica e termodinâmica.",
              professores: [
                {
                  nome: "Prof. Costa",
                  avaliacao: 4.1,
                  totalAvaliacoes: 134,
                  aprovacao: 82,
                },
                {
                  nome: "Prof. Lima",
                  avaliacao: 3.9,
                  totalAvaliacoes: 87,
                  aprovacao: 78,
                },
              ],
            },
            {
              nome: "Programação de Computadores 2",
              sigla: "PC2",
              cargaHoraria: 60,
              requisitos: ["PC2"],
              libera: ["Estruturas de Dados"],
              dificuldade: "medium",
              resumo:
                "Resumo em construção. Programação avançada e estruturas.",
              professores: [
                {
                  nome: "Prof. Almeida",
                  avaliacao: 4.6,
                  totalAvaliacoes: 189,
                  aprovacao: 94,
                },
                {
                  nome: "Prof. Rodrigues",
                  avaliacao: 4.0,
                  totalAvaliacoes: 145,
                  aprovacao: 88,
                },
              ],
            },
            {
              nome: "Laboratório de Programação de Computadores 2",
              sigla: "Lab PC2",
              cargaHoraria: 30,
              requisitos: ["Lab PC2"],
              libera: ["Estruturas de Dados"],
              dificuldade: "medium",
              resumo:
                "Resumo em construção. Práticas avançadas de programação.",
              professores: [
                {
                  nome: "Prof. Almeida",
                  avaliacao: 4.6,
                  totalAvaliacoes: 189,
                  aprovacao: 94,
                },
                {
                  nome: "Prof. Rodrigues",
                  avaliacao: 4.0,
                  totalAvaliacoes: 145,
                  aprovacao: 88,
                },
              ],
            },
            {
              nome: "Programação Orientada a Objetos",
              sigla: "POO",
              cargaHoraria: 60,
              requisitos: ["LDP"],
              libera: ["Estruturas de Dados"],
              dificuldade: "medium",
              resumo: "Resumo em construção. Paradigmas de programação OO.",
              professores: [
                {
                  nome: "Prof. Almeida",
                  avaliacao: 4.6,
                  totalAvaliacoes: 189,
                  aprovacao: 94,
                },
                {
                  nome: "Prof. Rodrigues",
                  avaliacao: 4.0,
                  totalAvaliacoes: 145,
                  aprovacao: 88,
                },
              ],
            },
            {
              nome: "Programação Orientada a Objetos",
              sigla: "POO",
              cargaHoraria: 60,
              requisitos: ["LDP"],
              libera: ["Estruturas de Dados"],
              dificuldade: "medium",
              resumo: "Resumo em construção. Paradigmas de programação OO.",
              professores: [
                {
                  nome: "Prof. Almeida",
                  avaliacao: 4.6,
                  totalAvaliacoes: 189,
                  aprovacao: 94,
                },
                {
                  nome: "Prof. Rodrigues",
                  avaliacao: 4.0,
                  totalAvaliacoes: 145,
                  aprovacao: 88,
                },
              ],
            },
            {
              nome: "Inglês Instrumental 1",
              sigla: "Inglês",
              cargaHoraria: 30,
              requisitos: [],
              libera: ["Inglês Instrumental 2"],
              dificuldade: "easy",
              resumo: "Resumo em construção. Inglês técnico para engenharia.",
              professores: [
                {
                  nome: "Prof. Pereira",
                  avaliacao: 4.4,
                  totalAvaliacoes: 89,
                  aprovacao: 96,
                },
              ],
            },
          ],
        },
        {
          numero: 3,
          titulo: "3º Período",
          disciplinas: [
            {
              nome: "Cálculo 3",
              sigla: "Cálculo 3",
              cargaHoraria: 90,
              requisitos: ["Cálculo 2"],
              libera: ["Cálculo 4"],
              dificuldade: "hard",
              resumo:
                "Resumo em construção. Cálculo multivariável e aplicações.",
              professores: [
                {
                  nome: "Prof. Silva",
                  avaliacao: 4.2,
                  totalAvaliacoes: 156,
                  aprovacao: 89,
                },
                {
                  nome: "Prof. Santos",
                  avaliacao: 3.8,
                  totalAvaliacoes: 98,
                  aprovacao: 75,
                },
              ],
            },
            {
              nome: "Física 2",
              sigla: "Física 2",
              cargaHoraria: 90,
              requisitos: ["Física I", "Cálculo 2"],
              libera: ["Física 3"],
              dificuldade: "hard",
              resumo: "Resumo em construção. Eletromagnetismo e ondas.",
              professores: [
                {
                  nome: "Prof. Costa",
                  avaliacao: 4.1,
                  totalAvaliacoes: 134,
                  aprovacao: 82,
                },
                {
                  nome: "Prof. Lima",
                  avaliacao: 3.9,
                  totalAvaliacoes: 87,
                  aprovacao: 78,
                },
              ],
            },
            {
              nome: "Estruturas de Dados",
              sigla: "ED",
              cargaHoraria: 60,
              requisitos: ["POO"],
              libera: ["Algoritmos"],
              dificuldade: "hard",
              resumo: "Resumo em construção. Estruturas de dados fundamentais.",
              professores: [
                {
                  nome: "Prof. Almeida",
                  avaliacao: 4.6,
                  totalAvaliacoes: 189,
                  aprovacao: 94,
                },
                {
                  nome: "Prof. Rodrigues",
                  avaliacao: 4.0,
                  totalAvaliacoes: 145,
                  aprovacao: 88,
                },
              ],
            },
            {
              nome: "Estruturas de Dados",
              sigla: "ED",
              cargaHoraria: 60,
              requisitos: ["POO"],
              libera: ["Algoritmos"],
              dificuldade: "hard",
              resumo: "Resumo em construção. Estruturas de dados fundamentais.",
              professores: [
                {
                  nome: "Prof. Almeida",
                  avaliacao: 4.6,
                  totalAvaliacoes: 189,
                  aprovacao: 94,
                },
                {
                  nome: "Prof. Rodrigues",
                  avaliacao: 4.0,
                  totalAvaliacoes: 145,
                  aprovacao: 88,
                },
              ],
            },
            {
              nome: "Estruturas de Dados",
              sigla: "ED",
              cargaHoraria: 60,
              requisitos: ["POO"],
              libera: ["Algoritmos"],
              dificuldade: "hard",
              resumo: "Resumo em construção. Estruturas de dados fundamentais.",
              professores: [
                {
                  nome: "Prof. Almeida",
                  avaliacao: 4.6,
                  totalAvaliacoes: 189,
                  aprovacao: 94,
                },
                {
                  nome: "Prof. Rodrigues",
                  avaliacao: 4.0,
                  totalAvaliacoes: 145,
                  aprovacao: 88,
                },
              ],
            },
            {
              nome: "Estruturas de Dados",
              sigla: "ED",
              cargaHoraria: 60,
              requisitos: ["POO"],
              libera: ["Algoritmos"],
              dificuldade: "hard",
              resumo: "Resumo em construção. Estruturas de dados fundamentais.",
              professores: [
                {
                  nome: "Prof. Almeida",
                  avaliacao: 4.6,
                  totalAvaliacoes: 189,
                  aprovacao: 94,
                },
                {
                  nome: "Prof. Rodrigues",
                  avaliacao: 4.0,
                  totalAvaliacoes: 145,
                  aprovacao: 88,
                },
              ],
            },
            {
              nome: "Estruturas de Dados",
              sigla: "ED",
              cargaHoraria: 60,
              requisitos: ["POO"],
              libera: ["Algoritmos"],
              dificuldade: "hard",
              resumo: "Resumo em construção. Estruturas de dados fundamentais.",
              professores: [
                {
                  nome: "Prof. Almeida",
                  avaliacao: 4.6,
                  totalAvaliacoes: 189,
                  aprovacao: 94,
                },
                {
                  nome: "Prof. Rodrigues",
                  avaliacao: 4.0,
                  totalAvaliacoes: 145,
                  aprovacao: 88,
                },
              ],
            },
            {
              nome: "Métodos Numéricos Computacionais",
              sigla: "MNC",
              cargaHoraria: 60,
              requisitos: ["AL"],
              libera: ["Teoria da Computação"],
              dificuldade: "medium",
              resumo:
                "Resumo em construção. Métodos numéricos para computação.",
              professores: [
                {
                  nome: "Prof. Ferreira",
                  avaliacao: 4.3,
                  totalAvaliacoes: 112,
                  aprovacao: 85,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  // Filtrar grade selecionada
  useEffect(() => {
    const grade = gradesData.find((g) => g.id === selectedGrade);
    setFilteredGrade(grade || null);
  }, [selectedGrade]);

  // Função para expandir/contrair disciplina
  const toggleDisciplina = (disciplinaId: string) => {
    setExpandedDisciplina(
      expandedDisciplina === disciplinaId ? null : disciplinaId
    );
  };

  // Função para renderizar estrelas
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star ${i <= rating ? "filled" : ""}`}
          style={{ color: i <= rating ? "#f2c94c" : "#6c757d" }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="grades-page">
      {/* Hero Section */}
      <section className="grades-hero">
        <div className="container">
          <div className="grades-hero-content">
            <div className="breadcrumb">
              <Link href="/grades" className="breadcrumb-link">
                <i className="fas fa-arrow-left"></i>
                Voltar para Grades
              </Link>
            </div>
            <h1 className="grades-hero-title">
              Engenharia de Computação - CEFET-MG
            </h1>
            <p className="grades-hero-subtitle">
              Campus Nova Gameleira • Belo Horizonte, MG
            </p>
            <div className="grades-hero-stats">
              <div className="stat-item">
                <i className="fas fa-graduation-cap"></i>
                <span>10 Períodos</span>
              </div>
              <div className="stat-item">
                <i className="fas fa-book"></i>
                <span>40+ Disciplinas</span>
              </div>
              <div className="stat-item">
                <i className="fas fa-clock"></i>
                <span>3.600 horas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Selector Section */}
      <section className="grade-selector-section">
        <div className="container">
          <div className="grade-selector">
            <h2>Selecione a Grade Curricular</h2>
            <div className="grade-options">
              <button
                className={`grade-option ${
                  selectedGrade === "nova" ? "active" : ""
                }`}
                onClick={() => setSelectedGrade("nova")}
              >
                <div className="grade-option-content">
                  <h3>Grade Nova</h3>
                  <p>2023 em diante</p>
                  <span className="grade-badge">Atual</span>
                </div>
              </button>
              <button
                className={`grade-option ${
                  selectedGrade === "antiga" ? "active" : ""
                }`}
                onClick={() => setSelectedGrade("antiga")}
              >
                <div className="grade-option-content">
                  <h3>Grade Antiga</h3>
                  <p>até 2022</p>
                  <span className="grade-badge legacy">Legado</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Content Section */}
      {filteredGrade && (
        <section className="grade-content-section">
          <div className="container">
            <div className="grade-header">
              <h2>
                {filteredGrade.nome} ({filteredGrade.ano})
              </h2>
              <p className="grade-description">
                Grade curricular completa do curso de Engenharia de Computação
              </p>
            </div>

            <div className="periodos-grid">
              {filteredGrade.periodos.map((periodo) => (
                <div key={periodo.numero} className="periodo-column">
                  <div className="periodo-header">
                    <h3>{periodo.titulo}</h3>
                    <span className="periodo-disciplinas-count">
                      {periodo.disciplinas.length} disciplina(s)
                    </span>
                  </div>

                  <div className="disciplinas-list">
                    {periodo.disciplinas.map((disciplina, index) => {
                      const disciplinaId = `${periodo.numero}-${index}`;
                      const isExpanded = expandedDisciplina === disciplinaId;

                      return (
                        <div
                          key={index}
                          className={`disciplina-card ${
                            isExpanded ? "expanded" : ""
                          }`}
                          onClick={() => toggleDisciplina(disciplinaId)}
                        >
                          <div className="disciplina-header">
                            <h4>{disciplina.nome}</h4>
                            <span
                              className={`difficulty ${disciplina.dificuldade}`}
                            >
                              {disciplina.dificuldade === "hard"
                                ? "Difícil"
                                : disciplina.dificuldade === "medium"
                                ? "Médio"
                                : "Fácil"}
                            </span>
                          </div>

                          <div className="disciplina-details">
                            <div className="disciplina-info">
                              <span className="sigla">{disciplina.sigla}</span>
                              <span className="carga-horaria">
                                {disciplina.cargaHoraria}h
                              </span>
                            </div>

                            <div className="disciplina-requirements">
                              <strong>Pré-requisitos:</strong>{" "}
                              {disciplina.requisitos.join(", ")}
                            </div>

                            {disciplina.libera.length > 0 && (
                              <div className="disciplina-libera">
                                <strong>Libera:</strong>{" "}
                                {disciplina.libera.join(", ")}
                              </div>
                            )}

                            {/* Conteúdo Expandido */}
                            {isExpanded && (
                              <div className="disciplina-expanded">
                                <div className="disciplina-resumo">
                                  <h5>Resumo da Disciplina</h5>
                                  <p>{disciplina.resumo}</p>
                                </div>

                                {disciplina.professores && (
                                  <div className="professores-section">
                                    <h5>Professores</h5>
                                    <div className="professores-list">
                                      {disciplina.professores.map(
                                        (professor, profIndex) => (
                                          <div
                                            key={profIndex}
                                            className="professor-item"
                                          >
                                            <div className="professor-info">
                                              <h6>{professor.nome}</h6>
                                              <div className="professor-rating">
                                                <div className="stars">
                                                  {renderStars(
                                                    professor.avaliacao
                                                  )}
                                                </div>
                                                <span className="rating-text">
                                                  {professor.avaliacao}/5.0
                                                </span>
                                              </div>
                                              <div className="professor-stats">
                                                <span>
                                                  {professor.totalAvaliacoes}{" "}
                                                  avaliações
                                                </span>
                                                <span>
                                                  {professor.aprovacao}%
                                                  aprovação
                                                </span>
                                              </div>
                                            </div>
                                            <button className="btn-ver-feedback">
                                              Ver Feedback
                                            </button>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="grades-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Precisa de mais informações?</h2>
            <p>
              Entre em contato com a coordenação do curso ou acesse o site
              oficial
            </p>
            <div className="cta-buttons">
              <Link href="/construcao" className="btn-primary btn-large">
                Site Oficial
              </Link>
              <Link href="/construcao" className="btn-secondary btn-large">
                Contato
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

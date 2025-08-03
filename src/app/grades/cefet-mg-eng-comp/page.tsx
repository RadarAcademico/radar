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
            },
            {
              nome: "Geometria Analítica e Álgebra Linear",
              sigla: "GAAL",
              cargaHoraria: 90,
              requisitos: ["Nenhum"],
              libera: ["Algebra Linear"],
              dificuldade: "hard",
            },
            {
              nome: "Matemática Discreta",
              sigla: "Discreta",
              cargaHoraria: 60,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "medium",
            },
            {
              nome: "Lógica de Programação",
              sigla: "LDP",
              cargaHoraria: 60,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "medium",
            },
            {
              nome: "Laboratório de Lógica de Programação",
              sigla: "Lab LDP",
              cargaHoraria: 30,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "medium",
            },
            {
              nome: "Metodologia Científica",
              sigla: "Metodologia",
              cargaHoraria: 30,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "medium",
            },
            {
              nome: "Contexto Social e Profissional da Engenharia de Computação",
              sigla: "Contexto",
              cargaHoraria: 30,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "easy",
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
              libera: [],
              dificuldade: "hard",
            },
            {
              nome: "Integração e Séries",
              sigla: "IS",
              cargaHoraria: 90,
              requisitos: ["CFUVR"],
              libera: ["Estatística"],
              dificuldade: "hard",
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
            },
            {
              nome: "Programação Orientada a Objetos",
              sigla: "POO",
              cargaHoraria: 60,
              requisitos: ["LDP", "Lab LDP"],
              libera: [],
              dificuldade: "medium",
            },
            {
              nome: "Laboratório de Programação Orientada a Objetos",
              sigla: "Lab POO",
              cargaHoraria: 30,
              requisitos: ["LDP", "Lab LDP"],
              libera: [],
              dificuldade: "medium",
            },
            {
              nome: "Sistemas Digitais para Computação",
              sigla: "SD",
              cargaHoraria: 60,
              requisitos: ["LDP", "Lab LDP"],
              libera: [],
              dificuldade: "hard",
            },
            {
              nome: "Laboratório de Sistemas Digitais para Computação",
              sigla: "Lab SD",
              cargaHoraria: 30,
              requisitos: ["LDP", "Lab LDP"],
              libera: [],
              dificuldade: "medium",
            },
            {
              nome: "Filosofia da Tecnologia",
              sigla: "Filo Tec",
              cargaHoraria: 30,
              requisitos: [],
              libera: [],
              dificuldade: "easy",
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
            },
            {
              nome: "Equações Diferenciais Ordinárias",
              sigla: "EDO",
              cargaHoraria: 60,
              requisitos: ["CFVVR1", "IS"],
              libera: [],
              dificuldade: "hard",
            },
            {
              nome: "Algoritmos e Estruturas de Dados 1",
              sigla: "AEDS1",
              cargaHoraria: 60,
              requisitos: ["POO", "Lab POO"],
              libera: [],
              dificuldade: "hard",
            },
            {
              nome: "Laboratório de Algoritmos e Estruturas de Dados 1",
              sigla: "Lab AEDS1",
              cargaHoraria: 30,
              requisitos: ["POO", "Lab POO"],
              libera: [],
              dificuldade: "hard",
            },
            {
              nome: "Arquitetura e Organização de Computadores 1",
              sigla: "AOC1",
              cargaHoraria: 60,
              requisitos: ["SD", "Lab SD"],
              libera: ["Sistemas Operacionais"],
              dificuldade: "medium",
            },
            {
              nome: "Laboratório de Arquitetura e Organização de Computadores 1",
              sigla: "Lab AOC1",
              cargaHoraria: 30,
              requisitos: ["SD", "Lab SD"],
              libera: [],
              dificuldade: "medium",
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
            },
            {
              nome: "Geometria Analítica e Álgebra Vetorial",
              sigla: "GAAV",
              cargaHoraria: 90,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "hard",
            },
            {
              nome: "Matemática Discreta",
              sigla: "Discreta",
              cargaHoraria: 60,
              requisitos: ["Nenhum"],
              libera: ["Cálculo II"],
              dificuldade: "medium",
            },
            {
              nome: "Programação de Computadores I",
              sigla: "PC",
              cargaHoraria: 60,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "medium",
            },
            {
              nome: "Laboratório de Programação de Computadores I",
              sigla: "Lab PC",
              cargaHoraria: 60,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "medium",
            },
            {
              nome: "Introdução à Engenharia de Computação",
              sigla: "IEC",
              cargaHoraria: 30,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "easy",
            },
            {
              nome: "Português Instrumental",
              sigla: "Português",
              cargaHoraria: 30,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "easy",
            },
            {
              nome: "Metodologia Cientifica",
              sigla: "Metodologia",
              cargaHoraria: 30,
              requisitos: ["Nenhum"],
              libera: [],
              dificuldade: "medium",
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
              cargaHoraria: 60,
              requisitos: ["Cálculo I"],
              libera: ["Cálculo III"],
              dificuldade: "hard",
            },
            {
              nome: "Física I",
              sigla: "Física I",
              cargaHoraria: 60,
              requisitos: ["Cálculo I"],
              libera: [],
              dificuldade: "hard",
            },
            {
              nome: "Programação de Computadores 2",
              sigla: "PC2",
              cargaHoraria: 60,
              requisitos: ["PC1", "Lab PC1"],
              libera: [],
              dificuldade: "medium",
            },
            {
              nome: "Laboratório de Programação de Computadores 2",
              sigla: "Lab PC2",
              cargaHoraria: 30,
              requisitos: ["PC2", "Lab PC2"],
              libera: [],
              dificuldade: "medium",
            },
            {
              nome: "Sistemas Digitais para Computação",
              sigla: "SD",
              cargaHoraria: 60,
              requisitos: ["PC1", "Lab PC1"],
              libera: [],
              dificuldade: "medium",
            },
            {
              nome: "Laboratório de Sistemas Digitais para Computação",
              sigla: "Lab SD",
              cargaHoraria: 30,
              requisitos: ["PC1", "Lab PC1"],
              libera: [],
              dificuldade: "medium",
            },
            {
              nome: "Computação Gráfica",
              sigla: "CG",
              cargaHoraria: 60,
              requisitos: ["LDP"],
              libera: [],
              dificuldade: "medium",
            },
            {
              nome: "Inglês Instrumental 1",
              sigla: "Inglês",
              cargaHoraria: 30,
              requisitos: [],
              libera: ["Inglês Instrumental 2"],
              dificuldade: "easy",
            },
            {
              nome: "Filosofia da Tecnologia",
              sigla: "Filo Tec",
              cargaHoraria: 30,
              requisitos: [],
              libera: [],
              dificuldade: "easy",
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
            },
            {
              nome: "Física 2",
              sigla: "Física 2",
              cargaHoraria: 90,
              requisitos: ["Física I", "Cálculo 2"],
              libera: ["Física 3"],
              dificuldade: "hard",
            },
            {
              nome: "Algoritmos e Estruturas de Dados I",
              sigla: "AEDS1",
              cargaHoraria: 60,
              requisitos: ["PC2", "Lab PC2"],
              libera: [],
              dificuldade: "hard",
            },
            {
              nome: "Laboratório de Algoritmos e Estruturas de Dados I",
              sigla: "Lab AEDS1",
              cargaHoraria: 30,
              requisitos: ["PC2", "Lab PC2"],
              libera: [],
              dificuldade: "hard",
            },
            {
              nome: "Métodos Numéricos Computacionais",
              sigla: "MNC",
              cargaHoraria: 60,
              requisitos: ["AL"],
              libera: [
                "Métodos Numéricos Computacionais Avançados",
                "Modelagem de Sistemas Dinâmicos",
                "Controle de Sistemas Dinâmicos",
                "Lab. de Controle de Sistemas Dinâmicos",
                "Modelagem de Sistemas Dinâmicos",
                "Introdução à Economia",
              ],
              dificuldade: "medium",
            },

            {
              nome: "Arquitetura e Organização de Computadores I",
              sigla: "AOC1",
              cargaHoraria: 60,
              requisitos: ["SD", "Lab SD"],
              libera: [],
              dificuldade: "hard",
            },
            {
              nome: "Laboratório de Arquitetura e Organização de Computadores I",
              sigla: "Lab AOC1",
              cargaHoraria: 30,
              requisitos: ["SD", "Lab SD"],
              libera: [],
              dificuldade: "hard",
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
                    {periodo.disciplinas.map((disciplina, index) => (
                      <div key={index} className="disciplina-card">
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
                        </div>
                      </div>
                    ))}
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

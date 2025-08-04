"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { dataService } from "../../../lib/services/dataService";
import { Grade } from "../../../lib/types";

export default function CEFETMGEngCompPage() {
  const [selectedGrade, setSelectedGrade] = useState("nova");
  const [grade, setGrade] = useState<Grade | null>(null);
  const [loading, setLoading] = useState(true);
  const [availableGrades, setAvailableGrades] = useState<string[]>([]);

  // Scroll states
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGrade = async () => {
      setLoading(true);
      try {
        console.log("Carregando grade:", selectedGrade);
        const data = await dataService.loadGrade(
          "cefet-mg",
          "engenharia-computacao",
          selectedGrade
        );
        console.log("Grade carregada:", data);
        setGrade(data);
      } catch (error) {
        console.error("Erro ao carregar grade:", error);
      } finally {
        setLoading(false);
      }
    };

    const loadAvailableGrades = async () => {
      try {
        console.log("Carregando grades disponíveis...");
        const grades = await dataService.getAvailableGrades(
          "cefet-mg",
          "engenharia-computacao"
        );
        console.log("Grades disponíveis:", grades);
        setAvailableGrades(grades.map((g) => g.id));
      } catch (error) {
        console.error("Erro ao carregar grades disponíveis:", error);
      }
    };

    loadGrade();
    loadAvailableGrades();
  }, [selectedGrade]);

  // Scroll functions
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);
      checkScrollPosition();

      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, [grade]);

  if (loading) {
    return (
      <div className="grades-page">
        <div className="container">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Carregando grade curricular...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!grade) {
    return (
      <div className="grades-page">
        <div className="container">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">
              Erro ao carregar grade
            </h1>
            <p className="text-gray-400">
              Não foi possível carregar a grade curricular solicitada.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const totalSubjects = grade.periods.reduce(
    (total, period) => total + period.subjects.length,
    0
  );
  const totalHours = grade.periods.reduce(
    (total, period) =>
      total + period.subjects.reduce((sum, subject) => sum + subject.hours, 0),
    0
  );

  return (
    <div className="grades-page">
      {/* Hero Section */}
      <section className="grades-hero">
        <div className="container">
          <div className="grades-hero-content">
            <div className="breadcrumb">
              <Link href="/grades" className="breadcrumb-link">
                <i className="fas fa-arrow-left"></i>Voltar para Grades
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
                <span>{grade.periods.length} Períodos</span>
              </div>
              <div className="stat-item">
                <i className="fas fa-book"></i>
                <span>{totalSubjects}+ Disciplinas</span>
              </div>
              <div className="stat-item">
                <i className="fas fa-clock"></i>
                <span>{totalHours.toLocaleString()} horas</span>
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
              {availableGrades.map((gradeId) => (
                <button
                  key={gradeId}
                  onClick={() => setSelectedGrade(gradeId)}
                  className={`grade-option ${
                    selectedGrade === gradeId ? "active" : ""
                  }`}
                >
                  <div className="grade-option-content">
                    <h3>
                      {gradeId === "nova" ? "Grade Nova" : "Grade Antiga"}
                    </h3>
                    <p>{gradeId === "nova" ? "2023 em diante" : "até 2022"}</p>
                    <span
                      className={`grade-badge ${
                        gradeId === "nova" ? "" : "legacy"
                      }`}
                    >
                      {gradeId === "nova" ? "Atual" : "Legado"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grade Content Section */}
      <section className="grade-content-section">
        <div className="container">
          {/* Grade Header */}
          <div className="grade-header">
            <h2>Grade Curricular</h2>
            <p className="grade-description">
              Confira todas as disciplinas organizadas por período
            </p>
          </div>

          {/* Periods Container with Horizontal Scroll */}
          <div className="periodos-wrapper">
            {/* Scroll Arrows */}
            <button
              className={`scroll-arrow left ${showLeftArrow ? "visible" : ""}`}
              onClick={scrollLeft}
              aria-label="Rolar para a esquerda"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            <button
              className={`scroll-arrow right ${
                showRightArrow ? "visible" : ""
              }`}
              onClick={scrollRight}
              aria-label="Rolar para a direita"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Gradient Overlays */}
            <div
              className={`scroll-gradient-left ${
                showLeftArrow ? "visible" : ""
              }`}
            ></div>
            <div
              className={`scroll-gradient-right ${
                showRightArrow ? "visible" : ""
              }`}
            ></div>

            {/* Scrollable Container */}
            <div className="periodos-container" ref={scrollContainerRef}>
              {/* Periods Grid */}
              <div className="periodos-grid">
                {grade.periods.map((period) => (
                  <div key={period.number} className="periodo-column">
                    <div className="periodo-header">
                      <h3>{period.title}</h3>
                      <span className="periodo-disciplinas-count">
                        {period.subjects.length} disciplinas
                      </span>
                    </div>

                    <div className="disciplinas-list">
                      {period.subjects.length > 0 ? (
                        period.subjects.map((subject) => (
                          <div key={subject.id} className="disciplina-card">
                            <div className="disciplina-header">
                              <h4>{subject.name}</h4>
                              <span
                                className={`difficulty ${subject.difficulty}`}
                              >
                                {subject.difficulty === "easy" && "Fácil"}
                                {subject.difficulty === "medium" && "Médio"}
                                {subject.difficulty === "hard" && "Difícil"}
                              </span>
                            </div>

                            <div className="disciplina-details">
                              <div className="disciplina-info">
                                <span className="sigla">{subject.acronym}</span>
                                <span className="carga-horaria">
                                  {subject.hours}h
                                </span>
                              </div>

                              {subject.prerequisites.length > 0 && (
                                <div className="disciplina-requirements">
                                  <strong>Pré-requisitos:</strong>{" "}
                                  {subject.prerequisites.join(", ")}
                                </div>
                              )}

                              {subject.unlocks.length > 0 && (
                                <div className="disciplina-libera">
                                  <strong>Libera:</strong>{" "}
                                  {subject.unlocks.join(", ")}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-400">
                          Nenhuma disciplina neste período
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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

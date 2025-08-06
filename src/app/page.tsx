"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // Estado para armazenar o termo de busca
  const [searchTerm, setSearchTerm] = useState("");

  // Referências para os elementos de estatísticas
  const studentsCountRef = useRef<HTMLHeadingElement>(null);
  const disciplinesCountRef = useRef<HTMLHeadingElement>(null);
  const ratingsCountRef = useRef<HTMLHeadingElement>(null);

  // Função para animar a contagem
  const animateNumber = (
    element: React.RefObject<HTMLHeadingElement | null>,
    target: number
  ) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      if (element.current) {
        element.current.textContent = Math.floor(current).toLocaleString();
      }
    }, 30);
  };

  // Função para filtrar disciplinas
  const filterDisciplinas = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const disciplinaCards = document.querySelectorAll(".disciplina-card");
    disciplinaCards.forEach(card => {
      const h3Element = card.querySelector("h3");
      if (h3Element && h3Element.textContent) {
        const disciplinaName = h3Element.textContent.toLowerCase();
        const cardElement = card as HTMLElement;

        if (disciplinaName.includes(searchTerm)) {
          cardElement.style.display = "block";
          cardElement.style.opacity = "1";
        } else {
          cardElement.style.opacity = "0.3";
        }
      }
    });
  };

  // Configurar o observador de interseção para animar os números quando visíveis
  useEffect(() => {
    const options = {
      threshold: 0.5,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === "students-count") {
            animateNumber(studentsCountRef, 1247);
          } else if (entry.target.id === "disciplines-count") {
            animateNumber(disciplinesCountRef, 89);
          } else if (entry.target.id === "ratings-count") {
            animateNumber(ratingsCountRef, 2156);
          }
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observar os elementos de estatísticas
    if (studentsCountRef.current?.parentElement) {
      observer.observe(studentsCountRef.current.parentElement);
    }
    if (disciplinesCountRef.current?.parentElement) {
      observer.observe(disciplinesCountRef.current.parentElement);
    }
    if (ratingsCountRef.current?.parentElement) {
      observer.observe(ratingsCountRef.current.parentElement);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Conheça seu próximo semestre antes dele começar
            </h1>
            <p className="hero-subtitle">
              Descubra quais professores mais se alinham ao seu perfil e acesse
              provas, resumos e avaliações reais de estudantes.
            </p>
            <div className="hero-buttons">
              <Link href="/construcao" className="btn-primary">
                Explorar Feedbacks
              </Link>
              <Link href="/construcao" className="btn-secondary">
                Como Funciona
              </Link>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-card" id="students-count">
              <i className="fas fa-users"></i>
              <h3 ref={studentsCountRef}>0</h3>
              <p>Estudantes Ativos</p>
            </div>
            <div className="stat-card" id="disciplines-count">
              <i className="fas fa-book"></i>
              <h3 ref={disciplinesCountRef}>0</h3>
              <p>Disciplinas</p>
            </div>
            <div className="stat-card" id="ratings-count">
              <i className="fas fa-star"></i>
              <h3 ref={ratingsCountRef}>0</h3>
              <p>Avaliações</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Por que escolher o Radar Acadêmico?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Feedbacks Anônimos</h3>
              <p>
                Compartilhe suas experiências de forma segura e anônima,
                ajudando outros estudantes.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Dados Reais</h3>
              <p>
                Acesse avaliações autênticas de estudantes que já cursaram as
                disciplinas.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-file-alt"></i>
              </div>
              <h3>Provas Antigas</h3>
              <p>
                Biblioteca colaborativa com provas, resumos e materiais de
                estudo.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3>Planejamento</h3>
              <p>
                Organize seu semestre com base em experiências reais de outros
                alunos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disciplinas Section */}
      <section id="disciplinas" className="disciplinas">
        <div className="container">
          <h2 className="section-title">Disciplinas em Destaque</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar disciplina..."
              className="search-input"
              value={searchTerm}
              onChange={filterDisciplinas}
            />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="disciplinas-grid">
            <div className="disciplina-card">
              <div className="disciplina-header">
                <h3>Cálculo com Funções de uma Variável Real</h3>
                <span className="difficulty hard">Difícil</span>
              </div>
              <div className="disciplina-stats">
                <div className="stat">
                  <span className="stat-label">Avaliações</span>
                  <span className="stat-value">156</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Professores</span>
                  <span className="stat-value">8</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Provas</span>
                  <span className="stat-value">23</span>
                </div>
              </div>
              <div className="disciplina-actions">
                <Link href="/construcao" className="btn-small">
                  Ver Detalhes
                </Link>
                <Link href="/construcao" className="btn-small btn-outline">
                  Avaliar
                </Link>
              </div>
            </div>
            <div className="disciplina-card">
              <div className="disciplina-header">
                <h3>Lógica de Programação</h3>
                <span className="difficulty medium">Médio</span>
              </div>
              <div className="disciplina-stats">
                <div className="stat">
                  <span className="stat-label">Avaliações</span>
                  <span className="stat-value">203</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Professores</span>
                  <span className="stat-value">12</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Provas</span>
                  <span className="stat-value">45</span>
                </div>
              </div>
              <div className="disciplina-actions">
                <Link href="/construcao" className="btn-small">
                  Ver Detalhes
                </Link>
                <Link href="/construcao" className="btn-small btn-outline">
                  Avaliar
                </Link>
              </div>
            </div>
            <div className="disciplina-card">
              <div className="disciplina-header">
                <h3>Geometria Analítica e Álgebra Linear</h3>
                <span className="difficulty hard">Difícil</span>
              </div>
              <div className="disciplina-stats">
                <div className="stat">
                  <span className="stat-label">Avaliações</span>
                  <span className="stat-value">134</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Professores</span>
                  <span className="stat-value">6</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Provas</span>
                  <span className="stat-value">18</span>
                </div>
              </div>
              <div className="disciplina-actions">
                <Link href="/construcao" className="btn-small">
                  Ver Detalhes
                </Link>
                <Link href="/construcao" className="btn-small btn-outline">
                  Avaliar
                </Link>
              </div>
            </div>
            <div className="disciplina-card">
              <div className="disciplina-header">
                <h3>Programação Orientada a Objetos</h3>
                <span className="difficulty medium">Médio</span>
              </div>
              <div className="disciplina-stats">
                <div className="stat">
                  <span className="stat-label">Avaliações</span>
                  <span className="stat-value">189</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Professores</span>
                  <span className="stat-value">10</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Provas</span>
                  <span className="stat-value">32</span>
                </div>
              </div>
              <div className="disciplina-actions">
                <Link href="/construcao" className="btn-small">
                  Ver Detalhes
                </Link>
                <Link href="/construcao" className="btn-small btn-outline">
                  Avaliar
                </Link>
              </div>
            </div>
            <div className="disciplina-card">
              <div className="disciplina-header">
                <h3>Algoritmos e Estruturas de Dados I</h3>
                <span className="difficulty hard">Difícil</span>
              </div>
              <div className="disciplina-stats">
                <div className="stat">
                  <span className="stat-label">Avaliações</span>
                  <span className="stat-value">167</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Professores</span>
                  <span className="stat-value">7</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Provas</span>
                  <span className="stat-value">28</span>
                </div>
              </div>
              <div className="disciplina-actions">
                <Link href="/construcao" className="btn-small">
                  Ver Detalhes
                </Link>
                <Link href="/construcao" className="btn-small btn-outline">
                  Avaliar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professores Section */}
      <section id="professores" className="professores">
        <div className="container">
          <h2 className="section-title">Professores Mais Avaliados</h2>
          <div className="professores-grid">
            <div className="professor-card">
              <div className="professor-avatar">
                <i className="fas fa-user-graduate"></i>
              </div>
              <div className="professor-info">
                <h3>Prof. Silva</h3>
                <p className="professor-disciplina">Cálculo I</p>
                <div className="professor-rating">
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>
                  <span className="rating-text">4.2/5.0</span>
                </div>
                <div className="professor-stats">
                  <span className="stat">156 avaliações</span>
                  <span className="stat">89% aprovação</span>
                </div>
              </div>
            </div>
            <div className="professor-card">
              <div className="professor-avatar">
                <i className="fas fa-user-graduate"></i>
              </div>
              <div className="professor-info">
                <h3>Prof. Santos</h3>
                <p className="professor-disciplina">Programação I</p>
                <div className="professor-rating">
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="rating-text">4.8/5.0</span>
                </div>
                <div className="professor-stats">
                  <span className="stat">203 avaliações</span>
                  <span className="stat">95% aprovação</span>
                </div>
              </div>
            </div>
            <div className="professor-card">
              <div className="professor-avatar">
                <i className="fas fa-user-graduate"></i>
              </div>
              <div className="professor-info">
                <h3>Prof. Oliveira</h3>
                <p className="professor-disciplina">Física I</p>
                <div className="professor-rating">
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>
                  <span className="rating-text">3.1/5.0</span>
                </div>
                <div className="professor-stats">
                  <span className="stat">134 avaliações</span>
                  <span className="stat">67% aprovação</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Comece a contribuir hoje mesmo!</h2>
            <p>
              Junte-se a milhares de estudantes que já estão compartilhando suas
              experiências.
            </p>
            <Link href="/construcao" className="btn-primary btn-large">
              Criar Conta Grátis
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

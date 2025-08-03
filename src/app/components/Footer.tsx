import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <Image
                src="/assets/4kradar.png"
                alt="Radar Acadêmico"
                width={50}
                height={50}
                className="logo-img"
              />
              <span className="logo-text">Radar Acadêmico</span>
            </div>
            <p>Conectando estudantes através de experiências compartilhadas.</p>
          </div>
          <div className="footer-section">
            <h4>Links Úteis</h4>
            <ul>
              <li>
                <Link href="/">Início</Link>
              </li>
              <li>
                <Link href="/construcao">Disciplinas</Link>
              </li>
              <li>
                <Link href="/construcao">Professores</Link>
              </li>
              <li>
                <Link href="/construcao">Provas</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Suporte</h4>
            <ul>
              <li>
                <Link href="/construcao">Como Funciona</Link>
              </li>
              <li>
                <Link href="/construcao">FAQ</Link>
              </li>
              <li>
                <Link href="/construcao">Contato</Link>
              </li>
              <li>
                <Link href="/construcao">Sugestões</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Redes Sociais</h4>
            <div className="social-links">
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2025 Radar Acadêmico. Feito por Gabriel Carvalho para
            estudante de todo o Brasil.
          </p>
        </div>
      </div>
    </footer>
  );
}

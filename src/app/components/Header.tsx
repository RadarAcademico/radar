"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <nav className="nav-container">
        <div className="logo">
          <Link href="/" className="logo-link">
            <Image
              src="/assets/4kradar.png"
              alt="Radar Acadêmico"
              width={50}
              height={50}
              className="logo-img"
            />
            <span className="logo-text">Radar Acadêmico</span>
          </Link>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link href="/" className="nav-link">
              Início
            </Link>
          </li>
          <li>
            <Link href="/grades" className="nav-link">
              Grades Curriculares
            </Link>
          </li>
          <li>
            <Link href="/construcao" className="nav-link">
              Disciplinas
            </Link>
          </li>
          <li>
            <Link href="/construcao" className="nav-link">
              Professores
            </Link>
          </li>
          <li>
            <Link href="/construcao" className="nav-link">
              Provas
            </Link>
          </li>
          <li>
            <Link href="/construcao" className="nav-link">
              Sobre
            </Link>
          </li>
          <li>
            <Link href="/auth" className="btn-login">
              Entrar
            </Link>
          </li>
        </ul>
        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
}

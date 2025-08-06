import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Construcao() {
  return (
    <main>
      <div className="construction-container">
        <div className="info-card">
          <h1 className="construction-title">
            <span>Página em Construção</span>
          </h1>
          <p className="construction-message">
            Estamos trabalhando para implementar esta funcionalidade em breve.
            Nossa equipe está desenvolvendo melhorias para proporcionar a melhor
            experiência possível para você. Agradecemos sua paciência e
            compreensão!
          </p>
          <Link href="/" className="back-button">
            Voltar para a Página Inicial
          </Link>
        </div>
        <div className="worker-card">
          <Image
            src="/assets/emconstrucao.png"
            alt="Em construção"
            width={200}
            height={200}
            className="construction-image"
          />
        </div>
      </div>
    </main>
  );
}

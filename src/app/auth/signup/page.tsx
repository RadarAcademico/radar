"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    institution: "",
    course: "",
    year: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState(1);

  const { signUp } = useAuth();
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep1 = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Todos os campos são obrigatórios");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return false;
    }
    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.institution || !formData.course || !formData.year) {
      setError("Todos os campos são obrigatórios");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    setError("");
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePreviousStep = () => {
    setStep(1);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (validateStep2()) {
        const { error } = await signUp(formData.email, formData.password);
        if (error) {
          setError("Erro ao criar conta. Verifique se o email é válido.");
        } else {
          setSuccess(
            "Conta criada com sucesso! Verifique seu email para confirmar."
          );
          setTimeout(() => router.push("/auth"), 2000);
        }
      }
    } catch (err) {
      setError("Ocorreu um erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container signup-container">
      <div className="auth-card signup-card">
        <div className="auth-header">
          <Link href="/" className="auth-logo">
            <Image
              src="/assets/4kradar.png"
              alt="Radar Acadêmico"
              width={60}
              height={60}
              className="auth-logo-img"
            />
            <span className="auth-logo-text">Radar Acadêmico</span>
          </Link>
          <h1 className="auth-title">
            <span>Criar Conta</span>
          </h1>
          <p className="auth-subtitle">Junte-se à comunidade acadêmica</p>

          {/* Progress Steps */}
          <div className="signup-progress">
            <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
              <div className="step-number">1</div>
              <span>Dados Pessoais</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
              <div className="step-number">2</div>
              <span>Informações Acadêmicas</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form signup-form">
          {step === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                className="auth-button auth-button-next"
              >
                Próximo
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="institution" className="form-label">
                  Instituição
                </label>
                <select
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Selecione sua instituição</option>
                  <option value="ufmg">UFMG</option>
                  <option value="ufes">UFES</option>
                  <option value="ufla">UFLA</option>
                  <option value="cefet-mg">CEFET-MG</option>
                  <option value="outra">Outra</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="course" className="form-label">
                  Curso
                </label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Selecione seu curso</option>
                  <option value="engenharia-computacao">
                    Engenharia de Computação
                  </option>
                  <option value="engenharia-mecanica">
                    Engenharia Mecânica
                  </option>
                  <option value="ciencia-computacao">
                    Ciência da Computação
                  </option>
                  <option value="medicina-veterinaria">
                    Medicina Veterinária
                  </option>
                  <option value="farmacia">Farmácia</option>
                  <option value="educacao-fisica">Educação Física</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="year" className="form-label">
                  Ano de Ingresso
                </label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Selecione o ano</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                </select>
              </div>

              <div className="signup-actions">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="auth-button auth-button-back"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="auth-button auth-button-signup"
                >
                  {loading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    "Criar Conta"
                  )}
                </button>
              </div>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
        </form>

        <div className="auth-footer">
          <p className="auth-switch-text">Já tem uma conta?</p>
          <Link href="/auth" className="auth-switch-button">
            Fazer login
          </Link>
        </div>

        <div className="auth-back">
          <Link href="/" className="back-link">
            <i className="fas fa-arrow-left"></i>
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setError("Email ou senha incorretos");
        } else {
          setSuccess("Login realizado com sucesso!");
          setTimeout(() => router.push("/"), 1000);
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          setError("Erro ao criar conta. Verifique se o email é válido.");
        } else {
          setSuccess(
            "Conta criada com sucesso! Verifique seu email para confirmar."
          );
        }
      }
    } catch (err) {
      setError("Ocorreu um erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
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
            <span>{isLogin ? "Entrar na sua conta" : "Criar nova conta"}</span>
          </h1>
          <p className="auth-subtitle">
            {isLogin
              ? "Acesse sua conta para continuar"
              : "Junte-se à comunidade acadêmica"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`auth-button ${!isLogin ? "auth-button-signup" : ""}`}
          >
            {loading ? (
              <span className="loading-spinner"></span>
            ) : isLogin ? (
              "Entrar"
            ) : (
              "Criar Conta"
            )}
          </button>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
        </form>

        <div className="auth-footer">
          <p className="auth-switch-text">
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
          </p>
          {isLogin ? (
            <Link href="/auth/signup" className="auth-switch-button">
              Criar conta
            </Link>
          ) : (
            <button
              onClick={() => setIsLogin(true)}
              className="auth-switch-button"
            >
              Fazer login
            </button>
          )}
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

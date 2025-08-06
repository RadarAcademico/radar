import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

export const metadata = {
  title: "Radar Acadêmico",
  description:
    "Conectando estudantes e proporcionando uma experiência acadêmica mais transparente e colaborativa.",
  icons: {
    icon: "/assets/4kradar.ico",
    shortcut: "/assets/4kradar.ico",
    apple: "/assets/4kradar.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/assets/4kradar.ico" />
        <link rel="shortcut icon" href="/assets/4kradar.ico" />
        <link rel="apple-touch-icon" href="/assets/4kradar.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

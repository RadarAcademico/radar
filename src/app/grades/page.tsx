"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface GradeData {
  id: string;
  instituicao: string;
  campus: string;
  curso: string;
  grade: string;
  regiao: string;
  disciplinas: DisciplinaData[];
}

interface DisciplinaData {
  nome: string;
  sigla: string;
  cargaHoraria: number;
  requisitos: string;
  libera: string[];
  dificuldade: "easy" | "medium" | "hard";
}

export default function GradesPage() {
  const [selectedRegiao, setSelectedRegiao] = useState("");
  const [selectedInstituicao, setSelectedInstituicao] = useState("");
  const [selectedCurso, setSelectedCurso] = useState("");
  const [filteredGrades, setFilteredGrades] = useState<GradeData[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Verificar se há filtros ativos
  const hasActiveFilters =
    selectedRegiao || selectedInstituicao || selectedCurso;

  // Dados mockados organizados por região com todas as 69 universidades federais + CEFET-MG
  const gradesData: GradeData[] = [
    // Norte
    {
      id: "ufac-rio-branco-eng-comp-2023",
      instituicao: "UFAC",
      campus: "Rio Branco",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Norte",
      disciplinas: [],
    },
    {
      id: "unifap-macapa-eng-comp-2023",
      instituicao: "UNIFAP",
      campus: "Macapá",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Norte",
      disciplinas: [],
    },
    {
      id: "ufam-manaus-eng-comp-2023",
      instituicao: "UFAM",
      campus: "Manaus",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Norte",
      disciplinas: [],
    },
    {
      id: "unir-porto-velho-eng-comp-2023",
      instituicao: "UNIR",
      campus: "Porto Velho",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Norte",
      disciplinas: [],
    },
    {
      id: "ufrr-boa-vista-eng-comp-2023",
      instituicao: "UFRR",
      campus: "Boa Vista",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Norte",
      disciplinas: [],
    },
    {
      id: "ufpa-belem-eng-comp-2023",
      instituicao: "UFPA",
      campus: "Belém",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Norte",
      disciplinas: [],
    },
    {
      id: "unifesspa-maraba-eng-comp-2023",
      instituicao: "UNIFESSPA",
      campus: "Marabá",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Norte",
      disciplinas: [],
    },
    {
      id: "ufopa-santarem-eng-comp-2023",
      instituicao: "UFOPA",
      campus: "Santarém",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Norte",
      disciplinas: [],
    },
    {
      id: "ufra-belem-eng-comp-2023",
      instituicao: "UFRA",
      campus: "Belém",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Norte",
      disciplinas: [],
    },

    // Nordeste
    {
      id: "ufal-maceio-eng-comp-2023",
      instituicao: "UFAL",
      campus: "Maceió",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "ufba-salvador-eng-comp-2023",
      instituicao: "UFBA",
      campus: "Salvador",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "ufob-barreiras-eng-comp-2023",
      instituicao: "UFOB",
      campus: "Barreiras",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "ufrb-cruz-das-almas-eng-comp-2023",
      instituicao: "UFRB",
      campus: "Cruz das Almas",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "ufsb-itabuna-eng-comp-2023",
      instituicao: "UFSB",
      campus: "Itabuna",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "unilab-redencao-eng-comp-2023",
      instituicao: "UNILAB",
      campus: "Redenção",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "univasf-juazeiro-eng-comp-2023",
      instituicao: "UNIVASF",
      campus: "Juazeiro",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "ufc-fortaleza-eng-comp-2023",
      instituicao: "UFC",
      campus: "Fortaleza",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "ufca-juazeiro-do-norte-eng-comp-2023",
      instituicao: "UFCA",
      campus: "Juazeiro do Norte",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "ufpe-recife-eng-comp-2023",
      instituicao: "UFPE",
      campus: "Recife",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "ufrpe-recife-eng-comp-2023",
      instituicao: "UFRPE",
      campus: "Recife",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "ufape-caruaru-eng-comp-2023",
      instituicao: "UFAPE",
      campus: "Caruaru",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "ufpi-teresina-eng-comp-2023",
      instituicao: "UFPI",
      campus: "Teresina",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "ufdpar-parnaiba-eng-comp-2023",
      instituicao: "UFDPar",
      campus: "Parnaíba",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "ufpb-joao-pessoa-eng-comp-2023",
      instituicao: "UFPB",
      campus: "João Pessoa",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "ufcg-campina-grande-eng-comp-2023",
      instituicao: "UFCG",
      campus: "Campina Grande",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "ufrn-natal-eng-comp-2023",
      instituicao: "UFRN",
      campus: "Natal",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "ufersa-mossoro-eng-comp-2023",
      instituicao: "UFERSA",
      campus: "Mossoró",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },
    {
      id: "ufs-aracaju-eng-comp-2023",
      instituicao: "UFS",
      campus: "Aracaju",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Nordeste",
      disciplinas: [],
    },

    // Sudeste
    {
      id: "cefet-mg-nova-gameleira-eng-comp-2023",
      instituicao: "CEFET-MG",
      campus: "Nova Gameleira",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "ufes-vitoria-eng-comp-2023",
      instituicao: "UFES",
      campus: "Vitória",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "ufmg-belo-horizonte-eng-comp-2023",
      instituicao: "UFMG",
      campus: "Belo Horizonte",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "ufop-ouro-preto-eng-comp-2023",
      instituicao: "UFOP",
      campus: "Ouro Preto",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "ufu-uberlandia-eng-comp-2023",
      instituicao: "UFU",
      campus: "Uberlândia",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "ufvjm-diamantina-eng-comp-2023",
      instituicao: "UFVJM",
      campus: "Diamantina",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "uftm-uberaba-eng-comp-2023",
      instituicao: "UFTM",
      campus: "Uberaba",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "ufsj-sao-joao-del-rei-eng-comp-2023",
      instituicao: "UFSJ",
      campus: "São João del-Rei",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "ufv-vicosa-eng-comp-2023",
      instituicao: "UFV",
      campus: "Viçosa",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "ufla-lavras-eng-comp-2023",
      instituicao: "UFLA",
      campus: "Lavras",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "ufjf-juiz-de-fora-eng-comp-2023",
      instituicao: "UFJF",
      campus: "Juiz de Fora",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "unifal-mg-alfenas-eng-comp-2023",
      instituicao: "UNIFAL-MG",
      campus: "Alfenas",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "unifei-itajuba-eng-comp-2023",
      instituicao: "UNIFEI",
      campus: "Itajubá",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "ufrj-rio-de-janeiro-eng-comp-2023",
      instituicao: "UFRJ",
      campus: "Rio de Janeiro",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "unirio-rio-de-janeiro-eng-comp-2023",
      instituicao: "UNIRIO",
      campus: "Rio de Janeiro",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "uff-niteroi-eng-comp-2023",
      instituicao: "UFF",
      campus: "Niterói",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "ufrrj-seropedica-eng-comp-2023",
      instituicao: "UFRRJ",
      campus: "Seropédica",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "unifesp-sao-paulo-eng-comp-2023",
      instituicao: "UNIFESP",
      campus: "São Paulo",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "ufscar-sao-carlos-eng-comp-2023",
      instituicao: "UFSCAR",
      campus: "São Carlos",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },
    {
      id: "ufabc-santo-andre-eng-comp-2023",
      instituicao: "UFABC",
      campus: "Santo André",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sudeste",
      disciplinas: [],
    },

    // Sul
    {
      id: "ufpr-curitiba-eng-comp-2023",
      instituicao: "UFPR",
      campus: "Curitiba",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sul",
      disciplinas: [],
    },
    {
      id: "utfpr-curitiba-eng-comp-2023",
      instituicao: "UTFPR",
      campus: "Curitiba",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sul",
      disciplinas: [],
    },
    {
      id: "unila-foz-do-iguacu-eng-comp-2023",
      instituicao: "UNILA",
      campus: "Foz do Iguaçu",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sul",
      disciplinas: [],
    },
    {
      id: "uffs-chapeco-eng-comp-2023",
      instituicao: "UFFS",
      campus: "Chapecó",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sul",
      disciplinas: [],
    },
    {
      id: "ufsc-florianopolis-eng-comp-2023",
      instituicao: "UFSC",
      campus: "Florianópolis",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sul",
      disciplinas: [],
    },
    {
      id: "ufrgs-porto-alegre-eng-comp-2023",
      instituicao: "UFRGS",
      campus: "Porto Alegre",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sul",
      disciplinas: [],
    },
    {
      id: "ufpel-pelotas-eng-comp-2023",
      instituicao: "UFPel",
      campus: "Pelotas",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sul",
      disciplinas: [],
    },
    {
      id: "furg-rio-grande-eng-comp-2023",
      instituicao: "FURG",
      campus: "Rio Grande",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sul",
      disciplinas: [],
    },
    {
      id: "ufcspa-porto-alegre-eng-comp-2023",
      instituicao: "UFCSPA",
      campus: "Porto Alegre",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sul",
      disciplinas: [],
    },
    {
      id: "unipampa-alegrete-eng-comp-2023",
      instituicao: "UNIPAMPA",
      campus: "Alegrete",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sul",
      disciplinas: [],
    },
    {
      id: "ufsm-santa-maria-eng-comp-2023",
      instituicao: "UFSM",
      campus: "Santa Maria",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Sul",
      disciplinas: [],
    },

    // Centro-Oeste
    {
      id: "unb-brasilia-eng-comp-2023",
      instituicao: "UNB",
      campus: "Brasília",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Centro-Oeste",
      disciplinas: [],
    },
    {
      id: "ufg-goiania-eng-comp-2023",
      instituicao: "UFG",
      campus: "Goiânia",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Centro-Oeste",
      disciplinas: [],
    },
    {
      id: "ufcat-catalao-eng-comp-2023",
      instituicao: "UFCat",
      campus: "Catalão",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Centro-Oeste",
      disciplinas: [],
    },
    {
      id: "ufj-jatai-eng-comp-2023",
      instituicao: "UFJ",
      campus: "Jataí",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Centro-Oeste",
      disciplinas: [],
    },
    {
      id: "ufmt-cuiaba-eng-comp-2023",
      instituicao: "UFMT",
      campus: "Cuiabá",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Centro-Oeste",
      disciplinas: [],
    },
    {
      id: "ufr-rondonopolis-eng-comp-2023",
      instituicao: "UFR",
      campus: "Rondonópolis",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Centro-Oeste",
      disciplinas: [],
    },
    {
      id: "ufms-campo-grande-eng-comp-2023",
      instituicao: "UFMS",
      campus: "Campo Grande",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Centro-Oeste",
      disciplinas: [],
    },
    {
      id: "ufgd-dourados-eng-comp-2023",
      instituicao: "UFGD",
      campus: "Dourados",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Centro-Oeste",
      disciplinas: [],
    },
    {
      id: "uft-palmas-eng-comp-2023",
      instituicao: "UFT",
      campus: "Palmas",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Centro-Oeste",
      disciplinas: [],
    },
    {
      id: "ufnt-araguaina-eng-comp-2023",
      instituicao: "UFNT",
      campus: "Araguaína",
      curso: "Engenharia de Computação",
      grade: "2023",
      regiao: "Centro-Oeste",
      disciplinas: [],
    },
  ];

  // Obter opções dinâmicas baseadas nos filtros selecionados
  const getRegioes = () => {
    const regioes = Array.from(
      new Set(gradesData.map((grade) => grade.regiao))
    );
    return ["Todas", ...regioes];
  };

  const getInstituicoes = () => {
    let filtered = gradesData;

    if (selectedRegiao && selectedRegiao !== "Todas") {
      filtered = filtered.filter((grade) => grade.regiao === selectedRegiao);
    }

    const instituicoes = Array.from(
      new Set(filtered.map((grade) => grade.instituicao))
    );
    return ["Todas", ...instituicoes];
  };

  const getCursos = () => {
    let filtered = gradesData;

    if (selectedRegiao && selectedRegiao !== "Todas") {
      filtered = filtered.filter((grade) => grade.regiao === selectedRegiao);
    }

    if (selectedInstituicao && selectedInstituicao !== "Todas") {
      filtered = filtered.filter(
        (grade) => grade.instituicao === selectedInstituicao
      );
    }

    const cursos = Array.from(new Set(filtered.map((grade) => grade.curso)));
    return ["Todos", ...cursos];
  };

  // Função para aplicar filtros
  const aplicarFiltros = () => {
    let filtered = gradesData;

    if (selectedRegiao && selectedRegiao !== "Todas") {
      filtered = filtered.filter((grade) => grade.regiao === selectedRegiao);
    }

    if (selectedInstituicao && selectedInstituicao !== "Todas") {
      filtered = filtered.filter(
        (grade) => grade.instituicao === selectedInstituicao
      );
    }

    if (selectedCurso && selectedCurso !== "Todos") {
      filtered = filtered.filter((grade) => grade.curso === selectedCurso);
    }

    setFilteredGrades(filtered);
  };

  // Aplicar filtros quando qualquer filtro mudar
  useEffect(() => {
    aplicarFiltros();
  }, [selectedRegiao, selectedInstituicao, selectedCurso]);

  // Resetar filtros filhos quando o pai mudar
  useEffect(() => {
    if (selectedRegiao === "") {
      setSelectedInstituicao("");
      setSelectedCurso("");
    }
  }, [selectedRegiao]);

  useEffect(() => {
    if (selectedInstituicao === "") {
      setSelectedCurso("");
    }
  }, [selectedInstituicao]);

  // Limpar todos os filtros
  const limparFiltros = () => {
    setSelectedRegiao("");
    setSelectedInstituicao("");
    setSelectedCurso("");
  };

  // Função para determinar o link baseado na instituição
  const getGradeLink = (grade: GradeData) => {
    if (
      grade.instituicao === "CEFET-MG" &&
      grade.curso === "Engenharia de Computação"
    ) {
      return `/grades/cefet-mg-eng-comp`;
    }
    return "/construcao";
  };

  return (
    <div className="grades-page">
      {/* Hero Section */}
      <section className="grades-hero">
        <div className="container">
          <div className="grades-hero-content">
            <h1 className="grades-hero-title">Grades Curriculares</h1>
            <p className="grades-hero-subtitle">
              Explore grades curriculares de todo o Brasil e encontre o curso
              perfeito para você
            </p>
            <div className="grades-hero-stats">
              <div className="stat-item">
                <i className="fas fa-university"></i>
                <span>70+ Instituições</span>
              </div>
              <div className="stat-item">
                <i className="fas fa-graduation-cap"></i>
                <span>500+ Cursos</span>
              </div>
              <div className="stat-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>27 Estados</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros Section */}
      <section className="filtros-section">
        <div className="container">
          <div className="filtros-header">
            <h2>Filtros Avançados</h2>
            <button
              className="toggle-filtros-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <i
                className={`fas fa-${
                  showFilters ? "chevron-up" : "chevron-down"
                }`}
              ></i>
              {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
            </button>
          </div>

          {showFilters && (
            <div className="filtros-grid">
              <div className="filtro-group">
                <label>Região</label>
                <select
                  value={selectedRegiao}
                  onChange={(e) => setSelectedRegiao(e.target.value)}
                  className="filtro-select"
                >
                  {getRegioes().map((regiao) => (
                    <option key={regiao} value={regiao}>
                      {regiao}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filtro-group">
                <label>Instituição</label>
                <select
                  value={selectedInstituicao}
                  onChange={(e) => setSelectedInstituicao(e.target.value)}
                  className="filtro-select"
                  disabled={!selectedRegiao || selectedRegiao === "Todas"}
                >
                  {getInstituicoes().map((instituicao) => (
                    <option key={instituicao} value={instituicao}>
                      {instituicao}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filtro-group">
                <label>Curso</label>
                <select
                  value={selectedCurso}
                  onChange={(e) => setSelectedCurso(e.target.value)}
                  className="filtro-select"
                  disabled={
                    !selectedInstituicao || selectedInstituicao === "Todas"
                  }
                >
                  {getCursos().map((curso) => (
                    <option key={curso} value={curso}>
                      {curso}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="filtros-actions">
            {hasActiveFilters && (
              <button onClick={limparFiltros} className="btn-clear-filters">
                <i className="fas fa-filter"></i>
                Limpar Filtros
              </button>
            )}
            <div className="filtros-info">
              <span>{filteredGrades.length} resultado(s) encontrado(s)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados Section */}
      <section className="resultados-section">
        <div className="container">
          {filteredGrades.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <h3>Nenhuma grade encontrada</h3>
              <p>Tente ajustar os filtros para encontrar o que procura</p>
            </div>
          ) : (
            <div className="grades-grid">
              {filteredGrades.map((grade) => (
                <div key={grade.id} className="grade-card">
                  <div className="grade-header">
                    <div className="grade-info">
                      <h3 className="grade-titulo">{grade.curso}</h3>
                      <p className="grade-instituicao">
                        {grade.instituicao} • {grade.campus}
                      </p>
                      <span className="grade-version">{grade.grade}</span>
                    </div>
                    <div className="grade-stats">
                      <div className="stat">
                        <span className="stat-number">10</span>
                        <span className="stat-label">Períodos</span>
                      </div>
                      <div className="stat">
                        <span className="stat-number">40+</span>
                        <span className="stat-label">Disciplinas</span>
                      </div>
                    </div>
                  </div>

                  <div className="grade-actions">
                    <Link href={getGradeLink(grade)} className="btn-primary">
                      Ver Grade Completa
                    </Link>
                    <Link href="/construcao" className="btn-secondary">
                      Comparar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="grades-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Não encontrou sua instituição?</h2>
            <p>
              Ajude a expandir nossa base de dados sugerindo novas instituições
              e cursos
            </p>
            <Link href="/construcao" className="btn-primary btn-large">
              Sugerir Instituição
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

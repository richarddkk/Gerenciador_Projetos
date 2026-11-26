import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

import Icon from "./Icon";

export default function Layout({
  projects,
  addProject,
  loading,
  loadError,
  reloadProjects,
}) {
  const { pathname } = useLocation();

  const mainRef = useRef(null);
  const previousPath = useRef(pathname);

  const pageTitle =
    {
      "/": "Início",
      "/cadastro": "Cadastro",
      "/sobre": "Sobre",
    }[pathname] || "Página não encontrada";

  useEffect(() => {
    document.title = `${pageTitle} | Pronto`;

    if (previousPath.current !== pathname) {
      mainRef.current?.focus();
    }

    previousPath.current = pathname;
  }, [pathname, pageTitle]);

  const showPage = pathname !== "/" || (!loading && !loadError);

  return (
    <div className="app-shell">
      <a
        href="#conteudo"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Pular para o conteúdo
      </a>

      <aside className="sidebar">
        <NavLink to="/" className="brand" aria-label="Pronto, início">
          <span className="brand-mark">
            p<span>·</span>
          </span>

          <span>
            pronto
            <span className="brand-sub">PROJETOS PESSOAIS</span>
          </span>
        </NavLink>

        <div className="workspace-label">MEU ESPAÇO</div>

        <nav aria-label="Menu principal">
          <NavLink to="/" end>
            <Icon name="board" />
            Início
          </NavLink>

          <NavLink to="/cadastro">
            <Icon name="plus" />
            Cadastro
          </NavLink>

          <NavLink to="/sobre">
            <Icon name="about" />
            Sobre
          </NavLink>
        </nav>

        <div className="sidebar-note">
          <span className="small-dot" />
          Um projeto de cada vez.

          <p>
            Um espaço só seu para tirar
            <br />
            as ideias do papel.
          </p>
        </div>
      </aside>

      <div className="main-shell">
        <header className="topbar">
          <span>
            Meu espaço
            <span className="breadcrumb-separator">/</span>
            <strong>{pageTitle}</strong>
          </span>

          <span className="local-label">
            <span className="small-dot" />
            API local
          </span>
        </header>

        <main id="conteudo" ref={mainRef} tabIndex={-1}>
          {loading && (
            <p className="api-feedback" role="status">
              Carregando projetos da API...
            </p>
          )}

          {loadError && (
            <div
              className="api-feedback api-feedback-error"
              role="alert"
            >
              <p>{loadError}</p>

              <button
                type="button"
                className="button api-retry"
                onClick={reloadProjects}
              >
                Tentar novamente
              </button>
            </div>
          )}

          {showPage && (
            <Outlet
              context={{
                projects,
                addProject,
                loading,
                loadError,
              }}
            />
          )}
        </main>

        <footer className="page-footer">
          <span>Pronto · Projetos pessoais</span>
          <span>Etapa 2</span>
        </footer>
      </div>
    </div>
  );
}
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Icon from "./Icon";

export default function Layout({ projects, addProject, storageError }) {
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const previousPath = useRef(pathname);
  useEffect(() => {
    const title =
      { "/": "Início", "/cadastro": "Cadastro", "/sobre": "Sobre" }[pathname] ||
      "Página não encontrada";
    document.title = `${title} | Pronto`;
    if (previousPath.current !== pathname) mainRef.current?.focus();
    previousPath.current = pathname;
  }, [pathname]);
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
            pronto<span className="brand-sub">PROJETOS PESSOAIS</span>
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
        <div className="sidebar-footer">
          <span className="avatar">EU</span>
          <div>
            Espaço pessoal
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <span>
            Meu espaço <span className="breadcrumb-separator">/</span>{" "}
            <strong>
              {{ "/": "Início", "/cadastro": "Cadastro", "/sobre": "Sobre" }[
                pathname
              ] || "404"}
            </strong>
          </span>
          <span className="local-label">
            <span className="small-dot" />
            Versão local
          </span>
        </header>
        <main id="conteudo" ref={mainRef} tabIndex={-1}>
          {storageError && (
            <p className="storage-warning" role="status">
              Não foi possível salvar no navegador. Seus projetos continuam
              disponíveis nesta sessão.
            </p>
          )}
          <Outlet context={{ projects, addProject }} />
        </main>
        <footer className="page-footer">
          <span>Pronto · Projetos pessoais</span>
          <span>Etapa 1</span>
        </footer>
      </div>
    </div>
  );
}

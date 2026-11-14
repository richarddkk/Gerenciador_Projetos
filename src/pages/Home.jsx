import { Link, useOutletContext } from "react-router-dom";
import Icon from "../components/Icon";
import ProjectCard from "../components/ProjectCard";
import { STATUS, formatHours } from "../utils/projects";

export default function Home() {
  const { projects } = useOutletContext();
  const completed = projects.filter((p) => p.status === "Concluído").length;
  const hours = projects.reduce((sum, p) => sum + p.horas, 0);
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">SEUS PROJETOS, NO SEU RITMO</p>
          <h1>O que vamos construir?</h1>
          <p>Organize as ideias e acompanhe o que já saiu do papel.</p>
        </div>
        <Link className="button primary" to="/cadastro">
          <Icon name="plus" size={18} />
          Novo projeto
        </Link>
      </div>
      <section className="stats" aria-label="Resumo dos projetos">
        <div>
          <span>Projetos no radar</span>
          <strong>{projects.length.toString().padStart(2, "0")}</strong>
        </div>
        <div>
          <span>Em andamento</span>
          <strong>
            {projects
              .filter((p) => p.status === "Em andamento")
              .length.toString()
              .padStart(2, "0")}
          </strong>
        </div>
        <div>
          <span>Concluídos</span>
          <strong>
            {completed.toString().padStart(2, "0")}
            <Icon name="check" size={20} />
          </strong>
        </div>
        <div>
          <span>Estimativa total</span>
          <strong>{formatHours(hours)}</strong>
        </div>
      </section>
      <div className="section-heading">
        <h2>Meu quadro</h2>
        <span>
          {projects.length} {projects.length === 1 ? "projeto" : "projetos"}
        </span>
      </div>
      <section className="board" aria-label="Quadro de projetos por status">
        {STATUS.map((status, index) => {
          const items = projects.filter((p) => p.status === status);
          return (
            <section
              key={status}
              className={`board-column column-${index}`}
              aria-label={status}
            >
              <header>
                <h3>
                  <span className="small-dot" />
                  {status}
                </h3>
                <span className="count">{items.length}</span>
              </header>
              <div className="column-cards">
                {items.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
                {!items.length && (
                  <p className="empty-column">
                    {
                      [
                        "As próximas ideias começam aqui.",
                        "Seu próximo passo pode ser pequeno.",
                        "Cada projeto entregue conta.",
                      ][index]
                    }
                  </p>
                )}
              </div>
              <Link to="/cadastro" className="column-add">
                <Icon name="plus" size={16} />
                Cadastrar projeto
              </Link>
            </section>
          );
        })}
      </section>
      <p className="board-note">
        O quadro é organizado pelo status escolhido no cadastro.
      </p>
    </>
  );
}

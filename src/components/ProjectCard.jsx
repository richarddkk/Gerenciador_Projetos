import Icon from "./Icon";
import { formatHours, STATUS } from "../utils/projects";

export default function ProjectCard({ project, showStatus = false }) {
  return (
    <article className="project-card">
      <div className="card-top">
        <span className="project-type">
          <Icon name="folder" size={15} />
          PROJETO PESSOAL
        </span>
        {project.prioridade && (
          <span className="priority">Alta prioridade</span>
        )}
      </div>
      <h3>{project.nome}</h3>
      <div className="card-bottom">
        <span>
          <Icon name="clock" size={15} />
          {formatHours(project.horas)} estimadas
        </span>
        {showStatus && (
          <span
            className={`status-text status-${STATUS.indexOf(project.status)}`}
          >
            <span className="small-dot" />
            {project.status}
          </span>
        )}
      </div>
    </article>
  );
}

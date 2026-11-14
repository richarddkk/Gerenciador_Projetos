import { Link } from "react-router-dom";
import Icon from "../components/Icon";
export default function Sobre() {
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">POR TRÁS DO PRONTO (nome temporario)</p>
          <h1>
            Menos ideias perdidas.
            <br />
            Mais projetos acontecendo.
          </h1>
          <p>Um gerenciador pessoal de projetos.</p>
        </div>
      </div>
      <div className="about-grid">
        <section className="panel about-copy">
          <span className="square-icon">
            <Icon name="folder" />
          </span>
          <h2>Um espaço para organizar o que você quer criar.</h2>
          <p>
            Uma maneira de reunir projetos em andamento de maneira organizada: por exemplo um portfólio
            que falta terminar, um aplicativo para testar uma ideia ou o próximo
            trabalho da faculdade.
          </p>
          <p>
            Nesta primeira etapa, você cadastra um projeto, define uma
            estimativa de horas, escolhe o status e sinaliza se ele precisa de
            atenção primeiro. O quadro da página Início reúne tudo por status.
          </p>
          <Link to="/cadastro" className="text-link">
            Cadastrar meu projeto <Icon name="arrow" size={17} />
          </Link>
        </section>
        <section className="panel stage-panel">
          <p className="eyebrow">O PROJETO</p>
          <h2>Uma etapa de cada vez</h2>
          <div className="stage-item">
            <span className="stage-number">01</span>
            <div>
              <h3>Cadastro e organização</h3>
              <p>
                React, rotas, formulário controlado, validação e armazenamento
                local.
              </p>
              <span className="current-label">Etapa atual</span>
            </div>
          </div>
          <div className="stage-item future">
            <span className="stage-number">02</span>
            <div>
              <h3>Próximas versões</h3>
              <p>
                A definir.
              </p>
            </div>
          </div>
          <div className="author">
            <strong>Richard Gabriel Vasconcelos Martins</strong>
            <strong>Murilo Soares Maciel</strong>
            <span>Análise e Desenvolvimento de Sistemas S4 · IFCE</span>
          </div>
        </section>
      </div>
    </>
  );
}

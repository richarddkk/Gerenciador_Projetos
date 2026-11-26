import { Link } from "react-router-dom";
import Icon from "../components/Icon";

export default function Sobre() {
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">
            POR TRÁS DO PRONTO (nome temporário)
          </p>

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

          <h2>
            Um espaço para organizar o que você quer criar.
          </h2>

          <p>
            Uma maneira de reunir projetos de forma organizada:
            um portfólio que falta terminar, um aplicativo para
            testar uma ideia ou o próximo trabalho da faculdade.
          </p>

          <p>
            Você cadastra um projeto, define a estimativa de horas,
            escolhe o status e indica se ele tem prioridade alta.
            O quadro da página Início reúne os projetos por status.
          </p>

          <p>
            Na Etapa 2, a lista é consultada em uma API com
            json-server. Os novos cadastros são enviados ao servidor
            e gravados no arquivo db.json, permanecendo disponíveis
            após recarregar a página.
          </p>

          <Link to="/cadastro" className="text-link">
            Cadastrar meu projeto
            <Icon name="arrow" size={17} />
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
                React, rotas, formulário controlado e validação
                dos campos.
              </p>

              <span className="current-label">Concluída</span>
            </div>
          </div>

          <div className="stage-item">
            <span className="stage-number">02</span>

            <div>
              <h3>Integração com API</h3>

              <p>
                Consulta com GET, cadastro com POST e tratamento
                de erros quando o servidor está indisponível.
              </p>

              <span className="current-label">Etapa atual</span>
            </div>
          </div>

          <div className="author">
            <strong>Richard Gabriel Vasconcelos Martins</strong>
            <strong>Murilo Soares Maciel</strong>

            <span>
              Análise e Desenvolvimento de Sistemas S4 · IFCE
            </span>
          </div>
        </section>
      </div>
    </>
  );
}
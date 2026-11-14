import { Link } from "react-router-dom";
import Icon from "../components/Icon";
export default function NotFound() {
  return (
    <section className="not-found">
      <span className="error-number">404</span>
      <h1>Esse caminho não existe.</h1>
      <p>
        A página que você procurou não existe.
        <br />
        Volte ao início para encontrar seus projetos.
      </p>
      <Link to="/" className="button primary">
        Voltar para o início <Icon name="arrow" size={18} />
      </Link>
    </section>
  );
}

import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import Icon from "../components/Icon";
import ProjectCard from "../components/ProjectCard";

import {
  EMPTY_FORM,
  STATUS,
  validateProject,
} from "../utils/projects";

export default function Cadastro() {
  const {
    projects,
    addProject,
    loading,
    loadError,
  } = useOutletContext();

  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  const formRef = useRef(null);

  function updateField(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }));

    setSuccess("");
    setSaveError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (saving || loading || loadError) return;

    const validation = validateProject(form);

    setErrors(validation);
    setSuccess("");
    setSaveError("");

    if (Object.keys(validation).length) {
      formRef.current.elements
        .namedItem(Object.keys(validation)[0])
        ?.focus();

      return;
    }

    setSaving(true);

    try {
      await addProject({
        nome: form.nome.trim(),
        horas: Number(form.horas),
        status: form.status,
        prioridade: form.prioridade,
      });

      setForm({ ...EMPTY_FORM });
      setSuccess("Projeto salvo na API com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);

      setSaveError(
        "Não foi possível confirmar o salvamento. Verifique se o json-server está ligado com npm run api. Os campos foram mantidos para você tentar novamente.",
      );
    } finally {
      setSaving(false);
    }
  }

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">UMA IDEIA, UM COMEÇO</p>
          <h1>Adicionar um projeto</h1>
          <p>Guarde o essencial agora. O resto vai tomando forma.</p>
        </div>

        <span className="page-index">
          02 <span>/ CADASTRO</span>
        </span>
      </div>

      <div className="registration-layout">
        <section
          className="panel form-panel"
          aria-labelledby="form-title"
        >
          <div className="panel-heading">
            <div>
              <h2 id="form-title">Novo projeto</h2>
              <p>Campos com * são obrigatórios.</p>
            </div>

            <span className="square-icon">
              <Icon name="plus" />
            </span>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            aria-busy={saving}
          >
            {hasErrors && (
              <div className="error-summary" role="alert">
                Confira os campos destacados antes de salvar.
              </div>
            )}

            {saveError && (
              <div className="error-summary" role="alert">
                {saveError}
              </div>
            )}

            <fieldset
              className="form-fields"
              disabled={saving || loading || Boolean(loadError)}
            >
              <legend className="sr-only">
                Dados do projeto
              </legend>

              <div className="field">
                <label htmlFor="nome">
                  Nome do projeto <span>*</span>
                </label>

                <input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Ex.: Meu portfólio"
                  value={form.nome}
                  onChange={updateField}
                  required
                  maxLength={100}
                  aria-invalid={Boolean(errors.nome)}
                  aria-describedby={
                    errors.nome ? "nome-error" : undefined
                  }
                />

                {errors.nome && (
                  <small id="nome-error" className="field-error">
                    {errors.nome}
                  </small>
                )}
              </div>

              <div className="field">
                <label htmlFor="horas">
                  Estimativa em horas <span>*</span>
                </label>

                <div className="input-with-unit">
                  <input
                    id="horas"
                    name="horas"
                    type="number"
                    placeholder="Ex.: 12"
                    value={form.horas}
                    onChange={updateField}
                    required
                    step="any"
                    aria-invalid={Boolean(errors.horas)}
                    aria-describedby={
                      errors.horas ? "horas-error" : "horas-help"
                    }
                  />

                  <span>horas</span>
                </div>

                {errors.horas ? (
                  <small id="horas-error" className="field-error">
                    {errors.horas}
                  </small>
                ) : (
                  <small id="horas-help" className="field-help">
                    Uma previsão é suficiente. Use um valor maior
                    que zero.
                  </small>
                )}
              </div>

              <div className="field">
                <label htmlFor="status">
                  Status <span>*</span>
                </label>

                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={updateField}
                  required
                  aria-invalid={Boolean(errors.status)}
                  aria-describedby={
                    errors.status ? "status-error" : undefined
                  }
                >
                  <option value="">
                    Selecione o momento do projeto
                  </option>

                  {STATUS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                {errors.status && (
                  <small id="status-error" className="field-error">
                    {errors.status}
                  </small>
                )}
              </div>

              <label
                className="checkbox-field"
                htmlFor="prioridade"
              >
                <input
                  id="prioridade"
                  name="prioridade"
                  type="checkbox"
                  checked={form.prioridade}
                  onChange={updateField}
                />

                <span>
                  <strong>Prioridade alta</strong>

                  <small>
                    Quero dar atenção a este projeto primeiro.
                  </small>
                </span>
              </label>

              <button
                className="button primary submit"
                type="submit"
              >
                <Icon name="plus" size={18} />
                {saving ? "Salvando..." : "Salvar projeto"}
              </button>
            </fieldset>

            <p className="success-message" role="status">
              {success}
            </p>
          </form>
        </section>

        <section
          className="project-list-section"
          aria-labelledby="list-title"
          aria-busy={loading}
        >
          <div className="list-heading">
            <div>
              <h2 id="list-title">
                Projetos cadastrados{" "}
                <span className="count">
                  {loading || loadError ? "—" : projects.length}
                </span>
              </h2>

              <p>Projetos consultados na API do json-server.</p>
            </div>
          </div>

          {loading ? (
            <p className="api-list-state">
              Buscando projetos...
            </p>
          ) : loadError ? (
            <p className="api-list-state">
              A lista ficará disponível quando a conexão for
              restabelecida.
            </p>
          ) : projects.length ? (
            <ul className="project-list">
              {projects.map((project) => (
                <li key={project.id}>
                  <ProjectCard
                    project={project}
                    showStatus
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-list">
              <span className="empty-icon">
                <Icon name="folder" size={30} />
              </span>

              <h3>Seu primeiro projeto começa aqui.</h3>

              <p>
                Preencha o formulário ao lado.
                <br />
                Assim que salvar, ele aparece nesta lista.
              </p>
            </div>
          )}

          <div className="quiet-note">
            <Icon name="about" size={17} />

            <p>
              Os cadastros são gravados no db.json pela API.
              <br />
              Mantenha o json-server ligado para consultar e salvar.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
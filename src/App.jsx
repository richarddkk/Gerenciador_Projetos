import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Sobre from "./pages/Sobre";
import NotFound from "./pages/NotFound";

const API_URL = "http://localhost:3001/projetos";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      setLoading(true);
      setLoadError("");

      try {
        // GET: consulta os projetos que estão na API.
        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Falha no GET: HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("A API não retornou uma lista de projetos.");
        }

        if (!controller.signal.aborted) {
          setProjects(data);
        }
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("Erro ao carregar projetos:", error);

        setProjects([]);

        setLoadError(
          "Não foi possível carregar os projetos. Verifique se o json-server está ligado na porta 3001 com o comando npm run api.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    // Cancela a consulta se o efeito for limpo ou executado novamente.
    return () => controller.abort();
  }, [reloadKey]);

  function reloadProjects() {
    setReloadKey((current) => current + 1);
  }

  async function addProject(project) {
    // POST: envia o projeto para o servidor.
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error(`Falha no POST: HTTP ${response.status}`);
    }

    const savedProject = await response.json();

    // Usa o projeto devolvido pela API, incluindo o id criado por ela.
    setProjects((current) => [...current, savedProject]);

    return savedProject;
  }

  return (
    <Routes>
      <Route
        element={
          <Layout
            projects={projects}
            addProject={addProject}
            loading={loading}
            loadError={loadError}
            reloadProjects={reloadProjects}
          />
        }
      >
        <Route index element={<Home />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
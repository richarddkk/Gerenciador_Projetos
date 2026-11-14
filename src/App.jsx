import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Sobre from "./pages/Sobre";
import NotFound from "./pages/NotFound";
import { readProjects, STORAGE_KEY } from "./utils/projects";

export default function App() {
  const [projects, setProjects] = useState(() => {
    try {
      return readProjects(window.localStorage);
    } catch {
      return [];
    }
  });
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [projects]);

  function addProject(project) {
    setProjects((current) => [
      ...current,
      { ...project, id: crypto.randomUUID() },
    ]);
  }

  return (
    <Routes>
      <Route
        element={
          <Layout
            projects={projects}
            addProject={addProject}
            storageError={storageError}
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

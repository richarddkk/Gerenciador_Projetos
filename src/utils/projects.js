export const STORAGE_KEY = "ponto.projetos.v1";
export const STATUS = ["Planejado", "Em andamento", "Concluído"];
export const EMPTY_FORM = {
  nome: "",
  horas: "",
  status: "",
  prioridade: false,
};

export function validateProject(form) {
  const errors = {};
  if (!form.nome.trim()) errors.nome = "Dê um nome ao seu projeto.";
  if (String(form.horas).trim() === "") {
    errors.horas = "Informe a estimativa de horas.";
  } else if (!Number.isFinite(Number(form.horas)) || Number(form.horas) <= 0) {
    errors.horas = "A estimativa deve ser maior que zero.";
  }
  if (!STATUS.includes(form.status))
    errors.status = "Selecione o status do projeto.";
  return errors;
}

export function readProjects(storage) {
  try {
    const data = JSON.parse(storage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(data)
      ? data.filter(
          (p) =>
            p &&
            typeof p.id === "string" &&
            typeof p.nome === "string" &&
            p.nome.trim() &&
            typeof p.horas === "number" &&
            Number.isFinite(p.horas) &&
            p.horas > 0 &&
            STATUS.includes(p.status) &&
            typeof p.prioridade === "boolean",
        )
      : [];
  } catch {
    return [];
  }
}

export function formatHours(value) {
  return `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(value)} h`;
}

import { test } from "node:test";
import assert from "node:assert/strict";
import { validateProject, EMPTY_FORM, readProjects } from "./projects.js";

const valid = {
  nome: "Portfólio",
  horas: "12",
  status: "Planejado",
  prioridade: false,
};
test("aceita um cadastro válido sem tornar o checkbox obrigatório", () => {
  assert.deepEqual(validateProject(valid), {});
});
test("rejeita todos os campos obrigatórios vazios e nome só com espaços", () => {
  assert.deepEqual(Object.keys(validateProject(EMPTY_FORM)), [
    "nome",
    "horas",
    "status",
  ]);
  assert.ok(validateProject({ ...valid, nome: "   " }).nome);
});
test("rejeita zero, negativos, valores não numéricos e infinito", () => {
  for (const horas of ["0", "-3", "abc", "Infinity"])
    assert.ok(validateProject({ ...valid, horas }).horas);
  assert.deepEqual(validateProject({ ...valid, horas: "0.5" }), {});
});
test("não aceita um status fora da lista", () => {
  assert.ok(validateProject({ ...valid, status: "Inexistente" }).status);
});
test("recupera os cadastros válidos e tolera armazenamento corrompido ou indisponível", () => {
  const project = { ...valid, id: "1", horas: 12 };
  assert.deepEqual(
    readProjects({ getItem: () => JSON.stringify([project, null, {}]) }),
    [project],
  );
  assert.deepEqual(readProjects({ getItem: () => "{quebrado" }), []);
  assert.deepEqual(
    readProjects({
      getItem: () => {
        throw Error("bloqueado");
      },
    }),
    [],
  );
});

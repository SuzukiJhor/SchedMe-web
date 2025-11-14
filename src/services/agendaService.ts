import { api } from "./api";

export async function getAgendas() {
  const { data } = await api.get("/agendas");
  return data;
}

export async function getAgenda(id) {
  const { data } = await api.get(`/agendas/${id}`);
  return data;
}

export async function createAgenda(payload) {
  const { data } = await api.post("/agendas", payload);
  return data;
}

export async function updateAgenda(id, payload) {
  const { data } = await api.put(`/agendas/${id}`, payload);
  return data;
}

export async function deleteAgenda(id) {
  const { data } = await api.delete(`/agendas/${id}`);
  return data;
}

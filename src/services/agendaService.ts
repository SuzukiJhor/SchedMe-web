import { api } from "./api";


export async function login(email = "admin@teste.com", password = "senha123") {
  const res = await api.post("/login", { email, password });

  const token = res.data.token;

  localStorage.setItem("token", token);
  return res.data.user;
}

export async function fetchAllUsers() {
  const { data } = await api.get("/user");
  console.log(data);
  return data;
}

export async function fetchAllEvents() {
  const { data } = await api.get("/events");
  return data;
}

export async function getAgenda(id) {
  const { data } = await api.get(`/agendas/${id}`);
  return data;
}

export async function createEvent(payload: any) {
  const { data } = await api.post("/events", payload);
  return data;
}

export async function updateEvent(id : number , payload: any) {
  const { data } = await api.put(`/events/${id}`, payload);
  return data;
}

export async function deleteEvent(id: any) {
  const { data } = await api.delete(`/events/${id}`);
  return data;
}

import type { EventData, UserData } from "@/pages/type";
import { api } from "./api";

export async function fetchAllUsers() {
  const { data } = await api.get("/user");
  return data;
}

export async function fetchAllEvents() {
  const { data } = await api.get("/events");
  return data;
}

export async function createEvent(payload: EventData) {
  const { data } = await api.post("/events", payload);
  return data;
}

export async function updateEvent(id : number , payload: EventData) {
  const { data } = await api.put(`/events/${id}`, payload);
  return data;
}

export async function deleteEvent(id: number) {
  const { data } = await api.delete(`/events/${id}`);
  return data;
}

export async function firstOrNotLogin() {
  const { data } = await api.get("/auth/check");
  return data;
}

export async function registerUser(payload: UserData) {
  const { data } = await api.post("/register-profile", payload);
  return data;
}

export async function fetchCompanies() {
  const { data } = await api.get("/companies");
  return data;
}
import axios from "axios";

const baseURLAPI = import.meta.env.VITE_URL_API_MARCALA;

if (!baseURLAPI) {
  throw new Error('Add your base url Key to the .env file')
}

export const api = axios.create({
  baseURL: baseURLAPI,
});

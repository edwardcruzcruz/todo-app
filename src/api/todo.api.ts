import { createAxiosApi } from "./createAxiosApi.api";

export const todoApi = createAxiosApi(import.meta.env.VITE_TODO_BASE_URL);
import axios from "axios";

/**
 * Instancia de axios compartida por toda la app. La URL base viene de
 * VITE_API_URL (ver .env.example). Todas las "acciones" de cada
 * componente (banner, sobreMi, proyectos, etc.) importan esta instancia
 * en vez de crear la suya propia.
 */
export const globalApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
});

const AUTH_STORAGE_KEY = "admin-landing-auth";

/**
 * Lee el token directo de localStorage (donde lo persiste el store de
 * Zustand) en vez de importar el store acá, para evitar un ciclo de
 * imports entre la capa de api y la capa de auth.
 */
const getStoredToken = (): string | null => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.token ?? null;
  } catch {
    return null;
  }
};

globalApi.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Callback que el store de auth registra para poder cerrar sesión desde
 * acá cuando el backend responde 401 (token vencido/ inválido), sin que
 * esta capa dependa directamente del store.
 */
let onUnauthorized: (() => void) | null = null;

export const registerUnauthorizedHandler = (handler: () => void) => {
  onUnauthorized = handler;
};

globalApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      onUnauthorized?.();
    }
    return Promise.reject(error);
  },
);

export { AUTH_STORAGE_KEY };

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AUTH_STORAGE_KEY, registerUnauthorizedHandler } from "@/api/axiosInstance";
import type { AuthUser } from "../../interfaces/auth.interfaces";

export type AuthStatus = "checking" | "authenticated" | "not-authenticated";

interface AuthState {
  status: AuthStatus;
  token: string | null;
  user: AuthUser | null;
  setAuthenticated: (user: AuthUser, token: string) => void;
  setNotAuthenticated: () => void;
  setChecking: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      status: "checking",
      token: null,
      user: null,

      setAuthenticated: (user, token) => set({ status: "authenticated", user, token }),

      setNotAuthenticated: () => set({ status: "not-authenticated", user: null, token: null }),

      setChecking: () => set({ status: "checking" }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
);

// La capa de api (axiosInstance) no puede importar el store directamente
// sin generar un ciclo, así que le registramos acá un callback para que
// cierre sesión sola cuando el backend responda 401.
registerUnauthorizedHandler(() => {
  useAuthStore.getState().setNotAuthenticated();
});

export const isAdmin = (user: AuthUser | null): boolean => !!user?.roles?.includes("admin");

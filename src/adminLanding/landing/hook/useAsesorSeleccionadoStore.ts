import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AsesorSeleccionadoState {
  email: string | null;
  seleccionar: (email: string) => void;
  limpiar: () => void;
}

/**
 * Solo relevante para el usuario Admin: guarda de qué asesor está viendo/
 * editando el landing en este momento. Si es null, el admin está editando
 * su propio landing.
 */
export const useAsesorSeleccionadoStore = create<AsesorSeleccionadoState>()(
  persist(
    (set) => ({
      email: null,
      seleccionar: (email) => set({ email }),
      limpiar: () => set({ email: null }),
    }),
    { name: "admin-landing-asesor-seleccionado" },
  ),
);

import { useAuthStore, isAdmin } from "../../auth/hook/useAuthStore";
import { useAsesorSeleccionadoStore } from "./useAsesorSeleccionadoStore";

/**
 * Resuelve sobre qué asesor se está operando en este momento:
 * - Si es Admin y eligió un asesor en el sidebar -> ese correo.
 * - En cualquier otro caso (asesor normal, o admin sin selección) -> su
 *   propio correo (el backend igual lo trata como "self" si no se manda
 *   targetEmail, pero lo resolvemos acá para armar la query key y saber
 *   qué mostrar en pantalla).
 */
export const useTargetAsesor = () => {
  const user = useAuthStore((state) => state.user);
  const seleccionado = useAsesorSeleccionadoStore((state) => state.email);

  const admin = isAdmin(user);
  const email = (admin && seleccionado) || user?.email || "";
  const editandoOtro = admin && !!seleccionado && seleccionado !== user?.email;

  return { email, esAdmin: admin, editandoOtro };
};

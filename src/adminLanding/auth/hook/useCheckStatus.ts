import { useEffect } from "react";

import { checkStatusAction } from "../accion/checkStatusAction";
import { useAuthStore } from "./useAuthStore";

/**
 * Se ejecuta una vez al montar la app. Si hay un token persistido, lo
 * valida contra el backend (y lo refresca); si no hay token, o el backend
 * lo rechaza, deja el status en "not-authenticated".
 */
export const useCheckStatus = () => {
  const token = useAuthStore((state) => state.token);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setNotAuthenticated = useAuthStore((state) => state.setNotAuthenticated);
  const setChecking = useAuthStore((state) => state.setChecking);

  useEffect(() => {
    if (!token) {
      setNotAuthenticated();
      return;
    }

    setChecking();

    checkStatusAction()
      .then(({ user, token: freshToken }) => setAuthenticated(user, freshToken))
      .catch(() => setNotAuthenticated());
    // Solo se corre una vez al montar la app.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

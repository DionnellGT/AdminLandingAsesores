import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { loginAction } from "../accion/loginAction";
import { useAuthStore } from "./useAuthStore";
import type { LoginPayload } from "../../interfaces/auth.interfaces";

export const useLogin = () => {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginAction(payload),
    onSuccess: ({ user, token }) => {
      setAuthenticated(user, token);
      navigate("/dashboard", { replace: true });
    },
  });
};

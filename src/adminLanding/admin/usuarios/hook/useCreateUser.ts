import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUserAction } from "../accion/createUserAction";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-users"] });
      queryClient.invalidateQueries({ queryKey: ["landing-asesores"] });
    },
  });
};

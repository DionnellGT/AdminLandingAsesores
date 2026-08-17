import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUserAction } from "../accion/updateUserAction";
import type { UpdateUserPayload } from "../../../interfaces/user.interfaces";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserPayload }) =>
      updateUserAction(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-users"] });
      queryClient.invalidateQueries({ queryKey: ["landing-asesores"] });
    },
  });
};

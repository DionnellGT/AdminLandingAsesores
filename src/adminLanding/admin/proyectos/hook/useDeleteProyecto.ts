import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProyectoAction } from "../accion/deleteProyectoAction";
import { landingBundleQueryKey } from "../../../landing/hook/useLandingBundle";
import { useTargetAsesor } from "../../../landing/hook/useTargetAsesor";

export const useDeleteProyecto = () => {
  const { email } = useTargetAsesor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProyectoAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: landingBundleQueryKey(email) });
    },
  });
};

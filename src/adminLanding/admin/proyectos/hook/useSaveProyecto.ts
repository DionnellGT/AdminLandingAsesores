import { useMutation, useQueryClient } from "@tanstack/react-query";

import { saveProyectoAction, type SaveProyectoPayload } from "../accion/saveProyectoAction";
import { landingBundleQueryKey } from "../../../landing/hook/useLandingBundle";
import { useTargetAsesor } from "../../../landing/hook/useTargetAsesor";

type SavePayload = Omit<SaveProyectoPayload, "targetEmail" | "editandoOtro">;

export const useSaveProyecto = () => {
  const { email, editandoOtro } = useTargetAsesor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SavePayload) =>
      saveProyectoAction({ ...payload, targetEmail: email, editandoOtro }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: landingBundleQueryKey(email) });
    },
  });
};

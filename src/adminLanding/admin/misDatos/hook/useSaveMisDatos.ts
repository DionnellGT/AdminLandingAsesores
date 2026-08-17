import { useMutation, useQueryClient } from "@tanstack/react-query";

import { saveMisDatosAction, type SaveMisDatosPayload } from "../accion/saveMisDatosAction";
import { landingBundleQueryKey } from "../../../landing/hook/useLandingBundle";
import { useTargetAsesor } from "../../../landing/hook/useTargetAsesor";

type SavePayload = Omit<SaveMisDatosPayload, "targetEmail" | "editandoOtro">;

export const useSaveMisDatos = () => {
  const { email, editandoOtro } = useTargetAsesor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SavePayload) =>
      saveMisDatosAction({ ...payload, targetEmail: email, editandoOtro }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: landingBundleQueryKey(email) });
    },
  });
};

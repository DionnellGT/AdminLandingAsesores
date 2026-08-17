import { useMutation, useQueryClient } from "@tanstack/react-query";

import { saveSobreMiAction, type SaveSobreMiPayload } from "../accion/saveSobreMiAction";
import { landingBundleQueryKey } from "../../../landing/hook/useLandingBundle";
import { useTargetAsesor } from "../../../landing/hook/useTargetAsesor";

type SavePayload = Omit<SaveSobreMiPayload, "targetEmail" | "editandoOtro">;

export const useSaveSobreMi = () => {
  const { email, editandoOtro } = useTargetAsesor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SavePayload) =>
      saveSobreMiAction({ ...payload, targetEmail: email, editandoOtro }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: landingBundleQueryKey(email) });
    },
  });
};

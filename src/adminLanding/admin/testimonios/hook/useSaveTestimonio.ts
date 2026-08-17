import { useMutation, useQueryClient } from "@tanstack/react-query";

import { saveTestimonioAction, type SaveTestimonioPayload } from "../accion/saveTestimonioAction";
import { landingBundleQueryKey } from "../../../landing/hook/useLandingBundle";
import { useTargetAsesor } from "../../../landing/hook/useTargetAsesor";

type SavePayload = Omit<SaveTestimonioPayload, "targetEmail" | "editandoOtro">;

export const useSaveTestimonio = () => {
  const { email, editandoOtro } = useTargetAsesor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SavePayload) =>
      saveTestimonioAction({ ...payload, targetEmail: email, editandoOtro }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: landingBundleQueryKey(email) });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { saveBannerAction, type SaveBannerPayload } from "../accion/saveBannerAction";
import { landingBundleQueryKey } from "../../../landing/hook/useLandingBundle";
import { useTargetAsesor } from "../../../landing/hook/useTargetAsesor";

type SavePayload = Omit<SaveBannerPayload, "targetEmail" | "editandoOtro">;

export const useSaveBanner = () => {
  const { email, editandoOtro } = useTargetAsesor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SavePayload) =>
      saveBannerAction({ ...payload, targetEmail: email, editandoOtro }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: landingBundleQueryKey(email) });
    },
  });
};

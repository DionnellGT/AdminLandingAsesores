import { globalApi } from "@/api/axiosInstance";
import {
  buildLandingFormData,
  targetEmailParams,
} from "../../../landing/utils/buildLandingFormData";
import type { LandingTestimonio } from "../../../interfaces/landing.interfaces";

export interface SaveTestimonioPayload {
  /** Si viene, se hace PATCH a ese id. Si no, se hace POST (crear). */
  id?: string;
  nombreTestimonio: string;
  descripcion?: string;
  media?: File;
  targetEmail: string;
  editandoOtro: boolean;
}

export const saveTestimonioAction = async ({
  id,
  nombreTestimonio,
  descripcion,
  media,
  targetEmail,
  editandoOtro,
}: SaveTestimonioPayload): Promise<LandingTestimonio> => {
  const formData = buildLandingFormData({ nombreTestimonio, descripcion }, { media });
  const params = targetEmailParams(targetEmail, editandoOtro);

  const { data } = id
    ? await globalApi.patch<LandingTestimonio>(
        `/landing-asesores/testimonios/${id}`,
        formData,
        { params },
      )
    : await globalApi.post<LandingTestimonio>("/landing-asesores/testimonios", formData, {
        params,
      });

  return data;
};

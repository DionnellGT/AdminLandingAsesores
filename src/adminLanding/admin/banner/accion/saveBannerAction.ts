import { globalApi } from "@/api/axiosInstance";
import {
  buildLandingFormData,
  targetEmailParams,
} from "../../../landing/utils/buildLandingFormData";
import type { LandingBanner } from "../../../interfaces/landing.interfaces";

export interface SaveBannerPayload {
  titulo: string;
  subtitulo?: string;
  descripcion?: string;
  imagen?: File;
  exists: boolean;
  targetEmail: string;
  editandoOtro: boolean;
}

export const saveBannerAction = async ({
  titulo,
  subtitulo,
  descripcion,
  imagen,
  exists,
  targetEmail,
  editandoOtro,
}: SaveBannerPayload): Promise<LandingBanner> => {
  const formData = buildLandingFormData({ titulo, subtitulo, descripcion }, { imagen });
  const params = targetEmailParams(targetEmail, editandoOtro);

  const { data } = exists
    ? await globalApi.patch<LandingBanner>("/landing-asesores/banner", formData, { params })
    : await globalApi.post<LandingBanner>("/landing-asesores/banner", formData, { params });

  return data;
};

import { globalApi } from "@/api/axiosInstance";
import {
  buildLandingFormData,
  targetEmailParams,
} from "../../../landing/utils/buildLandingFormData";
import type { LandingSobreMi } from "../../../interfaces/landing.interfaces";

export interface SaveSobreMiPayload {
  titulo: string;
  paragraph?: string;
  imagen?: File;
  exists: boolean;
  targetEmail: string;
  editandoOtro: boolean;
}

export const saveSobreMiAction = async ({
  titulo,
  paragraph,
  imagen,
  exists,
  targetEmail,
  editandoOtro,
}: SaveSobreMiPayload): Promise<LandingSobreMi> => {
  const formData = buildLandingFormData({ titulo, paragraph }, { imagen });
  const params = targetEmailParams(targetEmail, editandoOtro);

  const { data } = exists
    ? await globalApi.patch<LandingSobreMi>("/landing-asesores/sobre-mi", formData, { params })
    : await globalApi.post<LandingSobreMi>("/landing-asesores/sobre-mi", formData, { params });

  return data;
};

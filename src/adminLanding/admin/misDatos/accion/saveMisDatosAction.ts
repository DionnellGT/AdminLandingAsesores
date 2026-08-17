import { globalApi } from "@/api/axiosInstance";
import {
  buildLandingFormData,
  targetEmailParams,
} from "../../../landing/utils/buildLandingFormData";
import type { LandingMisDatos } from "../../../interfaces/landing.interfaces";

export interface SaveMisDatosPayload {
  nombre: string;
  apellido?: string;
  correo?: string;
  telefono?: string;
  facebook?: string;
  instagram?: string;
  logo?: File;
  exists: boolean;
  targetEmail: string;
  editandoOtro: boolean;
}

export const saveMisDatosAction = async ({
  nombre,
  apellido,
  correo,
  telefono,
  facebook,
  instagram,
  logo,
  exists,
  targetEmail,
  editandoOtro,
}: SaveMisDatosPayload): Promise<LandingMisDatos> => {
  const formData = buildLandingFormData(
    { nombre, apellido, correo, telefono, facebook, instagram },
    { logo },
  );
  const params = targetEmailParams(targetEmail, editandoOtro);

  const { data } = exists
    ? await globalApi.patch<LandingMisDatos>("/landing-asesores/mis-datos", formData, { params })
    : await globalApi.post<LandingMisDatos>("/landing-asesores/mis-datos", formData, { params });

  return data;
};

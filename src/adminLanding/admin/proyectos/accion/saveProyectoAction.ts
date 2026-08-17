import { globalApi } from "@/api/axiosInstance";
import {
  buildLandingFormData,
  targetEmailParams,
} from "../../../landing/utils/buildLandingFormData";
import type { LandingProyecto } from "../../../interfaces/landing.interfaces";

export interface ProyectoFormFields {
  nombre: string;
  ubicacion?: string;
  precio?: string;
  badgeLabel?: string;
  badgeColor?: string;
  lotesDisponibles?: number;
  descripcion?: string;
  caracteristicas?: string[];
  linkGoogleMaps?: string;
  link360Maps?: string;
}

export interface SaveProyectoPayload extends ProyectoFormFields {
  /** Si viene, se hace PATCH a ese id. Si no, se hace POST (crear). */
  id?: string;
  imagenCaratula?: File;
  imagenesPopup?: File[];
  targetEmail: string;
  editandoOtro: boolean;
}

export const saveProyectoAction = async ({
  id,
  imagenCaratula,
  imagenesPopup,
  targetEmail,
  editandoOtro,
  caracteristicas,
  ...fields
}: SaveProyectoPayload): Promise<LandingProyecto> => {
  const formData = buildLandingFormData(
    { ...fields, caracteristicas: caracteristicas?.join(",") },
    { imagenCaratula, imagenesPopup },
  );
  const params = targetEmailParams(targetEmail, editandoOtro);

  const { data } = id
    ? await globalApi.patch<LandingProyecto>(
        `/landing-asesores/proyectos/${id}`,
        formData,
        { params },
      )
    : await globalApi.post<LandingProyecto>("/landing-asesores/proyectos", formData, {
        params,
      });

  return data;
};

import { useQuery } from "@tanstack/react-query";

import { getLandingBundleAction } from "../accion/getLandingBundleAction";
import { useTargetAsesor } from "./useTargetAsesor";

/**
 * Trae y gestiona TODA la data del landing (banner, sobreMi, misDatos,
 * proyectos, testimonios) del asesor efectivo en un solo request. Todas
 * las páginas (BannerPage, SobreMiPage, ProyectosPage, etc.) usan este
 * mismo hook para mostrar la data; cada una tiene su propia acción/hook
 * de guardado, que al tener éxito invalida esta misma query.
 */
export const useLandingBundle = () => {
  const { email } = useTargetAsesor();

  const query = useQuery({
    queryKey: ["landing-bundle", email],
    queryFn: () => getLandingBundleAction(email),
    enabled: !!email,
  });

  return { ...query, email };
};

export const landingBundleQueryKey = (email: string) => ["landing-bundle", email];

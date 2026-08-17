import { useQuery } from "@tanstack/react-query";

import { getAsesoresAction } from "../accion/getAsesoresAction";
import { useAuthStore, isAdmin } from "../../auth/hook/useAuthStore";

export const useAsesores = () => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ["landing-asesores"],
    queryFn: getAsesoresAction,
    enabled: isAdmin(user),
  });
};

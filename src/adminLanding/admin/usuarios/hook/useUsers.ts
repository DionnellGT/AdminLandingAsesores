import { useQuery } from "@tanstack/react-query";

import { getUsersAction } from "../accion/getUsersAction";

export const useUsers = () => {
  return useQuery({
    queryKey: ["auth-users"],
    queryFn: () => getUsersAction(),
  });
};

import { globalApi } from "@/api/axiosInstance";
import type { PaginatedUsers } from "../../../interfaces/user.interfaces";

export const getUsersAction = async (
  limit = 100,
  offset = 0,
): Promise<PaginatedUsers> => {
  const { data } = await globalApi.get<PaginatedUsers>("/auth/users", {
    params: { limit, offset },
  });
  return data;
};

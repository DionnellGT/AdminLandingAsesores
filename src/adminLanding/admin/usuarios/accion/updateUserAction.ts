import { globalApi } from "@/api/axiosInstance";
import type { AdminUser, UpdateUserPayload } from "../../../interfaces/user.interfaces";

export const updateUserAction = async (
  id: string,
  payload: UpdateUserPayload,
): Promise<AdminUser> => {
  // Se arma explícitamente el body para nunca reenviar `email`, aunque el
  // caller lo tuviera por error dentro del payload.
  const { email: _ignored, ...safePayload } = payload as UpdateUserPayload & {
    email?: string;
  };

  const { data } = await globalApi.patch<AdminUser>(`/auth/users/${id}`, safePayload);
  return data;
};

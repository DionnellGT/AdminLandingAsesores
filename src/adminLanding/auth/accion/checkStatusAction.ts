import { globalApi } from "@/api/axiosInstance";
import type { AuthResponse } from "../../interfaces/auth.interfaces";

export const checkStatusAction = async (): Promise<AuthResponse> => {
  const { data } = await globalApi.get<AuthResponse>("/auth/check-status");
  return data;
};

import { globalApi } from "@/api/axiosInstance";
import type { AuthResponse, LoginPayload } from "../../interfaces/auth.interfaces";

export const loginAction = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await globalApi.post<AuthResponse>("/auth/login", payload);
  return data;
};

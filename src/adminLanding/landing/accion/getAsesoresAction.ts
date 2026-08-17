import { globalApi } from "@/api/axiosInstance";
import type { LandingBundle } from "../../interfaces/landing.interfaces";

export const getAsesoresAction = async (): Promise<LandingBundle[]> => {
  const { data } = await globalApi.get<LandingBundle[]>("/landing-asesores");
  return data;
};

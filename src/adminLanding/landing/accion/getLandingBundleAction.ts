import { globalApi } from "@/api/axiosInstance";
import type { LandingBundle } from "../../interfaces/landing.interfaces";

export const getLandingBundleAction = async (email: string): Promise<LandingBundle> => {
  const { data } = await globalApi.get<LandingBundle>(
    `/landing-asesores/${encodeURIComponent(email)}`,
  );
  return data;
};

import { globalApi } from "@/api/axiosInstance";

export const deleteProyectoAction = async (id: string): Promise<{ message: string }> => {
  const { data } = await globalApi.delete<{ message: string }>(
    `/landing-asesores/proyectos/${id}`,
  );
  return data;
};

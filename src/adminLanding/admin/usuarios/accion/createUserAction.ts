import { globalApi } from "@/api/axiosInstance";
import type { AdminUser, UpdateUserPayload } from "../../../interfaces/user.interfaces";

export interface CreateUserPayload {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  address?: string;
  roles?: string[];
  isActive?: boolean;
}

interface RegisterResponse {
  user: AdminUser;
  token: string;
}

export const createUserAction = async (payload: CreateUserPayload): Promise<AdminUser> => {
  const { email, password, fullName, phone, address, roles, isActive } = payload;

  // POST /auth/register es público (no requiere @Auth), así que no importa
  // que se llame con el token del admin en el header, el backend lo
  // ignora. Ojo: la respuesta trae un token nuevo, pero es del usuario
  // recién creado, no del admin — nunca se debe guardar en el store de
  // sesión para no pisar la sesión del admin.
  const { data: registerData } = await globalApi.post<RegisterResponse>("/auth/register", {
    email,
    password,
    fullName,
  });

  // El registro público solo acepta email/password/fullName (siempre crea
  // con rol "user" por defecto), así que si el admin eligió otros roles o
  // cargó teléfono/dirección/estado, se completa con un segundo request.
  const extras: UpdateUserPayload = {};
  if (phone) extras.phone = phone;
  if (address) extras.address = address;
  if (roles && roles.length > 0) extras.roles = roles;
  if (isActive === false) extras.isActive = false;

  if (Object.keys(extras).length === 0) {
    return registerData.user;
  }

  const { data: updatedUser } = await globalApi.patch<AdminUser>(
    `/auth/users/${registerData.user.id}`,
    extras,
  );

  return updatedUser;
};

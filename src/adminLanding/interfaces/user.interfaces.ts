export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  address: string | null;
  isActive: boolean;
  roles: string[];
  createdAt: string;
}

export interface PaginatedUsers {
  count: number;
  pages: number;
  users: AdminUser[];
}

/** No incluye `email`: el admin puede editar todo menos el correo. */
export interface UpdateUserPayload {
  fullName?: string;
  phone?: string;
  address?: string;
  roles?: string[];
  isActive?: boolean;
  password?: string;
}

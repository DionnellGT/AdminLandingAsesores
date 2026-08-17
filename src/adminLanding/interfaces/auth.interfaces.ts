export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  address: string | null;
  isActive: boolean;
  roles: string[];
  createdAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

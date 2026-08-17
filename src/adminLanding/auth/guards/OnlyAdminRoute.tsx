import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

import { useAuthStore, isAdmin } from "../hook/useAuthStore";

export const OnlyAdminRoute = ({ children }: PropsWithChildren) => {
  const user = useAuthStore((state) => state.user);

  if (!isAdmin(user)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

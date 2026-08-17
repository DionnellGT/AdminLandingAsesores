import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

import { useAuthStore } from "../hook/useAuthStore";

export const AdminRoute = ({ children }: PropsWithChildren) => {
  const status = useAuthStore((state) => state.status);

  if (status === "checking") {
    return (
      <div className="flex h-screen w-full items-center justify-center text-sm text-muted-foreground">
        Verificando sesión...
      </div>
    );
  }

  if (status === "not-authenticated") {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

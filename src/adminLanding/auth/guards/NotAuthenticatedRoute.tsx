import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

import { useAuthStore } from "../hook/useAuthStore";

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const status = useAuthStore((state) => state.status);

  if (status === "checking") {
    return (
      <div className="flex h-screen w-full items-center justify-center text-sm text-muted-foreground">
        Verificando sesión...
      </div>
    );
  }

  if (status === "authenticated") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

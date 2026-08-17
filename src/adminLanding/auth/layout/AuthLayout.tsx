import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  );
};

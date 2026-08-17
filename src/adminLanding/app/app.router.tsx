import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import { AdminRoute } from "../auth/guards/AdminRoute";
import { NotAuthenticatedRoute } from "../auth/guards/NotAuthenticatedRoute";
import { OnlyAdminRoute } from "../auth/guards/OnlyAdminRoute";

import { AuthLayout } from "../auth/layout/AuthLayout";
import { LoginPage } from "../auth/pages/LoginPage";

import { DashboardLayout } from "../admin/layout/DashboardLayout";
import {
  DashboardPage,
  BannerPage,
  SobreMiPage,
  ProyectosPage,
  TestimoniosPage,
  MisDatosPage,
  UsersPage,
} from "../admin/pages";

const appRouter = createBrowserRouter([
  // Dashboard routes
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "banner", element: <BannerPage /> },
      { path: "sobre-mi", element: <SobreMiPage /> },
      { path: "proyectos", element: <ProyectosPage /> },
      { path: "testimonios", element: <TestimoniosPage /> },
      { path: "mis-datos", element: <MisDatosPage /> },
      {
        path: "usuarios",
        element: (
          <OnlyAdminRoute>
            <UsersPage />
          </OnlyAdminRoute>
        ),
      },
    ],
  },

  // Auth Routes
  {
    path: "/auth",
    element: (
      <NotAuthenticatedRoute>
        <AuthLayout />
      </NotAuthenticatedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/auth/login" /> },
      { path: "login", element: <LoginPage /> },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/dashboard" />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={appRouter} />;
}

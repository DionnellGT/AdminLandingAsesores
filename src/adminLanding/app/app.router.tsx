import { createBrowserRouter, Navigate, RouterProvider } from "react-router"
import { AuthLayout } from "../auth/layout/AuthLayout"
import { DashboardLayout } from "../admin/layout/DashboardLayout"
import { BannerPage, DashboardPage, MisDatosPage, ProyectosPage, SobreMiPage, TestimoniosPage, UsersPage } from "../admin/pages"
import { LoginPage } from "../auth/pages/LoginPage"



const appRouter = createBrowserRouter([
    //Dasboard routes
    {
        path: '/dashboard',
        element: <AdminRoute>
                    <DashboardLayout/>
                 </AdminRoute>,
        children: [
            {
                index: true,
                element: <DashboardPage/>
            },
            {
                path: 'mis-datos',
                element: <MisDatosPage/>
            },
            {
                path: 'banner',
                element: <BannerPage/>
            },
            {
                path: 'sobre-mi',
                element: <SobreMiPage/>
            },
            {
                path: 'proyectos',
                element: <ProyectosPage/>
            },
            {
                path: 'testimonios',
                element: <TestimoniosPage/>
            },
            {
                path: 'users',
                element: <UsersPage/>
            }
        ]
    },

    //Auth Routes
    {
        path: '/auth',
        element: <NotAuthenticatedRoute>
                    <AuthLayout/>
                 </NotAuthenticatedRoute>,
        children: [
            {
                index: true,
                element: <Navigate to='/auth/login' />
            },
            {
                path: 'login',
                element: <LoginPage/>
            }
        ]
    },

    {
        path: '*',
        element: <Navigate to='/dashboard' />
    },
])

export function AppRouter() {
  return <RouterProvider router={appRouter} />
}
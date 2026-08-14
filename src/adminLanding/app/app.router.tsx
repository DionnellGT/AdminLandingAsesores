import { createBrowserRouter, Navigate, RouterProvider } from "react-router"


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
                path: 'leads',
                element: <Leads/>
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
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/loginRegisterPage/LoginPage';
import NavbarWrapper from '../layout/navbarWrapper/NavbarWrapper';
import HomePage from '../pages/homePage/HomePage';
import PublicRoute from '@/components/routes/PublicRoute';
import ProtectedRoute from '@/components/routes/ProtectedRoute';

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavbarWrapper />,
        children: [
            {
                path: "/login",
                element: <PublicRoute />,
                children: [
                    { path: "/login", element: <LoginPage /> },
                ]
            },
            {
                path: "/",
                element: <ProtectedRoute />,
                children: [
                    { path: "/", element: <HomePage /> },
                ]
            }
        ]
    }
]);

export default router;

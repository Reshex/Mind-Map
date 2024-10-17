import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/loginRegisterPage/LoginPage';
import NavbarWrapper from '../layout/navbarWrapper/NavbarWrapper';
import HomePage from '../pages/homePage/HomePage';
import PublicRoute from '@/components/routes/PublicRoute';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import ContactPage from '@/pages/contact/ContactPage';
import MindMapPage from '@/pages/mindMap/MindMapPage';

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
            },
            {
                path: "/contact",
                children: [
                    { path: "/contact", element: <ContactPage /> },
                ]
            },
            {
                path: "/mindMap",
                element: <ProtectedRoute />,
                children: [
                    { path: "/mindMap", element: <MindMapPage /> },
                ]
            }
        ]
    }
]);

export default router;

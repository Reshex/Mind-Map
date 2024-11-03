import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/loginRegisterPage/LoginPage';
import NavbarWrapper from '../layout/navbarWrapper/NavbarWrapper';
import HomePage from '../pages/homePage/HomePage';
import PublicRoute from '@/components/routes/PublicRoute';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import ContactPage from '@/pages/contactPage/ContactPage';
import MindMapPage from '@/pages/regularMindMap/RegularMindMapPage';
import LoadMap from '@/pages/loadMapPage/LoadMap';

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
                path: "/regularMindMap",
                element: <ProtectedRoute />,
                children: [
                    { path: "/regularMindMap", element: <MindMapPage /> },
                ]
            },
            {
                path: "/LoadMap",
                element: <ProtectedRoute />,
                children: [
                    { path: "/LoadMap", element: <LoadMap /> },
                ]
            }
        ]
    }
]);

export default router;

import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/loginRegisterPage/LoginPage';
import NavbarWrapper from '../layout/navbarWrapper/NavbarWrapper';
import HomePage from '../pages/homePage/HomePage';
import PublicRoute from '@/components/routes/PublicRoute';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import ContactPage from '@/pages/contactPage/ContactPage';
import MindMapPage from '@/pages/mindMap/MindMapPage';
import LoadMap from '@/pages/loadMapPage/LoadMapPage';
import NotFoundPage from '@/pages/notFoundPage/NotFoundPage';
import UnauthorizedPage from '@/pages/unauthorizePage/UnauthorizedPage';
import UserSettingsPage from '@/pages/userSettingsPage/UserSettingsPage';

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
                    { path: "/mindMap/:mapId", element: <MindMapPage /> },
                ]
            },
            {
                path: "/loadMap",
                element: <ProtectedRoute />,
                children: [
                    { path: "/loadMap", element: <LoadMap /> },
                ]
            },
            {
                path: "/unauthorizedPage",
                element: <PublicRoute />,
                children: [
                    { path: "/unauthorizedPage", element: <UnauthorizedPage /> }
                ]
            },
            {
                path: "/userSettings",
                element: <ProtectedRoute />,
                children: [
                    { path: "/userSettings", element: <UserSettingsPage /> }
                ]
            },
            {
                path: "*",
                element: <NotFoundPage />,
            }
        ]
    }
]);

export default router;

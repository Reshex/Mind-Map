import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/loginPage/LoginPage'
import NavbarWrapper from '../layout/navbarWrapper/NavbarWrapper'
import HomePage from '../pages/homePage/HomePage'


const router = createBrowserRouter([{
    path: "/",
    element: <NavbarWrapper />,
    children: [
        { path: "/", element: <LoginPage /> },
        { path: "/home", element: <HomePage /> },
    ]
}])



export default router
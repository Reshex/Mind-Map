import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

function NavbarWrapper() {

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default NavbarWrapper;

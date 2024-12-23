import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Brain, House, Mail, Menu, ShieldCheck, User, X } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import { useToast } from "@/context/ToastContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { addToast } = useToast()
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();

    async function handleLogout() {

        try {
            await signOut(auth);
            addToast({
                title: "User logged out",
                description: `Successfully logged out`,
                icon: <ShieldCheck className="size-5" />,
            });
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    }
    function toggleMenu() {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="shadow-primary w-full fixed top-0 z-50 bg-background text-foreground ">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <div className="flex justify-between h-16 items-center">
                    {/* Left side */}
                    <div className="flex-shrink-0 flex items-center space-x-2">
                        <a href="/" className="text-2xl font-extrabold text-primary-foreground hover:text-primary transition-all">
                            MindMap
                        </a>
                    </div>

                    {/* Middle section (for larger screens) */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <a href="/" className="text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg">
                            <House className="w-6 h-6" />
                        </a>
                        {user && (
                            <a href="/loadMap" className="text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg">
                                <Brain className="w-6 h-6" />
                            </a>
                        )}

                        <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg">
                            <Mail className="w-6 h-6" />
                        </a>

                        {/* User Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="text-muted-foreground hover:text-primary focus:outline-none p-2 rounded-lg">
                                    <User className="w-6 h-6" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-background text-foreground shadow-lg rounded-lg">
                                <DropdownMenuItem onClick={() => navigate("/userSettings")}>Settings</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleLogout()}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button onClick={toggleMenu} className="text-muted-foreground hover:text-primary focus:outline-none p-2 rounded-lg">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 space-y-4 bg-background text-foreground shadow-lg rounded-lg p-4">
                        <a href="/" className="block text-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg">
                            Home
                        </a>
                        {user && (
                            <a href="/mindMap" className="block text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg">
                                Mind Map
                            </a>
                        )}
                        <a href="/contact" className="block text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg">
                            Contact
                        </a>
                        <a href="/userSettings" className="block text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg">
                            Settings
                        </a>
                    </div>
                )}
            </div>
        </nav>


    );
};

export default Navbar;
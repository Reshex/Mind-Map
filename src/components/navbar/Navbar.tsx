import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Brain, House, Mail, Menu, User, X } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

async function handleLogout() {
    try {
        await signOut(auth);
        console.log("Successfully logged out");
    } catch (error) {
        console.error("Error logging out: ", error);
    }
}

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleMenu() {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="shadow-primary w-full fixed top-0 z-50 bg-background text-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left side */}
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/" className="text-xl font-bold text-primary-foreground">
                            MindMap
                        </a>
                    </div>

                    {/* Middle section (for larger screens) */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                            <House />
                        </a>
                        <a href="#mindmap" className="text-muted-foreground hover:text-primary transition-colors">
                            <Brain />
                        </a>
                        <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                            <Mail />
                        </a>
                        <a>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="text-muted-foreground hover:text-primary focus:outline-none">
                                        <User />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-background text-foreground">
                                    <DropdownMenuItem>My Account</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleLogout()} >Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <button onClick={toggleMenu} className="text-muted-foreground hover:text-primary focus:outline-none">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>


                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 space-y-2">
                        <a href="#home" className="block text-foreground hover:text-primary transition-colors">
                            Home
                        </a>
                        <a href="#about" className="block text-muted-foreground hover:text-primary transition-colors">
                            About
                        </a>
                        <a href="#services" className="block text-muted-foreground hover:text-primary transition-colors">
                            Services
                        </a>
                        <a href="#contact" className="block text-muted-foreground hover:text-primary transition-colors">
                            Contact
                        </a>
                    </div>
                )}
            </div>
        </nav>

    );
};

export default Navbar;
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase";
import { useState } from "react";
import { Button } from "../ui/button";
import { registerUserToDB } from "@/db/userDB";
import User from "@/types/userTypes/userType";
import { LogIn, ShieldCheck, ShieldX, } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function GoogleAuth() {
    const [error, setError] = useState<string | null>(null);
    const { addToast } = useToast()

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const values: User = {
                name: user.displayName,
                lastName: "",
                email: user.email,
            }
            addToast({
                title: "User logged in",
                description: `Successfully logged in with the user: ${user.displayName}`,
                icon: <ShieldCheck className="size-5" />,
            });
            await registerUserToDB(values, user.uid);
        } catch (error: any) {
            console.error("Error during Google sign-in: ", error);
            setError(error.message);
            addToast({
                title: "User log in failed",
                description: `Failed to login ${error.message}`,
                icon: <ShieldX color="#a70000" className="size-5" />,
            });
        }
    };

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="button" onClick={signInWithGoogle} className="bg-foreground text-secondary rounded hover:text-foreground">
                Sign In with Google <LogIn className="size-4 ml-2" />
            </Button>
        </div>
    );
}

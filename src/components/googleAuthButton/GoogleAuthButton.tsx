import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase";
import { useState } from "react";
import { Button } from "../ui/button";
import registerUserToDB from "../db/userDB";
import User from "@/types/userTypes/UserType";

export default function GoogleAuth() {
    const [error, setError] = useState<string | null>(null);

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
            await registerUserToDB(values, user.uid);
        } catch (error: any) {
            console.error("Error during Google sign-in: ", error);
            setError(error.message);
        }
    };

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="button" onClick={signInWithGoogle} className="bg-foreground text-secondary px-6 rounded hover:text-white">
                Sign In with Google
            </Button>
        </div>
    );
}

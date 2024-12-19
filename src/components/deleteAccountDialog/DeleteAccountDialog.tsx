import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { auth } from "@/firebase";
import { useToast } from "@/context/ToastContext";
import { removeUserFromDB } from "@/db/userDB";
import LoadingAlert from "../loading/LoadingAlert";
import { signInWithEmailAndPassword } from "firebase/auth";

function DeleteAccountDialog({ userId }: { userId: string }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [showCredentialsForm, setShowCredentialsForm] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { addToast } = useToast();

    async function handleAuthenticationCheck() {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("No user is signed in.");

            const providerId = user.providerData[0]?.providerId;
            if (providerId === "google.com") {
                await handleDeleteAccount();
            } else {
                setShowCredentialsForm(true);
            }
        } catch (error: any) {
            console.error("Authentication check failed:", error);
            addToast({
                title: "Error",
                description: error.message || "Authentication check failed.",
            });
        }
    }

    async function handleDeleteAccount() {
        setIsDeleting(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("No user is signed in.");

            const providerId = user.providerData[0]?.providerId;

            if (providerId !== "google.com") {
                await reauthenticateUser(email, password);
            }

            await removeUserFromDB(userId, email, password);

            addToast({
                title: "Account Deleted",
                description: "Your account has been successfully deleted.",
            });

            await auth.signOut();
            setDialogOpen(false);
        } catch (error: any) {
            console.error(error);
            setError(error.message || "Failed to delete account.");
        } finally {
            setIsDeleting(false);
        }
    }

    async function reauthenticateUser(email: string, password: string) {
        if (!auth.currentUser) throw new Error("No user is signed in.");

        const providerId = auth.currentUser.providerData[0]?.providerId;
        if (providerId !== "password") {
            throw new Error("Reauthentication not supported for this provider.");
        }

        await signInWithEmailAndPassword(auth, email, password);
    }


    return (
        <>
            <LoadingAlert
                isOpen={isDeleting || !!error}
                error={error}
                onClose={() => setError(null)}
            />
            <AlertDialog open={dialogOpen} onOpenChange={(isOpen) => {
                setDialogOpen(isOpen);
                if (!isOpen) {
                    setShowCredentialsForm(false);
                    setEmail("");
                    setPassword("");
                }
            }}>
                <AlertDialogTrigger asChild>
                    <li
                        className="text-destructive hover:font-semibold transition-all cursor-pointer"
                        onClick={() => {
                            setDialogOpen(true);
                            setShowCredentialsForm(false);
                        }}
                    >
                        Delete Account
                    </li>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Your Account</AlertDialogTitle>
                        <AlertDialogDescription>
                            Your account will be permanently deleted after authentication. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {!showCredentialsForm ? (
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button
                                    className="bg-destructive hover:bg-red-700 text-white"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleAuthenticationCheck();
                                    }}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? "Processing..." : "Authenticate"}
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    ) : (
                        <div className="space-y-4 mt-4">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isDeleting}
                            />
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isDeleting}
                            />
                            <AlertDialogFooter className="mt-4">
                                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    <Button
                                        className="bg-destructive hover:bg-red-700 text-white"
                                        onClick={handleDeleteAccount}
                                        disabled={isDeleting || !email || !password}
                                    >
                                        {isDeleting ? "Deleting..." : "Authenticate and Delete"}
                                    </Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </div>
                    )}
                </AlertDialogContent>
            </AlertDialog>

        </>
    );
}

export default DeleteAccountDialog;

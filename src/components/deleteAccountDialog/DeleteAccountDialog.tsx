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
import { auth, } from "@/firebase";
import { useToast } from "@/context/ToastContext";
import { removeUserFromDB } from "@/db/userDB";
import LoadingAlert from "../loading/LoadingAlert";

function DeleteAccountDialog({ userId }: { userId: string }) {
    const [showCredentialsForm, setShowCredentialsForm] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { addToast } = useToast();

    // Handles user authentication and deletion
    async function handleDeleteAccount() {
        setIsDeleting(true);
        try {
            await removeUserFromDB(userId, email, password);

            addToast({
                title: "Account Deleted",
                description: "Your account has been successfully deleted.",
            });

        } catch (error: any) {
            console.error(error);
            addToast({
                title: "Error",
                description: error.message || "Failed to delete account.",
            });
        } finally {
            setIsDeleting(false);
        }
    }

    // Check the authentication provider and toggle credential form
    async function handleAuthenticationCheck() {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("No user is signed in.");

            const providerId = user.providerData[0]?.providerId;
            if (providerId === "google.com") {
                await handleDeleteAccount(); // Directly proceed for Google accounts
            } else {
                setShowCredentialsForm(true); // Show credentials form for email/password
            }
        } catch (error: any) {
            console.error("Authentication check failed:", error);
            addToast({
                title: "Error",
                description: error.message || "Authentication check failed.",
            });
        }
    }

    return (
        <>
            <LoadingAlert
                isOpen={isDeleting || !!error}
                error={error}
                onClose={() => setError(null)}
            />
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <li className="text-destructive hover:font-semibold transition-all cursor-pointer">
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
                        // Initial confirmation popup
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button
                                    className="bg-destructive hover:bg-red-700 text-white"
                                    onClick={handleAuthenticationCheck}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? "Processing..." : "Authenticate"}
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    ) : (
                        // Credentials form for email/password reauthentication
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

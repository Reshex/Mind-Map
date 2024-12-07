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
import { removeUserFromDB } from "@/db/userDB";
import { useToast } from "@/context/ToastContext";

function DeleteAccountDialog({ userId }: { userId: string }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const { addToast } = useToast();

    async function handleDeleteAccount() {
        setIsDeleting(true);
        try {
            if (!email || !password) {
                addToast({
                    title: "Error",
                    description: "Please provide both email and password.",
                });
                return;
            }

            await removeUserFromDB(userId, email, password);

            addToast({
                title: "Account Deleted",
                description: "Your account has been successfully deleted.",
            });


        } catch (error: any) {
            console.error("Failed to delete account:", error);

            addToast({
                title: "Error",
                description: error.message || "Failed to delete account.",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
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
                        Please confirm your credentials to permanently delete your account. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
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
                </div>
                <AlertDialogFooter className="mt-4">
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        asChild
                        disabled={isDeleting || !email || !password}
                    >
                        <Button
                            onClick={handleDeleteAccount}
                            className="bg-destructive hover:bg-red-700 text-white"
                        >
                            {isDeleting ? "Deleting..." : "Delete Account"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteAccountDialog;

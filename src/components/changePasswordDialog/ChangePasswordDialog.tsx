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
import { Input } from "../ui/input";
import { auth } from "@/firebase";
import { changeUserPassword, reauthenticateUser } from "@/controllers/userController";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { ShieldCheck, ShieldX } from "lucide-react";
import LoadingAlert from "@/components/loading/LoadingAlert";

export default function ChangePasswordDialog() {
    const [currentUserPassword, setCurrentUserPassword] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [dbError, setDbError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { addToast } = useToast();

    async function handleChangePassword() {
        const user = auth.currentUser;
        if (!user) {
            setDbError("No user is signed in.");
            return;
        }

        if (!currentUserPassword || !newUserPassword) {
            setDbError("Both fields are required.");
            return;
        }

        setIsLoading(true);
        setDbError(null);

        try {
            await reauthenticateUser(user, currentUserPassword);

            await changeUserPassword(user, newUserPassword);

            addToast({
                title: "Password Changed",
                description: "Your password has been successfully updated.",
                icon: <ShieldCheck color="#3fe3" className="size-5" />,
            });

            setCurrentUserPassword("");
            setNewUserPassword("");
        } catch (error: any) {
            const errorMessage = error.message || "An unexpected error occurred.";
            setDbError(errorMessage);

            addToast({
                title: "Password Change Error",
                description: errorMessage,
                icon: <ShieldX color="#a70000" className="size-5" />,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <LoadingAlert
                isOpen={isLoading}
                error={dbError}
                onClose={() => {
                    setDbError(null);
                    setIsLoading(false);
                }}
            />

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <li className="hover:text-primary transition-colors cursor-pointer">
                        Change Password
                    </li>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Change Password</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please fill in the fields below to change your password.
                        </AlertDialogDescription>
                        <Input
                            type="password"
                            value={currentUserPassword}
                            onChange={(e) => setCurrentUserPassword(e.target.value)}
                            placeholder="Current Password"
                            disabled={isLoading}
                        />
                        <Input
                            type="password"
                            value={newUserPassword}
                            onChange={(e) => setNewUserPassword(e.target.value)}
                            placeholder="New Password"
                            disabled={isLoading}
                        />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleChangePassword}
                            disabled={isLoading}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

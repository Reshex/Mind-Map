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
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";

export default function ForgotPasswordDialog() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addToast } = useToast();

    const handleForgotPassword = async () => {
        setIsSubmitting(true);
        try {
            if (!email) {
                addToast({
                    title: "Error",
                    description: "Please enter a valid email address.",
                });
                return;
            }
            await sendPasswordResetEmail(auth, email);
            addToast({
                title: "Success",
                description: "Password reset email sent successfully.",
            });
            setEmail(""); // Clear the input field on success
        } catch (error: any) {
            console.error("Failed to send password reset email:", error);
            addToast({
                title: "Error",
                description: error.message || "Something went wrong.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <ul className="space-y-2 w-32">
                    <li className="hover:text-primary transition-colors cursor-pointer">
                        Forgot Password?
                    </li>
                </ul>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Forgot your password?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter your email address below, and we'll send you a link to reset your password.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-4 mt-4">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>
                <AlertDialogFooter className="mt-4">
                    <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleForgotPassword}
                        disabled={isSubmitting || !email}
                    >
                        {isSubmitting ? "Sending..." : "Send Reset Email"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

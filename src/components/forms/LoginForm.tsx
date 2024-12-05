import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertDialogCancel, AlertDialogFooter } from "../ui/alert-dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "../googleAuthButton/GoogleAuthButton";
import { useToast } from "@/context/ToastContext";
import { ShieldCheck, ShieldX } from "lucide-react";
import ForgotPasswordDialog from "../forgotPasswordDialog/ForgotPasswordDialog";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(1, "Password cannot be empty."),
});

export default function LoginForm() {
    const [dbError, setDbError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { addToast } = useToast()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setDbError(null);

        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            addToast({
                title: "User logged in",
                description: `Successfully logged in with the user: ${values.email}`,
                icon: <ShieldCheck color="#3fe3" className="size-5" />,
            });
            navigate("/");
        } catch (error: any) {
            setDbError(error.message);
            addToast({
                title: "User log in failed",
                description: `Failed to login ${error.message}`,
                icon: <ShieldX color="#a70000" className="size-5" />,
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {dbError && <div className="text-destructive font-semibold">{dbError}</div>}
                <ForgotPasswordDialog />
                <AlertDialogFooter>
                    <GoogleAuthButton />
                    <AlertDialogCancel className="rounded">Cancel</AlertDialogCancel>
                    <Button type="submit" className="rounded">Login</Button>
                </AlertDialogFooter>
            </form>
        </Form>
    );
}

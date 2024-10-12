//Imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

//Queries
import registerUserToDB from "../queries/userQueries";

//Custom components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertDialogCancel, AlertDialogFooter } from "../ui/alert-dialog";
import Loading from "../loading/Loading";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last Name must be at least 2 characters.",
    }),
    email: z.string()
        .email({
            message: "Please enter a valid email address.",
        }),
    password: z.string()
        .min(8, {
            message: "Password must be at least 8 characters.",
        })
        .regex(/[0-9]/, {
            message: "Password must contain at least one number.",
        })
        .regex(/[a-zA-Z]/, {
            message: "Password must contain at least one letter.",
        }),
});

export default function ProfileForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [dbError, setDbError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            lastName: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setDbError(null);
        setSuccess(null)

        try {
            await registerUserToDB(values);
            setIsLoading(false);
            setSuccess("Successfully registered!")
            form.reset();
        } catch (error: any) {
            console.error(error);
            setDbError(error.message);
            setIsLoading(false);
        }
    }

    if (isLoading) { return <Loading /> }
    if (success) {
        return <div className="text-foreground font-semibold">
            {success}
        </div>
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Last Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                                <Input placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {dbError && (
                    <div className="text-destructive font-semibold">
                        {dbError}
                    </div>
                )}
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded">Cancel</AlertDialogCancel>
                    <Button type="submit" className="rounded">Register</Button>
                </AlertDialogFooter>
            </form>
        </Form>
    );
}

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import RegisterForm from "../forms/RegisterForm"

function RegisterPopUp() {
    return (
        <AlertDialog >
            <AlertDialogTrigger>
                <div className="bg-secondary w-3/4 h-28 rounded-xl fixed flex items-center justify-end text-2xl text-foreground left-0 mt-2 pr-12 transition duration-200 ease-in-out hover:bg-primary hover:scale-105">
                    Register
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-min">
                <AlertDialogHeader>
                    <AlertDialogTitle>Register</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please fill out the login form below to login your account.
                        (Press Esc to close)
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="mt-4">
                    <RegisterForm />
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default RegisterPopUp
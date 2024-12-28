import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import LoginForm from "../forms/LoginForm"

function LoginPopUp() {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <div className="bg-primary w-3/4 h-28 rounded-xl fixed flex items-center justify-start text-2xl text-foreground -mt-40 pl-8 transition duration-200 ease-in-out hover:text-secondary hover:bg-primary-foreground hover:scale-105">
                    Login
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-min">
                <AlertDialogHeader>
                    <AlertDialogTitle>Login</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please fill out the login form below to login your account.
                        (Press Esc to close)
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="mt-4">
                    <LoginForm />
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LoginPopUp
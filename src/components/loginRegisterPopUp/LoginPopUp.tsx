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
                <div className="bg-primary w-3/4 h-28 rounded-xl fixed flex items-center justify-start text-2xl text-white -mt-40 pl-8 transition duration-200 ease-in-out hover:text-secondary hover:bg-primary-foreground hover:scale-105">
                    Login
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-sm">
                <AlertDialogHeader>
                    <AlertDialogTitle>Login</AlertDialogTitle>
                    <AlertDialogDescription>
                        <LoginForm />
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LoginPopUp
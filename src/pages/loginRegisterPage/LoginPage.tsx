import LoginPopUp from "@/components/loginRegisterPopUp/LoginPopUp"
import RegisterPopUp from "@/components/loginRegisterPopUp/RegisterPopUp"
function LoginPage() {


    return (
        <div className="flex items-center justify-center h-screen space-x-12">
            <LoginPopUp />
            <RegisterPopUp />

        </div >
    )
}



export default LoginPage
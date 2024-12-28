import LoginPopUp from "@/components/loginRegisterPopUp/LoginPopUp"
import RegisterPopUp from "@/components/loginRegisterPopUp/RegisterPopUp"

function LoginPage() {

    return (
        <div className="flex items-center justify-center h-screen space-x-12 ">
            <LoginPopUp />
            <RegisterPopUp />
            <a href="/contact">
                <div className="bg-foreground w-3/4 h-28 rounded-xl fixed flex items-center justify-start text-2xl text-secondary pl-8 transition duration-200 ease-in-out hover:text-foreground hover:bg-primary hover:scale-105 mt-44">
                    Contact Me
                </div>
            </a>
        </div >
    )
}



export default LoginPage
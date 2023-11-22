import Footer from "../components/Footer"
import Header from "../components/Header"
import UserLoginForm from "../components/UserLoginForm"
import { loginUser } from "../handlers/LoginHandler"


const LoginCineplex = () => {
    return (
        <>
            <Header></Header>
            <UserLoginForm></UserLoginForm>
            <Footer></Footer>
        </>
    )

}

export default LoginCineplex
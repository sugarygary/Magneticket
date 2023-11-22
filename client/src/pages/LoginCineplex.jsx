import Footer from "../components/Footer"
import CineplexHeader from "../components/CineplexHeader"
import UserLoginForm from "../components/UserLoginForm"
import { loginUser } from "../handlers/LoginHandler"


const LoginCineplex = () => {
    return (
        <>
            <CineplexHeader></CineplexHeader>
            <UserLoginForm></UserLoginForm>
            <Footer></Footer>
        </>
    )

}

export default LoginCineplex
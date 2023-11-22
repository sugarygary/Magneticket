import CineplexRegisterForm from "../components/CineplexRegisterForm"
import Footer from "../components/Footer"
import CineplexHeader from "../components/CineplexHeader"
// import UserRegisterForm from "../components/UserRegisterForm"

const RegisterCineplex = () => {
    return (
        <>
            <CineplexHeader></CineplexHeader>
            {/* <UserRegisterForm></UserRegisterForm> */}
            <CineplexRegisterForm></CineplexRegisterForm>
            <Footer></Footer>
        </>
    )

}

export default RegisterCineplex
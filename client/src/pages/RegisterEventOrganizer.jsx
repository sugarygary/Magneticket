import CineplexRegisterForm from "../components/CineplexRegisterForm"
import EventRegisterForm from "../components/EventRegisterForm"
import Footer from "../components/Footer"
import Header from "../components/Header"
// import UserRegisterForm from "../components/UserRegisterForm"


const RegisterEventOrganizer = () => {
    return (
        <>
            <Header></Header>
            {/* <UserRegisterForm></UserRegisterForm> */}
            <EventRegisterForm></EventRegisterForm>
            <Footer></Footer>
        </>
    )

}

export default RegisterEventOrganizer
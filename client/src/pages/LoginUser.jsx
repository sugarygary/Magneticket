import Footer from "../components/Footer"
import Header from "../components/Header"
import UserLoginForm from "../components/UserLoginForm"
import { loginUser } from "../handlers/LoginHandler"
import CardFilmTerlaris from "../components/CardFilmTerlaris"
import CardEventTerlaris from "../components/CardEventTerlaris"
import TabelLaporanPenjualanBioskop from "../components/TabelLaporanPenjualanBioskop"
import TabelLaporanPenjualanKonser from "../components/TabelLaporanPenjualanKonser"


const LoginUser = () => {
    return (
        <>
            <Header></Header>
            {/* <UserLoginForm></UserLoginForm> */}
            {/* <CardFilmTerlaris></CardFilmTerlaris> */}
            {/* <CardEventTerlaris></CardEventTerlaris> */}
            {/* <TabelLaporanPenjualanBioskop></TabelLaporanPenjualanBioskop> */}
            <TabelLaporanPenjualanKonser></TabelLaporanPenjualanKonser>
            <Footer></Footer>
        </>
    )

}

export default LoginUser
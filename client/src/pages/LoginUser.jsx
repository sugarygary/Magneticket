import Footer from "../components/Footer";
import Header from "../components/Header";
import UserLoginForm from "../components/UserLoginForm";
import { loginUser } from "../handlers/LoginHandler";
import CardFilmTerlaris from "../components/CardFilmTerlaris";
import CardEventTerlaris from "../components/CardEventTerlaris";
import TabelLaporanPenjualanBioskop from "../components/TabelLaporanPenjualanBioskop";
import TabelLaporanPenjualanKonser from "../components/TabelLaporanPenjualanKonser";

import { Outlet } from "react-router-dom";
import HomepageCarousel from "../components/HomepageCarousel";

const LoginUser = () => {
  // if(){

  // }
  return (
    <>
      <UserLoginForm></UserLoginForm>

      {/* <Outlet></Outlet> */}
    </>
  );
};

export default LoginUser;

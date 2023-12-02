import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import CineplexHeader from "../components/CineplexHeader";
import userStore from "../redux/userStore";
import { Provider } from "react-redux";
import ScrollToTop from "./ScrollToTop";


export const LayoutCineplex = () => {
  const location = useLocation();

  const isLoginPage = location.pathname.includes("/cineplex/login");
  const isRegisterPage = location.pathname.includes("/cineplex/register");

  const shouldDisplayHeader = !isLoginPage && !isRegisterPage;
  return (
    <>
    <ScrollToTop />
    <div className="flex">
      {shouldDisplayHeader && <CineplexHeader />}
      <div className="mt-12 pb-12 min-h-[100vh] min-w-[80vw] mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
    
    <Footer></Footer>
  </>
  );
};

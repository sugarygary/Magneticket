import React, { useEffect } from "react";
import Footer from "../components/FooterCineplexEO";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import CineplexHeader from "../components/CineplexHeader";
import userStore from "../redux/userStore";
import { Provider } from "react-redux";
import ScrollToTop from "./ScrollToTop";
import { initFlowbite } from "flowbite";
import "flowbite";

export const LayoutCineplex = () => {
  const location = useLocation();
  useEffect(() => {
    initFlowbite();
  }, []);

  const isLoginPage = location.pathname.includes("/cineplex/login");
  const isRegisterPage = location.pathname.includes("/cineplex/register");

  const shouldDisplayHeader = !isLoginPage && !isRegisterPage;
  return (
    <>
      <ScrollToTop />
      {shouldDisplayHeader && <CineplexHeader />}
      <div
        className={`mt-12 pb-12 min-h-[100vh] min-w-[80vw] ${
          shouldDisplayHeader ? "ml-60" : ""
        } mx-auto relative`}
      >
        <Outlet></Outlet>
        <Footer docs="/cineplex/docs"></Footer>
      </div>
    </>
  );
};

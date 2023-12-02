import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import userStore from "../redux/userStore";
import ScrollToTop from "./ScrollToTop";

export const LayoutUser = () => {
  return (
    <>
      <ScrollToTop />
      <Header></Header>
      <div className="mt-12 pb-12 min-h-[100vh] max-w-screen-xl mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

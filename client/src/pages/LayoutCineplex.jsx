import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import CineplexHeader from "../components/CineplexHeader";
import userStore from "../redux/userStore";
import { Provider } from "react-redux";



export const LayoutCineplex = () => {
  return (
    <>
      <CineplexHeader></CineplexHeader>
      <div className="mt-12 pb-12 min-h-[100vh] max-w-screen-xl mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

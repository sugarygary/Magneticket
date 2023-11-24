import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export const LayoutUser = () => {
  return (
    <>
      <Header></Header>
      <div className="mt-12 min-h-[32rem]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import userStore from "../redux/userStore";

export const LayoutUser = () => {
  return (
    <>
      <Provider store={userStore}>
        <Header></Header>
        <div className="mt-12 pb-12 min-h-[100vh]">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </Provider>
    </>
  );
};

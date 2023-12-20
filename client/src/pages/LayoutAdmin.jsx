import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link, Outlet, useLocation } from "react-router-dom";
import CineplexHeader from "../components/CineplexHeader";
import userStore from "../redux/userStore";
import { Provider } from "react-redux";
import ScrollToTop from "./ScrollToTop";
import AdminSidebar from "../components/AdminSidebar";

import { LoginAdmin } from "./LoginAdmin";

export const LayoutAdmin = () => {
  const location = useLocation();
  const [loggedAdmin, setLoggedAdmin] = useState(false);

  if (!loggedAdmin) {
    return <LoginAdmin setLoggedAdmin={setLoggedAdmin} />;
  } else {
    return (
      <>
        <ScrollToTop />
        <div className="flex">
          <AdminSidebar />
          <div className="mt-12 pb-12 min-h-[100vh] min-w-[80vw] mx-auto">
            <Outlet></Outlet>
          </div>
        </div>
        <Footer></Footer>
      </>
    );
  }
};

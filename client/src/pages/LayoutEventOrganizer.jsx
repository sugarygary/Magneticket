import React from "react";
import Footer from "../components/FooterCineplexEO";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import EventOrganizerHeader from "../components/EventOrganizerHeader";
import userStore from "../redux/userStore";
import { Provider } from "react-redux";
import ScrollToTop from "./ScrollToTop";

export const LayoutEventOrganizer = () => {
  const location = useLocation();

  const isLoginPage = location.pathname.includes("/event-organizer/login");
  const isRegisterPage = location.pathname.includes(
    "/event-organizer/register"
  );

  const shouldDisplayHeader = !isLoginPage && !isRegisterPage;
  return (
    <>
      <ScrollToTop />
      {shouldDisplayHeader && <EventOrganizerHeader />}
      <div
        className={`mt-2 sm:mt-12 pb-24 min-h-[95vh] min-w-[80vw] ${
          shouldDisplayHeader ? "ml-0 sm:ml-60" : ""
        } mx-auto relative`}
      >
        <Outlet></Outlet>
        <Footer docs="/event-organizer/docs"></Footer>
      </div>
    </>
  );
};

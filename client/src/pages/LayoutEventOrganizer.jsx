import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import EventOrganizerHeader from "../components/EventOrganizerHeader";

export const LayoutEventOrganizer = () => {
  return (
    <>
      <EventOrganizerHeader></EventOrganizerHeader>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

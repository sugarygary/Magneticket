import Footer from "../components/Footer";
import Header from "../components/Header";
import UserLoginForm from "../components/UserLoginForm";

import { Outlet, useLocation } from "react-router-dom";
import HomepageCarousel from "../components/HomepageCarousel";
import PendingEmailForm from "../components/PendingEmailForm";

const PendingEmail = () => {
  const location = useLocation();

  return (
    <>
      
      <PendingEmailForm
        email={location?.state?.pending_email}
      ></PendingEmailForm>

      {/* <Outlet></Outlet> */}
    </>
  );
};

export default PendingEmail;

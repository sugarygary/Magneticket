import { Navigate, Outlet, useLocation } from "react-router-dom";

import PendingEmailForm from "../components/PendingEmailForm";

const PendingEmail = () => {
  const location = useLocation();
  if (location?.state?.pending_email == undefined) {
    return <Navigate to="/user/home"></Navigate>;
  }
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

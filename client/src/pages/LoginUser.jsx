import { useEffect } from "react";
import UserLoginForm from "../components/UserLoginForm";

import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const LoginUser = () => {
  const { current_user, status } = useSelector((state) => state.user);
  const navigate = useNavigate();
  if (
    current_user.userId != null &&
    current_user.role == "USER" &&
    status == "succeeded"
  ) {
    return <Navigate to={"/user/home"}></Navigate>;
  }
  return (
    <>
      <UserLoginForm></UserLoginForm>
    </>
  );
};

export default LoginUser;

import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UserRegisterForm from "../components/UserRegisterForm";
import { Navigate } from "react-router-dom";

const RegisterUser = () => {
  const { current_user, status } = useSelector((state) => state.user);
  if (
    current_user.userId != null &&
    current_user.role == "USER" &&
    status == "succeeded"
  ) {
    return <Navigate to={"/user/home"}></Navigate>;
  }
  return (
    <>
      <UserRegisterForm></UserRegisterForm>
    </>
  );
};

export default RegisterUser;

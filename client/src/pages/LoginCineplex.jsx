import Footer from "../components/Footer";
import CineplexHeader from "../components/CineplexHeader";
import UserLoginForm from "../components/UserLoginForm";
import { loginUser } from "../handlers/LoginHandler";
import CineplexLoginForm from "../components/CineplexLoginForm";

const LoginCineplex = () => {
  return (
    <>
      {/* <CineplexHeader></CineplexHeader> */}
      <CineplexLoginForm></CineplexLoginForm>
      {/* <Footer></Footer> */}
    </>
  );
};

export default LoginCineplex;

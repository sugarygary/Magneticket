import Footer from "../components/Footer";
import CineplexHeader from "../components/CineplexHeader";
import UserLoginForm from "../components/UserLoginForm";
import { loginUser } from "../handlers/LoginHandler";
import EventLoginForm from "./EventLoginForm";

const LoginEventOrganizer = () => {
  return (
    <>
      {/* <CineplexHeader></CineplexHeader> */}
        <EventLoginForm></EventLoginForm>
      {/* <Footer></Footer> */}
    </>
  );
};

export default LoginEventOrganizer;

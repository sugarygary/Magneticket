import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserLoginForm from "./components/UserLoginForm";
import UserRegisterForm from "./components/UserRegisterForm";

function App() {
  return (
    <>
      <Header></Header>
      {/* <UserLoginForm></UserLoginForm>
       */}
      <UserRegisterForm></UserRegisterForm>
      <Footer></Footer>
    </>
  );
}

export default App;

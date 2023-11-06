import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserLoginForm from "./components/UserLoginForm";
import UserRegisterForm from "./components/UserRegisterForm";
import CardHome from "./components/CardHome";
import CardTicketByMovie from "./components/CardTicketByMovie";

function App() {
  return (
    <div className="" style={{ overflowX: 'hidden' }}>
      <Header></Header>
      {/* <UserLoginForm></UserLoginForm>
       */}
      {/* <UserRegisterForm></UserRegisterForm> */}
      {/* <CardHome></CardHome> */}
      <CardTicketByMovie></CardTicketByMovie>
      <Footer></Footer>
    </div>
  );
}

export default App;

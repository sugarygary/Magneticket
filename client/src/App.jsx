import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserLoginForm from "./components/UserLoginForm";
import UserRegisterForm from "./components/UserRegisterForm";
import CardHome from "./components/CardHome";
import CardTicketByMovie from "./components/CardTicketByMovie";
import CardHistoryTransaksi from "./components/CardHistoryTransaksi";
import CardMakanan from "./components/CardMakanan";
import DetailPesanan from "./components/DetailPesanan";
import CardViewTicket from "./components/CardViewTicket";

function App() {
  return (
    <div className="" style={{ overflowX: 'hidden' }}>
      <Header></Header>
      {/* <UserLoginForm></UserLoginForm> */}

      {/* <UserRegisterForm></UserRegisterForm> */}
      {/* <CardHome></CardHome> */}
      {/* <CardTicketByMovie></CardTicketByMovie> */}
      {/* <CardHistoryTransaksi></CardHistoryTransaksi> */}
      {/* <CardMakanan></CardMakanan> */}
      {/* <DetailPesanan></DetailPesanan> */}
      {/* <CardViewTicket></CardViewTicket> */}
      
      <Footer></Footer>
    </div>
  );
}

export default App;

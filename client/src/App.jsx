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
import CardCineplexStudio from "./components/CardCineplexStudio";
import CardInfoFilm from "./components/CardInfoFilm";
import CardCineplexJadwal from "./components/CardCineplexJadwal";
import CineplexRegisterForm from "./components/CineplexRegisterForm";
import CineplexCreatePromo from "./components/CineplexCreatePromo";
import CineplexConcessionCard from "./components/CineplexConcessionCard";
import CineplexTiketDetail from "./components/CineplexTiketDetail";


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
      {/* <CardCineplexStudio></CardCineplexStudio> */}
      {/* <CardInfoFilm></CardInfoFilm> */}
      {/* <CardCineplexJadwal></CardCineplexJadwal> */}
      {/* <CineplexTiketDetail></CineplexTiketDetail> */}
      {/* <CineplexConcessionCard></CineplexConcessionCard> */}
      {/* <CineplexRegisterForm></CineplexRegisterForm> */}
      <CardInfoFilm></CardInfoFilm>
      <Footer></Footer>
    </div>
  );
}

export default App;

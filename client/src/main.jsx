import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import userStore from "./redux/userStore.js";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import LoginUser from "./pages/LoginUser.jsx";

import {
  loginCineplex,
  loginUser,
  registerCineplex,
  registerEventOrganizer,
  registerUser,
} from "./handlers/LoginHandler.jsx";
import RegisterUser from "./pages/RegisterUser.jsx";
import LoginCineplex from "./pages/LoginCineplex.jsx";
import RegisterCineplex from "./pages/RegisterCineplex.jsx";
import RegisterEventOrganizer from "./pages/RegisterEventOrganizer.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import CardHome from "./components/CardHome.jsx";
import Homepage from "./pages/Homepage.jsx";
import {
  loadInTheater,
  loadMenu,
  loadSeatInfo,
  loadPromo,
  loadCabang,
  loadStudio,
  loadHistory,
  loadDetailHistory,
  loadCineplexHistory,
  loadCineplexDetailHistory,
  loadOngoingEvent,
  loadCineplexJadwal,
  loadStudioAll,
  loadScreeningLengkap,
  loadDetailEvent,
  loadCategoryEvent,
  loadPromotorHistory,
  loadPromotorDetailHistory,
  loadDetailEventWithAuth,
  loadCategoryEventWithAuth,
  loadAllMovieTransactions,
  loadAllEvents,
  loadDetailEventJadwal
} from "./handlers/LoadHandler.jsx";
import PendingEmail from "./pages/pendingEmail.jsx";
import { LayoutUser } from "./pages/LayoutUser.jsx";
import { LayoutCineplex } from "./pages/LayoutCineplex.jsx";
import { LayoutEventOrganizer } from "./pages/LayoutEventOrganizer.jsx";
import ScreeningByMovie, {
  loadScreeningByMovie,
} from "./pages/ScreeningByMovie.jsx";
import SeatingPage from "./pages/SeatingPage.jsx";
import CineplexConcession from "./pages/CineplexConcession.jsx";
import {
  createMenu,
  createScreening,
  createStudio,
} from "./handlers/CineplexHandler.jsx";
// import { createTiket } from "./handlers/UserHandler.jsx";
import CineplexCreateMenu from "./pages/CineplexCreateMenu.jsx";
import ErrorElement from "./pages/ErrorElement.jsx";
import CineplexCreateKodePromo from "./pages/CineplexCreateKodePromo.jsx";
import { createKodePromo } from "./handlers/CineplexHandler.jsx";
import CineplexKodePromo from "./pages/CineplexKodePromo.jsx";
import CineplexCreateCabang from "./pages/CineplexCreateCabang.jsx";
import CineplexEditMenu from "./pages/CineplexEditMenu.jsx";
import { loadSingleMenu } from "./handlers/LoadHandler.jsx";
import CineplexListStudios from "./pages/CineplexListStudios.jsx";
import CineplexCreateStudio from "./pages/CineplexCreateStudio.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import DetailHistory from "./pages/DetailHistory.jsx";
import LoginEventOrganizer from "./pages/LoginEventOrganizer.jsx";
import { UserFindBranch, loadBranches } from "./pages/UserFindBranch.jsx";
import EventOrganizerCreateEvent from "./pages/EventOrganizerCreateEvent.jsx";
import { createEvent } from "./handlers/EventOrganizerHandler.jsx";
import CineplexHistoryTiket from "./pages/CineplexHistoryTiket.jsx";
import CineplexDetailHistoryTiket from "./pages/CineplexDetailHistoryTiket.jsx";
import CineplexJadwal from "./pages/CineplexJadwal.jsx";
import CineplexCreateScreening from "./pages/CineplexCreateScreening.jsx";
import EventDetail from "./pages/EventDetail.jsx";
import ScreeningByBranch, {
  screeningByBranchLoader,
} from "./pages/ScreeningByBranch.jsx";
import client from "./util/client.js";
import { UserFindFilm, loadFilms } from "./pages/UserFindFilm.jsx";
import PromotorHistoryTiket from "./pages/PromotorHistoryTicket.jsx";
import PromotorDetailHistoryTiket from "./pages/PromotorDetailHistoryTiket.jsx";
import PromotorJadwalEvent from "./pages/PromotorJadwalEvent.jsx";
import PromotorDetailEvent from "./pages/PromotorDetailEvent.jsx"
import HomeCineplex from "./pages/CineplexHome.jsx";
import EventOrganizerHome from "./pages/EventOrganizerHome.jsx";
import CheckoutEvent from "./pages/CheckoutEvent.jsx";
import {
  acceptVerif,
  acceptVerifEvent,
  acceptVerifPromotor,
  loadAllCineplex,
  loadAllEvent,
  loadAllPromotor,
  loadSingleCineplex,
  loadSingleEvent,
  loadSinglePromotor,
  tolakVerif,
  tolakVerifEvent,
  tolakVerifPromotor,
  
} from "./handlers/AdminHandler.jsx";
import AdminVerifCineplex from "./pages/AdminVerifCineplex.jsx";
import { LayoutAdmin } from "./pages/LayoutAdmin.jsx";
import VerifikasiCineplexPage from "./pages/VerifikasiCineplexPage.jsx";
import AdminVerifpromotor from "./pages/AdminVerifPromotor.jsx";
import VerifikasiPromotorPage from "./pages/VerifikasiPromotorPage.jsx";
import AdminVerifEvent from "./pages/AdminVerifEvent.jsx";
import VerifikasiEventPage from "./pages/VerifikasiEventPage.jsx";
import AdminLaporanPenjualan from "./pages/AdminLaporanPenjualan.jsx";

async function coba() {
  let x = loadInTheater();
  let y = loadOngoingEvent();
  let temp = {
    inTheater: x,
    ongoingEvent: y,
  };
  return temp;
}

const router = createBrowserRouter([
  {
    index: true,
    element: <Navigate to="/user" />, //REDIRECTOR CHECK COOKIE
    errorElement: <ErrorElement />,
  },
  {
    path: "/user",
    element: <LayoutUser />,
    // errorElement: <Navigate to="/server-ErrorElement"></Navigate>
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
      },
      {
        path: "register",
        element: <RegisterUser />,
        action: registerUser,
        errorElement: <ErrorElement />,
      },
      {
        path: "login",
        element: <LoginUser />,
        action: loginUser,
      },
      {
        path: "pending-email",
        element: <PendingEmail />,
      },
      {
        path: "home",
        element: <Homepage />,
        loader: async () => {
          let x = await loadInTheater();
          let y = await loadOngoingEvent();
          let temp = {
            inTheater: x,
            ongoingEvent: y,
          };
          return temp;
        },
        errorElement: <ErrorElement />,
      },
      {
        path: "seating/:screening_id",
        element: <SeatingPage></SeatingPage>,
        loader: loadSeatInfo,
        errorElement: <ErrorElement />,
      },
      {
        path: "history",
        element: <HistoryPage></HistoryPage>,
        loader: loadHistory,
        errorElement: <ErrorElement />,
      },
      {
        path: "history/:history_id",
        element: <DetailHistory></DetailHistory>,
        loader: loadDetailHistory,
        errorElement: <ErrorElement />,
      },
      {
        path: "bioskop",
        errorElement: <ErrorElement />,
        children: [
          {
            index: true,
            element: <UserFindBranch></UserFindBranch>,
            loader: loadBranches,
            errorElement: <ErrorElement />,
          },
          {
            path: ":branch_id",
            element: <ScreeningByBranch></ScreeningByBranch>,
            loader: screeningByBranchLoader,
            errorElement: <ErrorElement />,
          },
        ],
      },
      {
        path: "film",
        errorElement: <ErrorElement />,
        children: [
          {
            index: true,
            element: <UserFindFilm></UserFindFilm>,
            loader: loadFilms,
            errorElement: <ErrorElement />,
          },
          {
            path: ":movie_id/screening",
            element: <ScreeningByMovie></ScreeningByMovie>,
            loader: loadScreeningByMovie,
            errorElement: <ErrorElement />,
          },
        ],
      },
      {
        path: "event/:event_id",
        element: <EventDetail />,
        loader: async (params) => {
          let x = await loadDetailEvent(params);
          let y = await loadCategoryEvent(params);
          let temp = {
            detailEvent: x,
            categoryEvent: y,
          };
          return temp;
        },
        errorElement: <ErrorElement />,
      },
      {
        path: "event/:event_id/checkout",
        element: <CheckoutEvent />,
        loader: async (params) => {
          console.log("ini params", params);
          let x = await loadDetailEventWithAuth(params);
          let y = await loadCategoryEventWithAuth(params);
          let temp = {
            detailEvent: x,
            categoryEvent: y,
          };
          return temp;
        },
        errorElement: <ErrorElement />,
      },
    ],
  },
  {
    path: "/cineplex",
    element: <LayoutCineplex />,
    // loader: loadUsers,
    // action: registerUser,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Navigate to="register" />,
      },
      {
        path: "register",
        element: <RegisterCineplex />,
        // loader: loadUsers,
        action: registerCineplex,
        // errorElement: <ErrorElement />,
      },
      {
        path: "login",
        element: <LoginCineplex />,
        // loader: loadUsers,
        action: loginCineplex,
        // errorElement: <ErrorElement />,
      },
      {
        path: "home",
        element: <HomeCineplex />,
        // loader: loadUsers,
        // action: loginCineplex,
        // errorElement: <ErrorElement />,
      },
      {
        path: "pending-email",
        element: <PendingEmail />,
      },
      {
        path: "concession",
        element: <CineplexConcession />,
        loader: loadMenu,
        // action: loginCineplex,
        errorElement: <ErrorElement />,
      },
      {
        path: "create-menu",
        element: <CineplexCreateMenu />,
        loader: loadMenu,
        action: createMenu,
        errorElement: <ErrorElement />,
      },
      {
        path: "edit-menu/:menu_id",
        element: <CineplexEditMenu />,
        loader: loadSingleMenu,
        // action: createMenu,
        errorElement: <ErrorElement />,
      },
      {
        path: "kode-promo",
        element: <CineplexKodePromo />,
        loader: loadPromo,
        // action: createMenu,
        errorElement: <ErrorElement />,
      },
      {
        path: "create-promo",
        element: <CineplexCreateKodePromo />,
        loader: loadPromo,
        // action: createMenu,
        errorElement: <ErrorElement />,
      },
      {
        path: "create-branch",
        element: <CineplexCreateCabang />,
        loader: loadCabang,
        // action: createMenu,
        errorElement: <ErrorElement />,
      },
      {
        path: "studios/:branch_id",
        element: <CineplexListStudios></CineplexListStudios>,
        loader: loadStudio,
        errorElement: <ErrorElement />,
      },
      {
        path: "studios/:branch_id/create-studio",
        element: <CineplexCreateStudio />,
        loader: loadStudio,
        action: createStudio,
        errorElement: <ErrorElement />,
      },
      {
        path: "jadwal",
        element: <CineplexJadwal />,
        loader: loadScreeningLengkap,
        errorElement: <ErrorElement />,
      },
      {
        //create screening
        path: "jadwal/create-screening",
        element: <CineplexCreateScreening />,
        loader: loadStudioAll,
        action: createScreening,
        errorElement: <ErrorElement />,
      },
      {
        path: "history",
        element: <CineplexHistoryTiket></CineplexHistoryTiket>,
        loader: loadCineplexHistory,
        // action: createStudio,
        errorElement: <ErrorElement />,
      },
      {
        path: "history/:history_id",
        element: <CineplexDetailHistoryTiket />,
        loader: loadCineplexDetailHistory,
      },
    ],
  },
  {
    path: "/event-organizer",
    element: <LayoutEventOrganizer />,
    // loader: loadUsers,
    // action: registerUser,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Navigate to="register" />,
      },
      {
        path: "register",
        element: <RegisterEventOrganizer />,
        // loader: loadUsers,
        action: registerEventOrganizer,
        errorElement: <ErrorElement />,
      },
      {
        path: "login",
        element: <LoginEventOrganizer />,
        // loader: loadUsers,
        // action: loginEventOrganizer,
        errorElement: <ErrorElement />,
      },
      {
        path: "home",
        element: <EventOrganizerHome />,
        // loader: loadUsers,
        // action: loginEventOrganizer,
        errorElement: <ErrorElement />,
      },
      {
        path: "create-event",
        element: <EventOrganizerCreateEvent />,
        // loader: loadUsers,
        action: createEvent,
        errorElement: <ErrorElement />,
      },
      {
        path: "jadwal",
        element: <PromotorJadwalEvent></PromotorJadwalEvent>,
        loader: loadAllEvents,
        // action: createStudio,
        errorElement: <ErrorElement />,
      },
      {
        path: "jadwal/:event_id",
        element: <PromotorDetailEvent></PromotorDetailEvent>,
        loader: loadDetailEventJadwal,
        // action: createStudio,
        errorElement: <ErrorElement />,
      },
      {
        path: "history",
        element: <PromotorHistoryTiket></PromotorHistoryTiket>,
        loader: loadPromotorHistory,
        // action: createStudio,
        errorElement: <ErrorElement />,
      },
      {
        path: "history/:history_id",
        element: <PromotorDetailHistoryTiket />,
        loader: loadPromotorDetailHistory,
      },
    ],
  },
  //
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <p>Silahkan pilih menu yang diingingkan</p>,
      },
      {
        path: "cineplex-verif",
        element: <AdminVerifCineplex />,
        loader: loadAllCineplex,
      },
      {
        path: "cineplex-verif/:cineplexId",
        element: <VerifikasiCineplexPage></VerifikasiCineplexPage>,
        loader: loadSingleCineplex,
        action: acceptVerif,
        tolakVerif,
      },
      {
        path: "promotor-verif",
        element: <AdminVerifpromotor />,
        loader: loadAllPromotor,
      },
      {
        path: "promotor-verif/:promotorId",
        element: <VerifikasiPromotorPage></VerifikasiPromotorPage>,
        loader: loadSinglePromotor,
        action: acceptVerifPromotor,
        tolakVerifPromotor,
      },
      {
        path: "event-verif",
        element: <AdminVerifEvent />,
        loader: loadAllEvent,
      },
      {
        path:"event-verif/:eventId",
        element: <VerifikasiEventPage/>,
        loader:loadSingleEvent,
        action: acceptVerifEvent, tolakVerifEvent,
      },
      {
        path: "laporan-penjualan",
        element: <AdminLaporanPenjualan />,
        loader: loadAllMovieTransactions,
      },
    ],
  },

  //ErrorElement page kalo server down
  {
    path: "/pending-email",
    element: <PendingEmail />,
    // loader: loadUsers,
    // action: registerUser,
    // errorElement: <ErrorElement />,
  },
  {
    path: "/ErrorElement-page",
    element: <ErrorPage />,
    // loader: loadUsers,
    // action: registerUser,
    // errorElement: <ErrorElement />,
  },

  {
    path: "/event-organizer/register",
    element: <RegisterEventOrganizer />,
    // loader: loadUsers,
    action: registerEventOrganizer,
    errorElement: <ErrorElement />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <Provider store={userStore}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

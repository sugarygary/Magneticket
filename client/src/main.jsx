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
  loadScreenByMovie,
  loadSeatInfo,
  loadPromo,
  loadCabang,
  loadStudio,
  loadHistory,
  loadDetailHistory,
  loadCineplexHistory,
  loadCineplexDetailHistory,
  loadOngoingEvent,
} from "./handlers/LoadHandler.jsx";
import PendingEmail from "./pages/pendingEmail.jsx";
import { LayoutUser } from "./pages/LayoutUser.jsx";
import { LayoutCineplex } from "./pages/LayoutCineplex.jsx";
import { LayoutEventOrganizer } from "./pages/LayoutEventOrganizer.jsx";
import ScreeningByMovie from "./pages/ScreeningByMovie.jsx";
import SeatingPage from "./pages/SeatingPage.jsx";
import CineplexConcession from "./pages/CineplexConcession.jsx";
import { createMenu, createStudio } from "./handlers/CineplexHandler.jsx";
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
import { UserFindBranch } from "./pages/UserFindBranch.jsx";
import EventOrganizerCreateEvent from "./pages/EventOrganizerCreateEvent.jsx";
import { createEvent } from "./handlers/EventOrganizerHandler.jsx";
import CineplexHistoryTiket from "./pages/CineplexHistoryTiket.jsx";
import CineplexDetailHistoryTiket from "./pages/CineplexDetailHistoryTiket.jsx";

async function coba() {
  let x = loadInTheater();
  let y = loadOngoingEvent();
  let temp = {
    inTheater: x,
    ongoingEvent: y
  };
  return temp;
}

const router = createBrowserRouter([
  // 3 path utama buat masing-masing aktor
  //masing masing aktor punya children
  {
    index: true,
    element: <Navigate to="/user" />,
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
        // loader: loadUsers,
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
            ongoingEvent: y
          };
          return temp;
        },
        // action: loginUser,
        errorElement: <ErrorElement />,
      },
      {
        path: "screening/:movie_id",
        element: <ScreeningByMovie></ScreeningByMovie>,
        loader: loadScreenByMovie,
        errorElement: <ErrorElement />,
      },
      {
        path: "seating/:movie_id/:screening_id",
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
        path: "branches",
        element: <UserFindBranch></UserFindBranch>,
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
      }
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
        path: "create-event",
        element: <EventOrganizerCreateEvent />,
        // loader: loadUsers,
        action: createEvent,
        errorElement: <ErrorElement />,
      }
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

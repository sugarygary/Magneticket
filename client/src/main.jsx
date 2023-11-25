import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
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
} from "./handlers/LoadHandler.jsx";
import PendingEmail from "./pages/pendingEmail.jsx";
import { LayoutUser } from "./pages/LayoutUser.jsx";
import { LayoutCineplex } from "./pages/LayoutCineplex.jsx";
import { LayoutEventOrganizer } from "./pages/LayoutEventOrganizer.jsx";
import ScreeningByMovie from "./pages/ScreeningByMovie.jsx";
import SeatingPage from "./pages/SeatingPage.jsx";
import CineplexConcession from "./pages/CineplexConcession.jsx";
import { createMenu } from "./handlers/CineplexHandler.jsx";
import { createTiket } from "./handlers/UserHandler.jsx";
import CineplexCreateMenu from "./pages/CineplexCreateMenu.jsx";
import ErrorElement from "./pages/ErrorElement.jsx";

const router = createBrowserRouter([
  // 3 path utama buat masing-masing aktor
  //masing masing aktor punya children
  {
    index: true,
    element: <Navigate to="/user" />,
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
        loader: loadInTheater,
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
        action: createTiket,
        errorElement: <ErrorElement />,
      },
      {

      }
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
        errorElement: <ErrorElement />,
      },
      {
        path: "login",
        element: <LoginCineplex />,
        // loader: loadUsers,
        action: loginCineplex,
        errorElement: <ErrorElement />,
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
        // loader: loadMenu,
        action: createMenu,
        errorElement: <ErrorElement />,
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
        // element: <LoginEventOrganizer />,
        // loader: loadUsers,
        // action: loginEventOrganizer,
        errorElement: <ErrorElement />,
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
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

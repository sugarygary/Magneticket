import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginUser from './pages/LoginUser.jsx'

import { loginUser, registerCineplex, registerEventOrganizer, registerUser } from './handlers/LoginHandler.jsx'
import RegisterUser from './pages/RegisterUser.jsx'
import LoginCineplex from './pages/LoginCineplex.jsx'
import RegisterCineplex from './pages/RegisterCineplex.jsx'
import RegisterEventOrganizer from './pages/RegisterEventOrganizer.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginUser />,
    // loader: loadUsers,
    action: loginUser,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <RegisterUser />,
    // loader: loadUsers,
    action: registerUser,
    errorElement: <Error />,
  },
  {
    path: "/cineplex",
    element: <LoginCineplex />,
    // loader: loadUsers,
    // action: registerUser,
    errorElement: <Error />,
  },
  {
    path: "/cineplex/register",
    element: <RegisterCineplex />,
    // loader: loadUsers,
    action: registerCineplex,
    errorElement: <Error />,
  },
  {
    path: "/event-organizer",
    // element: <LoginCineplex />,
    // loader: loadUsers,
    // action: registerUser,
    errorElement: <Error />,
  },
  {
    path: "/event-organizer/register",
    element: <RegisterEventOrganizer />,
    // loader: loadUsers,
    action: registerEventOrganizer,
    errorElement: <Error />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}>

    </RouterProvider>
  </React.StrictMode>,
)

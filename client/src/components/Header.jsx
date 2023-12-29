import { useState, useEffect } from "react";
import logo1 from "../assets/logo1.png";
import search from "../assets/search.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../redux/userSlice";
import client from "../util/client";
import { initFlowbite } from "flowbite";
import "flowbite";
const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current_user } = useSelector((state) => state.user);
  async function logout() {
    await client.get("api/auth/logout");
    // window.location.reload();
    navigate("/");
  }
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);
  initFlowbite();
  return (
    <nav className="border-gray-200 z-50 biruTua fixed top-0 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={"/user/home"}
          className="flex select-none items-center space-x-1 md:space-x-3 rtl:space-x-reverse"
        >
          <img src={logo1} className="h-6 md:h-8" />
          <span className="self-center font-magneticket text-md md:text-4xl [#f8f8f8]space-nowrap text-[#f8f8f8]">
            | MAGNETICKET
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {current_user.userId != null && current_user.role == "USER" && (
            <>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#f8f8f8"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div
                className="z-50 hidden my-4 text-base list-none divide-y rounded-lg shadow bg-gray-700 divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-[#f8f8f8]">
                    {current_user.display_name}
                  </span>
                  <span className="block text-sm truncate text-gray-400">
                    {current_user.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      to={"/user/history"}
                      className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-[#f8f8f8]"
                    >
                      Transaksi
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/user/tickets"}
                      className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-[#f8f8f8]"
                    >
                      Tiket Saya
                    </Link>
                  </li>
                  <li>
                    <div
                      onClick={logout}
                      className="cursor-pointer block px-4 py-2 text-sm text-red-500 hover:bg-gray-600"
                    >
                      Keluar
                    </div>
                  </li>
                </ul>
              </div>
            </>
          )}
          {current_user.role != "USER" && (
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Link
                to={"/user/login"}
                className="text-sm text-[#f8f8f8] hover:text-[#1C64F2] hover:underline"
              >
                Login
              </Link>
              <Link
                to={"/user/register"}
                className="text-sm bg-[#1C64F2] px-2 py-1 rounded text-[#f8f8f8] hover:underline"
              >
                Register
              </Link>
            </div>
          )}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:biruTua border-gray-700">
            <li>
              <NavLink
                to="/user/home"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 text-[#f8f8f8] bg-blue-700 rounded md:bg-transparent md:p-0 md:text-blue-500"
                    : "block py-2 px-3 rounded md:p-0 text-[#f8f8f8] md:hover:text-blue-500 hover:bg-gray-700 hover:text-[#f8f8f8] md:hover:bg-transparent"
                }
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/event"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 text-[#f8f8f8] bg-blue-700 rounded md:bg-transparent md:p-0 md:text-blue-500"
                    : "block py-2 px-3 rounded md:p-0 text-[#f8f8f8] md:hover:text-blue-500 hover:bg-gray-700 hover:text-[#f8f8f8] md:hover:bg-transparent"
                }
                aria-current="page"
              >
                Event
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/bioskop"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 text-[#f8f8f8] bg-blue-700 rounded md:bg-transparent md:p-0 md:text-blue-500"
                    : "block py-2 px-3 rounded md:p-0 text-[#f8f8f8] md:hover:text-blue-500 hover:bg-gray-700 hover:text-[#f8f8f8] md:hover:bg-transparent"
                }
                aria-current="page"
              >
                Bioskop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/film"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 text-[#f8f8f8] bg-blue-700 rounded md:bg-transparent md:p-0 md:text-blue-500"
                    : "block py-2 px-3 rounded md:p-0 text-[#f8f8f8] md:hover:text-blue-500 hover:bg-gray-700 hover:text-[#f8f8f8] md:hover:bg-transparent"
                }
              >
                Film
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

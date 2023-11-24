import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import logo1 from "../assets/logo1.png";
import search from "../assets/search.png";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    // <div className="flex w-full flex-wrap biruTua text-[#f8f8f8] px-12 p-5 justify-between">
    //   <div className="kiri flex">
    //     {/* <p className="fontBiasa">asdasdasd</p> */}
    //     {/* kiri */}
    //     <Link to="/">
    //       <span>
    //         <img src={logo1} alt="" className="w-20" />
    //       </span>
    //     </Link>
    //     <p className="text-4xl mx-3">|</p>
    //     <p className="font-magneticket text-5xl">MAGNETICKET</p>
    //     <Link to="/event-organizer" className="ml-5 mt-3  text-xl">
    //       Event{" "}
    //     </Link>
    //     <Link to="/cineplex" className="ml-5  mt-3 text-xl">
    //       Bioskop
    //     </Link>
    //   </div>
    //   <div className="kanan flex">
    //     {/* <p className="font-magneticket">zzzzzzzz</p> */}
    //     {/* kanan */}
    //     <div className="abuInput rounded flex ml-24">
    //       <img src={search} alt="" className="w-7 h-7 mt-3 ml-1 mr-1" />
    //       <input
    //         type="text"
    //         className="abuInput w-[25vw] rounded border-transparent"
    //         placeholder="Search"
    //       />
    //     </div>

    //     <div className="p-1 biruMuda rounded ml-1 w-14 flex item-center">
    //       <img src={search} alt="" className="w-12 " />
    //     </div>
    //     <Link to="login" className="ml-5 text-xl  p-3">
    //       Masuk{" "}
    //     </Link>
    //     <Link to="register" className="ml-5 text-xl biruMuda p-3 rounded">
    //       Register
    //     </Link>
    //   </div>
    // </div>
    <nav className="border-gray-200 z-50 biruTua fixed top-0 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={"/user/home"}
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo1} class="h-8" />
          <span className="self-center font-magneticket text-xl sm:text-4xl [#f8f8f8]space-nowrap text-[#f8f8f8]">
            | MAGNETICKET
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
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
              <span className="block text-sm text-[#f8f8f8]">Bonnie Green</span>
              <span className="block text-sm truncate text-gray-400">
                name@flowbite.com
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-[#f8f8f8]"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-[#f8f8f8]"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-[#f8f8f8]"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-600"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
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
              <a
                href="#"
                className="block py-2 px-3 text-[#f8f8f8] bg-blue-700 rounded md:bg-transparent md:p-0 md:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 rounded md:p-0 text-[#f8f8f8] md:hover:text-blue-500 hover:bg-gray-700 hover:text-[#f8f8f8] md:hover:bg-transparent"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 rounded md:p-0 text-[#f8f8f8] md:hover:text-blue-500 hover:bg-gray-700 hover:text-[#f8f8f8] md:hover:bg-transparent border-gray-700"
              >
                Services
              </a>
            </li>
            <li>
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center justify-between w-full py-2 px-3 rounded md:border-0 md:p-0 md:w-auto text-[#f8f8f8] md:hover:text-blue-500 focus:text-[#f8f8f8] border-gray-700 hover:bg-gray-700 md:hover:bg-transparent"
              >
                Dropdown
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownNavbar"
                className="z-10 hidden font-normal divide-y rounded-lg shadow w-44 bg-gray-700 divide-gray-600"
              >
                <ul
                  className="py-2 text-sm text-gray-400"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-[#f8f8f8]"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-600 hover:text-[#f8f8f8]"
                    >
                      Settings
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

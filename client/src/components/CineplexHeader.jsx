import { useState, useEffect } from "react";
import logo1 from "../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../redux/userSlice";
import client from "../util/client";
import { initFlowbite } from "flowbite";
import "flowbite";

const CineplexHeader = (props) => {
  const { current_user } = useSelector((state) => state.user);
  const [boolMenu, setBoolMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    initFlowbite();
    dispatch(fetchCurrentUser());
  }, []);

  async function logout() {
    await client.get("api/auth/logout");
    navigate("/cineplex/login");
  }

  return (
    <>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="sidebar-multi-level-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <div className="p-4">
          <div className="justify-center flex mt-4">
              <img src={logo1} alt="" className="w-12 mx-2" />
              <p className="font-magneticket text-4xl  text-white">MAGNETICKET</p>
          </div>
          <div className="flex justify-between">
            <div></div>
            <div className="text-sm italic text-white">
              <p>FOR CINEPLEX</p>
            </div>
          </div>
        </div>
          <ul class="space-y-2 font-medium">
            <li>
              <Link
                to={'/cineplex/home'}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span class="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Master
                </span>
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul id="dropdown-example" class="hidden py-2 space-y-2">
                <li>
                  <Link
                    to={'/cineplex/jadwal'}
                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Movie
                  </Link>
                </li>
                <li>
                  <Link
                  to={'/cineplex/concession'}
                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Menu
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/cineplex/create-branch'}
                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Cabang
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/cineplex/kode-promo'}
                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Promo
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to={'/cineplex/history'}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span class="flex-1 ms-3 whitespace-nowrap">History</span>
              </Link>
            </li>
          </ul>
          <hr className="my-4"/>
      <button
        type="button"
        className="text-sm bg-gray-800 rounded-full px-4"
        id="user-menu-button"
        aria-expanded="false"
        onClick={(()=> {setBoolMenu(!boolMenu)})}
      >
        <div className="flex">
          <div>
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
          </div>
          <div>
            <div className="px-3 mt-0.5">
              <span className="block text-sm text-[#f8f8f8]">
                {current_user.display_name}
              </span>
            </div>
          </div>
        </div>
      </button>
      <div
        className={`z-50 ${!boolMenu ? "hidden" : ""} my-4 text-base list-none divide-y rounded-lg shadow bg-gray-700 divide-gray-600`}
        id="user-dropdown"
      >
        <div className="px-4 py-3">
              <span className="block text-sm truncate text-gray-400">
                {current_user.email}
              </span>
            </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <button
              type="button"
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900"
              onClick={logout}
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
        </div>
      </aside>
    </>
  );
};

export default CineplexHeader;

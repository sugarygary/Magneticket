import { useState, useEffect } from "react";
import logo1 from "../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../redux/userSlice";
import client from "../util/client";

const CineplexHeader = (props) => {
  const { current_user } = useSelector((state) => state.user);
  const [boolMenu, setBoolMenu] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  const [boolSales, setBoolSales] = useState(false)
    function buttonSales() {
        if (boolSales) {
            setBoolSales(false)
        } else {
            setBoolSales(true)
        }
    }

    async function logout() {
      await client.get("api/auth/logout");
      navigate("/cineplex/login")
    }

  return (
    <aside className="bg-gray-800 text-white w-72 flex flex-col max-h-full px-4">
      <div className="p-4">
        <div className="justify-center flex mt-4">
            <img src={logo1} alt="" className="w-12 mx-2" />
            <p className="font-magneticket text-4xl">MAGNETICKET</p>
        </div>
        <div className="flex justify-between">
          <div></div>
          <div className="text-sm italic">
            <p>FOR CINEPLEX</p>
          </div>
        </div>
      </div>
      <nav className="text-md mt-2">
        <ul>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to={'/cineplex/home'} className="block">Home</Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="#" className="block" onClick={() => {buttonSales()}}>Master</a>
            {boolSales &&
                <ul className="pl-4">
              <li className="py-2 px-4 hover:bg-gray-700">
                <Link to={'/cineplex/create-branch'} className="block">Cabang</Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-700">
                <Link to={'/cineplex/kode-promo'} className="block">Promo</Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-700">
                <Link to={'/cineplex/concession'} className="block">Menu</Link>
              </li>
            </ul>
            }
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to={'/cineplex/jadwal'} className="block">Jadwal</Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to={'/cineplex/history'} className="block">History</Link>
          </li>
        </ul>
      </nav>
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
    </aside>
  );
};

export default CineplexHeader;
import { useState, useEffect } from "react";
import logo1 from "../assets/logo1.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../redux/userSlice";

const CineplexHeader = (props) => {
  const { current_user } = useSelector((state) => state.user);
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
                <Link to={'/cineplex/create-promo'} className="block">Promo</Link>
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
            <Link to={'/cineplex/kode-promo'} className="block">Promo</Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to={'/cineplex/history'} className="block">History</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default CineplexHeader;
import { useState, useEffect } from "react";
import logo1 from "../assets/logo1.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCurrentUser } from "../redux/userSlice";

const AdminSidebar = (props) => {
  //   const { current_user } = useSelector((state) => state.user);
  //   const dispatch = useDispatch()
  //   useEffect(() => {
  //     dispatch(fetchCurrentUser());
  //   }, []);

  const [boolSales, setBoolSales] = useState(false);
  const [boolLaporan, setBoolLaporan] = useState(false);
  const [boolVerif, setBoolVerif] = useState(false);
  function buttonSales() {
    if (boolSales) {
      setBoolSales(false);
    } else {
      setBoolSales(true);
    }
  }
  function buttonLaporan() {
    if (boolLaporan) {
      setBoolLaporan(false);
    } else {
      setBoolLaporan(true);
    }
  }
  function buttonVerif() {
    if (boolVerif) {
      setBoolVerif(false);
    } else {
      setBoolVerif(true);
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
            <p>FOR ADMIN</p>
          </div>
        </div>
      </div>
      <nav className="text-md mt-2">
        <ul>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to={""} className="block">
              Home
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a
              href="#"
              className="block"
              onClick={() => {
                buttonSales();
              }}
            >
              Sales
            </a>
            {boolSales && (
              <ul className="pl-4">
                <li className="py-2 px-4 hover:bg-gray-700">
                  <Link to={""} className="block">
                    Cineplex
                  </Link>
                </li>
                <li className="py-2 px-4 hover:bg-gray-700">
                  <Link to={""} className="block">
                    Event Organizer
                  </Link>
                </li>
                <li className="py-2 px-4 hover:bg-gray-700">
                  <Link to={""} className="block">
                    Invoice
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a
              href="#"
              className="block"
              onClick={() => {
                buttonLaporan();
              }}
            >
              Laporan
            </a>
            {boolLaporan && (
              <ul className="pl-4">
                <li className="py-2 px-4 hover:bg-gray-700">
                  <Link to={""} className="block">
                    Penjualan Bioskop
                  </Link>
                </li>
                <li className="py-2 px-4 hover:bg-gray-700">
                  <Link to={""} className="block">
                    Penjualan Konser
                  </Link>
                </li>
                <li className="py-2 px-4 hover:bg-gray-700">
                  <Link to={""} className="block">
                    Laporan Film
                  </Link>
                </li>
                <li className="py-2 px-4 hover:bg-gray-700">
                  <Link to={""} className="block">
                    Laporan Keuntungan
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a
              href="#"
              className="block"
              onClick={() => {
                buttonVerif();
              }}
            >
              Verifikasi
            </a>
            {boolVerif && (
              <ul className="pl-4">
                <li className="py-2 px-4 hover:bg-gray-700">
                  <Link to={"/admin/cineplex-verif"} className="block">
                    Verifikasi Cineplex
                  </Link>
                </li>
                <li className="py-2 px-4 hover:bg-gray-700">
                  <Link to={"/admin/promotor-verif"} className="block">
                    Verifikasi Event Organizer
                  </Link>
                </li>
                <li className="py-2 px-4 hover:bg-gray-700">
                  <Link to={"/admin/event-verif"} className="block">
                    Verifikasi Event
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to={""} className="block">
              Messages
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;

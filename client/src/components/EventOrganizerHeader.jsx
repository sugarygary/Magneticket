import { useState, useEffect } from "react";
import logo1 from "../assets/logo1.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../redux/userSlice";

const EventOrganizerHeader = (props) => {
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
            <p>FOR EVENTS</p>
          </div>
        </div>
      </div>
      <nav className="text-md mt-2">
        <ul>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to={'/event-organizer/home'} className="block">Home</Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="#" className="block" onClick={() => {buttonSales()}}>Master</a>
            {boolSales &&
              <ul className="pl-4">
                <li className="py-2 px-4 hover:bg-gray-700">
                  <Link to={'/event-organizer/create-event'} className="block">Event</Link>
                </li>
              </ul>
            }
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to={'/event-organizer/history'} className="block">History</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default EventOrganizerHeader;

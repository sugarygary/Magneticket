import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import logo1 from "../assets/logo1.png";
import search from "../assets/search.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../redux/userSlice";

const EventOrganizerHeader = (props) => {
  const { current_user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);
  return (
    <div className="flex biruTua text-white px-12 p-5 justify-between ">
      <div className="kiri flex ">
        {/* <p className="fontBiasa">asdasdasd</p> */}
        {/* kiri */}
        <Link to="/event-organizer">
          <span>
            <img src={logo1} alt="" className="w-20" />
          </span>
        </Link>
        <p className="text-4xl mx-3">|</p>
        <p className="font-magneticket text-5xl">MAGNETICKET</p>
        <Link to="/event-organizer" className="ml-5 mt-3  text-xl">
          Event{" "}
        </Link>
        <Link to="/cineplex" className="ml-5  mt-3 text-xl">
          Bioskop
        </Link>
      </div>
      <div className="kanan flex ">
        {/* <p className="font-magneticket">zzzzzzzz</p> */}
        {/* kanan */}

        <div className="p-1 biruMuda rounded ml-1 w-14 flex item-center">
          <img src={search} alt="" className="w-12 " />
        </div>
        <Link to="login" className="ml-5 text-xl  p-3">
          Masuk{" "}
        </Link>
        <Link to="register" className="ml-5 text-xl biruMuda p-3 rounded">
          Register
        </Link>
      </div>
    </div>
  );
};

export default EventOrganizerHeader;

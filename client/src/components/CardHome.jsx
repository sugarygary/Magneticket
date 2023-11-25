import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import { Link } from "react-router-dom";

import openheimer from "../assets/openheimer.jpg";
const CardHome = (props) => {
//   console.log(props.movie);
  return (
    <div className="biruTua my-5 w-fit text-center mr-8 rounded">
      <img src={props.movie.img} alt="" className="w-64 rounded" />
      <div className="text-white py-3">
        <p className="font-bold text-lg">{props.movie.title}</p>
        {/* <p className="abu9CA3AF">2D IMAX</p> */}
        <Link
          to={`/user/screening/${props.movie._id}`}
          className="biruCariTiket rounded p-1 px-4 mt-2"
        >
          Cari Tiket ➡
        </Link>
      </div>
    </div>
  );
};

export default CardHome;

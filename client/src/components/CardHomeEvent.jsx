import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import { Link } from "react-router-dom";

import openheimer from "../assets/openheimer.jpg";

const CardHomeEvent = (props) => {
  return (
    <div className="biruTua my-5 w-full text-center mr-8 rounded">
      <img
        src={`${process.env.BACKEND_URL}/promotor/eventposter-${props.event_id}.jpg`}
        alt=""
        className="aspect-[2/3] object-center w-full rounded"
      />
      <div className="text-white py-3 px-2">
        <p className="font-bold text-sm sm:text-lg mb-2">{props.event_name}</p>
        <Link
          //   to={`/user/screening/${props.movie._id}`}
          className="biruCariTiket rounded p-1 px-4 mb-4"
        >
          Cari Tiket ➡
        </Link>
      </div>
    </div>
  );
};

export default CardHomeEvent;

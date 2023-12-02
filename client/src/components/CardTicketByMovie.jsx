import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import openheimer from "../assets/openheimer.jpg";
const CardTicketByMovie = (props) => {
  return (
    <div className="my-5 rounded block md:flex shadow-lg border">
      <img src={props.img} alt="" className="w-full md:w-40 rounded" />
      <div className="text-black pt-3 ml-5">
        <p className="font-bold text-lg">{props.title}</p>
        {/* <p className="abu9CA3AF">2D IMAX</p> */}
        <p className="text-md">Sinopsis</p>
        <p className="text-md">{props.synopsis}</p>
        <div className="flex my-1">
          <div className="px-5 p-1 biruTua rounded">
            <p className="text-white">{props.age_rating}</p>
          </div>
        </div>
        <div className="flex pb-4 mt-2">
          <p className="abu9CA3AF">Durasi : </p>
          <p className="biruTuaText ml-10">
            {Math.floor(props.runtime_minutes / 60) >= 1 && (
              <>{Math.floor(props.runtime_minutes / 60)} jam </>
            )}
            {Math.floor(props.runtime_minutes) % 60} menit
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardTicketByMovie;

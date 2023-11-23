import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import openheimer from "../assets/openheimer.jpg";
const CardTicketByMovie = (props) => {
  console.log(props);
  return (
    <div className="my-5 rounded flex shadow-lg">
      <img src={props.img} alt="" className="w-64 rounded" />
      <div className="text-black pt-3 ml-5">
        <p className="font-bold text-lg">{props.title}</p>
        {/* <p className="abu9CA3AF">2D IMAX</p> */}
        <p>Sinopsis</p>
        <p>{props.synopsis}</p>
        <div className="flex mb-1">
          <p className="abu9CA3AF">Rating Usia : </p>
          <div className="ml-3 px-5 p-1 biruTua rounded">
            <p className="text-white">{props.age_rating}</p>
          </div>
        </div>
        <div className="flex">
          <p className="abu9CA3AF">Durasi : </p>
          <p className="biruTuaText ml-12">
            {Math.floor(props.runtime_minutes / 60) >= 1 && (
              <>
                {Math.floor(props.runtime_minutes / 60)} hour
                {Math.floor(props.runtime_minutes / 60) > 1 && <>s </>}
              </>
            )}
            {Math.floor(props.runtime_minutes) % 60} minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardTicketByMovie;

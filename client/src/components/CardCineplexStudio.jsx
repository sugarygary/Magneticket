import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import sawx from "../assets/sawx.png";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
const CardCineplexStudio = (props) => {
  return (
    <div className="rounded-md mb-3 shadow-xl biruTua border border-8 border-[#1f2a37]">
      <div className="flex">
        <img
          src={props.img}
          alt=""
          className="w-24 md:w-32 h-full aspect-[2/3] rounded"
        />
        <div className="w-full py-4 text-[#f8f8f8] ml-4 md:ml-8">
          <p className="font-extrabold text-lg md:text-2xl mb-2">
            {props.title}
          </p>
          <table className="table text-sm md:text-lg">
            <tbody>
              <tr>
                <td className="">
                  <p className="abu9CA3AF pe-2 md:pe-2">Durasi : </p>
                </td>
                <td>
                  <p className="">
                    {props.runtime >= 60 &&
                      `${Math.floor(props.runtime / 60)} jam `}
                    {props.runtime % 60} menit
                  </p>
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  <p className="w-fit px-2 md:px-4 cursor-default py-0.5 bg-[#f8f8f8] text-black text-center rounded-full">
                    {props.age_rating}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="py-2 px-2 rounded mt-2 flex flex-wrap gap-2 bg-[#f8f8f8]">
        {props.screenings.map((screening) => {
          console.log(screening);
          if (
            screening.showtime <
            moment(new Date()).tz("Asia/Jakarta").toISOString()
          ) {
            return (
              <div
                key={screening.screening_id}
                className="font-extrabold cursor-not-allowed select-none bg-[#D4D4D4] text-black border border-black rounded-lg px-2 text-center py-1"
              >
                {moment(screening.showtime).tz("Asia/Jakarta").format("HH:mm")}
              </div>
            );
          }
          return (
            <Link
              to={`/user/seating/${screening.screening_id}`}
              key={screening.screening_id}
              className="font-extrabold cursor-pointer select-none hover:bg-[#1c64f2] hover:text-white hover:border-[#1c64f2] bg-[#F8f8f8] text-black border border-black rounded-lg px-2 text-center py-1"
            >
              {moment(screening.showtime).tz("Asia/Jakarta").format("HH:mm")}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CardCineplexStudio;

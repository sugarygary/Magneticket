import moment from "moment";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "moment/locale/id";
const CardHistoryTransaksi = (props) => {
  return (
    <div className="w-full mb-4">
      <div className="rounded-t md:rounded border-4 border border-[#1f2a37] flex shadow-lg text-[#f8f8f8] biruTua">
        <img
          src={props.movie_img}
          alt=""
          className="w-24 aspect-[2/3] h-full sm:w-28 md:w-36 rounded"
        />
        <div className="px-4 py-5 sm:py-3 md:ml-2 w-full relative">
          <div
            className={`font-bold text-[.8rem] md:text-lg text-right ${
              props.status === "PENDING"
                ? "text-orange-500"
                : props.status === "FAILED"
                ? "text-red-500"
                : props.status === "REFUND"
                ? "text-blue-600"
                : "text-green-600"
            } text-regular font-bold absolute top-2 right-2`}
          >
            {props.status}
          </div>
          <div className="font-extrabold text-base md:text-lg">
            {props.movie_title}
          </div>
          <div className="font-bold mt-1 text-[.8rem] md:text-base">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[1rem] h-[1rem] md:w-[1.5rem] md:h-[1.5rem]"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="">{props.branch_name}</div>
            </div>
          </div>
          <div className="font-bold mt-1 text-[.8rem] md:text-base">
            <div className="flex items-center gap-1 text-[.8rem] md:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[1rem] h-[1rem] md:w-[1.5rem] md:h-[1.5rem]"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="">{props.seats.length} Kursi</div>
            </div>
          </div>
          <div className="font-bold text-[.6rem] md:text-[.8rem] mt-2">
            {moment(props.createdAt)
              .tz("Asia/Jakarta")
              .locale("id")
              .format("dddd, DD-MM-YYYY")}
          </div>
          <Link
            className="px-5 py-1 rounded biruMuda hidden sm:block text-[#f8f8f8] absolute bottom-2 right-2"
            to={`/user/history/${props._id}`}
          >
            {" "}
            Detail
          </Link>
        </div>
      </div>
      <Link className="" to={`/user/history/${props._id}`}>
        <div className="px-5 sm:hidden py-1 w-full text-center rounded-b biruMuda text-sm text-white">
          Detail
        </div>
      </Link>
    </div>
  );
};

export default CardHistoryTransaksi;

import React, { useEffect, useState } from "react";
import client from "../util/client";
import { Link, useLoaderData } from "react-router-dom";
export const UserFindFilm = () => {
  let { nowshowing, presale } = useLoaderData();
  return (
    <>
      {presale.length == 0 && nowshowing.length == 0 && (
        <div className="grid font-bold text-2xl h-96 text-black mt-24 place-items-center">
          Film tidak tersedia
        </div>
      )}
      {nowshowing.length > 0 && (
        <div className="mt-24 px-4">
          <div className="font-bold text-2xl">NOW SHOWING</div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 sm:gap-4 md:gap-3 gap-2">
            {nowshowing.map((mov) => (
              <div className="biruTua snap-start my-2 text-center flex-none rounded">
                <img
                  src={mov.movie.img}
                  alt=""
                  className="aspect-[2/3] object-center w-full rounded"
                />
                <div className="text-white py-3 px-2">
                  <p
                    title={mov.movie.title}
                    className="font-bold hover:underline cursor-default text-xs md:text-lg truncate mb-2"
                  >
                    {mov.movie.title}
                  </p>
                  <Link
                    to={`/user/film/${mov.movie._id}/screening`}
                    className="biruCariTiket text-[.6rem] md:text-lg rounded p-1 px-2 mb-2"
                  >
                    Cari Tiket ➡
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {presale.length > 0 && (
        <div className="mt-4 px-4">
          <div className="font-bold text-2xl">PRESALE</div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 sm:gap-4 md:gap-3 gap-2">
            {presale.map((mov) => (
              <div className="biruTua snap-start my-2 text-center flex-none rounded">
                <img
                  src={mov.movie.img}
                  alt=""
                  className="aspect-[2/3] object-center w-full rounded"
                />
                <div className="text-white py-3 px-2">
                  <p
                    title={mov.movie.title}
                    className="font-bold hover:underline cursor-default text-xs md:text-lg truncate mb-2"
                  >
                    {mov.movie.title}
                  </p>
                  <Link
                    to={`/user/film/${mov.movie._id}/screening`}
                    className="biruCariTiket text-[.6rem] md:text-lg rounded p-1 px-2 mb-2"
                  >
                    Cari Tiket ➡
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export const loadFilms = async () => {
  let nowshowing, presale;
  try {
    nowshowing = await client.get("api/public/now-showing");
    presale = await client.get("api/public/pre-sale");
  } catch (error) {
    if (error.response) {
      if (error.response.status == 404) {
        throw new Response("Not found", { status: 404 });
      }
    } else if (error.request) {
      throw new Response("Internal Server Error", { status: 500 });
    }
    return error;
  }
  return { nowshowing: nowshowing.data, presale: presale.data };
};

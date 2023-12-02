import React, { useEffect, useState } from "react";
import client from "../util/client";
import { Link, useLoaderData } from "react-router-dom";
export const UserFindFilm = () => {
  let { nowshowing, presale } = useLoaderData();
  console.log(nowshowing);
  console.log(presale);
  return (
    <>
      <div className="mt-24 px-4">
        <div className="font-bold text-2xl">NOW SHOWING</div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 sm:gap-4 md:gap-3 gap-2">
          <div className="biruTua snap-start my-2 text-center flex-none rounded">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMjE4ZTZlNDAtM2Q3YS00YjFhLThjN2UtODg2ZGNlN2E2MWU2XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg"
              alt=""
              className="aspect-[2/3] object-center w-full rounded"
            />
            <div className="text-white py-3 px-2">
              <p
                title="Killers of the Flower Moon"
                className="font-bold hover:underline cursor-default text-xs md:text-lg truncate mb-2"
              >
                Killers of the Flower Moon
              </p>
              <Link
                to={`/user/film/asdasd/screening`}
                className="biruCariTiket text-[.6rem] md:text-lg rounded p-1 px-2 mb-2"
              >
                Cari Tiket ➡
              </Link>
            </div>
          </div>
          <div className="biruTua snap-start my-2 text-center flex-none rounded">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMjE4ZTZlNDAtM2Q3YS00YjFhLThjN2UtODg2ZGNlN2E2MWU2XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg"
              alt=""
              className="aspect-[2/3] object-center w-full rounded"
            />
            <div className="text-white py-3 px-2">
              <p
                title="Killers of the Flower Moon"
                className="font-bold hover:underline cursor-default text-xs md:text-lg truncate mb-2"
              >
                Killers of the Flower Moon
              </p>
              <Link
                to={`/user/film/asdasd/screening`}
                className="biruCariTiket text-[.6rem] md:text-lg rounded p-1 px-2 mb-2"
              >
                Cari Tiket ➡
              </Link>
            </div>
          </div>
          <div className="biruTua snap-start my-2 text-center flex-none rounded">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMjE4ZTZlNDAtM2Q3YS00YjFhLThjN2UtODg2ZGNlN2E2MWU2XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg"
              alt=""
              className="aspect-[2/3] object-center w-full rounded"
            />
            <div className="text-white py-3 px-2">
              <p
                title="Killers of the Flower Moon"
                className="font-bold hover:underline cursor-default text-xs md:text-lg truncate mb-2"
              >
                Killers of the Flower Moon
              </p>
              <Link
                to={`/user/film/asdasd/screening`}
                className="biruCariTiket text-[.6rem] md:text-lg rounded p-1 px-2 mb-2"
              >
                Cari Tiket ➡
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 px-4">
        <div className="font-bold text-2xl">PRESALE</div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 sm:gap-4 md:gap-3 gap-2">
          <div className="biruTua snap-start my-2 text-center flex-none rounded">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMjE4ZTZlNDAtM2Q3YS00YjFhLThjN2UtODg2ZGNlN2E2MWU2XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg"
              alt=""
              className="aspect-[2/3] object-center w-full rounded"
            />
            <div className="text-white py-3 px-2">
              <p
                title="Killers of the Flower Moon"
                className="font-bold hover:underline cursor-default text-xs md:text-lg truncate mb-2"
              >
                Killers of the Flower Moon
              </p>
              <Link
                to={`/user/film/asdasd/screening`}
                className="biruCariTiket text-[.6rem] md:text-lg rounded p-1 px-2 mb-2"
              >
                Cari Tiket ➡
              </Link>
            </div>
          </div>
          <div className="biruTua snap-start my-2 text-center flex-none rounded">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMjE4ZTZlNDAtM2Q3YS00YjFhLThjN2UtODg2ZGNlN2E2MWU2XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg"
              alt=""
              className="aspect-[2/3] object-center w-full rounded"
            />
            <div className="text-white py-3 px-2">
              <p
                title="Killers of the Flower Moon"
                className="font-bold hover:underline cursor-default text-xs md:text-lg truncate mb-2"
              >
                Killers of the Flower Moon
              </p>
              <Link
                to={`/user/film/asdasd/screening`}
                className="biruCariTiket text-[.6rem] md:text-lg rounded p-1 px-2 mb-2"
              >
                Cari Tiket ➡
              </Link>
            </div>
          </div>
          <div className="biruTua snap-start my-2 text-center flex-none rounded">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMjE4ZTZlNDAtM2Q3YS00YjFhLThjN2UtODg2ZGNlN2E2MWU2XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg"
              alt=""
              className="aspect-[2/3] object-center w-full rounded"
            />
            <div className="text-white py-3 px-2">
              <p
                title="Killers of the Flower Moon"
                className="font-bold hover:underline cursor-default text-xs md:text-lg truncate mb-2"
              >
                Killers of the Flower Moon
              </p>
              <Link
                to={`/user/film/asdasd/screening`}
                className="biruCariTiket text-[.6rem] md:text-lg rounded p-1 px-2 mb-2"
              >
                Cari Tiket ➡
              </Link>
            </div>
          </div>
        </div>
      </div>
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

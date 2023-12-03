import React from "react";
import CardTicketByMovie from "../components/CardTicketByMovie";
import {
  Link,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import moment from "moment-timezone";
import client from "../util/client";
import { kotaDanKabupaten } from "../util/kotaDanKabupaten";

export default function ScreeningByMovie() {
  const { responseMovie, responseScreening } = useLoaderData();
  let [searchParams, setSearchParams] = useSearchParams();
  const { state } = useNavigation();
  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === "") {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }
  return (
    <>
      <div className="px-10 py-5">
        <CardTicketByMovie {...responseMovie}></CardTicketByMovie>
        <div className="font-bold text-lg">Filter</div>
        <div className="flex gap-1">
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            defaultValue={
              searchParams.get("date") == null
                ? moment().tz("Asia/Jakarta").format("yyyy-MM-DD")
                : searchParams.get("date")
            }
            onChange={(e) => {
              handleFilterChange("date", e.target.value);
            }}
            className="border text-sm rounded border-s-2 select-none focus:border-blue-500 block w-full md:w-1/4 p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            id="city"
            autoFocus
            defaultValue={
              searchParams.get("city") == null ? "" : searchParams.get("city")
            }
            onChange={(e) => {
              handleFilterChange("city", e.target.value);
            }}
            className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Pilih Kota</option>
            {kotaDanKabupaten.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>
        {responseScreening.map((screening) => {
          return (
            <>
              <div className="hover:shadow-xl mt-2 p-2 biruTua rounded">
                <div className="text-lg w-full text-white font-bold mb-2">
                  {screening.branch_name} - {screening.city}
                </div>

                <div className="flex flex-wrap gap-2 rounded bg-[#f8f8f8] p-2">
                  {screening.screenings.map((jadwal) => {
                    if (
                      jadwal.showtime <
                      moment().tz("Asia/Jakarta").toISOString()
                    ) {
                      return (
                        <div
                          key={jadwal.screening_id}
                          className="font-extrabold cursor-not-allowed select-none bg-[#D4D4D4] text-black border border-black rounded-lg px-2 text-center py-1"
                        >
                          {moment(jadwal.showtime)
                            .tz("Asia/Jakarta")
                            .format("HH:mm")}
                        </div>
                      );
                    }
                    return (
                      <Link
                        to={`/user/seating/${jadwal.screening_id}`}
                        key={jadwal.screening_id}
                        className="font-extrabold cursor-pointer select-none hover:bg-[#1c64f2] hover:text-white hover:border-[#1c64f2] bg-[#F8f8f8] text-black border border-black rounded-lg px-2 text-center py-1"
                      >
                        {moment(jadwal.showtime)
                          .tz("Asia/Jakarta")
                          .format("HH:mm")}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
export const loadScreeningByMovie = async ({ params, request }) => {
  const url = new URL(request.url);
  if (url.searchParams.get("city") != null) {
    if (!kotaDanKabupaten.includes(url.searchParams.get("city"))) {
      // throw new Response("City not found!", { status: 404 });
    }
  }
  if (url.searchParams.get("date") != null) {
    if (
      moment().tz("Asia/Jakarta").format("yyyy-MM-DD") >
      url.searchParams.get("date")
    ) {
      console.log(
        moment().tz("Asia/Jakarta").format("yyyy-MM-DD") +
          ">" +
          url.searchParams.get("date")
      );
      // throw new Response("Date not found!", { status: 404 });
    }
  }
  try {
    let queryParams = {
      city: url.searchParams.get("city"),
      date: url.searchParams.get("date"),
    };
    let responseScreening = await client.get(
      `api/public/screenings-by-movie/${params?.movie_id}`,
      { params: queryParams }
    );
    const responseMovie = await client.get(
      `api/public/movie-details/${params?.movie_id}`
    );
    return {
      responseScreening: responseScreening.data,
      responseMovie: responseMovie.data,
    };
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
};

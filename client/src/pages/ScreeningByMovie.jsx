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
    setSearchParams(
      (prevParams) => {
        if (value === "") {
          prevParams.delete(key);
        } else {
          prevParams.set(key, value);
        }
        return prevParams;
      },
      { replace: true }
    );
  }
  return (
    <>
      <div className="px-10 py-10">
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
                        id={`${screening.branch_name} - ${moment(
                          jadwal.showtime
                        )
                          .tz("Asia/Jakarta")
                          .format("HH:mm")}`}
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
        {state != "idle" && (
          <div className="grid place-items-center mt-8">
            <div role="status" className="">
              <svg
                aria-hidden="true"
                className="w-12 h-12 mr-2 animate-spin text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </div>
        )}
        {state == "idle" && responseScreening.length == 0 && (
          <div className="h-48 md:h-48 grid place-items-center">
            <div className="text-xl">
              <div className="font-bold mb-4 text-4xl">{":("}</div>
              Maaf, hasil pencarian tidak ditemukan.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export const loadScreeningByMovie = async ({ params, request }) => {
  const url = new URL(request.url);
  if (url.searchParams.get("city") != null) {
    if (!kotaDanKabupaten.includes(url.searchParams.get("city"))) {
      throw new Response("City not found!", { status: 404 });
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
      throw new Response("Date not found!", { status: 404 });
    }
  }
  try {
    let queryParams = {
      city: url.searchParams.get("city"),
      date: url.searchParams.get("date"),
    };
    // console.log(queryParams);
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

import React from "react";
import CardTicketByMovie from "../components/CardTicketByMovie";
import { Link, useLoaderData } from "react-router-dom";
import moment from "moment-timezone";

export default function ScreeningByMovie() {
  const data = useLoaderData();

  console.log(data.responseMovie);
  console.log(data.responseScreening);
  return (
    <>
      <div className="px-10 py-5">
        <CardTicketByMovie {...data.responseMovie}></CardTicketByMovie>
        <div>
          <input type="date" />
          <select name="" id="" placeholder="">
            <option value="" selected>
              -- Choose Location --
            </option>
            <option value=""></option>
          </select>
        </div>
        {data.responseScreening.map((screening) => {
          return (
            <>
              <div className="shadow-2xl  p-3 rounded">
                <p className="text-2xl font-bold my-5">
                  {screening.branch_name}
                </p>
                <div className="flex gap-2 ">
                  {screening.screenings.map((jadwal) => {
                    return (
                      <>
                        <Link
                          to={`/user/seating/${jadwal.screening_id}`}
                          className="p-2 bg-white border border-1 border-black rounded-2xl "
                        >
                          {moment(jadwal.showtime)
                            .tz("Asia/Jakarta")
                            .format("HH:mm")}
                        </Link>
                      </>
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

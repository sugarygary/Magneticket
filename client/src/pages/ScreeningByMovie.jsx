import React from "react";
import CardTicketByMovie from "../components/CardTicketByMovie";
import { Link, useLoaderData } from "react-router-dom";
import moment from "moment-timezone";

export default function ScreeningByMovie() {
  const data = useLoaderData();
  return (
    <>
      <div className="px-10 py-5">
        <CardTicketByMovie {...data.responseMovie}></CardTicketByMovie>
        <div>
          <input type="date" min={new Date().toISOString().split("T")[0]} />
          <select name="" id="" defaultValue={""} placeholder="">
            <option value="">-- Choose Location --</option>
            <option value=""></option>
          </select>
        </div>
        {data.responseScreening.map((screening) => {
          return (
            <>
              <div className="hover:shadow-xl border-[#808080] border-2 border p-3 rounded">
                <p className="text-2xl font-bold mb-5">
                  {screening.branch_name}
                </p>
                <div className="flex gap-2">
                  {screening.screenings.map((jadwal) => {
                    return (
                      <>
                        <Link
                          to={`/user/seating/${jadwal.screening_id}`}
                          key={jadwal.screening_id}
                          className="p-2 bg-white hover:shadow-lg hover:bg-gray-600 border border-1 border-black rounded-2xl "
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

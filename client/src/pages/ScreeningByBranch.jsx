import React, { useEffect, useState } from "react";
import CardTicketByMovie from "../components/CardTicketByMovie";
import {
  Link,
  useLoaderData,
  useNavigation,
  useParams,
} from "react-router-dom";
import moment from "moment-timezone";
import client from "../util/client";
import CardCineplexStudio from "../components/CardCineplexStudio";

export default function ScreeningByBranch() {
  let { branch_id } = useParams();
  const navigation = useNavigation();
  const [showtimeFilter, setShowtimeFilter] = useState(
    moment(new Date()).tz("Asia/Jakarta").startOf("day").format("yyyy-MM-DD")
  );
  const { screenings_data } = useLoaderData();
  const [filteredScreenings, setFilteredScreenings] = useState([]);
  useEffect(() => {
    let temp = [];
    screenings_data.screenings.forEach((element) => {
      let filtered = element.screenings.filter(
        (obj) =>
          obj.showtime >=
            moment(new Date(showtimeFilter))
              .tz("Asia/Jakarta")
              .startOf("day")
              .toISOString() &&
          obj.showtime <
            moment(new Date(showtimeFilter))
              .tz("Asia/Jakarta")
              .endOf("day")
              .toISOString()
      );
      if (filtered.length > 0) {
        temp.push({
          title: element.title,
          img: element.img,
          age_rating: element.age_rating,
          runtime_minutes: element.runtime_minutes,
          screenings: filtered,
        });
      }
    });
    setFilteredScreenings(temp);
  }, [showtimeFilter]);
  return (
    <>
      <div className="px-10 mt-24">
        <div className="font-bold text-xl">{screenings_data.branch_name}</div>
        <div className="font-bold text-lg mt-2">Filter Jadwal</div>
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={showtimeFilter}
          onChange={(e) => {
            setShowtimeFilter(e.target.value);
          }}
          className="borde mb-4 text-sm rounded border-s-2 select-none focus:border-blue-500 block w-full md:w-1/4 p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="w-full">
          {filteredScreenings.length == 0 && (
            <div className="grid place-items-center h-48">
              Jadwal tidak tersedia pada hari ini
            </div>
          )}
          {filteredScreenings.map((s) => (
            <CardCineplexStudio
              title={s.title}
              img={s.img}
              key={s.title}
              runtime={s.runtime_minutes}
              age_rating={s.age_rating}
              screenings={s.screenings}
            ></CardCineplexStudio>
          ))}
        </div>
      </div>
    </>
  );
}

export const screeningByBranchLoader = async ({ params }) => {
  let screenings_data;
  try {
    screenings_data = await client.get(
      `api/public/screenings-by-branch/${params.branch_id}`
    );
  } catch (error) {
    if (error?.response?.status == 404) {
      throw new Response("Not Found", { status: 404 });
    }
  }
  return { screenings_data: screenings_data.data };
};

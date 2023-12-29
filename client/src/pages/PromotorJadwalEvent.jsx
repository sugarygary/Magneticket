import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { kotaDanKabupaten } from "../util/kotaDanKabupaten";

const PromotorJadwalEvent = () => {
  const { current_user, status } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const data = useLoaderData();

  console.log(data.events);

  const [tanggal, setTanggal] = useState(null);
  const [kota, setKota] = useState(null);
  const [filtered, setFiltered] = useState([]);

  const handleFilter = () => {
    const filtered = data.events.filter((event) => {
      if (
        tanggal &&
        event.showtime.substring(0, 10).toLowerCase() !== tanggal.toLowerCase()
      ) {
        return false;
      }

      if (kota && event.city.toLowerCase() !== kota.toLowerCase()) {
        return false;
      }

      return true;
    });

    setFiltered(filtered);
  };
  useEffect(() => {
    handleFilter();
  }, [tanggal, kota]);

  useEffect(() => {
    if (
      (current_user.userId == null || current_user.role != "PROMOTOR") &&
      status == "succeeded"
    ) {
      navigate("/event-organizer/login", { replace: true });
    }
  }, []);
  if (
    (current_user.userId == null || current_user.role != "PROMOTOR") &&
    status == "succeeded"
  ) {
    navigate("/event-organizer/login", { replace: true });
  }

  return (
    <div className="w-full px-12 py-5">
      <p className="text-2xl font-bold mb-5">Filter Jadwal</p>
      <div className="flex justify-between gap-2 mb-5">
        <div className="flex gap-3">
          <div>
            <p>Tanggal</p>
            <input
              className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
              type="date"
              value={tanggal}
              onChange={(e) => {
                setTanggal(e.target.value);
              }}
              onBlur={(e) => {
                setTanggal(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="city" className="">
              Kota
            </label>
            <select
              id="city"
              defaultValue={""}
              autoFocus
              className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                setKota(e.target.value);
              }}
            >
              <option value="">Pilih Kota</option>
              {kotaDanKabupaten.map((k, index) => (
                <option key={index} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {filtered.length === 0 && (
        <p>No screenings found based on the selected filters.</p>
      )}
      {filtered.map((event, index) => {
        return (
          <div className="" key={index}>
            <div className="flex shadow-2xl mb-5">
              <img
                src={`${process.env.BACKEND_URL}/promotor/eventposter-${event._id}.jpg`}
                alt=""
                className="w-48"
              />
              <div className="p-5  w-full">
                <p className="font-bold text-2xl ">{event.event_name}</p>
                <br />
                <table>
                  <tr>
                    <td>Tanggal </td>
                    <td>:{event.showtime.substring(0, 10)}</td>
                  </tr>
                  <tr>
                    <td>ID Jadwal</td>
                    <td>: {event._id}</td>
                  </tr>
                </table>

                <div className="mt-9 flex justify-between">
                  <div></div>
                  <Link
                    className="biruCariTiket p-2 text-white rounded"
                    to={`/event-organizer/jadwal/${event._id}`}
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PromotorJadwalEvent;

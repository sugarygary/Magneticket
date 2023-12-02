import React, { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { kotaDanKabupaten } from "../util/kotaDanKabupaten";

const PromotorHistoryTiket = () => {
  const data = useLoaderData();
  console.log(data);
  const navigate = useNavigate();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [tanggal, setTanggal] = useState(null);
  const [kota, setKota] = useState(null);

  const { current_user, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (
      (current_user.userId == null || current_user.role != "PROMOTOR") &&
      status == "succeeded"
    ) {
      navigate("/", { replace: true });
    }
  }, []);
  if (
    (current_user.userId == null || current_user.role != "PROMOTOR") &&
    status == "succeeded"
  ) {
    navigate("/", { replace: true });
  }
  if (data.response && data.response.status == 401) {
    throw new Response("", { status: 401 });
  }

  const toDetail = (id) => {
    navigate(`/event-organizer/history/${id}`);
  };

  const handleFilter = () => {
    // Filter screenings based on selected filters
    const filtered = data.eventTickets.filter((event) => {
      // Filter by date
      if (
        tanggal &&
        event.createdAt.substring(0, 10).toLowerCase() !== tanggal.toLowerCase()
      ) {
        return false;
      }

      // Filter by city
      if (kota && event.event.city.toLowerCase() !== kota.toLowerCase()) {
        return false;
      }

      return true;
    });

    setFilteredEvents(filtered);
  };
  useEffect(() => {
    // Call the filter function when the filters change
    handleFilter();
  }, [tanggal, kota]);

  return (
    <div className="p-4">
      <p className="text-2xl font-bold">Informasi Ticket Konser</p>
      <div className="flex gap-3 my-4">
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
      <table className="min-w-full text-white table-auto">
        <thead>
          <tr className="bg-gray-200 text-left bg-gray-700">
            <th className="py-2 px-4">Customer</th>
            <th className="py-2 px-4">Event</th>
            <th className="py-2 px-4">ID Jadwal</th>
            <th className="py-2 px-4">Date & Time</th>
            <th className="py-2 px-4">Kategori</th>

            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody className="biruTua">
          {filteredEvents &&
            filteredEvents.map((sale) => (
              <tr key={sale._id}>
                <td className="border-t border-b py-2 px-4">
                  {sale.customer.full_name}
                </td>
                <td className="border-t border-b py-2 px-4">
                  {sale.event.event_name}
                </td>
                <td className="border-t border-b py-2 px-4">
                  {sale.event._id}
                </td>
                <td className="border-t border-b py-2 px-4">
                  {sale.createdAt.substring(0, 10)}
                </td>
                <td className="border-t border-b py-2 px-4">
                  {sale.createdAt.substring(0, 10)}
                </td>
                <td className="border-t border-b py-2 px-4">
                  {sale.event_category.category_name}
                </td>
                <td className="border-t border-b py-2 px-4">
                  {sale.claimed == true ? "CLAIMED" : "UNCLAIMED"}
                </td>
                <td className="border-t border-b py-2 px-4">
                  <button
                    className="biruCariTiket p-2 text-white rounded"
                    onClick={() => toDetail(sale._id)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {filteredEvents.length == 0 && (
        <>Tidak ada data yang tercatat sesuai dengan filter</>
      )}
    </div>
  );
};

export default PromotorHistoryTiket;

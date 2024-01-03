import React, {useState, useEffect} from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CineplexTiketDetail from "../components/CineplexTiketDetail";
import { useSelector } from "react-redux";
import PromotorTiketDetail from "../components/PromotorTiketDetail";

const PromotorDetailEvent = () => {
  const { current_user, status } = useSelector((state) => state.user);
  const data = useLoaderData();
  const navigate = useNavigate();

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

  console.log("ini datanya ", data);
  return (
    <div className="mx-2 sm:mx-10 mt-6">
        <div className="flex shadow-2xl mb-5">
            <img src={`${process.env.BACKEND_URL}/promotor/eventposter-${data.event.data.eventTicket._id}.jpg`} alt="" className="w-36 sm:w-48 object-fit overflow-hidden"/>
            <div className="p-5  w-full">
            <p className="font-bold text-xl sm:text-2xl ">{data.event.data.eventTicket.event_name}</p>
            <br />
            <table className="text-xs sm:text-base">
                <tr>
                <td>Tanggal </td>
                <td>:{data.event.data.eventTicket.showtime.substring(0, 10)}</td>
                </tr>
                <tr>
                <td>ID Jadwal</td>
                <td>: {data.event.data.eventTicket._id}</td>
                </tr>
            </table>
            </div>
        </div>
        <table className="min-w-full text-white table-auto">
            <thead className="text-sm sm:text-base">
            <tr className="bg-gray-200 text-left bg-gray-700">
                <th className="py-2 px-4">KATEGORI</th>
                <th className="py-2 px-4">HARGA</th>
                <th className="py-2 px-4">JUMLAH TIKET</th>
            </tr>
            </thead>
            <tbody className="biruTua text-sm sm:text-base">
                {data.kategori.data.kategoriTickets.map((kategori) => (
                <tr key={kategori._id}>
                    <td className="border-t border-b py-2 px-4">
                    {kategori.category_name}
                    </td>
                    <td className="border-t border-b py-2 px-4">
                    {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                    }).format(kategori.price)}
                    </td>
                    <td className="border-t border-b py-2 px-4">
                    {kategori.slot}
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default PromotorDetailEvent;
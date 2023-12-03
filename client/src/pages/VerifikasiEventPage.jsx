import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { acceptVerifEvent, tolakVerifEvent } from "../handlers/AdminHandler";

export default function VerifikasiCineplexPage() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [alasan, setAlasan] = useState(null);
  console.log(process.env.BACKEND_URL);
  console.log(data);
  return (
    <div className="p-10 w-full ">
      <div className="flex justify-between">
        <p className="font-bold text-2xl">Verifikasi Event</p>
        <Link to={-1} className="bg-red-500 px-5 py-2 rounded text-white">
          {" "}
          Kembali{" "}
        </Link>
      </div>

      <p>Nama Event : {data.event.event_name}</p>
      <p>Event Organizer : {data.event.promotor.brand_name}</p>
      <p>Email : {data.event.promotor.email}</p>
      <p>Surat Verifikasi Perusahaan: </p>
      <img
        src={`${process.env.BACKEND_URL}/promotor/eventsurat-${data.event._id}.jpg`}
        alt=""
        className="w-48"
      />

      <div className="w-full">
        <p>Alasan Penolakan</p>
        <div className="flex w-full justify-between  mt-2">
          <input
            type="text"
            className="biruTua w-3/4 rounded text-white"
            placeholder="Masukan Alasan Penolakan"
            onChange={(e) => {
              setAlasan(e.target.value);
            }}
          />
          <button
            className="px-3 py-1 biruTua text-white rounded"
            onClick={() => {
              tolakVerifEvent(data.event.promotor.email, alasan, data.event._id);
            }}
          >
            Tolak
          </button>
        </div>
        <div className="flex w-full justify-between mt-2">
          <div></div>
          <button
            className="px-3 py-1 biruMuda text-white rounded "
            onClick={() => {
              acceptVerifEvent(data.event.promotor.email,data.event._id);
            }}
          >
            Terima
          </button>
        </div>
      </div>
    </div>
  );
}

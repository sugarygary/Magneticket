import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
  acceptVerifPromotor,
  tolakVerifPromotor,
} from "../handlers/AdminHandler";

export default function VerifikasiPromotorPage() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [alasan, setAlasan] = useState(null);
  console.log(process.env.BACKEND_URL);
  console.log(data);

  async function acceptForm(e) {
    e.preventDefault();

    let retu = await acceptVerifPromotor(data.promotor.email);
    if (retu) {
      navigate(-1);
    }
  }
  async function tolakForm(e) {
    e.preventDefault();

    let retu = await tolakVerifPromotor(data.promotor.email, alasan);
    if (retu) {
      navigate(-1);
    }
  }
  return (
    <div className="p-10 w-full ">
      <div className="flex justify-between">
        <p className="font-bold text-2xl">Verifikasi Event Organizer</p>
        <Link to={-1} className="bg-red-500 px-5 py-2 rounded text-white">
          {" "}
          Kembali{" "}
        </Link>
      </div>

      <p>Nama Perusahaan : {data.promotor.company_name}</p>
      <p>Nama Bisnis : {data.promotor.brand_name}</p>
      <p>Email : {data.promotor.email}</p>
      <div className="flex mt-5 w-full">
        <div className="mr-5 border">
          <p>Surat Verifikasi Perusahaan: </p>
          <img
            src={`${process.env.BACKEND_URL}/promotor/surat-${data.promotor._id}.jpg`}
            alt=""
            className="w-48"
          />
        </div>
        <div className=" border">
          <p>NPWP Badan: </p>
          <img
            src={`${process.env.BACKEND_URL}/promotor/npwp-${data.promotor._id}.jpg`}
            alt=""
            className="w-48"
          />
        </div>
      </div>
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
            onClick={tolakForm}
          >
            Tolak
          </button>
        </div>
        <div className="flex w-full justify-between mt-2">
          <div></div>
          <button
            className="px-3 py-1 biruMuda text-white rounded "
            onClick={acceptForm}
          >
            Terima
          </button>
        </div>
      </div>
    </div>
  );
}

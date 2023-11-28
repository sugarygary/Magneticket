import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { createStudio } from "../handlers/CineplexHandler";

export default function CineplexCreateStudio() {
  const navigate = useNavigate();
  const data = useLoaderData();
  if (data.response && data.response.status == 401) {
    throw new Response("", { status: 401 });
  }
  const [namaStudio, setNamaStudio] = useState(null);
  const [tipeStudio, setTipeStudio] = useState(null);
  const [barisStudio, setBarisStudio] = useState(null);
  const [kolomStudio, setKolomStudio] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [displayKursi, setDisplayKursi] = useState(false);
  const matchingBranch = data.responseCabang.branches.find(
    (branch) => branch._id === data.currentCabang
  );
  console.log(matchingBranch);

  const { current_user, status } = useSelector((state) => state.user);
  useEffect(() => {
    if (
      (current_user.userId == null || current_user.role != "CINEPLEX") &&
      status == "succeeded"
    ) {
      navigate("/cineplex/login", { replace: true });
    }
  }, []);
  if (
    (current_user.userId == null || current_user.role != "CINEPLEX") &&
    status == "succeeded"
  ) {
    navigate("/cineplex/login", { replace: true });
  }
  async function submitForm(e) {
    e.preventDefault();
    setErrorMsg(null);
    if (
      namaStudio == null ||
      tipeStudio == null ||
      barisStudio == null ||
      kolomStudio == null
    ) {
      setErrorMsg("All field must be filled");
      return;
    }
    if (typeof barisStudio != "number" && isNaN(barisStudio)) {
      setErrorMsg("Baris harus berupa angka");
      return;
    }
    const pattern = /^\d+-\d+-\d+$/;
    if (!pattern.test(kolomStudio)) {
      setErrorMsg("Format kolom tidak sesuai");
      return;
    }
    // setDisplayKursi(true)
    let data = {
      branch_id: matchingBranch._id,
      studio_name: namaStudio,
      type: tipeStudio,
      row: barisStudio,
      seating_layout: kolomStudio,
    };
    // console.log(data);
    createStudio(data);
    navigate(0);
  }
  return (
    <div className=" w-screen h-full justify-center items-center text-white my-10">
      <div className="biruTua p-5 text-center rounded  w-1/2 mx-auto mb-5">
        <div className="flex justify-between">
          <p className="text-2xl font-bold text-left mb-5">Buat Studio Baru</p>
          <Link to={-1} className="bg-red-500 h-fit  rounded  p-2">
            Batalkan
          </Link>
        </div>
        <form onSubmit={submitForm}>
          <div className="mb-3 text-left">
            <p>Nama Studio</p>
            <input
              type="text"
              className="abuInput w-full rounded p-1 pl-2"
              placeholder="Masukkan Nama Studio"
              onChange={(e) => {
                setNamaStudio(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 text-left">
            <p>Tipe Studio</p>
            {/* <input type="text" className="abuInput w-full rounded p-1 pl-2" placeholder="Enter your email" /> */}
            <input
              type="text"
              name=""
              id=""
              placeholder="Masukkan Tipe Studio"
              className="w-full abuBgInput p-1 pl-2"
              onChange={(e) => {
                setTipeStudio(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 text-left">
            <p>Baris</p>
            <input
              type="text"
              className="abuInput w-full rounded p-1 pl-2"
              placeholder="Masukkan Jumlah Baris"
              onChange={(e) => {
                setBarisStudio(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 text-left">
            <p>Kolom</p>
            <input
              type="text"
              className="abuInput w-full rounded p-1 pl-2"
              placeholder="Masukkan Jumlah Kolom"
              onChange={(e) => {
                setKolomStudio(e.target.value);
              }}
            />
            <p className="text-gray-500">Pisahkan dengan "-" (Contoh 6-12-6)</p>
          </div>
          {errorMsg && <span className="text-red-500">{errorMsg}</span>}
          <button className="biruMuda w-full rounded p-1 pl-2">Tambah</button>
        </form>
      </div>
    </div>
  );
}

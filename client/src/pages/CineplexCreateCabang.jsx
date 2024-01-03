import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import upload from "../assets/upload.png";
import { createCabang } from "../handlers/CineplexHandler";
import logo1 from "../assets/logo1.png";
import { useSelector } from "react-redux";
import { kotaDanKabupaten } from "../util/kotaDanKabupaten";

const CineplexCreateCabang = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);
  const [namaCabang, setNamaCabang] = useState(null);
  const [kotaKabupaten, setKotaKabupaten] = useState(null);
  const [alamat, setAlamat] = useState(null);
  const data = useLoaderData();
  const [openModal, setOpenModal] = useState(false);
  if (data.response && data.response.status == 401) {
    throw new Response("", { status: 401 });
  }
  console.log(data.branches);
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
    if (namaCabang == null || kotaKabupaten == null || alamat == null) {
      setErrorMsg("All field must be filled");
      return;
    }
    let data = {
      branch_name: namaCabang,
      city: kotaKabupaten,
      address: alamat,
    };
    // console.log(data);
    const berhasil = await createCabang(data);
    if (berhasil) {
      setOpenModal(true);
    }
  }
  const closeModal = () => {
    navigate(0);
  };
  return (
    <>
      <div className=" w-full h-full justify-center items-center text-white my-10 px-2">
        <div className="biruTua p-5 text-center rounded w-full sm:w-3/4 mx-auto mb-5">
          <p className="text-2xl font-bold text-left mb-5">Daftar Cabang </p>
          {data.branches.map((branch, index) => {
            return (
              <div className="mb-1 p-2 abuInput rounded">
                <div className="flex justfiy-between">
                  <p className="">{branch.branch_name}</p>
                  <Link
                    to={`/cineplex/studios/${branch._id}`}
                    id={branch._id + " - " + branch.branch_name}
                    className="bg-blue-700 rounded ml-auto px-2 py-1"
                  >
                    Detail Cabang
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="biruTua p-6 sm:p-12 text-center rounded w-full sm:w-3/4 mx-auto ">
          <p className="text-2xl font-bold text-left">Buat Cabang Baru</p>
          <form action="" className="mt-5" onSubmit={submitForm}>
            <div className="mb-3 text-left">
              <p>Nama Cabang</p>
              <input
                type="text"
                className="abuInput w-full rounded p-1 pl-2"
                placeholder="Masukkan Nama Cabang"
                onChange={(e) => {
                  setNamaCabang(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 text-left">
              <p>Kota/Kabupaten</p>
              {/* <input type="text" className="abuInput w-full rounded p-1 pl-2" placeholder="Enter your email" /> */}
              {/* <input
                type="text"
                name=""
                id=""
                placeholder="Masukkan Kota/Kabupaten"
                className="w-full abuBgInput text-gray-500 px-2"
                onChange={(e) => {
                  setKotaKabupaten(e.target.value);
                }}
              /> */}
              <select
                className="w-full abuBgInput  px-2 py-1"
                onChange={(e) => {
                  setKotaKabupaten(e.target.value);
                }}
              >
                <option value="">Masukkan Kota/Kabupaten</option>
                {kotaDanKabupaten.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 text-left">
              <p>Alamat</p>
              <input
                type="text"
                className="abuInput w-full rounded p-1 pl-2"
                placeholder="Masukkan Alamat"
                onChange={(e) => {
                  setAlamat(e.target.value);
                }}
              />
            </div>
            {errorMsg && <span className="text-red-500">{errorMsg}</span>}
            <div className="mb-3 text-left mt-5">
              <button className="biruMuda w-full rounded p-1 pl-2">
                Tambah
              </button>
            </div>
          </form>
          {openModal && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-green-500">Loading completed!</p>
                <button onClick={closeModal}>Refresh halaman</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CineplexCreateCabang;

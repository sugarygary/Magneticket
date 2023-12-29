import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import upload from "../assets/upload.png";
import { createKodePromo } from "../handlers/CineplexHandler";
import logo1 from "../assets/logo1.png";
import { useSelector } from "react-redux";

const CineplexCreatePromo = (props) => {
  const navigate = useNavigate();
  const [kodePromo, setKodePromo] = useState(null);
  const [masaBerlaku, setMasaBerlaku] = useState(null);
  const [potongan, setPotongan] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [minimumTransaksi, setMinimumTransaksi] = useState(null);
  const { current_user, status } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);

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
    if (minimumTransaksi == null) {
      setMinimumTransaksi(0);
    }
    if (kodePromo == null || masaBerlaku == null || potongan == null) {
      setErrorMsg("All field must be filled");
      return;
    } else if (isNaN(potongan)) {
      setErrorMsg("Potongan field must be number");
      return;
    } else if (isNaN(minimumTransaksi)) {
      setErrorMsg("Minimum Transaksi field must be number");
      return;
    }
    let data = {
      kode_promo: kodePromo,
      masa_berlaku: masaBerlaku,
      potongan: parseInt(potongan),
      minimum_transaksi: parseInt(minimumTransaksi),
    };
    // console.log(data);

    const berhasil = await createKodePromo(data);
    if (berhasil) {
      setOpenModal(true);
    }
    // navigate(0);
  }
  const closeModal = () => {
    navigate(0);
  };

  return (
    <div className=" w-full h-full flex justify-center items-center text-white my-10">
      <div className="biruTua p-12 text-center rounded w-3/4 mx-auto ">
        <div className="flex justify-between">
          <div></div>
          <Link to={-1} className="p-2 bg-red-500">
            {" "}
            Kembali{" "}
          </Link>
        </div>
        <form action="" className="mt-5" onSubmit={submitForm}>
          <div className="mb-3 text-left">
            <p>Kode Promo</p>
            <input
              type="text"
              className="abuInput w-full rounded p-1 pl-2"
              placeholder="Masukkan Kode Promo"
              onChange={(e) => {
                setKodePromo(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 text-left">
            <p>Masa Berlaku</p>
            {/* <input type="text" className="abuInput w-full rounded p-1 pl-2" placeholder="Enter your email" /> */}
            <input
              type="date"
              name=""
              id=""
              className="w-full abuBgInput "
              onChange={(e) => {
                setMasaBerlaku(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 text-left">
            <p>Potongan</p>
            <input
              type="text"
              className="abuInput w-full rounded p-1 pl-2"
              placeholder="Masukkan Potong"
              onChange={(e) => {
                setPotongan(e.target.value);
              }}
            />
          </div>
          {/* <div className="mb-3 text-left">
            <p>Minimum transaksi</p>
            <input
              type="text"
              className="abuInput w-full rounded p-1 pl-2"
              placeholder="Masukkan Minimum Transaksi"
              onChange={(e) => {
                setMinimumTransaksi(e.target.value);
              }}
            />
          </div> */}
          {errorMsg && <span className="text-red-500">{errorMsg}</span>}
          <div className="mb-3 text-left mt-5">
            <button className="biruMuda w-full rounded p-1 pl-2">
              Buat Kode Promo
            </button>
          </div>
        </form>
        {openModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <p className="text-green-500">Loading completed!</p>
              <button onClick={closeModal}>Refresh halaman</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CineplexCreatePromo;

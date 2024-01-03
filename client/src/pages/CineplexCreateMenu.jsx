import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import upload from "../assets/upload.png";
import { createMenu } from "../handlers/CineplexHandler";
import { useLoaderData } from "react-router-dom";

export default function CineplexCreateMenu() {
  const dataxxxxx = useLoaderData();
  if (dataxxxxx.response && dataxxxxx.response.status == 401) {
    throw new Response("", { status: 401 });
  } else {
  }
  const [openModal, setOpenModal] = useState(false);
  const [namaMenu, setNamaMenu] = useState(null);
  const [hargaMenu, setHargaMenu] = useState(null);
  const [deskripsiMenu, setDeskripsiMenu] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();
  async function submitForm(e) {
    e.preventDefault();
    setErrorMsg(null);
    if (
      namaMenu == null ||
      deskripsiMenu == null ||
      hargaMenu == null ||
      thumbnail == null
    ) {
      setErrorMsg("All field must be filled");
      return;
    } else if (typeof parseInt(hargaMenu) != "number") {
      setErrorMsg("Price field must be number");
      return;
    } else if (parseInt(hargaMenu < 0)) {
      setErrorMsg("Price field must be positive");
      return;
    }
    // let data = {
    //   item_name: namaMenu,
    //   item_description: deskripsiMenu,
    //   price: parseInt(hargaMenu),
    // };
    const formData = new FormData();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    formData.append("item_name", namaMenu);
    formData.append("item_description", deskripsiMenu);
    formData.append("price", hargaMenu);
    formData.append("thumbnail", thumbnail);
    const berhasil = await createMenu(formData, config);
    if (berhasil) {
      setOpenModal(true);
    }
    // navigate("/cineplex/concession");
  }
  const closeModal = () => {
    navigate(0);
  };
  return (
    <>
      <div className="biruTua p-2 sm:p-5 my-10 rounded w-11/12 sm:w-3/4 mx-auto ">
        <div className="text-center text-white">
          <div className="flex justify-center items-center mt-4 pb-4">
            <img src={upload} alt="" className="w-12 invert" />
          </div>
          <p>Unggah Foto Produk</p>
          <p>Direkomendasikan 595 x 842 px dan tidak lebih dari 30 MB</p>
          <div className="ml-6 sm:ml-12 pb-6">
            <input
              type="file"
              name=""
              id="fotoMenu"
              className="pl-12"
              onChange={(e) => {
                setThumbnail(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <hr />
        <div className="p-2 text-white">
          <form onSubmit={submitForm}>
            <div className="mb-5">
              <p>Nama Menu</p>
              <input
                type="text"
                className="abuInput w-full rounded p-1 pl-2"
                placeholder="Enter your menu"
                onChange={(e) => {
                  setNamaMenu(e.target.value);
                }}
              />
            </div>
            <div className="mb-5">
              <p>Harga Menu</p>
              <input
                type="number"
                className="abuInput w-full rounded p-1 pl-2"
                placeholder="Enter your price"
                onChange={(e) => {
                  setHargaMenu(e.target.value);
                }}
                min={0}
              />
            </div>
            <div className="mb-5">
              <p>Deskripsi Menu</p>
              <textarea
                name=""
                id=""
                className="bg-gray-700 w-full sm:w-full"
                rows="10"
                placeholder="Enter your description"
                onChange={(e) => {
                  setDeskripsiMenu(e.target.value);
                }}
              ></textarea>
            </div>
            {errorMsg && <span className="text-red-500">{errorMsg}</span>}
            <button className="biruCariTiket w-full p-2 rounded">
              Buat Menu
            </button>
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
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import upload from "../assets/upload.png";
import { createMenu } from "../handlers/CineplexHandler";
// import { useLoaderData } from "react-router-dom";

export default function CineplexCreateMenu() {
  // const dataxxxxx = useLoaderData();
  const [namaMenu, setNamaMenu] = useState(null);
  const [hargaMenu, setHargaMenu] = useState(null);
  const [deskripsiMenu, setDeskripsiMenu] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  async function submitForm(e) {
    e.preventDefault();
    setErrorMsg(null);
    if (namaMenu == null || deskripsiMenu == "" || hargaMenu == null) {
      setErrorMsg("All field must be filled");
      return;
    } else if (typeof parseInt(hargaMenu) != "number") {
      setErrorMsg("Price field must be number");
      return;
    }
    let data = {
      item_name: namaMenu,
      item_description: deskripsiMenu,
      price: parseInt(hargaMenu),
    };
    createMenu(data);
    navigate("/cineplex/concession");
  }
  return (
    <>
      <div className="biruTua p-5 my-10 rounded w-3/4 mx-auto ">
        <div className="text-center text-white">
          <div className="flex justify-center items-center">
            <img src={upload} alt="" className="w-12" />
          </div>
          <p>Unggah Foto Produk</p>
          <p>Direkomendasikan 595 x 842 px dan tidak lebih dari 30 MB</p>
          <div className="ml-12 ">
            <input type="file" name="" id="" className="ml-12 pl-12" />
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
                type="text"
                className="abuInput w-full rounded p-1 pl-2"
                placeholder="Enter your price"
                onChange={(e) => {
                  setHargaMenu(e.target.value);
                }}
              />
            </div>
            <div className="mb-5">
              <p>Deskripsi Menu</p>
              <textarea
                name=""
                id=""
                className="bg-gray-700 md:w-full lg:w-full xl:w-full"
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
        </div>
      </div>
    </>
  );
}

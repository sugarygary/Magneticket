import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import search from "../assets/search.png";
import popcorn from "../assets/popcorn.jpg";
import upload from "../assets/upload.png";
import { editMenu } from "../handlers/CineplexHandler";

const CineplexEditMenu = () => {
  const data = useLoaderData();
  // console.log("ini data",data);
  if (data == "Request failed with status code 401") {
    throw new Response("", { status: 401 });
  }
  let menu = data.menu;
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
      hargaMenu == null ||
      deskripsiMenu == null ||
      thumbnail == null
    ) {
      setErrorMsg("inputan tidak boleh kosong");
      return;
    }
    if (isNaN(hargaMenu) && hargaMenu != null) {
      setErrorMsg("Price field must be number");
      return;
    }
    // if (namaMenu == null) {
    //   setNamaMenu("");
    // }
    // if (hargaMenu == null) {
    //   setHargaMenu("");
    // }
    // if (deskripsiMenu == null) {
    //   setDeskripsiMenu("");
    // }
    console.log("namaMenu:", namaMenu);
    console.log("deskripsiMenu:", deskripsiMenu);
    console.log("hargaMenu:", hargaMenu);
    console.log("thumbnail:", thumbnail);
    console.log("menu._id:", menu._id);
    const formData = new FormData();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    formData.append("menu_id", menu._id);
    formData.append("item_name", namaMenu);
    formData.append("item_description", deskripsiMenu);
    formData.append("price", hargaMenu);
    formData.append("thumbnail", thumbnail);

    // console.log("FormData:", formData);
    editMenu(formData, config);
    console.log([...formData.entries()]);

    // navigate("/cineplex/concession");
  }
  return (
    <>
      <div className="">
        <div className="flex shadow-2xl mb-5 mx-9">
          <img
            src={`${process.env.BACKEND_URL}/cineplex/menu-${menu._id}.jpg`}
            alt=""
            className="w-64"
          />
          <div className="p-5  w-full">
            <p className="font-bold text-2xl">{menu.item_name}</p>
            <p className="my-3 abuDeskripsiMakanan">{menu.item_description}</p>
            <p>
              Harga: <span className="font-bold">Rp. {menu.price}</span>
            </p>
            <div className="mt-9 flex justify-between">
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="biruTua p-5 my-10 rounded w-3/4 mx-auto ">
        <div className="text-center text-white">
          <div className="flex justify-center items-center">
            <img src={upload} alt="" className="w-12" />
          </div>
          <p>Unggah Foto Produk</p>
          <p>Direkomendasikan 595 x 842 px dan tidak lebih dari 30 MB</p>
          <div className="ml-12 ">
            <input
              type="file"
              name=""
              id=""
              className="ml-12 pl-12"
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
              Edit Menu
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CineplexEditMenu;

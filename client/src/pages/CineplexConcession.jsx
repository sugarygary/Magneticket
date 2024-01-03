import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import search from "../assets/search.png";
import popcorn from "../assets/popcorn.jpg";

export default function CineplexConcession() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredMenus = data.menus.filter((menu) =>
    menu.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (data.response && data.response.status === 401) {
    throw new Response("", { status: 401 });
  }

  return (
    <>
      <div className="px-2 sm:px-10 py-5">
        <p className="text-2xl font-bold mb-5">Concession</p>
        <p className="mb-2">Nama Menu</p>
        <div className="justify-between flex">
          <div className="flex w-1/2 biruTua rounded">
            <img src={search} alt="" className="w-7 h-7 mt-2 ml-1 mr-1" />
            <input
              type="text"
              className="biruTua w-full rounded border-transparent focus:outline-none text-white px-2"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="p-2 biruCariTiket  text-white rounded">
            <Link to="/cineplex/create-menu"> Tambah Menu</Link>
          </div>
        </div>
        <div className="mt-10 rounded">
          {filteredMenus.map((menu) => (
            <div key={menu._id} className="flex shadow-2xl mb-5">
              <img
                src={`${process.env.BACKEND_URL}/cineplex/menu-${menu._id}.jpg`}
                alt=""
                className="w-36 h-auto sm:w-48 overflow-y-hidden"
              />
              <div className="p-2 sm:p-5 w-full">
                <p className="font-bold text-xl sm:text-2xl">{menu.item_name}</p>
                <p className="my-0 sm:my-3 abuDeskripsiMakanan">
                  {menu.item_description}
                </p>
                <p>
                  Harga:
                  <span className="">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(menu.price)}
                  </span>
                </p>
                <div className="mt-6 sm:mt-9 flex justify-between">
                  <div></div>
                  <Link
                    className="biruCariTiket p-2 text-white rounded"
                    to={`/cineplex/edit-menu/${menu._id}`}
                  >
                    Edit Menu
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

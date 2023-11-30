import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import search from "../assets/search.png";
import popcorn from "../assets/popcorn.jpg";

export default function CineplexConcession() {
  const navigate = useNavigate();
  const data = useLoaderData();
  console.log("ini data", data);
  if (data.response && data.response.status == 401) {
    throw new Response("", { status: 401 });
  } else {
  }
  console.log(data.menus);
  return (
    <>
      <div className="px-10 py-5">
        <p className="text-2xl font-bold mb-5">Concession</p>
        <p className="mb-2">Nama Menu</p>
        <div className="justify-between flex">
          <div className="flex w-1/2 biruTua rounded">
            <img src={search} alt="" className="w-7 h-7 mt-3 ml-1 mr-1" />
            <input
              type="text"
              className="biruTua w-  rounded border-transparent"
              placeholder="Search"
            />
          </div>
          <div className="p-2 biruCariTiket  text-white rounded">
            <Link to="/cineplex/create-menu"> Tambah Menu</Link>
          </div>
        </div>
        <div className="mt-10 rounded">
          {data.menus.map((menu) => {
            // {console.log(menu._id)}
            return (
              <div className="">
                <div className="flex shadow-2xl mb-5">
                  {/* http://localhost:3000/cineplex/npwp-6566e2382d4522b6ed7c227a.jpg */}
                  <img
                    src={`x${process.env.BACKEND_URL}/cineplex/menu-${menu._id}.jpg`}
                    alt=""
                    className="w-48"
                  />
                  <div className="p-5  w-full">
                    <p className="font-bold text-2xl">{menu.item_name}</p>
                    <p className="my-3 abuDeskripsiMakanan">
                      {menu.item_description}
                    </p>
                    <p>
                      Harga: <span className="font-bold">Rp. {menu.price}</span>
                    </p>
                    <div className="mt-9 flex justify-between">
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
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

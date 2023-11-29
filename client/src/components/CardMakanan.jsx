import { useState, useEffect } from "react";
import popcorn from "../assets/popcorn.jpg";
const CardMakanan = (props) => {
  console.log(props);

  return (
    <div className="my-5 shadow-xl mr-4">
      <div className="">
        <img src={popcorn} alt="" className="w-80" />
        <div className="biruTua text-white p-2 rounded-b-lg w-full">
          <p className="font-bold">{props.item_name}</p>
          <div className="flex">
            <p className="text-xl mt-3">
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(props.price)}
            </p>
            <button
              className="px-5 rounded biruCariTiket ml-auto"
              onClick={() => {
                props.addKeranjang(props);
              }}
            >
              Tambah
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMakanan;

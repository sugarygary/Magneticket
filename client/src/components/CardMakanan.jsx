import { useState, useEffect } from "react";
import popcorn from "../assets/popcorn.jpg";
const CardMakanan = (props) => {
  return (
    // <div className="my-5 biruTua rounded shadow-xl mr-4">
    //   <img
    //     src={`${process.env.BACKEND_URL}/cineplex/menu-${props._id}.jpg`}
    //     alt=""
    //     className="w-32 object-cover object-center aspect-[2/3]"
    //   />
    //   <div className="text-white p-2 w-full">
    //     <p className="font-bold">{props.item_name}</p>
    //     <div className="block md:flex items-center justify-between">
    //       <p className="">
    //         {" "}
    //         {new Intl.NumberFormat("id-ID", {
    //           style: "currency",
    //           currency: "IDR",
    //         }).format(props.price)}
    //       </p>
    //       <button
    //         className="px-2 py-1 rounded biruCariTiket"
    //         onClick={() => {
    //           props.addKeranjang(props);
    //         }}
    //       >
    //         Tambah
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="biruTua snap-start w-36 md:w-60 mt-5 mb-2 text-center flex-none rounded">
      <img
        src={`${process.env.BACKEND_URL}/cineplex/menu-${props._id}.jpg`}
        alt=""
        className="aspect-[2/3] object-cover object-center w-full rounded"
      />
      <div className="text-white py-3 px-2">
        <p
          title={props.item_name}
          className="font-bold hover:underline cursor-default text-xs md:text-lg truncate"
        >
          {props.item_name}
        </p>
        <div className="block items-center justify-between">
          <p className="text-xs md:text-lg">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(props.price)}
          </p>
          <button
            className="px-2 w-full py-1 mt-1 rounded biruCariTiket"
            onClick={() => {
              props.addKeranjang(props);
            }}
            namaFood={`${props.item_name}`}
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardMakanan;

import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import logo1 from "../assets/logo1.png";
import openheimer from "../assets/openheimer.jpg";
import bcaVA from "../assets/bca_va.png";
import { Link } from "react-router-dom";

const PromotorTiketDetail = (props) => {
  console.log("ini props", props);
  return (
    <div className="my-5 rounded shadow-lg p-4 sm:p-10 bgCardHistory border border-black">
      <div className="flex items-center justify-between">
        <p className="font-bold text-2xl">Detail Tiket</p>
        <Link className="p-2 h-fit rounded bg-red-500 text-white" to={-1}>
          Kembali
        </Link>
      </div>
      <p className="text-lg font-bold mt-3">{props.event.event_name}</p>
      <div className="w-full mt-3 flex ">
        <div>
          <img
            src={`${process.env.BACKEND_URL}/promotor/eventposter-${props.event._id}.jpg`}
            alt=""
            className="w-24 md:w-48 rounded"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <table className="ml-6 sm:ml-12 text-xs sm:text-base">
              <tr>
                <td>Customer</td>
                <td> : </td>
                <td>{props.customer.full_name}</td>
              </tr>
              <tr>
                <td>ID Jadwal</td>
                <td> : </td>
                <td>{props.event._id}</td>
              </tr>
              <tr>
                <td>Kota</td>
                <td> : </td>
                <td>{props.event.city}</td>
              </tr>
              <tr>
                <td>Kategori</td>
                <td> : </td>
                <td>{props.event_category.category_name}</td>
              </tr>
              <tr>
                <td>Hari/Tanggal</td>
                <td> : </td>
                <td>{props.event.showtime.substring(0, 10)}</td>
              </tr>
              <tr>
                <td>Waktu</td>
                <td> : </td>
                <td>{props.event.showtime.substring(11, 16)}</td>
              </tr>
              <tr>
                <td>Lokasi</td>
                <td> : </td>
                <td>{props.event.venue}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td> : </td>
                <td>{props.claimed == true ? "CLAIMED" : "UNCLAIMED"}</td>
              </tr>
            </table>
          </div>
          <div className="bg-white sm:mr-0 ml-0 sm:ml-60 mr-24 rounded-2xl p-2 border border-[3px] border-black mt-5 md:mt-0">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${props._id}a&size=100x100`}
              alt=""
              title=""
              className="w-36 sm:w-48"
            />
          </div>
        </div>
      </div>
      <p className="text-left text-xl font-bold underline underline-offset-4 mt-2">
        Detail Transaksi
      </p>
      <div className="flex justify-between mt-2">
        <div className="">
          <p>{props.event_category.category_name}</p>
          <p>Biaya Layanan</p>
        </div>
        <div>
          <p>
            <span className="">
                  {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                  }).format(props.event_category.price)}
              </span>
            <span className="abu9CA3AF"></span>
          </p>
          <p>
            Rp 10.000,00 <span className="abu9CA3AF"></span>
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-3/4 bg-red-500"></div>
      </div>
      <hr className="bg-black h-[0.2rem] text-black rounded-full mt-2" />
      <div className="justify-between flex mt-5">
        <div></div>
        <p className="font-bold">
          Total Tagihan : <span className="">
                  {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                  }).format(props.event_category.price + 10000)}
              </span>
        </p>
      </div>
      <div className="justify-between flex">
        <div></div>
      </div>
    </div>
  );
};

export default PromotorTiketDetail;

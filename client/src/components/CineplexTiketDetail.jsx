import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import logo1 from "../assets/logo1.png";
import openheimer from "../assets/openheimer.jpg";
import bcaVA from "../assets/bca_va.png";
import { Link } from "react-router-dom";

const CineplexTiketDetail = (props) => {
  console.log("ini props", props);
  return (
    <div className="my-5 rounded  shadow-lg p-10 bgCardHistory border border-black">
      <div className="flex items-center justify-between">
        <p className="font-bold text-2xl">Detail Tiket</p>
        <Link className="p-2 h-fit rounded bg-red-500 text-white" to={-1}>
          Kembali
        </Link>
      </div>
      <p className="text-lg font-bold mt-3">{props.screening.movie.title}</p>
      <div className="w-full mt-3 flex ">
        <div>
          <img
            src={props.screening.movie.img}
            alt=""
            className="w-48 rounded"
          />
          <p className="text-left text-xl font-bold underline underline-offset-4 mt-24">
            Detail Transaksi
          </p>
        </div>
        <div className=" ml-5 flex w-full justify-between ">
          <div>
            <table>
              <tr>
                <td>Customer</td>
                <td> : </td>
                <td>{props.customer.full_name}</td>
              </tr>
              <tr>
                <td>ID Jadwal</td>
                <td> : </td>
                <td>{props.screening._id}</td>
              </tr>
              <tr>
                <td>Bioskop</td>
                <td> : </td>
                <td>{props.screening.branch.branch_name}</td>
              </tr>
              <tr>
                <td>Studio</td>
                <td> : </td>
                <td>{props.screening.studio.studio_name}</td>
              </tr>
              <tr>
                <td>Kota</td>
                <td> : </td>
                <td>{props.screening.branch.city}</td>
              </tr>
              <tr>
                <td>Tiket</td>
                <td> : </td>
                <td>{props.seats.length} Tiket</td>
              </tr>
              <tr>
                <td>Tempat Duduk</td>
                <td> : </td>
                <td>{props.transaction.seats}</td>
              </tr>
              <tr>
                <td>Tipe</td>
                <td> : </td>
                <td>{props.screening.studio.type}</td>
              </tr>

              <tr>
                <td>Hari/Tanggal</td>
                <td> : </td>
                <td>{props.screening.showtime.substring(0, 10)}</td>
              </tr>
              <tr>
                <td>Waktu</td>
                <td> : </td>
                <td>{props.screening.showtime.substring(11, 16)}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td> : </td>
                <td>{props.claimed == true ? "CLAIMED" : "UNCLAIMED"}</td>
              </tr>
            </table>
          </div>
          <div className="bg-white rounded-2xl p-2 h-fit border border-[3px] border-black">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?data=a&amp;size=100x100"
              alt=""
              title=""
              className="w-48"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="">
          <p>{props.screening.studio.type}</p>
          <p>
            {props.transaction.foods.length == 0
              ? ""
              : props.transaction.foods.map((item) => {
                  return (
                    <>
                      {item.food_name}
                      <br />
                    </>
                  );
                })}
          </p>
          <p>Biaya Layanan</p>
        </div>
        <div>
          <p>
            <span className="">
                {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(props.screening.price)}
            </span>{" "}
            <span className="abu9CA3AF">x{props.seats.length}</span>
          </p>
          <p>
            {props.transaction.foods.length == 0
              ? ""
              : props.transaction.foods.map((item) => {
                  return (
                    <>
                      <span className="">
                          {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                          }).format(item.food_price)}
                      </span>{" "}
                      <span className="abu9CA3AF"> x{item.quantity}</span>
                      <br />
                    </>
                  );
                })}
          </p>
          <p>
            Rp 4.000 <span className="abu9CA3AF">x{props.seats.length}</span>
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
          Total Tagihan : <span className="font-bold">
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(props.transaction.amounts_paid)}
                          </span>
        </p>
      </div>
      <div className="justify-between flex">
        <div></div>
      </div>
    </div>
  );
};

export default CineplexTiketDetail;

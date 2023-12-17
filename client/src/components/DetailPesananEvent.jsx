import moment from "moment-timezone";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const DetailPesananEvent = (props) => {
  const navigate = useNavigate();
  console.log(props);
  const { current_user, status } = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.has("order_id")) {
      navigate("/user/history");
    }
    if (
      (current_user.userId == null || current_user.role != "USER") &&
      status == "succeeded"
    ) {
      navigate("/user/login", { replace: true });
    }
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  if (
    (current_user.userId == null || current_user.role != "USER") &&
    status == "succeeded"
  ) {
    navigate("/user/login", { replace: true });
  }
  async function bayar() {
    window.snap.pay(props.midtrans_token);
  }

  return (
    <>
      <div className="my-5 rounded shadow-lg p-4 md:p-8 biruTua text-[#f8f8f8] border border-black overflow-x-auto">
        <div className="items-center justify-between md:flex hidden">
          <p className="font-bold text-sm md:text-2xl whitespace-nowrap">
            Ringkasan Pemesanan
          </p>
          <span className="text-right text-xs md:text-xl">
            Nomor Pemesanan: {props._id}
          </span>
        </div>
        <div className="flex items-center justify-center md:hidden block">
          <span className="text-center text-base font-bold md:text-xl">
            #{props._id}
          </span>
        </div>
        <div className="w-full mt-6 block md:flex">
          <div className="">
            <img
              src={`${process.env.BACKEND_URL}/promotor/eventposter-${props.event_id}.jpg`}
              alt=""
              className="w-64 mx-auto md:w-48 aspect-[2/3] rounded"
            />
          </div>
          <div className="md:px-5 flex w-full justify-between ">
            <div className="w-full">
              <p className="text-center md:text-left text-xl font-bold mb-2">
                {props.event_name}
              </p>
              <table className="text-[.7rem] md:text-lg">
                <tbody>
                  <tr>
                    <td>Kategori</td>
                    <td> : </td>
                    <td>{props.event_category_name}</td>
                  </tr>
                  <tr>
                    <td>Promotor</td>
                    <td> : </td>
                    <td>{props.promotor_brand}</td>
                  </tr>

                  <tr>
                    <td>Tiket</td>
                    <td> : </td>
                    <td>{props.quantity} Tiket</td>
                  </tr>
                  {/* <tr>
                <td>Studio</td>
                <td> : </td>
                <td>{props.studio_name}</td>
              </tr> */}
                  <tr>
                    <td>Hari/Tanggal</td>
                    <td> : </td>
                    <td>
                      <p className="">
                        {" "}
                        {moment(props.createdAt)
                          .tz("Asia/Jakarta")
                          .format("dddd, DD-MM-YYYY")}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>Waktu Transaksi</td>
                    <td> : </td>
                    <td>
                      <p className="">
                        {moment(props.createdAt)
                          .tz("Asia/Jakarta")
                          .format("HH:mm")}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p className="text-left my-2 md:my-3 text-sm md:text-xl font-bold underline underline-offset-4">
          Detail Transaksi
        </p>
        <div className="flex text-xs md:text-xl justify-between">
          <div className="">
            <p>{props.event_category_name}</p>
            <p>Biaya Layanan</p>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>Rp&nbsp;</td>
                  <td className="text-right">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                      .format(props.price_per_seat)
                      .substring(3)}
                  </td>
                  <td>
                    <span className="abu9CA3AF">x {props.quantity}</span>
                  </td>
                </tr>
                <tr>
                  <td>Rp&nbsp;</td>
                  <td className="text-right">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                      .format(4000)
                      .substring(3)}
                  </td>
                  <td>
                    <span className="abu9CA3AF">x {props.quantity}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr className="bg-black h-[0.2rem] text-black rounded-full mt-4" />
        <div className="justify-end text-[.7rem] md:text-lg flex mt-4">
          <p className="font-bold">
            Total Pembayaran :{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(props.amounts_paid)}
          </p>
        </div>
        {props.status == "PENDING" && (
          <div className="justify-center sm:justify-end flex mt-2">
            <button
              className="cursor-pointer w-fit mt-1 biruMuda text-white px-8 py-2 rounded"
              onClick={() => {
                bayar();
              }}
            >
              Bayar
            </button>
          </div>
        )}
      </div>
      {props.status == "SUCCESS" && (
        <div className="font-bold">
          Catatan : Tiket akan tampil H-2 sebelum acara dimulai.
        </div>
      )}
    </>
  );
};

export default DetailPesananEvent;

import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import CardMakanan from "../components/CardMakanan";
import { useDispatch, useSelector } from "react-redux";
import client from "../util/client";

export default function SeatingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const data = useLoaderData();
  const { current_user, status } = useSelector((state) => state.user);
  useEffect(() => {
    if (searchParams.has("order_id")) {
      navigate("/user/history");
    }
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);
    document.body.appendChild(scriptTag);
    if (
      (current_user.userId == null || current_user.role != "USER") &&
      status == "succeeded"
    ) {
      navigate("/user/login", { replace: true });
    }
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
  const [boolCekout, setBoolCekout] = useState(false);
  const [chooseSeat, setChooseSeat] = useState([]);
  const [keranjang, setKeranjang] = useState([]);
  const [boolPromo, setBoolPromo] = useState(false);
  const [choosedPromo, setChoosedPromo] = useState(null);
  function toggleChooseSeat({ _id, seat_number }) {
    let temp = Array.from(chooseSeat);
    let idx = temp.findIndex((seat) => seat._id == _id);
    if (idx == -1) {
      temp.push({ _id: _id, seat_number: seat_number });
      temp.sort((a, b) => {
        if (a.seat_number < b.seat_number) {
          return -1;
        }
        if (a.seat_number > b.seat_number) {
          return 1;
        }
        return 0;
      });
      setChooseSeat(temp);
      return;
    }
    temp.splice(idx, 1);
    setChooseSeat(temp);
  }
  if (data.current_user == undefined) {
    return;
  } else {
    if (data.current_user.role !== "USER") {
      return;
    }
  }
  if (data.screening_data == undefined) {
    return;
  }
  let columns = data?.screening_data.seating_layout
    .split("-")
    .map(function (item) {
      return parseInt(item, 10);
    });
  let row = data?.screening_data.row;
  let totalColumn = columns.reduce((total, col) => {
    return total + col;
  });

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  var dayOfWeek = today.getDay();
  var days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  var currentDay = days[dayOfWeek];

  function addKeranjang(data) {
    const existingItemIndex = keranjang.findIndex(
      (item) => item._id === data._id
    );

    if (existingItemIndex !== -1) {
      const updatedKeranjang = [...keranjang];
      updatedKeranjang[existingItemIndex].quantity += 1;
      setKeranjang(updatedKeranjang);
    } else {
      setKeranjang((prevKeranjang) => [
        ...prevKeranjang,
        { ...data, quantity: 1 },
      ]);
    }
  }

  const currentDate = new Date();

  const validPromos = data.promo.filter((promo) => {
    const promoValidUntil = new Date(promo.valid_until);
    return promoValidUntil > currentDate;
  });

  const handlePromo = (data) => {
    setChoosedPromo(data);
    console.log(data);
    setBoolPromo(false);
  };

  const calculateTotalPrice = () => {
    if (keranjang.length > 0) {
      return keranjang.reduce((total, makanan) => {
        return total + makanan.price * makanan.quantity;
      }, 0);
    } else {
      return 0;
    }
  };

  const totalPromo = () => {
    if (choosedPromo != null) {
      return choosedPromo.discount_amount;
    } else {
      return 0;
    }
  };

  const handleMakanan = (makanan) => {
    const index = keranjang.findIndex((item) => item._id === makanan._id);

    if (keranjang[index].quantity > 1) {
      const updatedMakanan = { ...makanan, quantity: makanan.quantity - 1 };
      const updatedKeranjang = [...keranjang];
      updatedKeranjang[index] = updatedMakanan;

      setKeranjang(updatedKeranjang);
    } else {
      const updatedKeranjang = keranjang.filter(
        (item) => item._id !== makanan._id
      );
      setKeranjang(updatedKeranjang);
    }
  };

  async function bayar() {
    let temp = 0;
    if (choosedPromo != null) {
      temp = choosedPromo.discount_amount;
    } else {
      temp = 0;
    }
    let snapBody = {
      seats: chooseSeat,
      foods: keranjang,
      screening_id: data.screening_id,
      discount_amount: temp,
    };
    let snapData;
    try {
      snapData = await client.post("/api/user/create-snap", snapBody);
    } catch (error) {
      console.log(error.message);
    }
    let bayarTiket = {
      order_id: snapData.data.order_id,
      seats: chooseSeat,
      foods: keranjang,
      screening_id: data.screening_id,
      discount_amount: temp,
      midtrans_token: snapData.data.token,
      promo_code: choosedPromo == null ? null : choosedPromo.promo_code,
    };
    window.snap.pay(snapData.data.token, {
      onSuccess: async function (result) {
        // let ticket = await client.post("api/user/create-ticket", requestBody);
        let checkout = await client.post("api/user/create-transaction", {
          ...bayarTiket,
          status: "SUCCESS",
        });
      },
      onPending: async function (result) {
        let checkout = await client.post("api/user/create-transaction", {
          ...bayarTiket,
          status: "PENDING",
        });
      },
      onError: async function (result) {
        let checkout = await client.post("api/user/create-transaction", {
          ...bayarTiket,
          status: "FAILED",
        });
      },
      onClose: async function () {},
    });
  }

  return (
    <>
      {!boolCekout && (
        <div className="w-full justify-center px-10 py-10">
          <div className="font-bold mb-1 text-xl">
            {data.screening_data.branch_name}
          </div>
          <div className="font-bold mb-1">
            {data.screening_data.movie_title}
          </div>
          <div className="mb-4">
            {moment(data.screening_data.showtime)
              .tz("Asia/Jakarta")
              .format("DD MMMM YYYY | HH:mm")}
          </div>
          <div className="max-w-full pt-8 pb-24 w-full overflow-x-auto biruTua text-white rounded-t pt-4">
            {[...Array(row)].map((row, i) => {
              let pointer = 0;
              return (
                <div className="gap-12 mb-4 flex justify-between flex-nowrap w-full">
                  <div className="flex gap-2 px-2 justify-center"></div>
                  {columns.map((col_group, j) => {
                    return (
                      <div className="flex gap-2 justify-center">
                        {[...Array(col_group)].map((col, k) => {
                          let seatPtr =
                            data.screening_data.seats[
                              pointer++ + totalColumn * i
                            ];
                          if (seatPtr.taken) {
                            return (
                              <div
                                title={seatPtr.seat_number}
                                className="bg-red-500 font-mono text-sm py-2 px-2 cursor-not-allowed rounded-sm"
                              >
                                {seatPtr.seat_number}
                              </div>
                            );
                          }
                          if (
                            chooseSeat.some((seat) => seat._id == seatPtr._id)
                          ) {
                            return (
                              <div
                                title={seatPtr.seat_number}
                                onClick={() => {
                                  toggleChooseSeat({
                                    _id: seatPtr._id,
                                    seat_number: seatPtr.seat_number,
                                  });
                                }}
                                className="bg-amber-500 select-none font-mono py-2 px-2 text-sm rounded-sm select-none cursor-pointer"
                              >
                                {seatPtr.seat_number}
                              </div>
                            );
                          }
                          return (
                            <div
                              title={seatPtr.seat_number}
                              onClick={() => {
                                toggleChooseSeat({
                                  _id: seatPtr._id,
                                  seat_number: seatPtr.seat_number,
                                });
                              }}
                              className="biruCariTiket font-mono py-2 px-2 text-sm rounded-sm select-none cursor-pointer"
                            >
                              {seatPtr.seat_number}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                  <div className="flex gap-2 px-2 justify-center"></div>
                </div>
              );
            })}
          </div>
          <div className="bg-gray-600 text-[#f8f8f8] rounded-b text-center p-2 w-full">
            LAYAR
          </div>
          <div className="mt-4 font-bold">
            {chooseSeat.length == 0 && (
              <div className="text-xl text-center">Silahkan Pilih Kursi</div>
            )}
            {chooseSeat.length > 0 && (
              <>
                <div class="hidden md:flex gap-2">
                  <div class="flex-col bg-gray-600 text-center text-[#f8f8f8] rounded px-6 py-4 md:w-4/6">
                    <div class="flex-1">
                      <div className="text-center text-xl">Kursi</div>
                      <div className="flex gap-2 flex-wrap">
                        {chooseSeat.map((seat) => (
                          <div
                            title={seat.seat_number}
                            className="bg-amber-500 font-mono text-sm py-2 px-2 cursor-default rounded-sm"
                          >
                            {seat.seat_number}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 flex-col bg-gray-600 text-center text-[#f8f8f8] rounded p-4 md:w-2/6">
                    <div class="flex-1">
                      <div className="text-center text-xl">Total</div>
                      <div className="text-sm sm:text-lg md:text-2xl py-4">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(
                          data.screening_data.price * chooseSeat.length
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex md:hidden gap-2">
                  <div class="w-2/3 bg-gray-600 text-[#f8f8f8] rounded px-2">
                    <div className="text-center text-xl">Kursi</div>
                    <div className="flex gap-2 flex-nowrap py-4 overflow-x-scroll">
                      {chooseSeat.map((seat) => (
                        <div
                          title={seat.seat_number}
                          className="bg-amber-500 font-mono text-sm py-2 px-2 cursor-default rounded-sm"
                        >
                          {seat.seat_number}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div class="w-1/3 bg-gray-600 text-[#f8f8f8] rounded px-2">
                    <div className="text-center text-base md:text-xl">
                      Total
                    </div>
                    <div className="text-xs whitespace-normal text-center sm:text-lg md:text-2xl py-4">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(data.screening_data.price * chooseSeat.length)}
                    </div>
                  </div>
                </div>
                {chooseSeat.length > 0 && (
                  <button
                    className="biruCariTiket w-full mt-2 px-4 py-4 text-white rounded"
                    onClick={() => {
                      setBoolCekout(true);
                      window.scrollTo(0, 0);
                    }}
                  >
                    Lanjutkan ke Pembayaran
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
      {boolCekout && (
        <div className="text-black px-10 py-10">
          <div className="flex items-center justify-start gap-3">
            <div
              className="text-3xl cursor-pointer text-black font-semibold"
              onClick={() => {
                setBoolCekout(false);
                setBoolPromo(false);
                setChoosedPromo(null);
                setKeranjang([]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
            </div>
            <div className="text-3xl font-semibold">Ringkasan Pesanan</div>
          </div>
          <div className="shadow-lg mt-4 rounded-lg biruTua text-[#f8f8f8]">
            <div className="flex flex-row w-full flex-wrap">
              <div className="basis-full sm:basis-1/5">
                <img
                  className="w-full h-auto aspect-[2/3] rounded"
                  src={data.screening_data.movie_img}
                  alt=""
                />
              </div>
              <div className="basis-full p-4 sm:basis-4/5">
                <div className="text-2xl mb-2 font-semibold">
                  {data.screening_data.movie_title}
                </div>
                <div>
                  <table className="sm:text-lg">
                    <tbody>
                      <tr>
                        <td>
                          <p>Bioskop</p>
                        </td>
                        <td>
                          <p className="ml-5">
                            : {data.screening_data.branch_name}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>Tiket</p>
                        </td>
                        <td>
                          <p className="ml-5">: {chooseSeat.length} Tiket</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>Tempat duduk</p>
                        </td>
                        <td>
                          <p className="ml-5">
                            :
                            {chooseSeat.length > 0 &&
                              " " +
                                chooseSeat.reduce(
                                  (accumulator, seat, index) => {
                                    if (index == 0) {
                                      return accumulator + seat.seat_number;
                                    } else {
                                      return (
                                        accumulator + ", " + seat.seat_number
                                      );
                                    }
                                  },
                                  ""
                                )}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>Tipe</p>
                        </td>
                        <td>
                          <p className="ml-5">
                            : {data.screening_data.studio_type}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>Studio</p>
                        </td>
                        <td>
                          <p className="ml-5">
                            : {data.screening_data.studio_name}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>Hari/Tanggal</p>
                        </td>
                        <td>
                          <p className="ml-5">
                            : {currentDay + ", " + dd + "-" + mm + "-" + yyyy}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>Waktu</p>
                        </td>
                        <td>
                          <p className="ml-5">
                            : {data.screening_data.showtime.substring(16, 11)}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="flex relative overflow-x-auto focus:overflow-x-hidden gap-3 snap-x snap-mandatory">
            {data.menu.map((menu, index) => {
              return (
                <CardMakanan
                  key={index}
                  {...menu}
                  setKeranjang={setKeranjang}
                  addKeranjang={addKeranjang}
                ></CardMakanan>
              );
            })}
          </div>
          <div className="text-2xl font-semibold md:text-lg mt-10">
            Detail Transaksi
          </div>
          <div className="flex justify-between">
            <div className="">
              <p>
                {chooseSeat.length + "x "}
                {data.screening_data.studio_type}
              </p>
              {keranjang.map((makanan, index) => {
                return (
                  <div className="flex gap-2 items-center">
                    <div>
                      {makanan.quantity + "x "}
                      {makanan.item_name}
                    </div>
                    <p
                      className="bg-red-500 select-none cursor-pointer text-[#f8f8f8] rounded-2xl p-1"
                      onClick={() => {
                        handleMakanan(makanan);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={4}
                        stroke="currentColor"
                        className="w-[1rem] h-[1rem]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 12h-15"
                        />
                      </svg>
                    </p>
                  </div>
                );
              })}
              <p>{chooseSeat.length + "x "} Biaya Layanan</p>
              {choosedPromo != null && (
                <div className="flex gap-3">
                  <p className="text-red-500">{choosedPromo.promo_code}</p>
                  <p
                    className="bg-red-500 select-none cursor-pointer text-[#f8f8f8] rounded-2xl p-1"
                    onClick={() => {
                      setChoosedPromo(null);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={4}
                      stroke="currentColor"
                      className="w-[1rem] h-[1rem]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12h-15"
                      />
                    </svg>
                  </p>
                </div>
              )}
            </div>
            <div className="text-right">
              <div>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(data.screening_data.price * chooseSeat.length)}
              </div>
              {keranjang.map((makanan, index) => {
                return (
                  <div className="flex justify-end gap-2">
                    <p>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(makanan.price * makanan.quantity)}
                    </p>
                  </div>
                );
              })}
              <p>Rp 4.000,00</p>
              {choosedPromo != null && (
                <p className="text-red-500">
                  {" "}
                  -{" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(choosedPromo.discount_amount)}
                </p>
              )}
              <hr className="bg-black h-0.5" />
              <p className="font-semibold mt-2">
                Total Tagihan:{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(
                  data.screening_data.price * chooseSeat.length +
                    4000 +
                    calculateTotalPrice() -
                    totalPromo()
                )}
              </p>
              <div className="block">
                <div>
                  <button
                    className="bg-[#1f2a37] hover:bg-gray-700 w-full mt-4 text-white px-12 py-2 rounded"
                    onClick={() => {
                      setBoolPromo(true);
                    }}
                  >
                    Kode Promo +
                  </button>
                </div>
                <div>
                  <button
                    className="cursor-pointer w-full mt-1 biruMuda text-white px-8 py-2 rounded"
                    onClick={() => {
                      bayar();
                    }}
                  >
                    Bayar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {boolPromo && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-screen bg-black opacity-50"
            onClick={() => {
              setBoolPromo(false);
            }}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform rounded-lg -translate-x-1/2 -translate-y-1/2 shadow-2xl bg-[#f8f8f8] w-4/12 h-fit px-4 py-4">
            <div className="flex justify-between items-center font-bold">
              <div className="text-lg">Promo Tersedia</div>
              <div
                className="cursor-pointer hover:shadow p-1 bg-red-500 rounded text-white"
                onClick={() => {
                  setBoolPromo(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div>
              {validPromos.map((promo, index) => {
                return (
                  <div
                    className="bg-[#1f2a37] hover:bg-gray-700 text-[#f8f8f8] cursor-pointer rounded mt-3 px-4 py-2"
                    key={index}
                    onClick={() => {
                      handlePromo(promo);
                    }}
                  >
                    <p className="font-semibold">{promo.promo_code}</p>
                    <p>Diskon : Rp.{promo.discount_amount}</p>
                    <div className="text-right text-sm">
                      <p>
                        Berlaku hingga : {promo.valid_until.substring(0, 10)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}

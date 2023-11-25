import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import CardMakanan from "../components/CardMakanan";
import { createTiket } from "../handlers/UserHandler";

export default function SeatingPage() {
  const navigate = useNavigate();
  const data = useLoaderData();
  console.log(data)
  useEffect(() => {
    if (!data.screening_data) {
      navigate("/user/login");
    }
    if (!data.current_user) {
      navigate("/user/login");
    }
  }, []);
  const [boolCekout, setBoolCekout] = useState(false);
  const [chooseSeat, setChooseSeat] = useState([]);
  const [keranjang, setKeranjang] = useState([]);
  const [boolPromo, setBoolPromo] = useState(false)
  const [choosedPromo, setChoosedPromo] = useState([])
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
    console.log(temp);
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

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;


  var dayOfWeek = today.getDay();
  var days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  var currentDay = days[dayOfWeek];

  function addKeranjang(data) {
    const existingItemIndex = keranjang.findIndex(item => item._id === data._id);

  if (existingItemIndex !== -1) {
    const updatedKeranjang = [...keranjang];
    updatedKeranjang[existingItemIndex].quantity += 1;
    setKeranjang(updatedKeranjang);
  } else {
    setKeranjang(prevKeranjang => [...prevKeranjang, { ...data, quantity: 1 }]);
  }
  }

  const currentDate = new Date();

  const validPromos = data.promo.filter((promo) => {
    const promoValidUntil = new Date(promo.valid_until);
    return promoValidUntil > currentDate;
  });

  const handlePromo = (data) => {
    setChoosedPromo([...choosedPromo, data]);
    setBoolPromo(false);
  }

  const calculateTotalPrice = () => {
    if (keranjang.length > 0) {
      return keranjang.reduce((total, makanan) => {
        return total + makanan.price * makanan.quantity;
      }, 0); 
    } else {
      return 0
    }
  };

  const totalPromo = () => {
    if (choosedPromo.length > 0) {
      return choosedPromo[0].discount_amount
    } else {
      return 0
    }
  }

  const handleMakanan = (makanan) => {
    const index = keranjang.findIndex((item) => item._id === makanan._id);
  
    if (keranjang[index].quantity > 1) {
      const updatedMakanan = { ...makanan, quantity: makanan.quantity - 1 };
      const updatedKeranjang = [...keranjang];
      updatedKeranjang[index] = updatedMakanan;
  
      setKeranjang(updatedKeranjang);
    } else {
      const updatedKeranjang = keranjang.filter((item) => item._id !== makanan._id);
      setKeranjang(updatedKeranjang);
    }
  };

  async function bayar() {
    console.log(keranjang)
    let temp = 0;
    if (choosedPromo.length > 0) {
      temp = choosedPromo[0].discount_amount
    } else {
      temp = 0
    }
    let bayarTiket = {
        seats: chooseSeat,
        foods: keranjang,
        screening_id: data.screening_id,
        promo: temp
    }
    let checkout = await createTiket(bayarTiket)
    console.log(checkout);
    if (checkout.response) {
        setErrorMessage("Email already exists")
    } else if (checkout.request) {
        navigate("/error-page")
    }
}

  return (
    <>
    {!boolCekout &&
      <div className="w-full justify-center px-10 py-10">
        <div className="font-bold mb-1 text-xl">
          {data.screening_data.branch_name}
        </div>
        <div className="font-bold mb-1">{data.screening_data.movie_title}</div>
        <div className="mb-4">
          {moment(data.screening_data.showtime)
            .tz("Asia/Jakarta")
            .format("DD MMMM YYYY | HH:mm")}
        </div>
        <div className="max-w-full w-full overflow-x-auto biruTua text-white rounded-t pt-4">
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
                              className="bg-red-500 w-4 h-4 rounded-sm"
                            ></div>
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
                              className="bg-yellow-500 w-4 h-4 rounded-sm cursor-pointer"
                            ></div>
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
                            className="bg-blue-500 w-4 h-4 rounded-sm cursor-pointer"
                          ></div>
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
          {chooseSeat.length} Tiket{" "}
          {chooseSeat.length > 0 &&
            "(" +
              chooseSeat.reduce((accumulator, seat, index) => {
                if (index == 0) {
                  console.log(seat);
                  return accumulator + seat.seat_number;
                } else {
                  return accumulator + ", " + seat.seat_number;
                }
              }, "") +
              ")"}
        </div>
        <div className="flex justify-between">
          <div className="font-bold">
            Total :{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(data.screening_data.price * chooseSeat.length)}
          </div>
          <div>
              <button className="biruCariTiket px-4 py-2 text-white rounded" onClick={(() => {setBoolCekout(true)})}>Lanjutkan ke Pembayaran</button>
          </div>
        </div>
      </div>
    }
    {boolCekout &&
      <div className="text-black px-10 py-10">
        <div className="text-3xl font-semibold">
          Ringkasan Pesanan
        </div>
        <div className="flex">
          <div>
            <img className="w-52 mt-8" src={data.detail_movie.img} alt="" />
          </div>
          <div className="mt-8 ml-4">
            <div className="text-2xl font-semibold ">
              {data.detail_movie.title}
            </div>
            <div>
            <table className="ml-8">
                    <tbody>
                        <tr>
                            <td><p>Bioskop</p></td>
                            <td><p className="ml-10">: {data.screening_data.branch_name}</p></td>
                        </tr>
                        <tr>
                            <td><p>Tiket</p></td>
                            <td><p className="ml-10">: {chooseSeat.length} Tiket</p></td>
                        </tr>
                        <tr>
                            <td><p>Tempat duduk</p></td>
                            <td><p className="ml-10">: 
                              {chooseSeat.length > 0 && " " +
                                chooseSeat.reduce((accumulator, seat, index) => {
                                  if (index == 0) {
                                    console.log(seat);
                                    return accumulator + seat.seat_number;
                                  } else {
                                    return accumulator + ", " + seat.seat_number;
                                  }
                                }, "")}
                            </p></td>
                        </tr>
                        <tr>
                            <td><p>Tipe</p></td>
                            <td><p className="ml-10">: {data.screening_data.studio_type}</p></td>
                        </tr>
                        <tr>
                            <td><p>Studio</p></td>
                            <td><p className="ml-10">: {data.screening_data.studio_name}</p></td>
                        </tr>
                        <tr>
                            <td><p>Hari/Tanggal</p></td>
                            <td><p className="ml-10">: {currentDay + ', ' + dd + '-' + mm + '-' + yyyy}</p></td>
                        </tr>
                        <tr>
                            <td><p>Waktu</p></td>
                            <td><p className="ml-10">: {data.screening_data.showtime.substring(16, 11)}</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </div>
        <div className="flex">
            {data.menu.map((menu, index) => {
              return <CardMakanan key={index} {...menu} setKeranjang={setKeranjang} addKeranjang={addKeranjang}></CardMakanan>
            })
              
            }
        </div>
        <div className="flex justify-between">
          <div className="">
            <div className="text-2xl font-semibold underline">
              Detail Transaksi
            </div>
            <div className="mt-4">
              <p>{data.screening_data.studio_type}</p>
              {keranjang.map((makanan, index)=> {
                  return <div className="flex">
                      <div>{makanan.item_name}</div>
                      <p className="bg-gray-400 px-3 pb-1 rounded-2xl ml-4" onClick={(() => {handleMakanan(makanan)})}>-</p>
                    </div>
              })
              }
              <p>Biaya Layanan</p>
              {choosedPromo.length > 0 &&
                <div className="flex">
                  <p className="text-red-500">{choosedPromo[0].promo_code}</p>
                  <p className="bg-gray-400 px-3 pb-1 rounded-2xl ml-4" onClick={(() => {setChoosedPromo([])})}>-</p>
                </div>
              }
            </div>
          </div>
          <div className="text-right">
            <p className="mt-12">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(data.screening_data.price * chooseSeat.length)}
            </p>
            {
              keranjang.map((makanan, index)=> {
                return <p>{new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(makanan.price * makanan.quantity)}</p>
              })
            }
            <p>Rp 4.000,00</p>
            {choosedPromo.length > 0 &&
                <p className="text-red-500"> - {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(choosedPromo[0].discount_amount)}</p>
              }
            <hr className="bg-black h-0.5"/>
            <p className="font-semibold mt-2">Total Tagihan: 
            {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(((data.screening_data.price * chooseSeat.length) + 4000 + calculateTotalPrice()) - totalPromo())}
            </p>
            <div>
                <button className="biruTua text-white px-12 py-2 mt-4 rounded" onClick={(() => {setBoolPromo(true)})}>Kode Promo +</button>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div></div>
          <div>
            <button className="cursor-pointer biruMuda text-white px-8 py-2 mt-12 rounded" onClick={(() => {bayar()})}>Bayar</button>
          </div>
        </div>
      </div>
    }
    { boolPromo &&
      <div className="flex items-center justify-center h-screen">
        <div className="fixed top-0 w-full h-screen bg-black opacity-50"></div>
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl bg-white w-4/12 h-72 px-4 py-4'>
          <div className="flex justify-between">
            <div></div>
            <div className="cursor-pointer px-2 bg-gray-500 rounded text-white" onClick={(() => {setBoolPromo(false)})}>X</div>
          </div>
          <div>
          {validPromos.map((promo, index) => {
              return <div className="bg-gray-400 mt-3 px-4 py-2" key={index} onClick={(()=> {handlePromo(promo)})}>
                <p className="font-semibold">
                  {promo.promo_code}
                </p>
                <p>Diskon : Rp.{promo.discount_amount}</p>
                <div className="text-right text-sm">
                  <p>{promo.valid_until.substring(0, 10)}</p>
                </div>
                </div>
            })
            }
          </div>
        </div>
      </div>
    }
    </>
  );
}

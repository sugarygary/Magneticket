import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";
import { set } from 'react-hook-form';

const AdminLaporanPenjualan = () => {
    const data = useLoaderData();
    console.log(data);
    const navigate = useNavigate();
    const [filteredScreenings, setFilteredScreenings] = useState([]);
    const [tanggal1, setTanggal1] = useState(null);
    const [tanggal2, setTanggal2] = useState(null);
    const [kota, setKota] = useState(null);
    const [cabang, setCabang] = useState(null);
    const [studio, setStudio] = useState(null);
    const [dataAll, setDataAll] = useState(data);
    const [dataCabang, setDataCabang] = useState(null);
    const [summary, setSummary] = useState(null);
    useEffect(() => {
        //filter dataAll
        let filtered = dataAll.MovieTickets;
        let tempbranch = [];
        filtered.map((ticket) => {
            let sudahada = false;
            tempbranch.map((branch) => {
                if (ticket.screening.branch._id == branch._id) {
                    sudahada = true;
                }
            });
            if (!sudahada) {
                tempbranch.push(ticket.screening.branch);
            }
        });
        setDataCabang(tempbranch);
        console.log("ini tempbranch", tempbranch);
        let minDate
        let maxDate

        if (tanggal1) {
            minDate = tanggal1;
            filtered = filtered.filter((screening) => {
                if (screening.createdAt.toString().split('T')[0] <= tanggal1) {
                    return false;
                }
                return true;
            });
            // let xxx=[];
            // filtered.map((screening) => {
            //     if (screening && screening.transaction && screening.transaction.createdAt && screening.transaction.createdAt.toString().split('T')[0]>=tanggal1) {
            //         xxx.push(screening);
            //     }
            // })
            // filtered=xxx;
        }
        else {
            filtered.map((screening) => {
                if (!minDate) {
                    minDate = screening.createdAt.toString().split('T')[0];
                }
                else {
                    if (screening.createdAt.toString().split('T')[0] < minDate) {
                        minDate = screening.createdAt.toString().split('T')[0];
                    }
                }
            })
        }
        setTanggal1(minDate);
        if (tanggal2) {
            maxDate = tanggal2;
            filtered = filtered.filter((screening) => {
                if (screening.createdAt.toString().split('T')[0] > tanggal2) {
                    return false;
                }
                return true;
            });

            // let xxx=[];
            // filtered.map((screening) => {
            //     // if (screening && screening.transaction && screening.transaction.createdAt) {
            //     //     console.log("ini screening", screening.transaction.createdAt.toString().split('T')[0], "banding", tanggal2);
            //     // }
            //     if (screening.screening && screening.screening.transaction && screeningscreening.transaction.createdAt && screening.transaction.createdAt.toString().split('T')[0] <= tanggal2) {
            //         xxx.push(screening);
            //     }
            // })
            // filtered=xxx;
        }
        else {
            filtered.map((screening) => {
                if (!maxDate) {
                    maxDate = screening.createdAt.toString().split('T')[0];
                }
                else {
                    if (screening.createdAt.toString().split('T')[0] > maxDate) {
                        maxDate = screening.createdAt.toString().split('T')[0];
                        console.log(maxDate)
                    }
                }
            })
        }
        setTanggal2(maxDate);
        if (kota) {
            filtered = filtered.filter((screening) => {
                if (screening.screening.branch.city.toLowerCase() !== kota.toLowerCase()) {
                    return false;
                }
                return true;
            }
            )
        }
        if (cabang) {
            filtered = filtered.filter((screening) => {
                if (screening.screening.branch._id !== cabang) {
                    return false;
                }
                return true;
            }
            )
        }
        if (studio) {
            filtered = filtered.filter((screening) => {
                if (screening.screening.studio.studio_name.toLowerCase() !== studio.toLowerCase()) {
                    return false;
                }
                return true;
            }
            )
        }
        let filtered2 = filtered;
        // console.log("ini filtered sesudah", filtered2);
        let filtered3 = [];
        filtered2.map((screening) => {
            // let temp = screening.screening.branch;
            // console.log("repet",screening);
            let temp;
            if (screening.screening) {
                temp = {
                    branch: screening.screening.branch,
                    cineplex: screening.cineplex
                }
            }
            else {
                temp = {
                    branch: {
                        _id: "kosong",
                        branch_name: "kosong",
                        city: "kosong",
                        address: "kosong",
                        phone_number: "kosong",
                        email: "kosong",
                        latitude: "kosong",
                        longitude: "kosong",
                        createdAt: "kosong",
                        updatedAt: "kosong",
                        __v: 0
                    },
                    cineplex: screening.cineplex
                }
            }
            //push temp to filtered3 if filtered3 doesn't have temp
            let ada = false;
            filtered3.map((branch) => {
                if (branch.branch._id == temp.branch._id) {
                    ada = true;
                }
            })
            if (!ada) {
                filtered3.push(temp);
            }
        })
        let filtered4 = [];
        console.log("ini filtered3", filtered3);
        filtered3.map((branch) => {
            let totaltickets = 0;
            let totalamount = 0;
            filtered.map((screening) => {
                if (screening.screening) {
                    if (screening.screening.branch._id == branch.branch._id) {
                        totaltickets += screening.seats.length;
                        totalamount += screening.screening.price * screening.seats.length;
                    }
                }
                else {
                    if (branch.branch._id == "kosong") {
                        totaltickets += screening.seats.length;
                        totalamount += 0;
                    }
                }
            })
            let tempzz = {
                branch: branch.branch,
                cineplex: branch.cineplex,
                totaltickets: totaltickets,
                totalamount: totalamount
            }
            filtered4.push(tempzz);
        })
        let tempsummary = {
            totalTicket: 0,
            totalAmount: 0,
            summaryDaily: 0
        }
        filtered4.map((branch) => {
            tempsummary.totalTicket += branch.totaltickets;
            tempsummary.totalAmount += branch.totalamount;
        })
        tempsummary.summaryDaily = tempsummary.totalAmount / (new Date(maxDate) - new Date(minDate)) * 1000 * 60 * 60 * 24;
        setSummary(tempsummary);
        setFilteredScreenings(filtered4);

        console.log("ini filtered4", filtered4);
    }, [tanggal1, tanggal2, kota, cabang, studio]);


    return (
        <div className="px-12 py-4">
            <p className="text-2xl font-bold">Laporan Penjualan Bioskop</p>
            <div className="flex gap-3 my-4">
                <div>
                    <p>Tanggal Awal</p>
                    <input
                        className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
                        type="date"
                        value={tanggal1}
                        onChange={(e) => {
                            setTanggal1(e.target.value);
                        }}
                        onBlur={(e) => {
                            setTanggal1(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <p>Tanggal Akhir</p>
                    <input
                        className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
                        type="date"
                        value={tanggal2}
                        onChange={(e) => {
                            setTanggal2(e.target.value);
                        }}
                        onBlur={(e) => {
                            setTanggal2(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="city" className="">
                        Kota
                    </label>
                    <select
                        id="city"
                        defaultValue={""}
                        autoFocus
                        className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => {
                            setKota(e.target.value);
                        }}
                    >
                        <option value="">Pilih Kota</option>
                        {/* {kotaDanKabupaten.map((k, index) => (
                          <option key={index} value={k}>
                              {k}
                          </option>
                      ))} */}
                    </select>
                </div>
                <div>
                    <label htmlFor="cabang" className="">
                        Cabang
                    </label>
                    <select
                        id="cabang"
                        defaultValue={""}
                        autoFocus
                        className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => {
                            setCabang(e.target.value);
                        }}
                    >
                        <option value="">Pilih Cabang</option>
                        {dataCabang && dataCabang.map((branch, index) => (
                            <option key={index} value={branch._id}>
                                {branch.branch_name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <table className="min-w-full text-white table-auto">
                <thead>
                    <tr className="bg-gray-200 text-left bg-gray-700">
                        <th className="py-2 px-4">Cabang</th>
                        <th className="py-2 px-4">Bioskop</th>
                        <th className="py-2 px-4">Tanggal</th>
                        <th className="py-2 px-4">Qty</th>
                        <th className="py-2 px-4">Amount</th>
                    </tr>
                </thead>
                <tbody className="biruTua">
                    {filteredScreenings &&
                        filteredScreenings.map((sale) => (
                            <tr>
                                <td className="border-t border-b py-2 px-4">
                                    {sale.branch.branch_name}
                                </td>
                                <td className="border-t border-b py-2 px-4">
                                    {sale.cineplex.brand_name}
                                </td>
                                <td className="border-t border-b py-2 px-4">
                                    {tanggal1}-{tanggal2}
                                </td>
                                <td className="border-t border-b py-2 px-4">
                                    {sale.totaltickets} Tickets
                                </td>
                                <td className="border-t border-b py-2 px-4">
                                    Rp {sale.totalamount}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {summary && (

                <div className="">
                    {console.log(summary)}
                    <div className="flex justify-between">
                        <p className='text-xl'><u><b>Ringkasan</b>({tanggal1} - {tanggal2})</u></p>
                    </div>
                    <div className="flex justify-between">
                        <p className='text-m'>Jumlah tiket terjual</p>
                        <p className='text-m'>{summary.totalTicket} Tiket</p>
                    </div>
                    <div className="flex justify-between">
                        <p className='text-m'>total transaksi</p>
                        <p className='text-m'>Rp. {summary.totalAmount}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className='text-m'>Transaksi Per Hari</p>
                        <p className='text-m'>Rp. {Math.round(summary.summaryDaily * 100) / 100}</p>
                    </div>
                </div>
            )}
            {/* {filteredScreenings.length == 0 && (
              <>Tidak ada data yang tercatat sesuai dengan filter</>
          )} */}
        </div>
    )
}

export default AdminLaporanPenjualan
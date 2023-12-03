import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";

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
    useEffect(() => {
        //filter dataAll
        let filtered = dataAll.MovieTickets;
        
        if (tanggal1) {
            filtered = filtered.filter((screening) => {
                if (screening.createdAt.toString().split('T')[0]<=tanggal1) {
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
        if (tanggal2) {
            filtered = filtered.filter((screening) => {
                if (screening.createdAt.toString().split('T')[0] >= tanggal2) {
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
                if (screening.screening.branch.branch_name.toLowerCase() !== cabang.toLowerCase()) {
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
            if(screening.screening){
                temp = {
                    branch: screening.screening.branch,
                    cineplex: screening.cineplex
                }
            }
            else{
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
            let totaltickets=0;
            let totalamount=0;
            filtered.map((screening) => {
                if(screening.screening){
                    if (screening.screening.branch._id == branch.branch._id) {
                        totaltickets += screening.seats.length;
                        totalamount += screening.screening.price*screening.seats.length;
                    }
                }
                else{
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
        setFilteredScreenings(filtered4);
        console.log("ini filtered4", filtered4);
    }, [tanggal1, tanggal2, kota, cabang, studio]); 

    useEffect(() => {
        //join filtered based on .screening.branch
        
        


    },[filteredScreenings]);
  return (
      <div className="px-12 py-4">
          <p className="text-2xl font-bold">Informasi Ticket</p>
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
                  <label htmlFor="city" className="">
                      Cabang
                  </label>
                  <select
                      id="city"
                      defaultValue={""}
                      autoFocus
                      className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => {
                          setCabang(e.target.value);
                      }}
                  >
                      <option value="">Pilih Cabang</option>
                      {/* {uniqueBranchNames.map((branchName, index) => (
                          <option key={index} value={branchName}>
                              {branchName}
                          </option>
                      ))} */}
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
          {/* {filteredScreenings.length == 0 && (
              <>Tidak ada data yang tercatat sesuai dengan filter</>
          )} */}
      </div>
  )
}

export default AdminLaporanPenjualan
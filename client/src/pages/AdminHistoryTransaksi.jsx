import React, { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminHistoryTransaksi = () => {
    const data = useLoaderData();
    console.log(data)
    const navigate = useNavigate();
    const [filteredScreenings, setFilteredScreenings] = useState(data.MovieTickets);
    const [movieTickets, setMovieTickets] = useState(data.MovieTickets);
    const toDetail = (id) => {
        navigate(`/admin/history-transaksi/${id}`);
    };
  return (
      <div className="px-12 pb-24">
          <p className="text-2xl font-bold">Informasi Ticket</p>
          {/* <div className="flex gap-3 my-4">
              <div>
                  <p>Tanggal</p>
                  <input
                      className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
                      type="date"
                      value={tanggal}
                      onChange={(e) => {
                          setTanggal(e.target.value);
                      }}
                      onBlur={(e) => {
                          setTanggal(e.target.value);
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
                      {kotaDanKabupaten.map((k, index) => (
                          <option key={index} value={k}>
                              {k}
                          </option>
                      ))}
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
                      {uniqueBranchNames.map((branchName, index) => (
                          <option key={index} value={branchName}>
                              {branchName}
                          </option>
                      ))}
                  </select>
              </div>
          </div> */}
          <table className="min-w-full text-white table-auto text-sm">
              <thead>
                  <tr className="bg-gray-200 text-left bg-gray-700">
                      <th className="py-2 px-4">Customer</th>
                      <th className="py-2 px-4">Cabang</th>
                      <th className="py-2 px-4">ID Jadwal</th>
                      <th className="py-2 px-4">Date & Time</th>
                      <th className="py-2 px-4">Qty</th>
                      <th className="py-2 px-4">Amount</th>
                      <th className="py-2 px-4">Status</th>
                      <th className="py-2 px-4">Action</th>
                  </tr>
              </thead>
              <tbody className="biruTua">
                  {filteredScreenings &&
                      filteredScreenings.map((sale) => (
                          <tr key={sale._id}>
                              <td className="border-t border-b py-2 px-4">
                                  {sale.customer.full_name}
                              </td>
                              <td className="border-t border-b py-2 px-4">
                                  {sale.screening.branch.branch_name}
                              </td>
                              <td className="border-t border-b py-2 px-4">
                                  {sale.screening._id}
                              </td>
                              <td className="border-t border-b py-2 px-4">
                                  {sale.createdAt.substring(0, 10)}
                              </td>
                              <td className="border-t border-b py-2 px-4">
                                  {sale.seats.length}
                              </td>
                              <td className="border-t border-b py-2 px-4">
                                  Rp. {sale.transaction.amounts_paid}
                              </td>
                              <td className="border-t border-b py-2 px-4">
                                  {sale.claimed == true ? "CLAIMED" : "UNCLAIMED"}
                              </td>
                              <td className="border-t border-b py-2 px-4">
                                  <button
                                      className="biruCariTiket p-2 text-white rounded"
                                      onClick={() => toDetail(sale._id)}
                                  >
                                      Detail
                                  </button>
                              </td>
                          </tr>
                      ))}
              </tbody>
          </table>
          {filteredScreenings.length == 0 && (
              <>Tidak ada data yang tercatat sesuai dengan filter</>
          )}
      </div>
  )
}

export default AdminHistoryTransaksi
import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from 'react';

const AdminLaporanFilm = () => {
    const data = useLoaderData();
    console.log(data);
    const navigate = useNavigate();
    const [tanggal1, setTanggal1] = useState(null);
    const [tanggal2, setTanggal2] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const downloadPDFRef = useRef();
    const downloadPDF = () => {}
    useEffect(() => {
        let dataMovies=data.Movies;
        let dataTickets=data.Tickets;
        let dataReviews=data.Reviews;
        dataMovies.map((item) => {
            item.Tickets=[];
            dataTickets.map((item2) => {
                if(item._id == item2.screening.movie){
                    item.Tickets.push(item2);
                }
            });
        });
        dataMovies.map((item) => {
            // console.log(item._id);
            item.Reviews=[];
            dataReviews.map((item2) => {
                if(item._id == item2.movie._id){
                    item.Reviews.push(item2);
                }
            });
        });
        dataMovies.map((item) => {
            item.totalTicket=item.Tickets.length;
            let temp=0;
            item.Reviews.map((item2) => {
                temp+=item2.rating;
            });
            item.rating=temp/item.Reviews.length;
        });
        setFilteredData(dataMovies);
    }, [tanggal1, tanggal2]);

  return (
      <div className="px-12 py-4">
          <div className="flex justify-between">
              <p className="text-2xl font-bold">Laporan Film</p>
              <button onClick={downloadPDF} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'>Download PDF</button>
          </div>
          <div className="flex gap-3 my-4">
              <div>
                  <p>Tanggal awal</p>
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
                  <p>Tanggal akhir</p>
                  <input
                      className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
                      type="date"
                      value={tanggal1}
                      onChange={(e) => {
                          setTanggal2(e.target.value);
                      }}
                      onBlur={(e) => {
                          setTanggal2(e.target.value);
                      }}
                  />
              </div>
          </div>
          <div className="" ref={downloadPDFRef}>

              <table className="min-w-full text-white table-auto" >
                  <thead>
                      <tr className="bg-gray-200 text-left bg-gray-700">
                          <th className="py-2 px-4">Judul</th>
                          <th className="py-2 px-4">Rating</th>
                          <th className="py-2 px-4">Date</th>
                          <th className="py-2 px-4">Ticket Terjual</th>
                      </tr>
                  </thead>
                  <tbody className="biruTua">
                      {filteredData &&
                          filteredData.map((item, index) => (
                              <tr
                                  key={index}
                                  className="hover:bg-gray-600 cursor-pointer"
                              >
                                  <td className="border-t border-b py-2 px-4">{item.title}</td>
                                  <td className="border-t border-b py-2 px-4">{isNaN(item.rating)?"No Rating":item.rating}</td>
                                  <td className="border-t border-b py-2 px-4">{tanggal1}-{tanggal2}</td>
                                  <td className="border-t border-b py-2 px-4">{item.totalTicket} Tickets</td>
                              </tr>
                          )
                          )}
                  </tbody>
              </table>
          </div>
          {/* {filteredScreenings.length == 0 && (
              <>Tidak ada data yang tercatat sesuai dengan filter</>
          )} */}
      </div>
  )
}

export default AdminLaporanFilm
import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from 'react';
import { set } from 'react-hook-form';

const AdminLaporanKeuntungan = () => {
    const data = useLoaderData();
    console.log(data);
    const navigate = useNavigate();
    const [tanggal1, setTanggal1] = useState(null);
    const [tanggal2, setTanggal2] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [summary, setSummary] = useState({summaryEvent:0,summaryCineplex:0,summaryDaily:0,summaryTotal:0});
    const downloadPDFRef = useRef();
    const downloadPDF = () => { };
    useEffect(() => {
        let movieTransactions = data.movieTransactions.MovieTickets;
        let eventTransactions = data.eventTransactions.EventTransactions;
        let minDate
        let maxDate
        if(tanggal1){
            minDate=tanggal1;
            movieTransactions=movieTransactions.filter((item) => {
                return item.createdAt.substring(0,10) >= tanggal1;
            });
            eventTransactions=eventTransactions.filter((item) => {
                return item.createdAt.substring(0,10) >= tanggal1;
            });
        }
        else{
            //find the earliest date in the data
            movieTransactions.map((item) => {
                if(!minDate){
                    minDate=item.createdAt.substring(0,10);
                }
                else{
                    if(item.createdAt.substring(0,10)<minDate){
                        minDate=item.createdAt.substring(0,10);
                    }
                }
            });
            eventTransactions.map((item) => {
                if(!minDate){
                    minDate=item.createdAt.substring(0,10);
                }
                else{
                    if(item.createdAt.substring(0,10)<minDate){
                        minDate=item.createdAt.substring(0,10);
                    }
                }
            });
            setTanggal1(minDate);
        }
        if(tanggal2){
            maxDate=tanggal2;
            movieTransactions=movieTransactions.filter((item) => {
                return item.createdAt.substring(0,10) <= tanggal2;
            });
            eventTransactions=eventTransactions.filter((item) => {
                return item.createdAt.substring(0,10) <= tanggal2;
            });
        }
        else{
            //find the latest date in the data
            movieTransactions.map((item) => {
                if(!maxDate){
                    maxDate=item.createdAt.substring(0,10);
                }
                else{
                    if(item.createdAt.substring(0,10)>maxDate){
                        maxDate=item.createdAt.substring(0,10);
                    }
                }
            });
            eventTransactions.map((item) => {
                if(!maxDate){
                    maxDate=item.createdAt.substring(0,10);
                }
                else{
                    if(item.createdAt.substring(0,10)>maxDate){
                        maxDate=item.createdAt.substring(0,10);
                    }
                }
            });
            setTanggal2(maxDate);
        }
        let listCineplex = [];
        movieTransactions.map((item) => {
            // if(!listCineplex.includes(item.cineplex)){
            //     listCineplex.push(item.cineplex);
            // }
            let dupe=false;
            listCineplex.map((item2) => {
                if(item2._id == item.cineplex._id){
                    dupe=true;
                }
            });
            if(!dupe){
                listCineplex.push(item.cineplex);
            }
        });
        listCineplex.map((item) => {
            let keuntungan=0;
            movieTransactions.map((item2) => {
                if(item2.cineplex._id == item._id){
                    keuntungan+=4000;
                }
            });
            item.profit=keuntungan;
            item.tipe="bioskop"
        });
        let listEvent = [];
        eventTransactions.map((item) => {
            if(item.event==null){
                return;
            }
            let dupe=false;
            listEvent.map((item2) => {
                if(item2._id == item.event._id){
                    dupe=true;
                }
            });
            if(!dupe&&item.event!=null){
                listEvent.push(item.event);
            }
        });
        
        listEvent.map((item) => {
            let keuntungan=0;
            eventTransactions.map((item2) => {
                if(item2.event==null){
                    return;
                }
                if(item2.event._id == item._id){
                    keuntungan+=10000;
                }
            });
            item.profit=keuntungan;
            item.tipe="konser"
        });
        let summaryEvent=0;
        let summaryCineplex=0;
        let summaryDaily=0;
        let summaryTotal=0;
        listEvent.map((item) => {
            summaryEvent+=item.profit;
        });
        listCineplex.map((item) => {
            summaryCineplex+=item.profit;
        });
        listEvent.map((item) => {
            summaryDaily+=item.profit;
        });
        listCineplex.map((item) => {
            summaryDaily+=item.profit;
        });
        summaryDaily=summaryDaily/(Math.floor((Date.parse(maxDate)-Date.parse(minDate))/(1000*60*60*24))+1);
        summaryTotal=summaryEvent+summaryCineplex;
        setSummary({
            summaryEvent:summaryEvent,
            summaryCineplex:summaryCineplex,
            summaryDaily:summaryDaily,
            summaryTotal:summaryTotal
        });
        setFilteredData(listCineplex.concat(listEvent));
        console.log({
            summaryEvent: summaryEvent,
            summaryCineplex: summaryCineplex,
            summaryDaily: summaryDaily,
            summaryTotal: summaryTotal
        });
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
                          <th className="py-2 px-4">Nama</th>
                          <th className="py-2 px-4">Tipe</th>
                          <th className="py-2 px-4">Date</th>
                          <th className="py-2 px-4">Jumlah</th>
                      </tr>
                  </thead>
                  <tbody className="biruTua">
                      {filteredData &&
                          filteredData.map((item, index) => (
                              <tr
                                  key={index}
                                  className="hover:bg-gray-600 cursor-pointer"
                              >
                                  <td className="border-t border-b py-2 px-4">{item.tipe=="konser"?item.event_name:item.brand_name}</td>
                                  <td className="border-t border-b py-2 px-4">{item.tipe}</td>
                                  <td className="border-t border-b py-2 px-4">{tanggal1} - {tanggal2}</td>
                                  <td className="border-t border-b py-2 px-4">Rp. {item.profit}</td>
                              </tr>
                          )
                          )}
                  </tbody>
              </table>
              <div className="">
                {console.log(summary)}
                <div className="flex justify-between">
                    <p className='text-xl'><u><b>Ringkasan</b>({tanggal1} - {tanggal2})</u></p>
                </div>
                <div className="flex justify-between">
                    <p className='text-m'>Pendapatan Dari Event</p>
                    <p className='text-m'>Rp. {summary.summaryEvent}</p>
                </div>
                <div className="flex justify-between">
                    <p className='text-m'>Pendapatan Dari Bioskop</p>
                    <p className='text-m'>Rp. {summary.summaryCineplex}</p>
                </div>
                <div className="flex justify-between">
                    <p className='text-m'>Pendapatan Per Hari</p>
                      <p className='text-m'>Rp. {Math.round(summary.summaryDaily * 100) / 100}</p>
                </div>
                <div className="flex justify-between">
                    <p className='text-m'>Pendapatan Total</p>
                    <p className='text-m'>Rp. {summary.summaryTotal}</p>
                </div>
              </div>
          </div>
          {/* {filteredScreenings.length == 0 && (
              <>Tidak ada data yang tercatat sesuai dengan filter</>
          )} */}
      </div>
  )
}

export default AdminLaporanKeuntungan
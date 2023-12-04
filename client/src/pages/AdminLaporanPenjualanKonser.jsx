import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from 'react';

const AdminLaporanPenjualanKonser = () => {
    const data = useLoaderData();
    console.log(data.EventTransactions);
    const navigate = useNavigate();
    const [tanggal1, setTanggal1] = useState(null);
    const [eventOrganizer, setEventOrganizer] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const downloadPDFRef = useRef();
    useEffect(() => {
        let filteredData2=data.EventTransactions;
        if (tanggal1 && eventOrganizer) {
            filteredData2 = data.EventTransactions.filter((item) => {
                if(item.event){
                    return (
                        item.event.showtime.toString().substring(0,10) == tanggal1 &&
                        item.event.promotor._id == eventOrganizer
                    );
                }
            });
            // setFilteredData(filteredData2);
        } else if (tanggal1) {
            filteredData2 = data.EventTransactions.filter((item) => {
                if(item.event){
                    return item.event.showtime.toString().substring(0,10) == tanggal1;
                }
            }
            );
            // setFilteredData(filteredData2);
        }
        else if (eventOrganizer) {
            filteredData2 = data.EventTransactions.filter((item) => {
                if(item.event){
                    return item.event.promotor._id == eventOrganizer;
                }
            }
            );
            // setFilteredData(filteredData2);
        }
        let eventList = [];
        // console.log(filteredData2);
        filteredData2.map((item) => {
            if(item.event){
                if (eventList.includes(item.event)) {
                    return;
                }else{
                    eventList.push(item.event);
                }
            }
        });
        let filteredData3 = []; 
        eventList.map((item) => {
            let totalTicket = 0;
            let totalAmount = 0;
            filteredData2.map((item2) => {
                if(item2.event){
                    if (item2.event._id == item._id) {
                        totalTicket += 1;
                        totalAmount += item2.event_category.price;
                    }
                }
            });
            let allTicketQty=0;
            let allTicket=data.EventCategories.filter((item2) => {
                if(item2.event){
                    return item2.event == item._id;
                }
            }
            );
            allTicket.map((item2) => {
                allTicketQty+=item2.slot
            });
            let temp = {
                event: item,
                totalTicket: totalTicket,
                totalAmount: totalAmount,
                allTicketQty: allTicketQty
            };
            filteredData3.push(temp);
        });
        setFilteredData(filteredData3);
        // console.log(filteredData3);
    }, [tanggal1, eventOrganizer])
    // const downloadPDF = () => {
    //     const input = downloadPDFRef.current;
    //     html2canvas(input).then((canvas) => {
    //         const imgData = canvas.toDataURL("image/png");
    //         const pdf = new jsPDF('p','mm','a4',true);
    //         pdf.setTextColor(0, 0, 0);
    //         pdf.setFontSize(25);
    //         pdf.text(10, 25, 'LAPORAN PENJUALAN EVENT');
    //         const pdfwidth = pdf.internal.pageSize.getWidth();
    //         const pdfheight = pdf.internal.pageSize.getHeight();
    //         const imgwidth = canvas.width;
    //         const imgheight = canvas.height;
    //         const ratio = imgwidth / imgheight >= pdfwidth / pdfheight ? pdfwidth / imgwidth : pdfheight / imgheight;
    //         const imgx= (pdfwidth - imgwidth * ratio) / 2;
    //         const imgy= 30;
    //         pdf.addImage(imgData, "png", imgx, imgy, imgwidth * ratio, imgheight * ratio);
    //         pdf.save("download.pdf");
    //     });
    // }
    const downloadPDF = () => {
        const input = downloadPDFRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(25);
            pdf.text(10, 25, 'LAPORAN PENJUALAN EVENT');

            // Define margins and dimensions
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const marginx = 10; // Adjust the margin size as needed
            const marginy = 35; // Adjust the margin size as needed
            const usableWidth = pdfWidth - (marginx * 2);
            const usableHeight = pdfHeight - (marginy * 2);

            // Calculate image dimensions and position with margins
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = imgWidth / imgHeight >= usableWidth / usableHeight ? usableWidth / imgWidth : usableHeight / imgHeight;
            const imgX = (pdfWidth - (imgWidth * ratio)) / 2;
            const imgY = marginy;

            pdf.addImage(imgData, "png", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save("download.pdf");
        });
    }

  return (
      <div className="px-12 py-4">
          <div className="flex justify-between">
          <p className="text-2xl font-bold">Laporan Penjualan Event</p>
          <button onClick={downloadPDF} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'>Download PDF</button>
        </div>
          <div className="flex gap-3 my-4">
              <div>
                  <p>Tanggal</p>
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
                  <label htmlFor="eventOrganizer" className="">
                      Event Organizer
                  </label>
                  <select
                      id="eventOrganizer"
                      defaultValue={""}
                      autoFocus
                      className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => {
                          setEventOrganizer(e.target.value);
                      }}
                  >
                      <option value="">Pilih Event Organizer</option>
                      {/* {uniqueBranchNames.map((branchName, index) => (
                          <option key={index} value={branchName}>
                              {branchName}
                          </option>
                      ))} */}
                  </select>
              </div>
          </div>
          <div className="" ref={downloadPDFRef}>

            <table className="min-w-full text-white table-auto" >
                <thead>
                    <tr className="bg-gray-200 text-left bg-gray-700">
                        <th className="py-2 px-4">Nama</th>
                        <th className="py-2 px-4">Tanggal</th>
                        <th className="py-2 px-4">Qty</th>
                        <th className="py-2 px-4">Amount</th>
                    </tr>
                </thead>
                <tbody className="biruTua">
                    {filteredData &&
                        filteredData.map((item, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-600 cursor-pointer"
                                >
                                <td className="border-t border-b py-2 px-4">{item.event.event_name}</td>
                                <td className="border-t border-b py-2 px-4">{item.event.showtime.toString().substring(0,10)}</td>
                                <td className="border-t border-b py-2 px-4">{item.totalTicket} tickets / {item.allTicketQty} tickets</td>
                                <td className="border-t border-b py-2 px-4">Rp. {item.totalAmount}</td>
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

export default AdminLaporanPenjualanKonser
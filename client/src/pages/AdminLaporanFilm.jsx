import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from 'react';
import logo2 from "../assets/logo2.png";

const AdminLaporanFilm = () => {
    const data = useLoaderData();
    console.log(data);
    const navigate = useNavigate();
    const [tanggal1, setTanggal1] = useState(null);
    const [tanggal2, setTanggal2] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [summary, setSummary] = useState(null);
    const downloadPDFRef = useRef();
    const downloadPDF = () => {
        const input = downloadPDFRef.current;
        html2canvas(input).then((canvas) => {
            console.log(canvas)
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            // pdf.setFont("hevaltica", "normal")
            pdf.setTextColor(0, 0, 0);
            var temp = 10;
            pdf.setFontSize(25);
            pdf.addImage(logo2, "png", 10, temp, 50, 20);
            pdf.setFont(undefined, 'bold')
            pdf.text(65, temp + 10, 'Magneticket');
            pdf.setFont(undefined, 'normal')
            pdf.setFontSize(15);
            pdf.text(65, temp + 20, 'Jl. Ngagel Jaya Tengah No.73, Surabaya, Jawa Timur');
            pdf.line(10, temp + 25, 200, temp + 25);
            pdf.line(10, temp + 26, 200, temp + 26);
            temp += 38;

            pdf.text(10, temp, 'LAPORAN FILM');
            temp += 10;
            pdf.setFontSize(13);
            pdf.text(10, temp, 'Tanggal Dicetak : ' + new Date().toLocaleDateString());


            // Define margins and dimensions
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const marginx = 10; // Adjust the margin size as needed
            const marginy = 35 + 35; // Adjust the margin size as needed
            const usableWidth = pdfWidth - (marginx * 2);
            const usableHeight = pdfHeight - (marginy * 2);


            // Calculate image dimensions and position with margins
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = imgWidth / imgHeight >= usableWidth / usableHeight ? usableWidth / imgWidth : usableHeight / imgHeight;
            const imgX = (pdfWidth - (imgWidth * ratio)) / 2;
            const imgY = marginy;
            console.log("rasio", ratio)

            pdf.addImage(imgData, "png", imgX, imgY, imgWidth * ratio, imgHeight * ratio);

            // html2canvas(summaryRef.current).then((canvas2) => {
            //     console.log(canvas2);
            //     const imgData2 = canvas2.toDataURL("image/png");
            //     const imgWidth2 = canvas2.width;
            //     const imgHeight2 = canvas2.height;
            //     const ratio2 = imgWidth2 / imgHeight2 >= usableWidth / usableHeight ? usableWidth / imgWidth2 : usableHeight / imgHeight2;
            //     console.log("rasio2", ratio2)
            //     const imgX2 = (pdfWidth - (imgWidth2 * ratio2)) / 2;
            //     const imgY2 = (imgHeight * ratio) + imgY + 10;
            //     pdf.addImage(imgData2, "png", imgX2, imgY2, imgWidth2 * ratio2, imgHeight2 * ratio2);
            // });
            let koorX = 10;
            let koorY = (imgHeight * ratio) + imgY + 15;
            // let tempcanvas
            // html2canvas(summaryRef.current).then((canvas2) => {
            //     console.log(canvas2);
            //     tempcanvas=canvas2;
            //     koorX=usableWidth-canvas2.width*ratio;
            //     koorY+=5;
            //     pdf.text(koorX, koorY, 'Ringkasan Event');
            //     pdf.save("download.pdf");
            // })
            pdf.setFontSize(20);
            pdf.text(koorX, koorY, `Ringkasan Film`);
            koorY += 10;
            pdf.setFontSize(15);
            pdf.text(koorX, koorY, `Film Terlaris                                     : ${summary.filmTerlaris} (${summary.jumlahFilmTerlaris} tiket)`);
            koorY += 10;
            pdf.text(koorX, koorY, `Film Dengan rating tertinggi             : ${summary.filmRatingTertinggi} (${summary.ratingTertinggi} bintang)`);
            koorY += 10;
            pdf.text(koorX, koorY, `Film Dengan Rating Paling rendah  : ${summary.filmRatingTerrendah} (${summary.ratingTerrendah} bintang)`);
            pdf.save("download.pdf");
        });
    }
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
        let tempSummary={
            jumlahFilmTerlaris:0,
            filmTerlaris:0,
            filmRatingTertinggi:0,
            filmRatingTerrendah:0,
            ratingTertinggi:0,
            ratingTerrendah:6
        };
        dataMovies.map((item) => {
            console.log("ini rating",item.totalTicket);
            if(item.totalTicket>=tempSummary.jumlahFilmTerlaris){
                tempSummary.filmTerlaris=item.title;
                tempSummary.jumlahFilmTerlaris=item.totalTicket;
            }
            if(!isNaN(item.rating)&&item.rating>=tempSummary.ratingTertinggi){
                tempSummary.ratingTertinggi=item.rating;
                tempSummary.filmRatingTertinggi=item.title;
            }
            if (!isNaN(item.rating) && item.rating<=tempSummary.ratingTerrendah){
                tempSummary.ratingTerrendah=item.rating;
                tempSummary.filmRatingTerrendah=item.title;
            }
        }
        );
        setSummary(tempSummary);
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
              {summary && (
                  <div className="">
                      {console.log(summary)}
                      <div className="flex justify-between">
                          <p className='text-xl'><u><b>Ringkasan Film</b></u></p>
                      </div>
                      <div className="flex justify-between">
                          <p className='text-m'>Film Terlaris</p>
                          <p className='text-m'>{summary.filmTerlaris} ({summary.jumlahFilmTerlaris} tiket)</p>
                      </div>
                      <div className="flex justify-between">
                          <p className='text-m'>Film Dengan rating tertinggi</p>
                          <p className='text-m'>{summary.filmRatingTertinggi}({summary.ratingTertinggi}⭐)</p>
                      </div>
                      <div className="flex justify-between">
                          <p className='text-m'>Film Dengan Rating Paling rendah</p>
                          <p className='text-m'>{summary.filmRatingTerrendah}({summary.ratingTerrendah}⭐)</p>
                      </div>
                  </div>
              )}
          {/* {filteredScreenings.length == 0 && (
              <>Tidak ada data yang tercatat sesuai dengan filter</>
          )} */}
      </div>
  )
}

export default AdminLaporanFilm
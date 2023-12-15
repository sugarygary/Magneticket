import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from 'react';
import { set } from 'react-hook-form';
import logo2 from '../assets/logo2.png';

const AdminLaporanKeuntungan = () => {
    const data = useLoaderData();
    console.log(data);
    const navigate = useNavigate();
    const [tanggal1, setTanggal1] = useState(null);
    const [tanggal2, setTanggal2] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [summary, setSummary] = useState({ summaryEvent: 0, summaryCineplex: 0, summaryDaily: 0, summaryTotal: 0 });
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

            pdf.text(10, temp, 'LAPORAN KEUNTUNGAN');
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
            if (tanggal1 || tanggal2) {
                pdf.text(koorX, koorY, `Ringkasan (${tanggal1} - ${tanggal2})`);
            }
            else {
                pdf.text(koorX, koorY, `Ringkasan`);
            }
            koorY += 10;
            pdf.setFontSize(15);
            pdf.text(koorX, koorY, `Pendapatan dari Event      : Rp. ${summary.summaryEvent}`);
            koorY += 10;
            pdf.text(koorX, koorY, `Pendapatan dari Bioskop  : Rp. ${summary.summaryCineplex}`);
            koorY += 10;
            pdf.text(koorX, koorY, `Pendapatan per Hari         : Rp. ${Math.round(summary.summaryDaily * 100) / 100}`);
            koorY += 10;
            pdf.text(koorX, koorY, `Pendapatan Total              : Rp. ${summary.summaryTotal}`);
            pdf.save("download.pdf");
        });
    };
    useEffect(() => {
        let movieTransactions = data.movieTransactions.MovieTickets;
        let eventTransactions = data.eventTransactions.EventTransactions;
        let minDate
        let maxDate
        if (tanggal1) {
            minDate = tanggal1;
            movieTransactions = movieTransactions.filter((item) => {
                return item.createdAt.substring(0, 10) >= tanggal1;
            });
            eventTransactions = eventTransactions.filter((item) => {
                return item.createdAt.substring(0, 10) >= tanggal1;
            });
        }
        else {
            //find the earliest date in the data
            movieTransactions.map((item) => {
                if (!minDate) {
                    minDate = item.createdAt.substring(0, 10);
                }
                else {
                    if (item.createdAt.substring(0, 10) < minDate) {
                        minDate = item.createdAt.substring(0, 10);
                    }
                }
            });
            eventTransactions.map((item) => {
                if (!minDate) {
                    minDate = item.createdAt.substring(0, 10);
                }
                else {
                    if (item.createdAt.substring(0, 10) < minDate) {
                        minDate = item.createdAt.substring(0, 10);
                    }
                }
            });
            setTanggal1(minDate);
        }
        if (tanggal2) {
            maxDate = tanggal2;
            movieTransactions = movieTransactions.filter((item) => {
                return item.createdAt.substring(0, 10) <= tanggal2;
            });
            eventTransactions = eventTransactions.filter((item) => {
                return item.createdAt.substring(0, 10) <= tanggal2;
            });
        }
        else {
            //find the latest date in the data
            movieTransactions.map((item) => {
                if (!maxDate) {
                    maxDate = item.createdAt.substring(0, 10);
                }
                else {
                    if (item.createdAt.substring(0, 10) > maxDate) {
                        maxDate = item.createdAt.substring(0, 10);
                    }
                }
            });
            eventTransactions.map((item) => {
                if (!maxDate) {
                    maxDate = item.createdAt.substring(0, 10);
                }
                else {
                    if (item.createdAt.substring(0, 10) > maxDate) {
                        maxDate = item.createdAt.substring(0, 10);
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
            let dupe = false;
            listCineplex.map((item2) => {
                if (item2._id == item.cineplex._id) {
                    dupe = true;
                }
            });
            if (!dupe) {
                listCineplex.push(item.cineplex);
            }
        });
        listCineplex.map((item) => {
            let keuntungan = 0;
            movieTransactions.map((item2) => {
                if (item2.cineplex._id == item._id) {
                    keuntungan += 4000;
                }
            });
            item.profit = keuntungan;
            item.tipe = "bioskop"
        });
        let listEvent = [];
        eventTransactions.map((item) => {
            if (item.event == null) {
                return;
            }
            let dupe = false;
            listEvent.map((item2) => {
                if (item2._id == item.event._id) {
                    dupe = true;
                }
            });
            if (!dupe && item.event != null) {
                listEvent.push(item.event);
            }
        });

        listEvent.map((item) => {
            let keuntungan = 0;
            eventTransactions.map((item2) => {
                if (item2.event == null) {
                    return;
                }
                if (item2.event._id == item._id) {
                    keuntungan += 10000;
                }
            });
            item.profit = keuntungan;
            item.tipe = "konser"
        });
        let summaryEvent = 0;
        let summaryCineplex = 0;
        let summaryDaily = 0;
        let summaryTotal = 0;
        listEvent.map((item) => {
            summaryEvent += item.profit;
        });
        listCineplex.map((item) => {
            summaryCineplex += item.profit;
        });
        listEvent.map((item) => {
            summaryDaily += item.profit;
        });
        listCineplex.map((item) => {
            summaryDaily += item.profit;
        });
        summaryDaily = summaryDaily / (Math.floor((Date.parse(maxDate) - Date.parse(minDate)) / (1000 * 60 * 60 * 24)) + 1);
        summaryTotal = summaryEvent + summaryCineplex;
        setSummary({
            summaryEvent: summaryEvent,
            summaryCineplex: summaryCineplex,
            summaryDaily: summaryDaily,
            summaryTotal: summaryTotal
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
                                    <td className="border-t border-b py-2 px-4">{item.tipe == "konser" ? item.event_name : item.brand_name}</td>
                                    <td className="border-t border-b py-2 px-4">{item.tipe}</td>
                                    <td className="border-t border-b py-2 px-4">{tanggal1} - {tanggal2}</td>
                                    <td className="border-t border-b py-2 px-4">Rp. {item.profit}</td>
                                </tr>
                            )
                            )}
                    </tbody>
                </table>
            </div>
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
            {/* {filteredScreenings.length == 0 && (
              <>Tidak ada data yang tercatat sesuai dengan filter</>
          )} */}
        </div>
    )
}

export default AdminLaporanKeuntungan
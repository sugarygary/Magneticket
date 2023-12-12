import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from 'react';
import logo2 from "../assets/logo2.png";


const AdminLaporanPenjualanKonser = () => {
    const data = useLoaderData();
    console.log(data.EventTransactions);
    const navigate = useNavigate();
    const [tanggal1, setTanggal1] = useState(null);
    const [eventOrganizer, setEventOrganizer] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [dataPromotor, setDataPromotor] = useState(null);
    const [summary, setSummary] = useState(null);
    const downloadPDFRef = useRef();
    const summaryRef = useRef();
    // let logo = null;

    // getDataUri("../assets/logo2.png", function (dataUri) {
    //     logo = dataUri;
    //     console.log("logo=" + logo);
    // });

    // function getDataUri(url, cb) {
    //     var image = new Image();
    //     image.setAttribute('crossOrigin', 'anonymous'); //getting images from external domain

    //     image.onload = function () {
    //         var canvas = document.createElement('canvas');
    //         canvas.width = this.naturalWidth;
    //         canvas.height = this.naturalHeight;

    //         //next three lines for white background in case png has a transparent background
    //         var ctx = canvas.getContext('2d');
    //         ctx.fillStyle = '#fff';  /// set white fill style
    //         ctx.fillRect(0, 0, canvas.width, canvas.height);

    //         canvas.getContext('2d').drawImage(this, 0, 0);

    //         cb(canvas.toDataURL('image/jpeg'));
    //     };

    //     image.src = url;
    // }
    useEffect(() => {
        let filteredData2 = data.EventTransactions;
        let tempDataPromotor = [];
        filteredData2.map((item) => {
            if (item && item.event) {
                let sudahada = false;
                tempDataPromotor.map((item2) => {
                    if (item2._id == item.event.promotor._id) {
                        sudahada = true;
                    }
                })
                if (!sudahada) {
                    tempDataPromotor.push(item.event.promotor);
                }
            }
        });
        setDataPromotor(tempDataPromotor);
        console.log(tempDataPromotor);
        if (tanggal1 && eventOrganizer) {
            filteredData2 = data.EventTransactions.filter((item) => {
                if (item.event) {
                    return (
                        item.event.showtime.toString().substring(0, 10) == tanggal1 &&
                        item.event.promotor._id == eventOrganizer
                    );
                }
            });
            // setFilteredData(filteredData2);
        } else if (tanggal1) {
            filteredData2 = data.EventTransactions.filter((item) => {
                if (item.event) {
                    return item.event.showtime.toString().substring(0, 10) == tanggal1;
                }
            }
            );
            // setFilteredData(filteredData2);
        }
        else if (eventOrganizer) {
            filteredData2 = data.EventTransactions.filter((item) => {
                if (item.event) {
                    return item.event.promotor._id == eventOrganizer;
                }
            }
            );
            // setFilteredData(filteredData2);
        }
        let eventList = [];
        // console.log(filteredData2);
        filteredData2.map((item) => {
            if (item.event) {
                let sudahada = false;
                eventList.map((item2) => {
                    if (item2._id == item.event._id) {
                        sudahada = true;
                    }
                })
                if (!sudahada) {
                    eventList.push(item.event);
                }
            }
        });
        let filteredData3 = [];
        eventList.map((item) => {
            let totalTicket = 0;
            let totalAmount = 0;
            filteredData2.map((item2) => {
                if (item2.event) {
                    if (item2.event._id == item._id) {
                        totalTicket += 1;
                        totalAmount += item2.event_category.price;
                    }
                }
            });
            let allTicketQty = 0;
            let allTicket = data.EventCategories.filter((item2) => {
                if (item2.event) {
                    return item2.event == item._id;
                }
            }
            );
            allTicket.map((item2) => {
                allTicketQty += item2.slot
            });
            let temp = {
                event: item,
                totalTicket: totalTicket,
                totalAmount: totalAmount,
                allTicketQty: allTicketQty
            };
            filteredData3.push(temp);
        });
        let tempSummary = {
            totalTicket: 0,
            totalAmount: 0
        };
        filteredData3.map((item) => {
            tempSummary.totalTicket += item.totalTicket;
            tempSummary.totalAmount += item.totalAmount;
        });
        setSummary(tempSummary);
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
            console.log(canvas)
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            // pdf.setFont("hevaltica", "normal")
            pdf.setTextColor(0, 0, 0);
            var temp=10;
            pdf.setFontSize(25);
            pdf.addImage(logo2, "png", 10, temp, 50, 20);
            pdf.setFont(undefined, 'bold')
            pdf.text(65, temp+10, 'Magneticket');
            pdf.setFont(undefined, 'normal')
            pdf.setFontSize(15);
            pdf.text(65, temp+20, 'Jl. Ngagel Jaya Tengah No.73, Surabaya, Jawa Timur');
            pdf.line(10, temp+25, 200, temp+25);
            pdf.line(10, temp+26, 200, temp+26);
            temp += 38;

            pdf.text(10, temp, 'LAPORAN PENJUALAN EVENT');
            temp+=10;
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
            if (tanggal1) {
                pdf.text(koorX, koorY, `Ringkasan Penjualan Event (${tanggal1})`);
            }
            else {
                pdf.text(koorX, koorY, 'Ringkasan Penjualan Event');
            }
            koorY += 10;
            pdf.setFontSize(15);
            pdf.text(koorX, koorY, `Jumlah Tiket Terjual : ${summary.totalTicket} tiket`);
            koorY += 10;
            pdf.text(koorX, koorY, `Total Transaksi         : Rp. ${summary.totalAmount},-`);
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
                        {dataPromotor && dataPromotor.map((promotor, index) => (
                            <option key={index} value={promotor._id}>
                                {promotor.brand_name}
                            </option>
                        ))}
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
                                    <td className="border-t border-b py-2 px-4">{item.event.showtime.toString().substring(0, 10)}</td>
                                    <td className="border-t border-b py-2 px-4">{item.totalTicket} tickets / {item.allTicketQty} tickets</td>
                                    <td className="border-t border-b py-2 px-4">Rp. {item.totalAmount}</td>
                                </tr>
                            )
                            )}
                    </tbody>
                </table>
            </div>
            <div className="" ref={summaryRef}>
                {summary && (
                    <div className="">
                        {console.log(summary)}
                        <div className="flex justify-between">
                            <p className='text-xl'><u><b>Ringkasan Penjualan Event </b>{tanggal1 && ('(' + tanggal1 + ')')}</u></p>
                        </div>
                        <div className="flex justify-between">
                            <p className='text-m'>Jumlah tiket terjual</p>
                            <p className='text-m'>{summary.totalTicket} Tiket</p>
                        </div>
                        <div className="flex justify-between">
                            <p className='text-m'>total transaksi</p>
                            <p className='text-m'>Rp. {summary.totalAmount}</p>
                        </div>
                    </div>
                )}
            </div>
            {/* {filteredScreenings.length == 0 && (
              <>Tidak ada data yang tercatat sesuai dengan filter</>
          )} */}
        </div>
    )
}

export default AdminLaporanPenjualanKonser
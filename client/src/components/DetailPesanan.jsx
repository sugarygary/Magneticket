import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import logo1 from "../assets/logo1.png"
import openheimer from "../assets/openheimer.jpg"
import bcaVA from "../assets/bca_va.png"
const DetailPesanan = (props) => {
    return (
        <div className="my-5 rounded  shadow-lg p-10 bgCardHistory border border-black">
            <div className="flex items-center justify-between">
                <p className="font-bold text-2xl">Ringkasan Pemesanan</p>
                <span className="float-right">Nomor Pemesanan: INX1234567890</span>
            </div>
            <div className="w-full mt-6 flex ">
                <div>
                    <img src={openheimer} alt="" className="w-48 rounded" />
                    <p className="text-left text-xl font-bold underline underline-offset-4">Detail Transaksi</p>
                </div>
                <div className="p-5 flex w-full justify-between ">
                    <div>
                        <p className="text-lg font-bold mb-5">OPPENHEIMER</p>
                        <table>
                            <tr>
                                <td>Bioskop</td>
                                <td> : </td>
                                <td>CGV Marvell City Mall</td>
                            </tr>
                            <tr>
                                <td>Kota</td>
                                <td> : </td>
                                <td>Surabaya</td>
                            </tr>
                            <tr>
                                <td>Tiket</td>
                                <td> : </td>
                                <td>2 Tiket</td>
                            </tr>
                            <tr>
                                <td>Tempat Duduk</td>
                                <td> : </td>
                                <td>A1,A2</td>
                            </tr>
                            <tr>
                                <td>Studio</td>
                                <td> : </td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Hari/Tanggal</td>
                                <td> : </td>
                                <td>Selasa, 17-10-2023</td>
                            </tr>
                            <tr>
                                <td>Waktu</td>
                                <td> : </td>
                                <td>10:30</td>
                            </tr>
                        </table>
                    </div>
                    <div className="bg-white rounded-2xl p-2 h-fit border border-[3px] border-black">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=100x100" alt="" title="" className="w-48" />
                    </div>
                </div>

            </div>
            <div className="flex justify-between">
                <div className="">
                    <p>2D Regular</p>
                    <p>Biaya Layanan</p>
                </div>
                <div>
                    <p>Rp. 30.000 <span className="abu9CA3AF">x2</span></p>
                    <p>Rp. 4.000 <span className="abu9CA3AF">x2</span></p>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="w-3/4 bg-red-500">

                </div>
            </div>
            <hr className="bg-black h-[0.2rem] text-black rounded-full mt-2" />
            <div className="justify-between flex mt-5">
                <div>

                </div>
                <p className="font-bold">Total Tagihan : Rp.68.000</p>
            </div>
            <div className="justify-between flex">
                <div>

                </div>
                <div className="flex items-center gap-3">
                    <img src={bcaVA} alt="" className="w-24" />
                    <p>BCA VIRTUAL ACCOUNT</p>
                </div>
            </div>
        </div>

    )
}

export default DetailPesanan
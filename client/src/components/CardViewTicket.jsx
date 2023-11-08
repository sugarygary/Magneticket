import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import sawx from "../assets/sawx.png"
import qrcode from "../assets/qrcode.png"
const CardViewTicket = (props) => {
    return (
        <div className=" my-5 mx-24 rounded flex shadow-zinc-400 shadow-lg">
            <div>
                <img src={sawx} alt="" className="w-60 rounded" />
            </div>
            <div className="w-10/12">
                <p className="text-4xl font-extrabold mb-5 ml-8 mt-8">SAW X</p>
                <table className="ml-8">
                    <tbody>
                        <tr>
                            <td><p className="abu9CA3AF">Tanggal</p></td>
                            <td><p className="ml-10">Rabu 18 Oktober 2023</p></td>
                        </tr>
                        <tr>
                            <td><p className="abu9CA3AF">Jam</p></td>
                            <td><p className="ml-10">12:20</p></td>
                        </tr>
                        <tr>
                            <td><p className="abu9CA3AF">Bioskop</p></td>
                            <td><p className="ml-10">GALAXY MALL XXI STUDIO 2</p></td>
                        </tr>
                    </tbody>
                </table>
                <div className="ml-8 mt-4">
                    <p className="font-extrabold">2 Tiket</p>
                    <table>
                        <tbody>
                            <tr>
                                <td><p className="abu9CA3AF">Kursi</p></td>
                                <td><p className="ml-10">F17,F18</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="border border-black border-y-0 border-r-0 border-l-2 border-dashed text-center w-72">
                <p className="font-magneticket text-3xl mt-8">MAGNETICKET</p>
                <div className="flex justify-center items-center">
                    <img src={qrcode} alt="" className="w-36"/>
                </div>
                <p className="font-magneticket text-2xl">8041892</p>
                <button className="px-5 py-2 rounded-md biruCariTiket text-white">Lihat Detail</button>
            </div>
        </div>

    )
}

export default CardViewTicket
import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import sawx from "../assets/sawx.png"
const CardCineplexJadwal = (props) => {
    return (
        <div className=" my-5 mx-24 rounded flex shadow-zinc-400 shadow-lg">
            <div>
                <img src={sawx} alt="" className="w-60 rounded" />
            </div>
            <div className="w-10/12">
                <p className="text-4xl font-extrabold ml-8 mt-8">GALAXY MALL STUDIO 1</p> 
                <p className="text-2xl font-extrabold mb-5 ml-8 mt-2">SAW X</p>
                <table className="ml-8">
                    <tbody>
                        <tr>
                            <td><p className="abu9CA3AF">Tanggal</p></td>
                            <td><p className="ml-10">Rabu 18 Oktober 2023</p></td>
                        </tr>
                        <tr>
                            <td><p className="abu9CA3AF">Rating Usia</p></td>
                            <td><p className="ml-10">R-17</p></td>
                        </tr>
                        <tr>
                            <td><p className="abu9CA3AF">Durasi</p></td>
                            <td><p className="ml-10">1 jam 58 menit</p></td>
                        </tr>
                        <tr>
                            <td><p className="abu9CA3AF">Harga</p></td>
                            <td><p className="ml-10">Rp. 30.000</p></td>
                        </tr>
                        <tr>
                            <td><p className="abu9CA3AF">ID Jadwal</p></td>
                            <td><p className="ml-10">SCHXXI1710230001</p></td>
                        </tr>
                        <tr>
                            <td><p className="abu9CA3AF mt-1">Jam</p></td>
                            <td><p className="bg-[#F0F0F0] border border-black rounded-lg w-20 text-center py-1 mt-1 ml-10">12:20</p></td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-between">
                    <div></div>
                    <button className="px-5 py-2 mb-5 rounded-md biruCariTiket text-white">Lihat Detail</button>
                </div>
            </div>
        </div>


    )
}

export default CardCineplexJadwal
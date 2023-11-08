import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import sawx from "../assets/sawx.png"
const CardCineplexStudio = (props) => {
    return (
        <div className=" my-5 mx-24 rounded flex shadow-zinc-400 shadow-lg">
            <div>
                <img src={sawx} alt="" className="w-60 rounded" />
            </div>
            <div className="w-10/12">
                <p className="text-5xl font-extrabold mb-2 ml-8 mt-8">STUDIO 1</p>
                <p className="text-4xl font-extrabold mb-5 ml-8">SAW X</p>
                <table className="ml-8">
                    <tbody>
                        <tr>
                            <td><p className="abu9CA3AF">Rating Usia</p></td>
                            <td><p className="w-20 h-8 ml-10 pt-1 bg-gray-800 text-white text-center rounded-full">R-17</p></td>
                        </tr>
                        <tr>
                            <td><p className="abu9CA3AF">Durasi</p></td>
                            <td><p className="ml-10">1 jam 58 menit</p></td>
                        </tr>
                        <tr>
                            <td><p className="abu9CA3AF">Harga</p></td>
                            <td><p className="ml-10">Rp. 30.000</p></td>
                        </tr>
                    </tbody>
                </table>
                <div className="ml-8 mt-4">
                    <p className="font-extrabold bg-[#F0F0F0] border border-black rounded-lg w-20 text-center py-1">12:20</p>
                </div>
                <div className="relative text-right mt-3">
                    <p className="font-extrabold text-2xl">2D</p>
                </div>
            </div>
        </div>

    )
}

export default CardCineplexStudio
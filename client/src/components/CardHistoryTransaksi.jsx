import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import openheimer from "../assets/openheimer.jpg"
const CardHistoryTransaksi = (props) => {
    return (
        <div className="my-5 mx-12 rounded flex shadow-lg p-10 bgCardHistory border border-black">
            <img src={openheimer} alt="" className="w-48 rounded" />
            <div className="text-black  ml-5 w-full">
                <p className="font-bold text-lg text-right text-green-700 text-xl font-bold">Sukses</p>
                {/* <p className="abu9CA3AF">2D IMAX</p> */}
                <p>INX1234567890</p>
                <p className="font-bold">Film : Oppenheimer</p>
                <p className="font-bold">Bioskop : CGV Marvell City Mall</p>
                <p className="font-bold">Tiket : 2 Tiket</p>
                <p className="font-bold">Hari/Tanggal : Selasa,17-10-2023</p>
                <p className="font-bold">Waktu : 10:30</p>
                <p className="font-bold">Pembayaran : BCA Virtual Account</p>
                <button className="px-5 py-1 rounded biruDetail text-white float-right mt-10"> Detail</button>
            </div>

        </div>

    )
}

export default CardHistoryTransaksi
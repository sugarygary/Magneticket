import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import openheimer from "../assets/openheimer.jpg"
const CardHome = (props) => {
    return (
        <div className="biruTua my-5 w-fit text-center  rounded">
            <img src={openheimer} alt="" className="w-64 rounded" />
            <div className="text-white py-3">
                <p className="font-bold text-lg">OPPENHEIMER</p>
                <p className="abu9CA3AF">2D IMAX</p>
                <button className="biruCariTiket rounded p-1 px-4 mt-2">Cari Tiket ➡</button>
            </div>

        </div>

    )
}

export default CardHome
import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
// import openheimer from "../assets/openheimer.jpg"
import popcorn from "../assets/popcorn.jpg"
const CardMakanan = (props) => {
    return (
        <div className="my-5 shadow-lg w-full flex">
            <div>
                <img src={popcorn} alt="" className="w-80" />
                <div className="biruTua text-white p-2 rounded-b-lg w-full">
                    <p className="font-bold">Popcorn Small</p>
                    <div className="flex">
                        <p className="text-xl mt-3">Rp 30.303</p>
                        <button className="px-5 rounded biruCariTiket ml-auto">Tambah</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CardMakanan
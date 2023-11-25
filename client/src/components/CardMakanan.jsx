import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
// import openheimer from "../assets/openheimer.jpg"
import popcorn from "../assets/popcorn.jpg"
const CardMakanan = (props) => {
    console.log(props)
    
    return (
        <div className="my-5 shadow-xl mr-4">
            <div className="">
                <img src={popcorn} alt="" className="w-80" />
                <div className="biruTua text-white p-2 rounded-b-lg w-full">
                    <p className="font-bold">{props.item_name}</p>
                    <div className="flex">
                        <p className="text-xl mt-3">{props.price}</p>
                        <button className="px-5 rounded biruCariTiket ml-auto" onClick={(() => {props.addKeranjang(props)})}>Tambah</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CardMakanan
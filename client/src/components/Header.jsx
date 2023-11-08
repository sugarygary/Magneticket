import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import logo1 from "../assets/logo1.png"
import search from "../assets/search.png"
const Header = (props) => {
    return (
        <div className="flex biruTua text-white px-12 p-5 justify-between">
            <div className="kiri flex ">
                {/* <p className="fontBiasa">asdasdasd</p> */}
                {/* kiri */}
                <img src={logo1} alt="" className="w-20" />
                <p className="text-4xl mx-3">|</p>
                <p className="font-magneticket text-5xl">MAGNETICKET</p>
                <button className="ml-5 text-xl">Event </button>
                <button className="ml-5 text-xl">Bioskop</button>
            </div>
            <div className="kanan flex w-5/12">
                {/* <p className="font-magneticket">zzzzzzzz</p> */}
                {/* kanan */}
                <div className="abuInput rounded flex ml-24">
                    <img src={search} alt="" className="w-7 h-7 mt-3 ml-1 mr-1"/>
                    <input type="text" className="abuInput w-96 rounded border-transparent" placeholder="Search" />
                </div>

                <div className="p-1 biruMuda rounded ml-1 w-14 flex item-center">
                    <img src={search} alt="" className="w-12 " />
                </div>
                <button className="ml-5 text-xl">Masuk </button>
                <button className="ml-5 text-xl biruMuda p-3 rounded">Register</button>
            </div>
        </div>
    )
}

export default Header
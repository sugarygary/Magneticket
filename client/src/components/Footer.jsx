import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import logo1 from "../assets/logo1.png"
import search from "../assets/search.png"
import ig from "../assets/instagram.png"
import twitter from "../assets/twitter.png"
import utube from "../assets/youtube.png"
import facebook from "../assets/facebook.png"
const Footer = (props) => {
    return (
        <div className=" biruTua">
            <div className="flex text-white px-12 p-5 ">
                <div className="w-1/5  text-center">
                    {/* logo */}
                    <div className="">
                        <img src={logo1} alt="" className="w-96" />
                        <p className="font-magneticket text-7xl">MAGNETICKET</p>
                    </div>
                </div>
                <div className="w-4/5 ml-10">
                    {/* tulisan */}
                    <div className=" flex w-full">
                        <div className="ml-10 w-1/4">
                            {/* produk */}
                            <p className="text-xl font-bold">Produk</p>
                            <p className="mt-1">Tiket Bioskop</p>
                            <p className="mt-1">Karier</p>
                        </div>
                        <div className="ml-10 w-1/4">
                            {/* gabung */}
                            <p className="text-xl font-bold">Gabung</p>
                            <p className="mt-1">Event Organizer</p>
                            <p className="mt-1">Mitra Cineplex</p>

                        </div>
                        <div className="ml-10 w-1/4">
                            {/* Bantuan */}
                            <p className="text-xl font-bold">Bantuan</p>
                            <p className="mt-1">FAQ</p>
                            <p className="mt-1">Lokasi Kami</p>
                            <p className="mt-1">Hubungi Kami</p>
                        </div>
                        <div className="ml-10 w-1/4">
                            {/* Lainnya */}
                            <p className="text-xl font-bold">Lainnya</p>
                            <p className="mt-1">Syarat & Ketentuan</p>
                            <p className="mt-1">Kebijakan Privasi</p>
                        </div>
                    </div>
                    {/* sosmed */}
                    <div className="ml-10 font-bold text-xl  mt-12">
                        <p className="">Ikuti Kami</p>
                        <div className="flex mt-3">
                            <img src={ig} alt="" className="w-10 mr-5" />
                            <img src={twitter} alt="" className="w-10 mr-5" />
                            <img src={facebook} alt="" className="w-10 mr-5" />
                            <img src={utube} alt="" className="w-10 mr-5" />
                        </div>
                    </div>

                </div>

            </div>
            <div className="text-white mx-10">
                <hr className="w-full border-white" />
                <p className="pb-10  pt-2">Magneticket, LLC © 2023 | All rights reserved.</p>
            </div>

        </div>

    )
}

export default Footer
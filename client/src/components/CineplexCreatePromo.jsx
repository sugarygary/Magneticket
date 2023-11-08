import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import logo1 from "../assets/logo1.png"

const CineplexCreatePromo = (props) => {
    return (
        <div className=" w-screen h-full flex justify-center items-center text-white my-10">
            <div className="biruTua p-12 text-center rounded  w-1/2 mx-auto ">
                <form action="" className="mt-5">
                    <div className="mb-3 text-left">
                        <p>Kode Promo</p>
                        <input type="text" className="abuInput w-full rounded p-1 pl-2" placeholder="Masukkan Nama Menu" />
                    </div>
                    <div className="mb-3 text-left">
                        <p>Masa Berlaku</p>
                        {/* <input type="text" className="abuInput w-full rounded p-1 pl-2" placeholder="Enter your email" /> */}
                        <input type="date" name="" id="" className="w-full abuBgInput text-gray-500" />
                    </div>
                    <div className="mb-3 text-left">
                        <p>Potongan</p>
                        <input type="text" className="abuInput w-full rounded p-1 pl-2" placeholder="Masukkan Potong" />
                    </div>
                    <div className="mb-3 text-left mt-5">
                        <button className="biruMuda w-full rounded p-1 pl-2">
                            Buat Kode Promo
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default CineplexCreatePromo
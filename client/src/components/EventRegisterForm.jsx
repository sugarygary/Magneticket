import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import logo1 from "../assets/logo1.png"

const EventRegisterForm = (props) => {
    return (
        <div className=" w-full h-full flex justify-center items-center text-white my-10">
            <div className="bg-gray-700 p-12 text-center rounded  w-1/2 mx-auto ">
                <form action="" className="mt-5">
                    <div className="mb-3 text-left mt-2">
                        <p>Nama Perusahaan</p>
                        <input type="text" className="abuInput w-full rounded p-1 pl-2 mt-2" placeholder="Masukkan Nama Perusahaan" />
                    </div>
                    <div className="mb-3 text-left mt-6">
                        <p>Nama Bisnis</p>
                        <input type="password" className="abuInput w-full rounded p-1 pl-2 mt-2" placeholder="Masukkan Nama Bisnis" />
                    </div>
                    <div className="mb-3 text-left">
                        <p>Lokasi</p>
                        <input type="password" className="abuInput w-full rounded p-1 pl-2 mt-2" placeholder="Masukkan Lokasi" />
                    </div>
                    <div className="mb-3 text-left">
                        <p className="font-thin text-sm">Unggah NPWP Badan</p>
                        <input type="file" className="block w-96 mb-5 text-md text-white border border-gray-600 bg-gray-600 rounded-lg cursor-pointer mt-2" id="" name="" />
                    </div>
                    <div className="mb-3 text-left">
                        <p className="font-thin text-sm">Unggah Surat Verifikasi Perusahaan</p>
                        <input type="file" className="block w-96 mb-5 text-md text-white border border-gray-600 bg-gray-600 rounded-lg cursor-pointer mt-2" id="" name="" />
                    </div>
                    <div className="mb-3 text-left flex">
                        <input type="checkbox" name="kebijakanPrivasi" id="" className="bg-gray-600 mt-1" />
                        <p className="ml-3">Saya setuju dengan </p>
                        <p className="biruDaftarSekarang ml-1">kebijakan privasi Magneticket</p>
                    </div>
                    <div className="mb-3 text-left mt-10">
                        <button className="biruMuda w-full rounded p-1 pl-2">
                            Lanjut
                        </button>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default EventRegisterForm
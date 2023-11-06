import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import logo1 from "../assets/logo1.png"

const UserRegisterForm = (props) => {
    return (
        <div className=" w-screen h-screen flex justify-center items-center text-white my-10">
            <div className="biruTua p-12 text-center rounded  w-1/2 mx-auto ">
                <div className="justify-center">
                    <img src={logo1} alt="" className="w-96 mx-auto" />
                    <p className="font-magneticket text-7xl">MAGNETICKET</p>
                </div>
                <form action="" className="mt-5">
                    <div className="mb-3 text-left">
                        <p>Email</p>
                        <input type="text" className="abuInput w-full rounded p-1 pl-2" placeholder="Enter your email" />
                    </div>
                    <div className="mb-3 text-left">
                        <p>Confirm Password</p>
                        <input type="password" className="abuInput w-full rounded p-1 pl-2" placeholder="Enter your password" />
                    </div>
                    <div className="mb-3 text-left">
                        <p>Password</p>
                        <input type="password" className="abuInput w-full rounded p-1 pl-2" placeholder="Enter your confirm password" />
                    </div>
                    {/* checkbox */}
                    <div className="mb-3 text-left flex">
                        <input type="checkbox" name="kebijakanPrivasi" id="" />
                        <p>Saya setuju dengan </p>
                        <p className="biruDaftarSekarang ml-1">kebijakan privasi Magneticket</p>
                    </div>
                    <div className="mb-3 text-left mt-10">
                        <button className="biruMuda w-full rounded p-1 pl-2">
                            Daftar
                        </button>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default UserRegisterForm
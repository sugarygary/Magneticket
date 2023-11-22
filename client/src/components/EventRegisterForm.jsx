import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import { useForm } from "react-hook-form"
import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"
import logo1 from "../assets/logo1.png"
import { registerCineplex, registerEventOrganizer, registerUser } from "../handlers/LoginHandler"
import { useNavigate } from "react-router-dom"

const EventRegisterForm = (props) => {
    const navigate = useNavigate()
    const schema = Joi.object({
        brand_name: Joi.string().required(),
        company_name: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string()
            .valid(Joi.ref("password"))
            .required()
            .label("Confirm Password")
            .messages({ "any.only": "{{#label}} does not match the password" }),
        termsAndConditions: Joi.boolean().valid(true).required(),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
    });
    async function submitForm(data) {

        console.log(data)
        let eventOrganizerBaru = {
            email: data.email,
            password: data.password,
            company_name: data.company_name,
            brand_name: data.brand_name,
        }
        let retu = await registerEventOrganizer(eventOrganizerBaru)
        console.log(retu)
        if (retu == "Request failed with status code 409") {
            alert("email sudah terdaftar")
        } else {
            navigate("/");
        }

    }
    return (
        <div className=" w-full h-full flex justify-center items-center text-white my-10">
            <div className="biruTua p-12 text-center rounded  w-1/2 mx-auto ">
                <div className="justify-center">
                    <img src={logo1} alt="" className="w-96 mx-auto" />
                    <p className="font-magneticket text-7xl">MAGNETICKET</p>
                </div>
                <form onSubmit={handleSubmit(submitForm)} className="mt-5">
                    <div className="mb-3 text-left">
                        <p>Nama Perusahaan</p>
                        <input type="text" className="abuInput w-full rounded p-1 pl-2" placeholder="Masukkan Nama Perusahaan" {...register("company_name")} />
                        <span className="text-red-500">{errors.company_name?.message}</span>
                    </div>
                    <div className="mb-3 text-left">
                        <p>Nama Bisnis</p>
                        <input type="text" className="abuInput w-full rounded p-1 pl-2" placeholder="Masukkan Nama Bisnis" {...register("brand_name")} />
                        <span className="text-red-500">{errors.brand_name?.message}</span>
                    </div>
                    <div className="mb-3 text-left">
                        <p>Email</p>
                        <input type="text" className="abuInput w-full rounded p-1 pl-2" placeholder="Enter your email" {...register("email")} />
                        <span className="text-red-500">{errors.email?.message}</span>
                    </div>

                    {/* MULTERRR MBO NANTI AJA DULUm, BELUM KEPAKE */}
                    {/* <div className="mb-3 text-left">
                        <p>Unggah NPWP Badan</p>
                        
                        <input type="file" className="block w-96 mb-5 text-md text-white border border-gray-600 bg-gray-600 rounded-lg cursor-pointer mt-2" id="" name="" />
                    </div>
                    <div className="mb-3 text-left">
                        <p>Unggah Surat Kerjasama</p>
                        
                        <input type="file" className="block w-96 mb-5 text-md text-white border border-gray-600 bg-gray-600 rounded-lg cursor-pointer mt-2" id="" name="" />
                    </div> */}
                    <div className="mb-3 text-left">
                        <p>Password</p>
                        <input type="password" className="abuInput w-full rounded p-1 pl-2" placeholder="Enter your password" {...register("password")} />
                        <span className="text-red-500">{errors.password?.message}</span>
                    </div>
                    <div className="mb-3 text-left">
                        <p>Confirm Password</p>
                        <input type="password" className="abuInput w-full rounded p-1 pl-2" placeholder="Enter your confirm password" {...register("confirmPassword")} />
                        <span className="text-red-500">{errors.confirmPassword?.message}</span>
                    </div>
                    <div>
                        {/* ini captcha */}
                        CAPTCHA
                    </div>
                    {/* checkbox */}
                    <div className="mb-3 text-left items-center flex">
                        <input type="checkbox" name="kebijakanPrivasi" id="" {...register("termsAndConditions")} />
                        <p>Saya setuju dengan </p>
                        <p className="biruDaftarSekarang ml-1">kebijakan privasi Magneticket</p>
                        <span className="text-red-500">{errors.termsAndConditions?.message}</span>
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

export default EventRegisterForm
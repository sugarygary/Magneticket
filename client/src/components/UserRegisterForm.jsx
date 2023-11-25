import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"
import logo1 from "../assets/logo1.png"
import { registerUser } from "../handlers/LoginHandler"
import { useNavigate } from "react-router-dom"

const UserRegisterForm = (props) => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null);
    const schema = Joi.object({
        fullname: Joi.string().required(),
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
        console.log("aaaaa")
        console.log(data)
        let akunBaru = {
            email: data.email,
            password: data.password,
            full_name: data.fullname
        }
        let retu = await registerUser(akunBaru)
        console.log(retu);
        if (retu.response) {
            setErrorMessage("Email already exists")
        } else if (retu.request) {
            navigate("/error-page")
        }
        // if (retu == "Request failed with status code 409") {
        // }
        // else {
        //     navigate("/");
        // }
    }
    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center text-white my-10">
                <div className="biruTua p-12 text-center rounded  w-1/2 mx-auto ">
                    <div className="justify-center">
                        <img src={logo1} alt="" className="w-96 mx-auto" />
                        <p className="font-magneticket text-7xl">MAGNETICKET</p>
                    </div>
                    <form onSubmit={handleSubmit(submitForm)} className="mt-5">
                        <div className="mb-3 text-left">
                            <p>Fullname</p>
                            <input type="text" className="abuInput w-full rounded p-1 pl-2" placeholder="Enter your fullname" {...register("fullname")} />
                            <span className="text-red-500">{errors.fullname?.message}</span>
                        </div>
                        <div className="mb-3 text-left">
                            <p>Email</p>
                            <input type="text" className="abuInput w-full rounded p-1 pl-2" placeholder="Enter your email" {...register("email")} />
                            <span className="text-red-500">{errorMessage != null && errorMessage}</span>
                            <span className="text-red-500">{errors.email?.message}</span>
                        </div>
                        <div className="mb-3 text-left">
                            <p>Password</p>
                            <input type="password" className="abuInput w-full rounded p-1 pl-2" placeholder="Enter your  password" {...register("password")} />
                            <span className="text-red-500">{errors.password?.message}</span>
                        </div>
                        <div className="mb-3 text-left">
                            <p>Confirm Password</p>
                            <input type="password" className="abuInput w-full rounded p-1 pl-2" placeholder="Enter your confirm password" {...register("confirmPassword")} />
                            <span className="text-red-500">{errors.confirmPassword?.message}</span>
                        </div>
                        {/* checkbox */}
                        <div className="mb-3 text-left flex">
                            <input type="checkbox" name="termsAndConditions" id="" {...register("termsAndConditions")} />
                            <p>Saya setuju dengan </p>
                            <p className="biruDaftarSekarang ml-1">kebijakan privasi Magneticket</p>
                            <span className="text-red-500">{errors.termsAndConditions?.message}</span>
                        </div>
                        <div className="mb-3 text-left mt-10">
                            <button className="biruMuda w-full rounded p-1 pl-2" >
                                Daftar
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>


    )
}

export default UserRegisterForm
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import logo1 from "../assets/logo1.png";
import { registerUser } from "../handlers/LoginHandler";
import { Link, useNavigate } from "react-router-dom";

const UserRegisterForm = (props) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const schema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
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
    let akunBaru = {
      email: data.email,
      password: data.password,
      full_name: data.fullname,
    };
    let retu = await registerUser(akunBaru);
    if (retu.response) {
      setErrorMessage("Email already exists");
    } else if (retu.request) {
      navigate("/error-page");
    }
  }
  return (
    <>
      <div className="w-full mt-24 flex justify-center items-center text-white">
        <div className="biruTua p-12 text-center rounded-lg w-4/5 md:w-1/2 mx-auto ">
          <div className="justify-center">
            <img src={logo1} alt="" className="w-48 mx-auto" />
            <p className="font-magneticket text-4xl">MAGNETICKET</p>
          </div>
          <form onSubmit={handleSubmit(submitForm)} className="mt-5">
            <div className="mb-3 text-left">
              <p>Fullname</p>
              <input
                type="text"
                className="abuInput w-full rounded p-1 pl-2"
                placeholder="Enter your fullname"
                {...register("fullname")}
              />
              <span className="text-red-500">{errors.fullname?.message}</span>
            </div>
            <div className="mb-3 text-left">
              <p>Email</p>
              <input
                type="text"
                className="abuInput w-full rounded p-1 pl-2"
                placeholder="Enter your email"
                {...register("email")}
              />
              <span className="text-red-500">
                {errorMessage != null && errorMessage}
              </span>
              <span className="text-red-500">{errors.email?.message}</span>
            </div>
            <div className="mb-3 text-left">
              <p>Password</p>
              <input
                type="password"
                className="abuInput w-full rounded p-1 pl-2"
                placeholder="Enter your  password"
                {...register("password")}
              />
              <span className="text-red-500">{errors.password?.message}</span>
            </div>
            <div className="mb-3 text-left">
              <p>Confirm Password</p>
              <input
                type="password"
                className="abuInput w-full rounded p-1 pl-2"
                placeholder="Enter your confirm password"
                {...register("confirmPassword")}
              />
              <span className="text-red-500">
                {errors.confirmPassword?.message}
              </span>
            </div>
            {/* checkbox */}
            <div className="mb-3 text-left flex">
              <input
                type="checkbox"
                name="termsAndConditions"
                id=""
                {...register("termsAndConditions")}
              />
              <div className="ml-2">
                Saya setuju dengan{" "}
                <Link
                  to={"/user/kebijakan-privasi"}
                  className="biruDaftarSekarang hover:underline"
                >
                  kebijakan privasi Magneticket
                </Link>{" "}
              </div>

              <span className="text-red-500">
                {errors.termsAndConditions?.message}
              </span>
            </div>
            <div className="mb-3 text-left">
              <button className="biruMuda w-full rounded p-1 pl-2">
                Daftar
              </button>{" "}
            </div>
            <div className="text-left">
              Sudah punya akun?{" "}
              <Link to="/user/login" className="biruDaftarSekarang">
                Masuk di sini{" "}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserRegisterForm;

import { useState, useEffect } from "react";
import logo1 from "../assets/logo1.png";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { Link, useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { loginCineplex, loginUser } from "../handlers/LoginHandler";

const CineplexLoginForm = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  async function submitForm(e) {
    e.preventDefault();
    setErrorMsg(null);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let data = {
      email: email,
      password: password,
    };
    if (email == "" || password == "") {
      setErrorMsg("All field must be filled");
      return;
    }
    if (!email.match(emailPattern)) {
      setErrorMsg("Email is not valid");
      return;
    }

    let retu = await loginCineplex(data);
    console.log(retu);
    if (retu.response) {
      if (retu.response.status == 400) {
        console.log("HAHALAOL");
        setErrorMsg(retu.response.data.message);
        return;
      }
      if (retu.response.status == 403) {
        //navigate ke email belum aktif
        navigate("/cineplex/pending-email", {
          state: { pending_email: data.email },
        });
        return;
      }
    } else if (retu.request) {
      navigate("/error-page");
    }
    navigate("/cineplex/home");
  }
  return (
    <div className="flex justify-center text-white my-10">
      <div className="biruTua p-12 rounded w-5/12 mx-auto ">
        <div className="justify-center">
          <img src={logo1} alt="" className="w-48 mx-auto" />
          <p className="font-magneticket text-center text-4xl">MAGNETICKET</p>
        </div>
        <form onSubmit={submitForm} className="mt-5">
          <div className="mb-3 text-left">
            <p>Email</p>
            <input
              type="text"
              className="abuInput w-full rounded p-1 pl-2"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 text-left">
            <p>Password</p>
            <input
              type="password"
              className="abuInput w-full rounded p-1 pl-2"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {errorMsg != null && <span className="text-red-500">{errorMsg}</span>}
          <div className="mb-3 text-left mt-10">
            <button className="biruMuda w-full rounded p-1 pl-2">Masuk</button>
          </div>
          <div className="mb-3 text-left flex">
            <p>Belum punya akun?</p>
            <Link to="/cineplex/register" className="biruDaftarSekarang ml-1">
              Daftar sekarang{""}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CineplexLoginForm;

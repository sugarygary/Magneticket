import { useState, useEffect } from "react";
import logo1 from "../assets/logo1.png";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { Link, useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { loginUser } from "../handlers/LoginHandler";

const UserLoginForm = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    setErrorMsg(null);
  }, [email, password]);
  async function submitForm(e) {
    e.preventDefault();
    setErrorMsg(null);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let data = {
      email: email,
      password: password,
    };
    if (email == "" || password == "") {
      setErrorMsg("Semua input harus diisi!");
      return;
    }
    if (!email.match(emailPattern)) {
      setErrorMsg("Email tidak valid");
      return;
    }

    let retu = await loginUser(data);
    if (retu.response) {
      if (retu.response.status == 400) {
        setErrorMsg(retu.response.data.message);
        return;
      }
      if (retu.response.status == 403) {
        navigate("/user/pending-email", {
          state: { pending_email: data.email },
        });
        return;
      }
    } else if (retu.request) {
      navigate("/error-page");
    }

    navigate("/");
  }
  return (
    <div className="w-full h-full flex justify-center text-white mt-24 my-12">
      <div className="biruTua p-12 rounded-lg w-3/4 sm:w-1/2 mx-auto ">
        <div className="justify-center">
          <img src={logo1} alt="" className="w-48 mx-auto" />
          <p className="font-magneticket text-center text-4xl">MAGNETICKET</p>
        </div>
        <form onSubmit={submitForm} className="mt-2">
          <div className="mb-3 text-left">
            <p>Email</p>
            <input
              type="text"
              className="abuInput w-full rounded p-1 pl-2"
              placeholder="Enter your email"
              id="loginFormEmailUser"
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
              id="loginFormPasswordUser"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {errorMsg != null && <span className="text-red-500">{errorMsg}</span>}
          <div className="mb-3 text-left mt-4">
            <button className="biruMuda w-full rounded p-1 pl-2"
            id="btnLoginUser">Masuk</button>
          </div>
          <div className="mb-3 text-left flex">
            <p>Belum punya akun?</p>
            <Link to="/user/register" className="biruDaftarSekarang ml-1">
              Daftar sekarang{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLoginForm;

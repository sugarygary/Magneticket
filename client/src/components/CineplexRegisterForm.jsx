import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import logo1 from "../assets/logo1.png";
import { registerCineplex, registerUser } from "../handlers/LoginHandler";
import { Link, useNavigate } from "react-router-dom";

const CineplexRegisterForm = (props) => {
  const navigate = useNavigate();
  const [npwp, setNpwp] = useState(null);
  const [surat, setSurat] = useState(null);
  const [namaPerusahaan, setNamaPerusahaan] = useState(null);
  const [namaBisnis, setNamaBisnis] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [conPass, setConPass] = useState(null);
  const [tnc, setTnc] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [errMsgFileNpwp, setErrMsgFileNpwp] = useState(null);
  const [errMsgFileSurat, setErrMsgFileSurat] = useState(null);
  async function submitForm(e) {
    e.preventDefault();
    if (
      npwp == null ||
      surat == null ||
      namaPerusahaan == null ||
      namaBisnis == null ||
      email == null ||
      password == null ||
      conPass == null ||
      tnc == false
    ) {
      setErrMsg("Inputan ada yang kosong");
      return;
    }
    if (password != conPass) {
      setErrMsg("Password dan confirm password tidak sama");
      return;
    }
    // let cineplexBaru = {
    //   email: email,
    //   password: password,
    //   company_name: namaPerusahaan,
    //   brand_name: namaBisnis,
    // };
    if(!email.includes("@") || !email.includes(".")){
      setErrMsg("email tidak valid");
      return;
    }
    const formData = new FormData();
    formData.append("npwp", npwp);
    formData.append("surat", surat);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("company_name", namaPerusahaan);
    formData.append("brand_name", namaBisnis);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    let retu = await registerCineplex(formData, config);
    if (retu == "Request failed with status code 409") {
      alert("email sudah terdaftar");
    } else {
      navigate("/cineplex/login");
    }
  }
  const handleNpwp = (file) => {
    console.log(file);
    if (file.type != "image/jpeg") {
      setErrMsgFileNpwp("Npwp harus berupa image");
      return;
    }
    setNpwp(file);
  };
  const handleSurat = (file) => {
    console.log(file);
    if (file.type != "image/jpeg") {
      setErrMsgFileSurat("Surat harus berupa image");
      return;
    }
    setSurat(file);
  };
  return (
    <div className=" w-3/4 mx-auto h-full flex justify-center items-center text-white my-10">
      <div className="biruTua p-12 text-center rounded w-3/4 mx-auto ">
        <div className="justify-center">
          <img src={logo1} alt="" className="w-48 mx-auto" />
          <p className="font-magneticket text-6xl">MAGNETICKET</p>
        </div>
        <form onSubmit={submitForm} className="mt-5">
          <div className="mb-3 text-left">
            <p>Nama Perusahaan</p>
            <input
              type="text"
              className="abuInput w-full rounded p-1 pl-2"
              placeholder="Masukkan Nama Perusahaan"
              onChange={(e) => {
                setNamaPerusahaan(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 text-left">
            <p>Nama Bisnis</p>
            <input
              type="text"
              className="abuInput w-full rounded p-1 pl-2"
              placeholder="Masukkan Nama Bisnis"
              onChange={(e) => {
                setNamaBisnis(e.target.value);
              }}
            />
          </div>
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
          {/* MULTERRR MBO NANTI AJA DULUm, BELUM KEPAKE */}
          <div className="mb-3 text-left">
            <p>Unggah NPWP Badan</p>
            <input
              type="file"
              className="block w-96 mb-5 text-md text-white border border-gray-600 bg-gray-600 rounded-lg cursor-pointer mt-2"
              id=""
              name=""
              onChange={(e) => {
                // setNpwp(e.target.files[0])
                // alert(e.target.files[0]);
                handleNpwp(e.target.files[0]);
              }}
            />
            {errMsgFileNpwp != null && (
              <span className="text-red-500">{errMsgFileNpwp}</span>
            )}
          </div>
          <div className="mb-3 text-left">
            <p>Unggah Surat Kerjasama</p>
            <input
              type="file"
              className="block w-96 mb-5 text-md text-white border border-gray-600 bg-gray-600 rounded-lg cursor-pointer mt-2"
              id=""
              name=""
              onChange={(e) => {
                handleSurat(e.target.files[0]);
              }}
            />
            {errMsgFileSurat != null && (
              <span className="text-red-500">{errMsgFileSurat}</span>
            )}
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
          <div className="mb-3 text-left">
            <p>Confirm Password</p>
            <input
              type="password"
              className="abuInput w-full rounded p-1 pl-2"
              placeholder="Enter your confirm password"
              onChange={(e) => {
                setConPass(e.target.value);
              }}
            />
          </div>
          
          {/* checkbox */}
          <div className="mb-3 text-left items-center flex">
            <input
              type="checkbox"
              name="kebijakanPrivasi"
              id=""
              onChange={(e) => {
                setTnc(!tnc);
              }}
            />
            <p>Saya setuju dengan </p>
            <p className="biruDaftarSekarang ml-1">
              kebijakan privasi Magneticket
            </p>
          </div>
          <span className="text-red-500">
            {/* {errors.termsAndConditions?.message} */}
            {errMsg && <p className="text-red-500">{errMsg}</p>}
          </span>
          <div className="mb-3 text-left mt-10">
            <button className="biruMuda w-full rounded p-1 pl-2">Daftar</button>
          </div>
        </form>
        <div className="flex">
          <div>Sudah memiliki akun? </div>
          <Link to={"/cineplex/login"} className="px-2 text-blue-500">Login sekarang</Link>
        </div>
      </div>
    </div>
  );
};

export default CineplexRegisterForm;

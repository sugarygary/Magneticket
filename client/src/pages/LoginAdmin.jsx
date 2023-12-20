import React, { useEffect, useState } from "react";
import logo1 from "../assets/logo1.png";
export const LoginAdmin = ({ setLoggedAdmin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  function submitForm(e) {
    e.preventDefault();
    if (
      username != process.env.ADMIN_USERNAME ||
      password != process.env.ADMIN_PASSWORD
    ) {
      setErrorMsg("Username atau password salah!");
      return;
    }
    setLoggedAdmin(true);
  }
  useEffect(() => {
    setErrorMsg(null);
  }, [username, password]);

  return (
    <div className="w-full flex justify-center text-white mt-24 my-12">
      <div className="biruTua p-12 rounded w-5/12 mx-auto ">
        <div className="justify-center">
          <img src={logo1} alt="" className="w-48 mx-auto" />
          <p className="font-magneticket text-center text-4xl">MAGNETICKET</p>
        </div>
        <form onSubmit={submitForm} className="mt-2">
          <div className="mb-3 text-left">
            <p>Username</p>
            <input
              type="text"
              className="abuInput w-full rounded p-1 pl-2"
              placeholder="Enter your username"
              onChange={(e) => {
                setUsername(e.target.value);
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
          <div className="mb-3 text-left mt-5">
            <button className="biruMuda w-full rounded p-1 pl-2">Masuk</button>
          </div>
        </form>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import logo1 from "../assets/logo1.png";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { Link, useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { loginUser } from "../handlers/LoginHandler";

const PendingEmailForm = ({ email }) => {
  return (
    <div className=" w-screen h-full flex justify-center text-white my-5">
      <div className="biruTua p-12 rounded  w-1/2 mx-auto ">
        <div className="justify-center">
          <img src={logo1} alt="" className="w-96 mx-auto" />
          <p className="font-magneticket text-center text-7xl">MAGNETICKET</p>
        </div>
        <p className="text-center mt-4">
          Kami telah mengirimkan link verifikasi email. Silakan cek kotak masuk
          dan klik link yang disertakan. Email telah dikirim ke : <br />
          <div className="font-bold">{email}</div>
        </p>
      </div>
    </div>
  );
};

export default PendingEmailForm;

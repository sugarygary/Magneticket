import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import upload from "../assets/upload.png";
import { createCabang } from "../handlers/CineplexHandler";
import logo1 from "../assets/logo1.png"

const CineplexCreateCabang = () => {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(null);
    const [namaCabang, setNamaCabang] = useState(null);
    const [kotaKabupaten, setKotaKabupaten] = useState(null);
    const [alamat, setAlamat] = useState(null);


    async function submitForm(e) {
        e.preventDefault();
        setErrorMsg(null);
        if (namaCabang == null || kotaKabupaten == null || alamat == null) {
            setErrorMsg("All field must be filled");
            return;
        }
        let data = {
            branch_name: namaCabang,
            city: kotaKabupaten,
            address: alamat,
        };
        // console.log(data);
        createCabang(data);
        navigate(0);
    }
    return (
        <>
            <h1>Ini halaman create cabang</h1>
            <div className=" w-screen h-full flex justify-center items-center text-white my-10">
                <div className="biruTua p-12 text-center rounded  w-1/2 mx-auto ">
                    <form action="" className="mt-5" onSubmit={submitForm}>
                        <div className="mb-3 text-left">
                            <p>Nama Cabang</p>
                            <input type="text" className="abuInput w-full rounded p-1 pl-2" placeholder="Masukkan Nama Cabang" onChange={(e) => {
                                setNamaCabang(e.target.value);
                            }} />
                        </div>
                        <div className="mb-3 text-left">
                            <p>Kota/Kabupaten</p>
                            {/* <input type="text" className="abuInput w-full rounded p-1 pl-2" placeholder="Enter your email" /> */}
                            <input type="text" name="" id="" placeholder="Masukkan Kota/Kabupaten" className="w-full abuBgInput text-gray-500" onChange={(e) => {
                                setKotaKabupaten(e.target.value);
                            }} />
                        </div>
                        <div className="mb-3 text-left">
                            <p>Alamat</p>
                            <input type="text" className="abuInput w-full rounded p-1 pl-2" placeholder="Masukkan Alamat" onChange={(e) => {
                                setAlamat(e.target.value);
                            }} />
                        </div>
                        {errorMsg && <span className="text-red-500">{errorMsg}</span>}
                        <div className="mb-3 text-left mt-5">
                            <button className="biruMuda w-full rounded p-1 pl-2">
                                Tambah
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CineplexCreateCabang
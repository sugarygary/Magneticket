import moment from "moment-timezone"
import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"

const DetailPesanan = (props) => {
    console.log(props)
    return (
        <div className="my-5 rounded  shadow-lg p-10 bgCardHistory border border-black">
            <div className="flex items-center justify-between">
                <p className="font-bold text-2xl">Ringkasan Pemesanan</p>
                <span className="float-right">Nomor Pemesanan: {props._id}</span>
            </div>
            <div className="w-full mt-6 flex ">
                <div>
                    <img src={props.movie_img} alt="" className="w-48 rounded" />
                    <p className="text-left text-xl font-bold underline underline-offset-4">Detail Transaksi</p>
                </div>
                <div className="p-5 flex w-full justify-between ">
                    <div>
                        <p className="text-lg font-bold mb-5">{props.movie_title}</p>
                        <table>
                            <tr>
                                <td>Bioskop</td>
                                <td> : </td>
                                <td>{props.branch_name}</td>
                            </tr>

                            <tr>
                                <td>Tiket</td>
                                <td> : </td>
                                <td>{props.seats.length} Tiket</td>
                            </tr>
                            <tr>
                                <td>Tempat Duduk</td>
                                <td> : </td>
                                <td>{props.seats.join(", ")}</td>
                            </tr>
                            <tr>
                                <td>Studio</td>
                                <td> : </td>
                                <td>{props.studio_name}</td>
                            </tr>
                            <tr>
                                <td>Hari/Tanggal</td>
                                <td> : </td>
                                <td><p className="font-bold">Hari/Tanggal : {moment(props.createdAt)
                                    .tz("Asia/Jakarta")
                                    .format("dddd, DD-MM-YYYY")}
                                </p>
                                </td>
                            </tr>
                            <tr>
                                <td>Waktu</td>
                                <td> : </td>
                                <td>
                                    <p className="font-bold">Waktu : {moment(props.createdAt)
                                        .tz("Asia/Jakarta")
                                        .format("HH:mm")}
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="bg-white rounded-2xl p-2 h-fit border border-[3px] border-black">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${props._id}&amp;size=100x100`} alt="" title="" className="w-48" />
                    </div>
                </div>

            </div>
            <div className="flex justify-between">
                <div className="">
                    <p>2D Regular</p>
                    <p>Biaya Layanan</p>
                </div>
                <div>
                    <p>Rp. 30.000 <span className="abu9CA3AF">x2</span></p>
                    <p>Rp. 4.000 <span className="abu9CA3AF">x2</span></p>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="w-3/4 bg-red-500">

                </div>
            </div>
            <hr className="bg-black h-[0.2rem] text-black rounded-full mt-2" />
            <div className="justify-between flex mt-5">
                <div>

                </div>
                <p className="font-bold">Total Tagihan : {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(props.amounts_paid)}</p>
            </div>
        </div>

    )
}

export default DetailPesanan
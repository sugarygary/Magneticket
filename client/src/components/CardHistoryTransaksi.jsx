import moment from "moment-timezone"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const CardHistoryTransaksi = (props) => {
    return (
        <div className="my-5 mx-12 rounded flex shadow-lg p-10 bgCardHistory border border-black">
            <img src={props.movie_img} alt="" className="w-48 rounded" />
            <div className="text-black  ml-5 w-full">
                <p className={`font-bold text-lg text-right ${props.status === 'PENDING' ? 'text-yellow-500' : props.status === 'FAILED' ? 'text-red-500' : 'text-green-700'} text-xl font-bold`}>
                    {props.status}
                </p>
                <p>{props._id}</p>
                <p className="font-bold">Film : {props.movie_title}</p>
                <p className="font-bold">Bioskop : {props.branch_name}</p>
                <p className="font-bold">Tiket : {props.seats.length}</p>
                <p className="font-bold">Hari/Tanggal : {moment(props.createdAt)
                                                        .tz("Asia/Jakarta")
                                                        .format("dddd, DD-MM-YYYY")}
                </p>
                <p className="font-bold">Waktu : {moment(props.createdAt)
                                                .tz("Asia/Jakarta")
                                                .format("HH:mm")}
                </p>
                <Link className="px-5 py-1 rounded biruDetail text-white float-right mt-10" to={`/user/history/${props._id}`}> Detail</Link>
            </div>

        </div>

    )
}

export default CardHistoryTransaksi
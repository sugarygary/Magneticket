import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CineplexHistoryTiket = () => {

    const data = useLoaderData();
    const navigate = useNavigate();
    if(data.response&&data.response.status == 401){
        throw new Response('', { status: 401 })
    }
    console.log(data.movieTickets)
    const [movieTickets, setMovieTickets] = useState(data.movieTickets)
    const toDetail = (id) => {
        navigate(`/cineplex/history/${id}`)
    }

    return (
        <div className="p-4">
            <table className="min-w-full text-white table-auto">
                <thead>
                    <tr className="bg-gray-200 text-left bg-gray-700">
                        <th className="py-2 px-4">Customer</th>
                        <th className="py-2 px-4">Cabang</th>
                        <th className="py-2 px-4">ID Jadwal</th>
                        <th className="py-2 px-4">Date & Time</th>
                        <th className="py-2 px-4">Qty</th>
                        <th className="py-2 px-4">Amount</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody className='biruTua'>
                    {movieTickets&&movieTickets.map((sale) => (
                        <tr key={sale._id}>
                            <td className="border-t border-b py-2 px-4">{sale.customer.full_name}</td>
                            <td className="border-t border-b py-2 px-4">{sale.screening.branch.branch_name}</td>
                            <td className="border-t border-b py-2 px-4">{sale.screening._id}</td>
                            <td className="border-t border-b py-2 px-4">{sale.createdAt.substring(0,10)}</td>
                            <td className="border-t border-b py-2 px-4">{sale.seats.length}</td>
                            <td className="border-t border-b py-2 px-4">{sale.transaction.amounts_paid}</td>
                            <td className="border-t border-b py-2 px-4">{sale.claimed==true?"CLAIMED":"UNCLAIMED"}</td>
                            <td className="border-t border-b py-2 px-4"><button className='biruCariTiket p-2 text-white rounded' onClick={()=>toDetail(sale._id)}>Detail</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CineplexHistoryTiket
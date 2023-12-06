import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CineplexTiketDetail from '../components/CineplexTiketDetail'


const AdminDetailHistoryTransaksi = () => {
    const data = useLoaderData();
    const navigate = useNavigate();
    if (data.response && data.response.status == 401) {
        throw new Response('', { status: 401 })
    }
    console.log("ini datanya", data)
    return (
        <div className='px-10 py-5'>
            <CineplexTiketDetail {...data.MovieTickets}></CineplexTiketDetail>
        </div>
    )
}

export default AdminDetailHistoryTransaksi
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CineplexTiketDetail from '../components/CineplexTiketDetail'

const CineplexDetailHistoryTiket = () => {
    const data = useLoaderData();
    const navigate = useNavigate();
    if (data.response && data.response.status == 401) {
        throw new Response('', { status: 401 })
    }
    console.log("ini datanya",data.movieTicket)
    return (
        <div className='px-2 sm:px-10 py-5'>
            
            <CineplexTiketDetail {...data.movieTicket}></CineplexTiketDetail>
        </div>
    )
}

export default CineplexDetailHistoryTiket
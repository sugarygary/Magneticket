import React from 'react'

import openheimer from "../assets/openheimer.jpg";
const CardDetailEvent = (props) => {
    return (
        <div className="my-5 rounded flex shadow-lg">
            <img src={openheimer} alt="" className="w-64 rounded" />
            <div className="text-black pt-3 ml-5">
                <p className="font-bold text-lg">{props.event_name}</p>
                <p>Description</p>
                <p>{props.event_description}</p>
                <div className="flex mb-1">
                    <p className="abu9CA3AF">Venue: </p>
                    <div className="biruTuaText">
                        {props.venue}
                    </div>
                </div>
                <div className="flex">
                    <p className="abu9CA3AF">Tanggal : </p>
                    <p className="biruTuaText">
                        {props.showtime.substring(0, 10)}
                    </p>
                </div>
                <div className="flex">
                    <p className="abu9CA3AF">Sale End Date : </p>
                    <p className="biruTuaText">
                        {props.sale_end_date.substring(0, 10)}
                    </p>
                </div>
                <button className='biruTua rounded-full text-white p-2 mt-2'>
                    beli tiket
                </button>
            </div>
        </div>
    );
}

export default CardDetailEvent
import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import openheimer from "../assets/openheimer.jpg"
const CardTicketByMovie = (props) => {
    return (
        <div className="my-5 rounded flex shadow-lg">
            <img src={openheimer} alt="" className="w-64 rounded" />
            <div className="text-black pt-3 ml-5">
                <p className="font-bold text-lg">OPPENHEIMER</p>
                {/* <p className="abu9CA3AF">2D IMAX</p> */}
                <p>Sinopsis</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio eveniet, laudantium ad ratione velit est, dolorem, neque saepe odio delectus animi tenetur temporibus accusantium illum ex possimus eos. Quaerat atque esse consequuntur modi cumque recusandae tempora culpa. Facere accusamus consequuntur dolore officia debitis optio. Reprehenderit excepturi autem modi nulla iste.</p>
                <div className="flex mb-1">
                    <p className="abu9CA3AF">Rating Usia : </p>
                    <div className="ml-3 px-5 p-1 biruTua rounded">
                        <p className="text-white">R-17</p>
                    </div>

                </div>
                <div className="flex">
                    <p className="abu9CA3AF">Durasi : </p>
                    <p className="biruTuaText ml-12">1 Jam 58 menit</p>
                </div>


            </div>

        </div>

    )
}

export default CardTicketByMovie
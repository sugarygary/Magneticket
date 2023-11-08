import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
// import openheimer from "../assets/openheimer.jpg"
import openheimer from "../assets/openheimer.jpg"
const CardInfoFilm = (props) => {
    return (
        <div className="my-12 h-full flex ml-12 mr-12">
             <div>
                <img src={openheimer} alt="" className="w- rounded" />
                <p className="text-left text-md mt-2">Sutradara: Christopher Nolan</p>
                <p className="text-left text-md">Rating Sensor: 13+</p>
                <p className="text-left text-md">Genre: Action</p>
                <p className="text-left text-md">Durasi: 120 Minutes</p>
                <div className="flex">
                    <p className="text-left text-xl">⭐⭐⭐⭐⭐</p>
                    <div className="bg-[#E1EFFE] px-3 mt-1 rounded-xl text-[#1E429F] font-bold ml-4">5.0</div>
                </div>
            </div>
            <div className="ml-24 mr-12">
               <div>
                    <p className="font-extrabold text-4xl">OPPENHEIMER</p>
                    <p className="font-extrabold text-3xl mt-3 mb-4">Sinposis</p>
                    <p className="border-t-2 border-[#3282B8]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur odio doloribus labore aliquam dolorem enim perspiciatis ratione in cumque earum quae, facere debitis dolore laudantium harum voluptates tempore eaque doloremque pariatur mollitia saepe, expedita sunt ut deleniti. Aliquam voluptatem consequuntur a sequi dolorum hic iste facilis maiores optio expedita voluptatum magni omnis facere eos amet ullam, natus cupiditate? Temporibus tempora ullam earum! Perferendis sapiente iure cum eos voluptate reprehenderit harum et dolorum porro deleniti facere nisi voluptatem rerum, quam vero eum maxime, at temporibus aliquam suscipit aut nemo modi? In hic, provident ad natus dicta doloremque ipsum nemo veritatis quia laudantium incidunt delectus. Eos exercitationem similique, ipsum sit sint accusantium voluptate magni a est, quis expedita ex, eligendi nostrum beatae dolore rem eum placeat illo officia totam suscipit fugit. Reprehenderit atque nihil sint ea adipisci totam odit sapiente ipsa deserunt, distinctio, ex doloremque placeat rerum quidem! Aliquid veritatis porro omnis amet inventore ea dolorum, sequi ex, ipsa quaerat ullam. Eius quis ab molestias quam soluta esse, dolore, mollitia veniam quos illum tenetur fugiat nisi error a necessitatibus quibusdam sequi autem nostrum, ipsam rem. Laboriosam corporis tempore accusamus ad asperiores sunt itaque quas, ex totam unde perferendis vitae minima dolorum beatae.</p>
               </div>
                <div>
                    <p className="font-extrabold text-3xl mt-8 mb-4">Cast</p>
                </div>
                <div className="flex justify-between">
                    <div></div>
                    <button className="px-5 py-2 rounded-full bg-[#3282B8] text-white">Beli Tiket</button>
                </div>
            </div>
        </div>

    )
}

export default CardInfoFilm
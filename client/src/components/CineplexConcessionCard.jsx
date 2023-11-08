import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"
import openheimer from "../assets/openheimer.jpg"
import popcorn from "../assets/popcorn.jpg"
const CineplexConcessionCard = (props) => {
    return (
        <div className="my-5 rounded flex shadow-lg px-10">
            <img src={popcorn} alt="" className="w-64 rounded" />
            <div className="text-black pt-3 ml-5">
                <p className="font-bold text-lg">POPCORN SMALL</p>
                {/* <p className="abu9CA3AF">2D IMAX</p> */}
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio eveniet, laudantium ad ratione velit est, dolorem, neque saepe odio delectus animi tenetur temporibus accusantium illum ex possimus eos. Quaerat atque esse consequuntur modi cumque recusandae tempora culpa. Facere accusamus consequuntur dolore officia debitis optio. Reprehenderit excepturi autem modi nulla iste.</p>
                <div className="flex  mt-2">
                    <p className="abu9CA3AF">Harga : </p>
                    <p className="biruTuaText ml-12 mt-">Rp. 30.000</p>
                </div>
                <div className="flex justify-between mt-12 p-5">
                    <div>
                    </div>
                    <div>
                        <button className="px-5 py-2 rounded-md biruCariTiket text-white">Edit Menu</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CineplexConcessionCard
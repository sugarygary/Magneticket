import React from "react";
import { useNavigate } from "react-router-dom";
import openheimer from "../assets/openheimer.jpg";

const CardDetailEvent = (props) => {
  console.log(props);
  const navigate = useNavigate();
  const keCheckout = () => {
    navigate(`/user/event/${props._id}/checkout`);
  };
  return (
    <div className="my-5 rounded flex flex-col sm:flex-row shadow-lg">
      <img
        src={`${process.env.BACKEND_URL}/promotor/eventposter-${props._id}.jpg`}
        alt=""
        className="w-full sm:w-48 h-auto"
      />
      <div className="text-black pt-3 ml-5">
        <p className="font-bold text-lg">{props.event_name}</p>
        <p>Description</p>
        <p>{props.event_description}</p>
        <div className="flex mb-1">
          <p className="abu9CA3AF">Venue: </p>
          <div className="biruTuaText">{props.venue}</div>
        </div>
        <div className="flex">
          <p className="abu9CA3AF">Tanggal : </p>
          <p className="biruTuaText">{props.showtime.substring(0, 10)}</p>
        </div>
        <div className="flex">
          <p className="abu9CA3AF">Sale End Date : </p>
          <p className="biruTuaText">{props.sale_end_date.substring(0, 10)}</p>
        </div>
        <button
          className="biruTua rounded-full text-white p-2 mt-6 mb-4"
          onClick={keCheckout}
        >
          beli tiket
        </button>
      </div>
    </div>
  );
};

export default CardDetailEvent;

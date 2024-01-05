import { useState, useEffect } from "react";
const CardKategoriTiketEvent = (props) => {
    console.log(props)
  return (
    <div className="biruTua my-5 w-full text-center mr-8 rounded">
      <div className="flex">
            <input type="text" id="namaKategori" className="w-4/12 px-2 py-2 abuInput outline-none mr-2 rounded" value={props.kategoriTiket} placeholder="Nama Kategori" onChange={((e)=>{props.handleKategoriTicket(e.target.value)})}/>
            <input type="number" id="hargaTiket" className="w-4/12 px-2 py-2 abuInput outline-none mr-2 rounded" value={props.hargaTiket} placeholder="Harga Tiket" onChange={((e)=>{props.handleHargaTicket(e.target.value)})}/>
            <input type="number" id="slotTiket" className="w-4/12 px-2 py-2 abuInput outline-none rounded" value={props.slotTiket} placeholder="Selot" onChange={((e)=>{props.handleSlotTicket(e.target.value)})}/>
      </div>
    </div>
  );
};

export default CardKategoriTiketEvent;

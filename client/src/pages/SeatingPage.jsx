import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function SeatingPage() {
  const navigate = useNavigate();
  const data = useLoaderData();
  console.log(data);
  //   console.log(data.currUser);
  console.log(data.response);
  const [seatingConfig, setSeatingConfig] = useState("");
  let petaKursi;
  let konfigurasi = [];
  console.log(data.response.data.seating_layout);
  
  for (let i = 0; i < data.response.row; i++) {
    konfigurasi = seatingConfig.split("-");
    console.log(konfigurasi);
    for (let j = 0; j < array.length; j++) {
      const element = array[j];
    }
  }

  useEffect(() => {
    // Code to run after component renders
    if (data.currUser == undefined) {
      navigate("/user/login");
      // alert("aaa");
    } else {
      if (data.currUser.data.role !== "USER") {
        alert(data.role);
      }
    }
    setSeatingConfig(data.response.seating_layout);
  }, [data.currUser]);
  return (
    <>
      <div className="biruTua"></div>
    </>
  );
}

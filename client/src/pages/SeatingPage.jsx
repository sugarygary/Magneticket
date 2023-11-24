import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function SeatingPage() {
  const navigate = useNavigate();
  const data = useLoaderData();
  console.log(data);
  //   console.log(data.currUser);
  console.log(data.response);
  const [seatingConfig, setSeatingConfig] = useState("");
  // let petaKursi;
  // let konfigurasi = [];
  // console.log(data.response.data.seating_layout);

  // for (let i = 0; i < data.response.row; i++) {
  //   konfigurasi = seatingConfig.split("-");
  //   console.log(konfigurasi);
  //   for (let j = 0; j < array.length; j++) {
  //     const element = array[j];
  //   }
  // }

  useEffect(() => {
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
      <div className="w-full justify-center px-10 py-10">
        <div className="max-w-full w-full overflow-x-auto biruTua text-white rounded-lg">
          <div className="gap-12 mb-4 flex justify-between flex-nowrap w-full py-4">
            <div className="flex gap-3 px-2 justify-center"></div>
            <div className="flex gap-3 justify-center">
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
            </div>
            <div className="flex gap-3 justify-center">
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
            </div>
            <div className="flex gap-3 justify-center">
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
            </div>
            <div className="flex gap-3 justify-center">
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
            </div>
            <div className="flex gap-3 justify-center">
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
            </div>
            <div className="flex gap-3 justify-center">
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
            </div>
            <div className="flex gap-3 justify-center">
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
              <div className="bg-blue-500 py-1 px-2">k</div>
            </div>

            <div className="flex gap-3 px-2 justify-center"></div>
          </div>
        </div>
        <div className="bg-gray-500 text-center p-2 w-full">LAYAR</div>
      </div>
    </>
  );
}

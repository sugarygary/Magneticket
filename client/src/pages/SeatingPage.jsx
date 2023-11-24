import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function SeatingPage() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const [seatingConfig, setSeatingConfig] = useState("");
  const [chooseSeat, setChooseSeat] = useState([]);
  function toggleChooseSeat({ _id, seat_number }) {
    // console.log(chooseSeat);
    // console.log("masuk");
    let temp = Array.from(chooseSeat);
    console.log(chooseSeat + "contains" + _id);
    let idx = temp.findIndex((seat) => seat._id == _id);

    // console.log(idx);
    if (idx == -1) {
      temp.push({ _id: _id, seat_number: seat_number });
      console.log(temp);
      setChooseSeat(temp);
      return;
    }
    temp.splice(idx, 1);
    console.log(temp);
    setChooseSeat(temp);
  }
  let columns = data.response.data.seating_layout
    .split("-")
    .map(function (item) {
      return parseInt(item, 10);
    });
  let row = data.response.data.row;
  let totalColumn = columns.reduce((total, col) => {
    return total + col;
  });
  useEffect(() => {
    if (data.currUser == undefined) {
      navigate("/user/login");
    } else {
      if (data.currUser.data.role !== "USER") {
        alert(data.role);
      }
    }
  }, [data.currUser]);
  return (
    <>
      <div className="w-full justify-center px-10 py-10">
        <div className="font-bold mb-1 text-xl">
          {data.response.data.branch_name}
        </div>
        <div className="font-bold mb-1">{data.response.data.movie_title}</div>
        <div className="mb-4">{data.response.data.showtime}</div>
        <div className="max-w-full w-full overflow-x-auto biruTua text-white rounded-t pt-4">
          {[...Array(row)].map((row, i) => {
            let pointer = 0;
            return (
              <div className="gap-12 mb-4 flex justify-between flex-nowrap w-full">
                <div className="flex gap-2 px-2 justify-center"></div>
                {columns.map((col_group, j) => {
                  return (
                    <div className="flex gap-2 justify-center">
                      {[...Array(col_group)].map((col, k) => {
                        let seatPtr =
                          data.response.data.seats[pointer++ + totalColumn * i];
                        if (seatPtr.taken) {
                          return (
                            <div
                              title={seatPtr.seat_number}
                              className="bg-red-500 w-4 h-4 rounded-sm"
                            ></div>
                          );
                        }
                        if (
                          chooseSeat.some((seat) => seat._id == seatPtr._id)
                        ) {
                          return (
                            <div
                              title={seatPtr.seat_number}
                              onClick={() => {
                                toggleChooseSeat({
                                  _id: seatPtr._id,
                                  seat_number: seatPtr.seat_number,
                                });
                              }}
                              className="bg-yellow-500 w-4 h-4 rounded-sm cursor-pointer"
                            ></div>
                          );
                        }
                        return (
                          <div
                            title={seatPtr.seat_number}
                            onClick={() => {
                              toggleChooseSeat({
                                _id: seatPtr._id,
                                seat_number: seatPtr.seat_number,
                              });
                            }}
                            className="bg-blue-500 w-4 h-4 rounded-sm cursor-pointer"
                          ></div>
                        );
                      })}
                    </div>
                  );
                })}
                <div className="flex gap-2 px-2 justify-center"></div>
              </div>
            );
          })}
        </div>
        <div className="bg-gray-600 text-[#f8f8f8] rounded-b text-center p-2 w-full">
          LAYAR
        </div>
      </div>
    </>
  );
}

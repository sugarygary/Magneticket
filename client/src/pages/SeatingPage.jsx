import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function SeatingPage() {
  const navigate = useNavigate();
  const data = useLoaderData();
  useEffect(() => {
    if (!data.screening_data) {
      navigate("/user/login");
    }
    if (!data.current_user) {
      navigate("/user/login");
    }
  }, []);
  const [chooseSeat, setChooseSeat] = useState([]);
  function toggleChooseSeat({ _id, seat_number }) {
    let temp = Array.from(chooseSeat);
    let idx = temp.findIndex((seat) => seat._id == _id);
    if (idx == -1) {
      temp.push({ _id: _id, seat_number: seat_number });
      temp.sort((a, b) => {
        if (a.seat_number < b.seat_number) {
          return -1;
        }
        if (a.seat_number > b.seat_number) {
          return 1;
        }
        return 0;
      });
      setChooseSeat(temp);
      return;
    }
    temp.splice(idx, 1);
    console.log(temp);
    setChooseSeat(temp);
  }
  if (data.current_user == undefined) {
    return;
  } else {
    if (data.current_user.role !== "USER") {
      return;
    }
  }
  if (data.screening_data == undefined) {
    return;
  }
  let columns = data?.screening_data.seating_layout
    .split("-")
    .map(function (item) {
      return parseInt(item, 10);
    });
  let row = data?.screening_data.row;
  let totalColumn = columns.reduce((total, col) => {
    return total + col;
  });
  return (
    <>
      <div className="w-full justify-center px-10 py-10">
        <div className="font-bold mb-1 text-xl">
          {data.screening_data.branch_name}
        </div>
        <div className="font-bold mb-1">{data.screening_data.movie_title}</div>
        <div className="mb-4">
          {moment(data.screening_data.showtime)
            .tz("Asia/Jakarta")
            .format("DD MMMM YYYY | HH:mm")}
        </div>
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
                          data.screening_data.seats[
                            pointer++ + totalColumn * i
                          ];
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
        <div className="mt-4 font-bold">
          {chooseSeat.length} Tiket{" "}
          {chooseSeat.length > 0 &&
            "(" +
              chooseSeat.reduce((accumulator, seat, index) => {
                if (index == 0) {
                  console.log(seat);
                  return accumulator + seat.seat_number;
                } else {
                  return accumulator + ", " + seat.seat_number;
                }
              }, "") +
              ")"}
        </div>
        <div className="font-bold">
          Total :{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(data.screening_data.price * chooseSeat.length)}
        </div>
      </div>
    </>
  );
}

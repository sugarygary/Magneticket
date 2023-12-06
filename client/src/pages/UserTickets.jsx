import React, { useEffect, useState } from "react";
import CardViewTicket from "../components/CardViewTicket";
import { useLoaderData, useNavigate } from "react-router-dom";
import client from "../util/client";
import { useSelector } from "react-redux";

export const UserTickets = () => {
  const { tickets } = useLoaderData();
  const [zoomPointer, setZoomPointer] = useState(null);
  const { current_user, status } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      (current_user.userId == null || current_user.role != "USER") &&
      status == "succeeded"
    ) {
      navigate("/user/login", { replace: true });
    }
  }, []);
  if (
    (current_user.userId == null || current_user.role != "USER") &&
    status == "succeeded"
  ) {
    navigate("/user/login", { replace: true });
  }
  return (
    <div className="mt-24 px-10">
      {zoomPointer != null && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-screen bg-black z-40 opacity-50"
            onClick={() => {
              setZoomPointer(null);
            }}
          ></div>{" "}
          <div className="fixed top-1/2 left-1/2 transform z-[50] rounded-lg -translate-x-1/2 -translate-y-1/2 shadow-2xl bg-[#f8f8f8] w-4/12 h-fit px-4 py-4">
            <div className="flex justify-between items-center font-bold">
              <div></div>
              <div
                className="cursor-pointer hover:shadow p-1 bg-red-500 rounded text-white"
                onClick={() => {
                  setZoomPointer(null);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <img
              draggable="false"
              src={zoomPointer}
              className="mx-auto mt-4 mb-4 w-96"
            ></img>
          </div>
        </>
      )}
      <div className="font-bold text-xl">Tiket Aktif</div>
      {tickets.map((ticket) => (
        <CardViewTicket
          {...ticket}
          setZoomPointer={() =>
            setZoomPointer(
              `https://api.qrserver.com/v1/create-qr-code/?data=${ticket._id}&amp;size=100x100`
            )
          }
        ></CardViewTicket>
      ))}
    </div>
  );
};
export const loadTickets = async () => {
  let tickets;
  try {
    tickets = await client.get("api/user/tickets");
  } catch (error) {
    if (error.response) {
      if (error.response.status == 404) {
        throw new Response("Not found", { status: 404 });
      }
    } else if (error.request) {
      throw new Response("Internal Server Error", { status: 500 });
    }
    return error;
  }

  return { tickets: tickets.data };
};

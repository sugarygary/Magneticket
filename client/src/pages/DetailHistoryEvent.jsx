import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardHistoryTransaksi from "../components/CardHistoryTransaksi";
import DetailPesanan from "../components/DetailPesanan";
import client from "../util/client";
import DetailPesananEvent from "../components/DetailPesananEvent";

function DetailHistoryEvent() {
  const data = useLoaderData();
  console.log(data);
  const navigate = useNavigate();
  const { current_user, status } = useSelector((state) => state.user);
  console.log(data);
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
    <div className="py-10 text-black px-10">
      <DetailPesananEvent {...data}></DetailPesananEvent>
    </div>
  );
}

export const loadDetailHistoryEvent = async (data) => {
  try {
    const responseHistory = await client.get(
      `api/user/history/event/${data.params.history_id}`
    );
    return responseHistory.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status == 403) {
        throw new Response("Forbidden", { status: 403 });
      }
      if (error.response.status == 404) {
        throw new Response("Not found", { status: 404 });
      }
    } else if (error.request) {
      throw new Response("Internal Server Error", { status: 500 });
    }
    return error;
  }
};
export default DetailHistoryEvent;

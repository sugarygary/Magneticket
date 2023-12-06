import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardHistoryTransaksi from "../components/CardHistoryTransaksi";
import DetailPesanan from "../components/DetailPesanan";

function DetailHistory() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { current_user, status } = useSelector((state) => state.user);
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
      <DetailPesanan {...data}></DetailPesanan>
    </div>
  );
}

export default DetailHistory;

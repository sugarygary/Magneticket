import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardHistoryTransaksi from "../components/CardHistoryTransaksi";
import CardHistoryTransaksiEvent from "../components/CardHistoryTransaksiEvent";

function HistoryPage() {
  const data = useLoaderData();
  console.log(data);
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
    return;
  }
  return (
    status == "succeeded" && (
      <div className="py-10 px-10 text-black">
        <div className="text-xl font-bold mb-2">Riwayat Transaksi</div>
        {data.map((history, index) => {
          if (history.history_type == "MOVIE") {
            return (
              <CardHistoryTransaksi
                key={index}
                {...history}
              ></CardHistoryTransaksi>
            );
          } else {
            return (
              <CardHistoryTransaksiEvent
                key={index}
                {...history}
              ></CardHistoryTransaksiEvent>
            );
          }
        })}
      </div>
    )
  );
}

export default HistoryPage;

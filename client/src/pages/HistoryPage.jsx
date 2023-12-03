import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardHistoryTransaksi from "../components/CardHistoryTransaksi";

function HistoryPage() {
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
    return;
  }
  return (
    status == "succeeded" && (
      <div className="py-10 text-black">
        {data.map((history, index) => {
          return (
            <CardHistoryTransaksi
              key={index}
              {...history}
            ></CardHistoryTransaksi>
          );
        })}
      </div>
    )
  );
}

export default HistoryPage;

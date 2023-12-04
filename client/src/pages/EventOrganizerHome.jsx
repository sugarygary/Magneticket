import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

const EventOrganizerHome = () => {
  const { current_user, status } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (current_user.userId == null || current_user.role != "PROMOTOR") &&
      status == "succeeded"
    ) {
      navigate("/", { replace: true });
    }
  }, []);
  if (
    (current_user.userId == null || current_user.role != "PROMOTOR") &&
    status == "succeeded"
  ) {
    navigate("/", { replace: true });
  }
  return (
    <div className="px-10 py-5">
       
    </div>
  );
}

export default EventOrganizerHome
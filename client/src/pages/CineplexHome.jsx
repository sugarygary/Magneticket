import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

const CineplexHome = () => {
  const { current_user, status } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (current_user.userId == null || current_user.role != "CINEPLEX") &&
      status == "succeeded"
    ) {
      navigate("/cineplex/login", { replace: true });
    }
  }, []);
  if (
    (current_user.userId == null || current_user.role != "CINEPLEX") &&
    status == "succeeded"
  ) {
    navigate("/cineplex/login", { replace: true });
  }

  return <div className="px-10 py-5"></div>;
};

export default CineplexHome;

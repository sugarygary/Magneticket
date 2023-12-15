import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { fetchCurrentUser } from "../redux/userSlice";

export const Redirector = () => {
  const navigate = useNavigate();
  const { current_user, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
    if (current_user.userId == null && status == "succeeded") {
      navigate("/user/home", { replace: true });
    } else if (current_user.role == "CINEPLEX" && status == "succeeded") {
      navigate("/cineplex/home", { replace: true });
    } else if (current_user.role == "USER" && status == "succeeded") {
      navigate("/user/home", { replace: true });
    } else if (current_user.role == "PROMOTOR" && status == "succeeded") {
      navigate("/event-organizer/home", { replace: true });
    }
    // navigate("/user/home", { replace: true });
  }, []);
  if (current_user.userId == null && status == "succeeded") {
    return <Navigate to="/user/home" replace={true}></Navigate>;
  } else if (current_user.role == "CINEPLEX" && status == "succeeded") {
    return <Navigate to="/cineplex/home" replace={true}></Navigate>;
  } else if (current_user.role == "USER" && status == "succeeded") {
    return <Navigate to="/user/home" replace={true}></Navigate>;
  } else if (current_user.role == "PROMOTOR" && status == "succeeded") {
    return <Navigate to="/event-organizer/home" replace={true}></Navigate>;
  }
};

import { Link, useNavigate, useRouteError } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ErrorElement = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const { current_user, status } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center gap-y-4">
      {error.status == 401 && (
        <div className="text-xl font-semibold">
          You aren't authorized to see this
        </div>
      )}
      {error.status == 403 && (
        <div className="text-xl font-semibold">Forbidden</div>
      )}
      {error.status == 404 && (
        <div className="text-xl font-semibold">404 Page Not Found</div>
      )}
      {error.status == 500 && (
        <div className="text-xl font-semibold">Internal Server Error</div>
      )}
      {current_user.role == "USER" &&
        <Link to="/" className="text-blue-700">
          {error.message}
          Go back
        </Link>
      }
      {current_user.role == "CINEPLEX" &&
        <Link to="/cineplex/home" className="text-blue-700">
          {error.message}
          Go back
        </Link>
      }
      {current_user.role == "PROMOTOR" &&
        <Link to="/event-organizer/home" className="text-blue-700">
          {error.message}
          Go back
        </Link>
      }
    </div>
  );
};

export default ErrorElement;

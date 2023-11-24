import { Link, useNavigate, useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center gap-y-4">
      {error.status == 401 && (
        <div className="text-xl font-semibold">
          You aren't authorized to see this
        </div>
      )}
      {error.status == 403 && (
        <div className="text-xl font-semibold">Forbidden </div>
      )}
      {error.status == 404 && (
        <div className="text-xl font-semibold">404 Page Not Found</div>
      )}
      {error.status == 500 && (
        <div className="text-xl font-semibold">Internal Server Error</div>
      )}
      {console.log(error)}
      <Link to="/" className="text-blue-700">
        Go back
      </Link>
    </div>
  );
};

export default ErrorElement;

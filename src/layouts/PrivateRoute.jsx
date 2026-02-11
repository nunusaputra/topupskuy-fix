import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const uniqueCode = localStorage.getItem("unique-code");

  if (!uniqueCode) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
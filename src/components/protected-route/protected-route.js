import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRouteElement = ({ element }) => {
  const { authSuccess } = useSelector((state) => state.user);

  return authSuccess ? element : <Navigate to="/login" replace />;
};

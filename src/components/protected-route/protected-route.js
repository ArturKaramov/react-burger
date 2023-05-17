import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginUrl } from "../../utils/data";

export const ProtectedRouteElement = ({ element }) => {
  const auth = useSelector((state) => state.user.authSuccess);
  return auth ? element : <Navigate to={loginUrl} />;
};

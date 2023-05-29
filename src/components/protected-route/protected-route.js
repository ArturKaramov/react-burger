import { Navigate, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { baseUrl, loginUrl } from "../../utils/data";

export const ProtectedRouteElement = ({ element, anonymous = false }) => {
  const auth = useSelector((state) => state.user.authSuccess);

  const location = useLocation();
  const from = location.state ? location.state.from : baseUrl;

  if (anonymous && auth) {
    return <Navigate to={from} />;
  } else if (!anonymous && !auth) {
    return <Navigate to={loginUrl} state={{ from: location }} />;
  } else {
    return element;
  }
  /*return auth ? element : <Navigate to={loginUrl} />;*/
};

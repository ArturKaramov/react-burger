import { Navigate, useLocation } from "react-router-dom";
import { FC, ReactElement } from "react";
import { useSelector } from "../../services/hooks";
import { BASE_URL, LOGIN_URL } from "../../utils/data";

interface Props {
  element: ReactElement;
  anonymous?: boolean;
}

export const ProtectedRouteElement: FC<Props> = ({
  element,
  anonymous = false,
}) => {
  const auth = useSelector((state) => !!state.user.user.email);
  console.log(auth);

  const location = useLocation();
  const from = location.state?.from || BASE_URL;

  if (anonymous && auth) {
    return <Navigate to={from} />;
  } else if (!anonymous && !auth) {
    return <Navigate to={LOGIN_URL} state={{ from: location }} />;
  } else {
    return element;
  }
};

import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

export const ProtectedRouteElement = ({ element }) => {
  const auth = useSelector((state) => state.user.authSuccess);
  return auth ? element : <Navigate to="/react-burger/login" />;
};

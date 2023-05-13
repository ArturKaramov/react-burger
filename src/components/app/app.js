import React, { useEffect } from "react";
import appStyles from "./app.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux/es/exports.js";
import { getIngredients } from "../../services/actions/burger.js";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import { getCookie } from "../../utils/utils";
import {
  ConstructorPage,
  ForgotPage,
  LoginPage,
  RegisterPage,
  ResetPage,
  ProfilePage,
  IngridientPage,
  OrdersHistoryPage,
  ExitPage,
} from "../../pages";
import { getUserInfo, refreshToken } from "../../services/actions/user";

function App() {
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => state.burger
  );
  const details = useSelector((state) => !!state.burger.details.length);
  const { user, passSuccess, authSuccess } = useSelector((state) => state.user);
  const auth = useSelector((state) => state.user.authSuccess);

  const dispatch = useDispatch();

  const init = () => {
    console.log(!user.name.length);
    console.log(getCookie("token"));
    console.log(localStorage.getItem("refresh"));
    if (!user.name.length) {
      if (getCookie("token")) {
        console.log("token:", getCookie("token"));
        dispatch(getUserInfo());
      } else if (localStorage.getItem("refresh")) {
        console.log("refresh:", localStorage.getItem("refresh"));
        dispatch(refreshToken());
        console.log("refreshed");
        dispatch(getUserInfo());
      }
    }
  };
  useEffect(() => dispatch(getIngredients()), []);
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Router>
        {ingredientsRequest ? (
          <div className={appStyles.loading}>
            <Logo />
          </div>
        ) : ingredientsFailed ? (
          <div className={appStyles.error}>
            <span className="text text_type_main-large">
              Кажется, данные не найдены :&lang;
            </span>
          </div>
        ) : (
          <Routes>
            <Route path="/react-burger" element={<ConstructorPage />} />
            <Route
              path="/react-burger/login"
              element={
                authSuccess ? (
                  <Navigate to="/react-burger/profile" />
                ) : (
                  <LoginPage />
                )
              }
            />

            <Route
              path="/react-burger/register"
              element={
                authSuccess ? (
                  <Navigate to="/react-burger/profile" />
                ) : (
                  <RegisterPage />
                )
              }
            />
            <Route
              path="/react-burger/forgot-password"
              element={
                authSuccess ? (
                  <Navigate to="/react-burger/profile" />
                ) : (
                  <ForgotPage />
                )
              }
            />
            <Route
              path="/react-burger/reset-password"
              element={
                passSuccess ? (
                  <ResetPage />
                ) : (
                  <Navigate to="/react-burger/forgot-password" />
                )
              }
            />
            <Route
              path="/react-burger/profile"
              element={<ProtectedRouteElement element={<ProfilePage />} />}
            />
            <Route
              path="/react-burger/ingredients/:id"
              element={details ? <ConstructorPage /> : <IngridientPage />}
            />
            <Route
              path="/react-burger/profile/orders"
              element={<OrdersHistoryPage />}
            />
            <Route path="/react-burger/profile/exit" element={<ExitPage />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;

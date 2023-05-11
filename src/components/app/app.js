import React, { useEffect } from "react";
import appStyles from "./app.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux/es/exports.js";
import { getIngredients } from "../../services/actions/burger.js";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCookie } from "../../utils/utils";
import {
  ConstructorPage,
  ForgotPage,
  LoginPage,
  RegisterPage,
  ResetPage,
  ProfilePage,
} from "../../pages";
import { getUserInfo, refreshToken } from "../../services/actions/user";

function App() {
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => state.burger
  );

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => dispatch(getIngredients()), []);
  useEffect(() => {
    if (!user && getCookie("token")) {
      console.log("123");
    }
  }, []);

  return (
    <>
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
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ConstructorPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPage />} />
              <Route path="/reset-password" element={<ResetPage />} />
              <Route
                path="/profile"
                element={<ProtectedRouteElement element={<ProfilePage />} />}
              />
              <Route path="/ingredients/:id" element={<ConstructorPage />} />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;

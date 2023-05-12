import React, { useEffect } from "react";
import appStyles from "./app.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux/es/exports.js";
import { getIngredients } from "../../services/actions/burger.js";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  Outlet,
} from "react-router-dom";
import { Navigate } from "react-router";
import { getCookie } from "../../utils/utils";
import {
  ConstructorPage,
  ForgotPage,
  LoginPage,
  RegisterPage,
  ResetPage,
  ProfilePage,
  IngridientsPage,
  IngridientPage,
} from "../../pages";
import { getUserInfo, refreshToken } from "../../services/actions/user";

function App() {
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => state.burger
  );
  const details = useSelector((state) => state.burger.details.length);
  const { auth } = useSelector((state) => !!state.user.name);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => dispatch(getIngredients()), []);
  useEffect(() => {
    if (!auth && getCookie("token")) {
      console.log("123");
    }
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
                auth ? <Navigate to="/react-burger/profile" /> : <LoginPage />
              }
            />

            <Route path="/react-burger/register" element={<RegisterPage />} />
            <Route
              path="react-burger/forgot-password"
              element={<ForgotPage />}
            />
            <Route
              path="/react-burger/reset-password"
              element={<ResetPage />}
            />
            <Route
              path="/react-burger/profile"
              element={<ProtectedRouteElement element={<ProfilePage />} />}
            />
            <Route
              path="/react-burger/ingredients/:id"
              element={details ? <ConstructorPage /> : <IngridientPage />}
            />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;

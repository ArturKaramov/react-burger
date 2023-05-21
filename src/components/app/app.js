import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports.js";
import { getIngredients } from "../../services/actions/burger.js";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import { Routes, Route } from "react-router-dom";
import { Navigate, useLocation, useNavigate } from "react-router";
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
  ModalViewPage,
  FailPage,
  FeedPage,
} from "../../pages";
import {
  baseUrl,
  loginUrl,
  registerUrl,
  profileUrl,
  forgotUrl,
  resetUrl,
  ingredientUrl,
  orderHistoryUrl,
  exitUrl,
  feedUrl,
} from "../../utils/data.js";
import { getUserInfo, refreshToken } from "../../services/actions/user";

function App() {
  const { user, passSuccess, authSuccess } = useSelector((state) => state.user);
  const auth = useSelector((state) => state.user.authSuccess);

  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  const init = () => {
    if (!user.name.length) {
      if (getCookie("token")) {
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
      <Routes>
        <Route path={baseUrl} element={<ConstructorPage />}>
          {!!background && (
            <Route path={ingredientUrl + "/:id"} element={<ModalViewPage />} />
          )}
        </Route>
        <Route
          path={loginUrl}
          element={authSuccess ? <Navigate to={profileUrl} /> : <LoginPage />}
        />

        <Route
          path={registerUrl}
          element={
            authSuccess ? <Navigate to={profileUrl} /> : <RegisterPage />
          }
        />
        <Route
          path={forgotUrl}
          element={authSuccess ? <Navigate to={profileUrl} /> : <ForgotPage />}
        />
        <Route
          path={resetUrl}
          element={passSuccess ? <ResetPage /> : <Navigate to={loginUrl} />}
        />
        <Route
          path={profileUrl}
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />
        <Route path={feedUrl} element={<FeedPage />}>
          <Route path={feedUrl + "/:id"} element={<ModalViewPage />} />
        </Route>
        <Route
          path={orderHistoryUrl}
          element={<ProtectedRouteElement element={<OrdersHistoryPage />} />}
        >
          <Route path={orderHistoryUrl + "/:id"} element={<ModalViewPage />} />
        </Route>
        <Route
          path={exitUrl}
          element={<ProtectedRouteElement element={<ExitPage />} />}
        />
        {!background && (
          <Route path={ingredientUrl + "/:id"} element={<IngridientPage />} />
        )}
        <Route path="*" element={<FailPage />} />
      </Routes>
    </>
  );
}

export default App;

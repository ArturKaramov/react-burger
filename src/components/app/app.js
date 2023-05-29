import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports.js";
import { getIngredients } from "../../services/actions/burger.js";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import { Routes, Route } from "react-router-dom";
import { Navigate, useLocation } from "react-router";
import { getCookie } from "../../utils/utils";
import {
  ConstructorPage,
  ForgotPage,
  LoginPage,
  RegisterPage,
  ResetPage,
  ProfilePage,
  FullViewPage,
  OrdersHistoryPage,
  ExitPage,
  ModalViewPage,
  FailPage,
  FeedPage,
  OrderPage,
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
import { getUserInfo } from "../../services/actions/user";
import { WS_CONNECTION_START } from "../../services/actions/feed.js";
import { WS_USERFEED_CONNECTION_START } from "../../services/actions/userFeed.js";
import AppHeader from "../app-header/app-header.js";

function App() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state && location.state.from;

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
      <AppHeader />
      <Routes>
        <Route path={baseUrl} element={<ConstructorPage />}>
          {from && (
            <Route path={ingredientUrl + "/:id"} element={<ModalViewPage />} />
          )}
        </Route>
        <Route
          path={loginUrl}
          element={
            <ProtectedRouteElement element={<LoginPage />} anonymous="true" />
          }
        />

        <Route
          path={registerUrl}
          element={
            <ProtectedRouteElement
              element={<RegisterPage />}
              anonymous="true"
            />
          }
        />
        <Route
          path={forgotUrl}
          element={
            <ProtectedRouteElement element={<ForgotPage />} anonymous="true" />
          }
        />
        <Route
          path={resetUrl}
          element={
            <ProtectedRouteElement element={<ResetPage />} anonymous="true" />
          }
        />
        <Route
          path={profileUrl}
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />
        <Route path={feedUrl} element={<FeedPage />}>
          {from && (
            <Route path={feedUrl + "/:id"} element={<ModalViewPage />} />
          )}
        </Route>
        <Route
          path={orderHistoryUrl}
          element={<ProtectedRouteElement element={<OrdersHistoryPage />} />}
        >
          {from && (
            <Route
              path={orderHistoryUrl + "/:id"}
              element={<ProtectedRouteElement element={<ModalViewPage />} />}
            />
          )}
        </Route>
        <Route
          path={exitUrl}
          element={<ProtectedRouteElement element={<ExitPage />} />}
        />
        {!from && (
          <>
            <Route path={ingredientUrl + "/:id"} element={<FullViewPage />} />
            <Route path={feedUrl + "/:id"} element={<FullViewPage />} />
            <Route path={orderHistoryUrl + "/:id"} element={<FullViewPage />} />
          </>
        )}
        <Route path="*" element={<FailPage />} />
      </Routes>
    </>
  );
}

export default App;

import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { getIngredients } from '../../services/actions/burger';
import { ProtectedRouteElement } from '../protected-route/protected-route';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router';
import { getCookie } from '../../utils/utils';
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
  OrderViewPage,
  IngrViewPage,
  FailPage,
  FeedPage,
} from '../../pages';
import {
  BASE_URL,
  LOGIN_URL,
  REGISTER_URL,
  PROFILE_URL,
  FORGOT_URL,
  RESET_URL,
  INGREDIENTS_URL,
  USER_ORDERS_URL,
  EXIT_URL,
  FEED_URL,
} from '../../utils/data';
import { getUserInfo } from '../../services/actions/user';
import AppHeader from '../app-header/app-header';

const App: FC = () => {
  const { user } = useSelector((state) => state.user);

  const location = useLocation();
  const from = location?.state && location?.state.from;

  const init = () => {
    if (!user.name.length) {
      if (getCookie('token')) {
        dispatch(getUserInfo());
      }
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path={BASE_URL} element={<ConstructorPage />}>
          {from && <Route path={INGREDIENTS_URL + '/:id'} element={<IngrViewPage />} />}
        </Route>
        <Route
          path={LOGIN_URL}
          element={<ProtectedRouteElement element={<LoginPage />} anonymous={true} />}
        />

        <Route
          path={REGISTER_URL}
          element={<ProtectedRouteElement element={<RegisterPage />} anonymous={true} />}
        />
        <Route
          path={FORGOT_URL}
          element={<ProtectedRouteElement element={<ForgotPage />} anonymous={true} />}
        />
        <Route
          path={RESET_URL}
          element={<ProtectedRouteElement element={<ResetPage />} anonymous={true} />}
        />
        <Route path={PROFILE_URL} element={<ProtectedRouteElement element={<ProfilePage />} />} />
        <Route path={FEED_URL} element={<FeedPage />}>
          {from && <Route path={FEED_URL + '/:id'} element={<OrderViewPage />} />}
        </Route>
        <Route
          path={USER_ORDERS_URL}
          element={<ProtectedRouteElement element={<OrdersHistoryPage />} />}
        >
          {from && (
            <Route
              path={USER_ORDERS_URL + '/:id'}
              element={<ProtectedRouteElement element={<OrderViewPage />} />}
            />
          )}
        </Route>
        <Route path={EXIT_URL} element={<ProtectedRouteElement element={<ExitPage />} />} />
        {!from && (
          <>
            <Route path={INGREDIENTS_URL + '/:id'} element={<FullViewPage />} />
            <Route path={FEED_URL + '/:id'} element={<FullViewPage />} />
            <Route path={USER_ORDERS_URL + '/:id'} element={<FullViewPage />} />
          </>
        )}
        <Route path="*" element={<FailPage />} />
      </Routes>
    </>
  );
};

export default App;

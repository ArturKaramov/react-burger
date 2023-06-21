import styles from "./orders-history.module.css";
import { ProfileNavigation } from "../../components/profile-navigation/profile-navigation";
import { OrderFeed } from "../../components/order-feed/order-feed";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { getCookie } from "../../utils/utils";
import { useDispatch, useSelector } from "../../services/hooks";
import {
  wsUserCloseAction,
  wsUserStartAction,
} from "../../services/actions/userFeed";

export const OrdersHistoryPage = () => {
  const dispatch = useDispatch();
  const { authFailed } = useSelector((state) => state.user);
  useEffect(() => {
    if (getCookie("token") !== undefined) {
      dispatch(wsUserStartAction(getCookie("token").split("Bearer ")[1]));
    }
    return () => {
      dispatch(wsUserCloseAction());
    };
  }, [authFailed]);

  return (
    <>
      <main className={styles.main}>
        <ProfileNavigation />
        <OrderFeed />
      </main>
      <Outlet />
    </>
  );
};

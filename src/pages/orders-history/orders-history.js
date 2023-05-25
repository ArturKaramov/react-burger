import styles from "./orders-history.module.css";
import { ProfileNavigation } from "../../components/profile-navigation/profile-navigation";
import { OrderFeed } from "../../components/order-feed/order-feed";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { getCookie } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { WS_USERFEED_CONNECTION_START } from "../../services/actions/userFeed";

export const OrdersHistoryPage = () => {
  const dispatch = useDispatch();
  const { authSuccess } = useSelector((state) => state.user);
  useEffect(() => {
    if (getCookie("token")) {
      dispatch({
        type: WS_USERFEED_CONNECTION_START,
        payload: getCookie("token").split("Bearer ")[1],
      });
    }
  }, [authSuccess]);

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

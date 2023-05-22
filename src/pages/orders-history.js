import styles from "./orders-history.module.css";
import { useEffect } from "react";
import AppHeader from "../components/app-header/app-header";
import { ProfileNavigation } from "../components/profile-navigation/profile-navigation";
import { OrderFeed } from "../components/order-feed/order-feed";
import { WS_USERFEED_CONNECTION_START } from "../services/actions/userFeed";
import { useDispatch } from "react-redux";
import { getCookie } from "../utils/utils";
import { Outlet } from "react-router";

export const OrdersHistoryPage = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <ProfileNavigation />
        <OrderFeed />
        <Outlet />
      </main>
    </>
  );
};

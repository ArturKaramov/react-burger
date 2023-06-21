import IngridientDetails from "../../components/ingridient-details/ingridient-details";
import { useDispatch, useSelector } from "../../services/hooks";
import { useEffect } from "react";
import styles from "./full-view.module.css";
import { useLocation } from "react-router-dom";
import { FEED_URL, INGREDIENTS_URL, USER_ORDERS_URL } from "../../utils/data";
import { OrderInfo } from "../../components/order-info/order-info";
import { Preloader } from "../../components/preloader/preloader";
import { getCookie } from "../../utils/utils";
import {
  wsUserCloseAction,
  wsUserStartAction,
} from "../../services/actions/userFeed";
import { wsStartAction, wsCloseAction } from "../../services/actions/feed";

export const FullViewPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const itemsIsReady = useSelector((state) => !!state.burger.items.length);
  const ordersIsReady = useSelector(
    (state) => !!state.feed.orders.length || !!state.userFeed.orders.length
  );

  useEffect(() => {
    if (location.pathname.startsWith(FEED_URL)) {
      dispatch(wsStartAction());
      return () => {
        dispatch(wsCloseAction());
      };
    } else if (location.pathname.startsWith(USER_ORDERS_URL)) {
      dispatch(wsUserStartAction(getCookie("token").split("Bearer ")[1]));
      return () => {
        dispatch(wsUserCloseAction());
      };
    } else {
      return;
    }
  }, []);

  return (
    <>
      {itemsIsReady ? (
        <>
          <main className={styles.main}>
            {location.pathname.startsWith(INGREDIENTS_URL) ? (
              <IngridientDetails />
            ) : ordersIsReady ? (
              <OrderInfo />
            ) : (
              <Preloader />
            )}
          </main>
        </>
      ) : (
        <Preloader />
      )}
    </>
  );
};

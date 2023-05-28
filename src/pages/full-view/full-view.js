import IngridientDetails from "../../components/ingridient-details/ingridient-details";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./full-view.module.css";
import { useLocation } from "react-router-dom";
import { feedUrl, ingredientUrl, orderHistoryUrl } from "../../utils/data";
import { OrderInfo } from "../../components/order-info/order-info";
import { Preloader } from "../../components/preloader/preloader";
import { getCookie } from "../../utils/utils";
import {
  WS_USERFEED_CLOSE_CONNECTION,
  WS_USERFEED_CONNECTION_START,
} from "../../services/actions/userFeed";
import {
  WS_CLOSE_CONNECTION,
  WS_CONNECTION_START,
} from "../../services/actions/feed";

export const FullViewPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const itemsIsReady = useSelector((state) => !!state.burger.items.length);
  const ordersIsReady = useSelector(
    (state) => !!state.feed.orders.length || !!state.userFeed.orders.length
  );

  useEffect(() => {
    if (location.pathname.startsWith(feedUrl)) {
      dispatch({ type: WS_CONNECTION_START });
      return () => {
        dispatch({ type: WS_CLOSE_CONNECTION });
      };
    } else if (location.pathname.startsWith(orderHistoryUrl)) {
      dispatch({
        type: WS_USERFEED_CONNECTION_START,
        payload: getCookie("token").split("Bearer ")[1],
      });
      return () => {
        dispatch({ type: WS_USERFEED_CLOSE_CONNECTION });
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
            {location.pathname.startsWith(ingredientUrl) ? (
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

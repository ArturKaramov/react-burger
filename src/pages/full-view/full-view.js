import IngridientDetails from "../../components/ingridient-details/ingridient-details";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./full-view.module.css";
import { useLocation } from "react-router-dom";
import { ingredientUrl } from "../../utils/data";
import { OrderInfo } from "../../components/order-info/order-info";
import { Preloader } from "../../components/preloader/preloader";
import { getCookie } from "../../utils/utils";
import { WS_USERFEED_CONNECTION_START } from "../../services/actions/userFeed";
import { WS_CONNECTION_START } from "../../services/actions/feed";

export const FullViewPage = () => {
  const dispatch = useDispatch();
  const isReady = useSelector(
    (state) => !!state.burger.items.length && !!state.feed.orders.length
  );

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    if (getCookie("token")) {
      dispatch({
        type: WS_USERFEED_CONNECTION_START,
        payload: getCookie("token").split("Bearer ")[1],
      });
    }
  }, []);

  const location = useLocation();

  return (
    <>
      {isReady ? (
        <>
          <main className={styles.main}>
            {location.pathname.startsWith(ingredientUrl) ? (
              <IngridientDetails />
            ) : (
              <OrderInfo />
            )}
          </main>
        </>
      ) : (
        <Preloader />
      )}
    </>
  );
};

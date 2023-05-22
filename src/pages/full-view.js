import AppHeader from "../components/app-header/app-header";
import IngridientDetails from "../components/ingridient-details/ingridient-details";
import { useSelector } from "react-redux";
import styles from "./ingridient.module.css";
import { useLocation, useParams } from "react-router-dom";
import { orderHistoryUrl, feedUrl, ingredientUrl } from "../utils/data";
import { OrderInfo } from "../components/order-info/order-info";
import { Preloader } from "../components/preloader/preloader";

export const FullViewPage = () => {
  const isReady = useSelector(
    (state) => !!state.burger.items.length && !!state.feed.orders.length
  );

  const location = useLocation();

  return (
    <>
      {isReady ? (
        <>
          <AppHeader />
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

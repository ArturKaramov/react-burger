import styles from "./feed.module.css";
import { useEffect, useMemo } from "react";
import AppHeader from "../components/app-header/app-header";
import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_START,
} from "../services/actions/feed";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { OrderFeed } from "../components/order-feed/order-feed";

export const FeedPage = () => {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
  }, [dispatch]);

  const doneList = useMemo(
    () => orders.filter((order) => order.status === "done"),
    [orders]
  );

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
          Лента заказов
        </h1>
        <OrderFeed />
        <div className={`${styles.info} ml-15`}>
          <h2 className={`${styles.done} text text_type_main-medium mb-6`}>
            Готовы:
          </h2>
          <ul className={`${styles.doneOrders} text text_type_digits-default`}>
            {doneList.slice(0, 10).map((item) => (
              <li key={item.number} className="mb-2">
                {item.number}
              </li>
            ))}
          </ul>
          <h2
            className={`${styles.process} text text_type_main-medium mb-6 ml-9`}
          >
            В работе:
          </h2>
          <ul
            className={`${styles.processOrders} text text_type_digits-default`}
          >
            <li className="ml-9 mb-2">123</li>
          </ul>
          <h2
            className={`${styles.totalTitle} text text_type_main-medium mt-15`}
          >
            Выполнено за все время:
          </h2>
          <span className={`${styles.total} text text_type_digits-large`}>
            {total}
          </span>
          <h2
            className={`${styles.todayTitle} text text_type_main-medium mt-15`}
          >
            Выполнено за сегодня:
          </h2>
          <span className={`${styles.today} text text_type_digits-large`}>
            {totalToday}
          </span>
        </div>
      </main>
      <Outlet />
    </>
  );
};

import styles from "./order-feed.module.css";
import { useEffect } from "react";
import { Order } from "../order/order";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { feedUrl } from "../../utils/data";

export const OrderFeed = () => {
  const location = useLocation();
  let { orders } = useSelector((state) => state.feed);
  const userOrders = useSelector((state) => state.userFeed.orders);

  return (
    <>
      {location.pathname.startsWith(feedUrl) ? (
        <ul className={`${styles.list} ${styles.narrow} pr-2`}>
          {orders.map((order) => (
            <Order key={order._id} order={order} />
          ))}
        </ul>
      ) : (
        <ul className={`${styles.list} ${styles.wide} pr-2`}>
          {userOrders.map((order) => (
            <Order key={order._id} order={order} />
          ))}
        </ul>
      )}
    </>
  );
};

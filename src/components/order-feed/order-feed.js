import styles from "./order-feed.module.css";
import { Order } from "../order/order";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { feedUrl, orderHistoryUrl } from "../../utils/data";

export const OrderFeed = () => {
  const location = useLocation();
  const { orders } = useSelector((state) => state.feed);
  const userOrders = useSelector((state) => state.userFeed.orders);

  return (
    <ul className={styles.list}>
      {location.pathname === feedUrl &&
        orders.map((order) => <Order key={order._id} order={order} />)}
      {location.pathname === orderHistoryUrl &&
        userOrders.map((order) => <Order key={order._id} order={order} />)}
    </ul>
  );
};

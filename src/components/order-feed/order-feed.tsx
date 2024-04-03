import styles from './order-feed.module.css';
import { Order } from '../order/order';
import { useSelector } from '../../services/hooks';
import { useLocation } from 'react-router';
import { FEED_URL } from '../../utils/data';

export const OrderFeed = () => {
  const location = useLocation();
  const { orders } = useSelector((state) => state.feed);
  const userOrders = useSelector((state) => state.userFeed.orders);

  return (
    <>
      {location.pathname.startsWith(FEED_URL) ? (
        <ul className={`${styles.list} ${styles.narrow} pr-2`}>
          {orders.map((order) => (
            <Order {...order} key={order._id} />
          ))}
        </ul>
      ) : (
        <ul className={`${styles.list} ${styles.wide} pr-2`}>
          {userOrders.map((order) => (
            <Order {...order} key={order._id} />
          ))}
        </ul>
      )}
    </>
  );
};

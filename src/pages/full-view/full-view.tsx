import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useDispatch, useSelector } from '../../services/hooks';
import { useEffect } from 'react';
import styles from './full-view.module.css';
import { useLocation } from 'react-router-dom';
import { FEED_URL, INGREDIENTS_URL, USER_ORDERS_URL } from '../../utils/data';
import { OrderInfo } from '../../components/order-info/order-info';
import { Preloader } from '../../components/preloader/preloader';
import { getCookie } from '../../utils/utils';
import { wsClose, wsInit } from '../../services/reducers/feed';
import { wsUserInit, wsUserClose } from '../../services/reducers/userFeed';

export const FullViewPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const itemsIsReady = useSelector((state) => !!state.burger.items.length);
  const ordersIsReady = useSelector(
    (state) => !!state.feed.orders.length || !!state.userFeed.orders.length,
  );

  useEffect(() => {
    if (location.pathname.startsWith(FEED_URL)) {
      dispatch(wsInit());
      return () => {
        dispatch(wsClose());
      };
    } else if (location.pathname.startsWith(USER_ORDERS_URL)) {
      dispatch(wsUserInit(getCookie('token').split('Bearer ')[1]));
      return () => {
        dispatch(wsUserClose());
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
              <IngredientDetails />
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

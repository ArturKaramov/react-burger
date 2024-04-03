import styles from './orders-history.module.css';
import { ProfileNavigation } from '../../components/profile-navigation/profile-navigation';
import { OrderFeed } from '../../components/order-feed/order-feed';
import { Outlet } from 'react-router';
import { useEffect } from 'react';
import { getCookie } from '../../utils/utils';
import { useDispatch, useSelector } from '../../services/hooks';
import { wsUserClose, wsUserInit } from '../../services/slices/userFeed';

export const OrdersHistoryPage = () => {
  const dispatch = useDispatch();
  const { authSuccess } = useSelector((state) => state.user);
  useEffect(() => {
    if (getCookie('token') !== undefined) {
      dispatch(wsUserInit(getCookie('token').split('Bearer ')[1]));
    }
    return () => {
      dispatch(wsUserClose());
    };
  }, [authSuccess]);

  return (
    <>
      <main className={styles.main}>
        <ProfileNavigation />
        <OrderFeed />
      </main>
      <Outlet />
    </>
  );
};

import styles from './order-info.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { useEffect, useMemo, useState } from 'react';
import { Preloader } from '../preloader/preloader';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getDate } from '../../utils/utils';
import { FEED_URL, LOGIN_URL, USER_ORDERS_URL } from '../../utils/data';
import { IIngredient, IOrder, statuses } from '../../services/types/data';

export const OrderInfo = () => {
  const { id } = useParams();
  const allOrders = useSelector((state) => state.feed.orders);
  const userOrders = useSelector((state) => state.userFeed.orders);
  const { items } = useSelector((state) => state.burger);
  const { authSuccess } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState<IOrder | null | undefined>(null);
  const [data, setData] = useState<Array<IIngredient | undefined> | null>(null);
  const [quantity, setQuantity] = useState<Record<string, number>>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (!authSuccess && location.pathname.startsWith(USER_ORDERS_URL)) {
      navigate(LOGIN_URL);
    }
  });

  useEffect(() => {
    const order = location.pathname.startsWith(USER_ORDERS_URL)
      ? userOrders.find((item) => item._id === id)
      : allOrders.find((item) => item._id === id);

    setOrder(order);

    const sum = order?.ingredients
      .map((ingr) => items.find((item) => item._id === ingr)?.price)
      .reduce((ingr, prevIngr) => (!!ingr && !!prevIngr ? ingr + prevIngr : 0));
    sum && setTotalPrice(sum);

    if (order) {
      const quan: Record<string, number> = {};
      for (let i = 0; i < order.ingredients.length; i++) {
        if (!quan[order.ingredients[i]]) {
          quan[order.ingredients[i]] = 1;
        } else {
          quan[order.ingredients[i]] += 1;
        }
      }
      const arr = Object.keys(quan).map((ingr) => items.find((item) => item._id === ingr));
      setQuantity(quan);
      setData(arr);
    }
  }, [allOrders, userOrders, id, location.pathname]);

  return (
    <>
      {order ? (
        <div className={`${styles.orderInfo}`}>
          <p
            className={`text text_type_digits-default mb-10 ${
              location.state ? styles.numberModal : styles.numberPage
            }`}
          >{`#${order.number}`}</p>
          <h2 className={`text text_type_main-medium mb-3 ${styles.name}`}>{order.name}</h2>
          <p className={`${styles.status} text text_type_main-default mb-15`}>
            {statuses[order.status]}
          </p>
          <p className="text text_type_main-medium mb-6">Состав:</p>
          <ul className={styles.componentList}>
            {data?.map((item) => (
              <li className={`${styles.component} mb-4 pr-6`} key={item?._id}>
                <div className={styles.gradientBorder}>
                  <img className={styles.componentImg} src={item?.image_mobile} alt={item?.name} />
                </div>
                <p className="text text_type_main-default ml-4">{item?.name}</p>
                <p className="text text_type_digits-default mr-2">
                  {`${quantity[`${item?._id}`]} x ${item?.price}`}
                </p>
                <CurrencyIcon type="primary" />
              </li>
            ))}
          </ul>
          <div className={`${styles.additionalInfo} mt-10`}>
            <span className="text text_type_main-default text_color_inactive">
              {getDate(order.createdAt)}
            </span>
            <span className={`text text_type_digits-default ${styles.price}`}>
              {totalPrice}
              <CurrencyIcon type="primary" />
            </span>
          </div>
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
};

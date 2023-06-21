import styles from "./order-info.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { useEffect, useMemo } from "react";
import { Preloader } from "../preloader/preloader";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getDate } from "../../utils/utils";
import {
  FEED_URL,
  LOGIN_URL,
  USER_ORDERS_URL,
  statuses,
} from "../../utils/data";
import { IIngredient } from "../../services/types/data";

export const OrderInfo = () => {
  const { id } = useParams();
  const allOrders = useSelector((state) => state.feed.orders);
  const userOrders = useSelector((state) => state.userFeed.orders);
  const { items } = useSelector((state) => state.burger);
  const { authFailed } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (authFailed && location.pathname.startsWith(USER_ORDERS_URL)) {
      navigate(LOGIN_URL);
    }
  });

  const orders = useMemo(
    () => allOrders.concat(userOrders),
    [allOrders, userOrders]
  );

  const order = useMemo(
    () => orders.find((item) => item._id === id),
    [orders, id]
  );

  const totalPrice: number = useMemo(
    () =>
      order?.ingredients
        .map((ingr) => items.find((item) => item._id === ingr)?.price)
        .reduce((ingr, prevIngr) => (ingr && prevIngr ? ingr + prevIngr : 0)) ||
      0,
    [order]
  );

  const ingredientsData = useMemo(() => {
    if (order) {
      const uniqArr: { [key: string]: number } = {};
      for (let i = 0; i < order.ingredients.length; i++) {
        if (!uniqArr[order.ingredients[i]]) {
          uniqArr[order.ingredients[i]] = 1;
        } else {
          uniqArr[order.ingredients[i]] += 1;
        }
      }
      const arr: Array<IIngredient | undefined> = Object.keys(uniqArr).map(
        (ingr) => items.find((item) => item._id === ingr)
      );

      arr.forEach((item) => {
        if (item) {
          item.quantity = uniqArr[item._id];
        }
      });

      return arr;
    }
  }, [items, order]);

  return (
    <>
      {order ? (
        <div className={`${styles.orderInfo}`}>
          <p
            className={`text text_type_digits-default mb-10 ${
              location.state ? styles.numberModal : styles.numberPage
            }`}
          >{`#${order.number}`}</p>
          <h2 className={`text text_type_main-medium mb-3 ${styles.name}`}>
            {order.name}
          </h2>
          <p className={`${styles.status} text text_type_main-default mb-15`}>
            {statuses[order.status]}
          </p>
          <p className="text text_type_main-medium mb-6">Состав:</p>
          <ul className={styles.componentList}>
            {ingredientsData?.map((item) => (
              <li className={`${styles.component} mb-4 pr-6`} key={item?._id}>
                <div className={styles.gradientBorder}>
                  <img
                    className={styles.componentImg}
                    src={item?.image_mobile}
                    alt={item?.name}
                  />
                </div>
                <p className="text text_type_main-default ml-4">{item?.name}</p>
                <p className="text text_type_digits-default mr-2">
                  {`${item?.quantity} x ${item?.price}`}
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

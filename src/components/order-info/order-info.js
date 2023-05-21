import styles from "./order-info.module.css";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { Preloader } from "../preloader/preloader";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getDate } from "../../utils/utils";
import { feedUrl } from "../../utils/data";

export const OrderInfo = () => {
  const { id } = useParams();
  const allOrders = useSelector((state) => state.feed.orders);
  const userOrders = useSelector((state) => state.userFeed.orders);
  const { items } = useSelector((state) => state.burger);
  const location = useLocation();
  const orders = allOrders;

  const order = useMemo(
    () => orders.find((item) => item._id === id),
    [orders, id]
  );

  const ingredientsData = useMemo(() => {
    const uniqArr = {};
    for (let i = 0; i < order.ingredients.length; i++) {
      if (!uniqArr[order.ingredients[i]]) {
        uniqArr[order.ingredients[i]] = 1;
      } else {
        uniqArr[order.ingredients[i]] += 1;
      }
    }
    const arr = Object.keys(uniqArr).map((ingr) =>
      items.find((item) => item._id === ingr)
    );

    arr.forEach((item) => {
      item.quantity = uniqArr[item._id];
    });

    return arr;
  }, [items, order]);

  const totalPrice = useMemo(
    () =>
      order.ingredients
        .map((ingr) => items.find((item) => item._id === ingr).price)
        .reduce((ingr, prevIngr) => ingr + prevIngr),
    [items, order]
  );

  return (
    <>
      {ingredientsData.length ? (
        <div className={`${styles.orderInfo} pl-10 pr-10`}>
          <p className="text text_type_digits-default mb-10">{`#${order.number}`}</p>
          <h2 className={`text text_type_main-medium mb-3 ${styles.name}`}>
            {order.name}
          </h2>
          <p className={`${styles.status} text text_type_main-default mb-15`}>
            {order.status === "done" ? "Выполнен" : ""}
          </p>
          <p className="text text_type_main-medium mb-6">Состав:</p>
          <ul className={styles.componentList}>
            {ingredientsData.map((item) => (
              <li className={`${styles.component} mb-4 pr-6`} key={item._id}>
                <div className={styles.gradientBorder}>
                  <img
                    className={styles.componentImg}
                    src={item.image_mobile}
                    alt={item.name}
                  />
                </div>
                <p className="text text_type_main-default ml-4">{item.name}</p>
                <p className="text text_type_digits-default mr-2">
                  {`${item.quantity} x ${item.price}`}
                </p>
                <CurrencyIcon />
              </li>
            ))}
          </ul>
          <div className={`${styles.additionalInfo} mt-10`}>
            <span className="text text_type_main-default text_color_inactive">
              {getDate(order.createdAt)}
            </span>
            <span className={`text text_type_digits-default ${styles.price}`}>
              {totalPrice}
              <CurrencyIcon />
            </span>
          </div>
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
};

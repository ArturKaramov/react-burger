import styles from "./order.module.css";
import { getDate } from "../../utils/utils";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { maxIngr, orderHistoryUrl, statuses } from "../../utils/data";

export const Order = ({ order }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useSelector((state) => state.burger);

  const totalPrice = useMemo(
    () =>
      order.ingredients
        .map((ingr) => items.find((item) => item._id === ingr).price)
        .reduce((ingr, prevIngr) => ingr + prevIngr),
    [items, order]
  );

  const onClick = () => {
    navigate(`${order._id}`, {
      replace: true,
      state: { from: location.pathname },
    });
  };

  return (
    <li
      onClick={onClick}
      className={`mb-4 pl-6 pr-6 pb-6 pt-6 ${styles.order}`}
    >
      <span
        className={`text text_type_digits-default ${styles.id}`}
      >{`#${order.number}`}</span>
      <span
        className={`text text_type_main-default text_color_inactive ${styles.timestamp}`}
      >
        {getDate(order.createdAt)}
      </span>
      <h2 className={`mt-6 text text_type_main-medium ${styles.name}`}>
        {order.name}
      </h2>
      {location.pathname.startsWith(orderHistoryUrl) && (
        <p
          className={`${styles.status} text text_type_main-default mt-2`}
          style={{ color: order.status === "done" && "#00cccc" }}
        >
          {statuses[order.status]}
        </p>
      )}
      <ul className={`ml-4 mt-6 ${styles.components}`}>
        {order.ingredients
          .slice(0, maxIngr)
          .reverse()
          .map((ingr, i) => (
            <li
              key={i}
              style={{ zIndex: i }}
              className={
                order.ingredients.length > maxIngr && i === 0
                  ? `${styles.gradientBorder} ${styles.gradientBorderFirst}`
                  : styles.gradientBorder
              }
            >
              <img
                className={styles.component}
                src={items.find((item) => item._id === ingr).image_mobile}
                alt={items.find((item) => item._id === ingr).name}
              />
              {order.ingredients.length > maxIngr && i === 0 && (
                <span
                  className={`text text_type_main-default ${styles.extra}`}
                >{`+${order.ingredients.length - maxIngr}`}</span>
              )}
            </li>
          ))}
      </ul>
      <span className={`text text_type_digits-default mt-6 ${styles.price}`}>
        {totalPrice}
        <CurrencyIcon type="primary" />
      </span>
    </li>
  );
};

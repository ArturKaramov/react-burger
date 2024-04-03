import styles from './order.module.css';
import { FC } from 'react';
import { getDate } from '../../utils/utils';
import { useMemo } from 'react';
import { useSelector } from '../../services/hooks';
import { useNavigate, useLocation } from 'react-router';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { maxIngr, USER_ORDERS_URL } from '../../utils/data';
import { IIngredient, IOrder, statuses } from '../../services/types/data';

export const Order: FC<IOrder> = ({ _id, ingredients, number, name, status, createdAt }) => {
  const items = useSelector((state) =>
    state.burger.items.filter((item) => ingredients.includes(item._id)),
  );
  const navigate = useNavigate();
  const location = useLocation();

  const totalPrice: number = useMemo(
    () =>
      ingredients
        .map((ingr) => items.find((item) => item._id === ingr)?.price)
        .reduce((ingr, prevIngr) => (ingr && prevIngr ? ingr + prevIngr : 0)) || 0,
    [items, ingredients],
  );

  const onClick = () => {
    navigate(`${_id}`, {
      replace: true,
      state: { from: location.pathname },
    });
  };

  return (
    <li onClick={onClick} className={`mb-4 pl-6 pr-6 pb-6 pt-6 ${styles.order}`}>
      <span className={`text text_type_digits-default ${styles.id}`}>{`#${number}`}</span>
      <span className={`text text_type_main-default text_color_inactive ${styles.timestamp}`}>
        {getDate(createdAt)}
      </span>
      <h2 className={`mt-6 text text_type_main-medium ${styles.name}`}>{name}</h2>
      {location.pathname.startsWith(USER_ORDERS_URL) && (
        <p
          className={`${styles.status} text text_type_main-default mt-2`}
          style={{ color: status === 'done' ? '#00cccc' : 'inherit' }}
        >
          {statuses[status]}
        </p>
      )}
      <ul className={`ml-4 mt-6 ${styles.components}`}>
        {ingredients
          .slice(0, maxIngr)
          .reverse()
          .map((ingr, i) => (
            <li
              key={i}
              style={{ zIndex: i }}
              className={
                ingredients.length > maxIngr && i === 0
                  ? `${styles.gradientBorder} ${styles.gradientBorderFirst}`
                  : styles.gradientBorder
              }
            >
              <img
                className={styles.component}
                src={items.find((item) => item._id === ingr)?.image_mobile}
                alt={items.find((item) => item._id === ingr)?.name}
              />
              {ingredients.length > maxIngr && i === 0 && (
                <span className={`text text_type_main-default ${styles.extra}`}>{`+${
                  ingredients.length - maxIngr
                }`}</span>
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

import React from 'react';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { LOGIN_URL } from '../../utils/data';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import BurgerElement from '../burger-element/burger-element';
import { Preloader } from '../preloader/preloader';
import { useSelector, useDispatch } from '../../services/hooks';
import { setOrder } from '../../services/thunks/burger';
import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';
import { IIngredient, IngrType } from '../../services/types';
import { addIngr, clearOrder } from '../../services/slices/burger';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderRequest, orderFailed } = useSelector((state) => state.burger);
  const auth: boolean = useSelector((state) => state.user.authSuccess && !!state.user.user.email);

  const bun: IIngredient = useSelector((state) => state.burger.constructor[0]);

  const products: Array<IIngredient> = useSelector((state) =>
    state.burger.constructor.filter((item) => item.type !== IngrType.BUN),
  );

  const isOrderEmpty: boolean = useSelector((state) => !Boolean(state.burger.constructor.length));

  const { order } = useSelector((state) => state.burger);

  const [{ isHover, isBun }, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item: IIngredient) {
      if (isOrderEmpty && item.type !== IngrType.BUN) {
        return;
      } else {
        const key = uuidv4();
        dispatch(addIngr({ ...item, key: key }));
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      isBun: monitor.isOver() && monitor.getItem().type === IngrType.BUN,
    }),
  });

  const outlineColor = isHover ? (isBun ? 'lightgreen' : 'red') : '#8585ad';

  const totalPrice = React.useMemo(
    () =>
      isOrderEmpty
        ? 0
        : [bun, ...products, bun]
            .map((ingr) => (ingr ? ingr.price : 0))
            .reduce((prevIngr, ingr) => ingr + prevIngr),
    [isOrderEmpty, products, bun],
  );

  const onClick = () => {
    auth
      ? dispatch(setOrder([bun._id, ...products.map((item) => item._id), bun._id]))
      : navigate(LOGIN_URL);
  };

  return (
    <section ref={dropRef} className={`pt-25 pl-4 ${styles.burgerConstructor}`}>
      {isOrderEmpty ? (
        <section className={` ${styles.empty}`} style={{ outlineColor }}>
          {isHover && !isBun ? (
            <span className="text text_type_main-medium">Сперва, выберите булку</span>
          ) : (
            <span className="text text_type_main-medium">Соберите бургер здесь</span>
          )}
        </section>
      ) : (
        <>
          <div className="pl-8 pr-4">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
          <ul className={`mt-4 mb-4 ${styles.burgerConstructorList}`}>
            {products.map((ingr, i) => (
              <BurgerElement data={ingr} index={i} key={ingr.key} />
            ))}
          </ul>
          <div className="pl-8 pr-4">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        </>
      )}
      <div className={`pt-10 pr-4 ${styles.totalPrice}`}>
        <p className="pr-2 text text_type_digits-medium">{totalPrice}</p>
        <span className={`${styles.currency} pr-10`}>
          <CurrencyIcon type="primary" />
        </span>
        <Button
          onClick={onClick}
          htmlType="button"
          type="primary"
          size="large"
          disabled={isOrderEmpty}
        >
          Оформить заказ
        </Button>
      </div>
      {orderRequest ? (
        <Preloader />
      ) : orderFailed ? (
        <div className={styles.error}>
          <span className="text text_type_main-medium">Кажется, произошла ошибка. :&lang;</span>
          <span className="text text_type_main-medium">Пожалуйста, повторите заказ</span>
        </div>
      ) : (
        Boolean(order) && (
          <Modal
            closeModal={() => {
              dispatch(clearOrder());
            }}
          >
            <OrderDetails />
          </Modal>
        )
      )}
    </section>
  );
}

export default BurgerConstructor;

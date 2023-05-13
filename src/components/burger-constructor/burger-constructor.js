import React from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { BUN } from "../../utils/data";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import BurgerElement from "../burger-element/burger-element";
import { Preloader } from "../preloader/preloader";
import { useSelector, useDispatch } from "react-redux";
import { ADD_INGR, setOrder, CLEAR_ORDER } from "../../services/actions/burger";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isOrderEmpty = !useSelector((state) => state.burger.constructor.length);

  const { orderRequest, orderFailed } = useSelector((state) => state.burger);
  const { authSuccess } = useSelector((state) => state.user);

  const bun = useSelector((state) =>
    !state.burger.constructor.find((item) => item.type === BUN)
      ? {}
      : state.burger.constructor.find((item) => item.type === BUN)
  );

  const products = useSelector((state) =>
    !state.burger.constructor.filter((item) => item.type !== BUN)
      ? []
      : state.burger.constructor.filter((item) => item.type !== BUN)
  );

  const isDisabled = isOrderEmpty ? "disabled" : "";

  const order = useSelector((state) => state.burger.order);

  const [{ isHover, isBun }, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (isOrderEmpty && item.data.type !== "bun") {
        return;
      } else {
        item.data.key = uuidv4();
        dispatch({ type: ADD_INGR, ingr: { ...item.data } });
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      isBun: monitor.isOver() && monitor.getItem().data.type === "bun",
    }),
  });

  const outlineColor = isHover ? (isBun ? "lightgreen" : "red") : "#8585ad";

  const totalPrice = React.useMemo(
    () =>
      isOrderEmpty
        ? 0
        : [bun, ...products, bun]
            .map((ingr) => ingr.price)
            .reduce((prevIngr, ingr) => ingr + prevIngr),
    [isOrderEmpty, products, bun]
  );

  const onClick = () => {
    authSuccess
      ? dispatch(
          setOrder([bun._id, ...products.map((item) => item._id), bun._id])
        )
      : navigate("/react-burger/login");
  };

  return (
    <section ref={dropRef} className={`pt-25 pl-4 ${styles.burgerConstructor}`}>
      {isOrderEmpty ? (
        <section className={` ${styles.empty}`} style={{ outlineColor }}>
          {isHover && !isBun ? (
            <span className="text text_type_main-medium">
              Сперва, выберите булку
            </span>
          ) : (
            <span className="text text_type_main-medium">
              Соберите бургер здесь
            </span>
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
          disabled={isDisabled}
        >
          Оформить заказ
        </Button>
      </div>
      {orderRequest ? (
        <Preloader />
      ) : orderFailed ? (
        <div className={styles.error}>
          <span className="text text_type_main-medium">
            Кажется, произошла ошибка. :&lang;
          </span>
          <span className="text text_type_main-medium">
            Пожалуйста, повторите заказ
          </span>
        </div>
      ) : (
        Boolean(order) && (
          <Modal
            closeModal={() => {
              dispatch({ type: CLEAR_ORDER });
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

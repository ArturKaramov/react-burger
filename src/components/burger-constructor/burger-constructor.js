import React from "react";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { BUN } from "../../utils/data";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import BurgerElement from "../burger-element/burger-element";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { ADD_INGR, SET_ORDER } from "../../services/actions";
import { useDrop } from "react-dnd/dist/hooks/useDrop";

function BurgerConstructor() {
  const dispatch = useDispatch();

  const isOrderEmpty = !useSelector((state) => state.burger.constructor.length);

  const [{ isHover, isBun }, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (isOrderEmpty && item.data.type !== "bun") {
        return;
      } else {
        dispatch({ type: ADD_INGR, ingr: item.data });
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      isBun: monitor.isOver() && monitor.getItem().data.type === "bun",
    }),
  });

  const outlineColor = isHover ? (isBun ? "lightgreen" : "red") : "#8585ad";

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

  const order = useSelector((state) => state.burger.order);

  const totalPrice = React.useMemo(
    () =>
      isOrderEmpty
        ? 0
        : [bun, ...products, bun]
            .map((ingr) => ingr.price)
            .reduce((prevIngr, ingr) => ingr + prevIngr),
    [isOrderEmpty, products, bun]
  );

  const showOrder = () => {
    api
      .createOrder([bun._id, ...products.map((item) => item._id), bun._id])
      .then((res) => dispatch({ type: SET_ORDER, order: res.order.number }))
      .catch((err) => console.error(err));
  };
  return (
    <section
      ref={dropRef}
      className={`pt-25 pl-4 ${burgerConstructorStyles.burgerConstructor}`}
    >
      {isOrderEmpty ? (
        <section
          className={` ${burgerConstructorStyles.empty}`}
          style={{ outlineColor }}
        >
          {isHover && !isBun ? (
            <span className="text text_type_main-medium">
              Сперва выберете булку
            </span>
          ) : (
            <span className="text text_type_main-medium">
              Соберите бургер здесь
            </span>
          )}
        </section>
      ) : (
        <>
          <div key={0} className="pl-8 pr-4">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
          <ul
            className={`mt-4 mb-4 ${burgerConstructorStyles.burgerConstructorList}`}
          >
            {products.map((ingr, i) => (
              <li key={i + 1} className="pb-4 pr-2">
                <BurgerElement data={ingr} index={i} />
              </li>
            ))}
          </ul>
          <div key={products.length + 2} className="pl-8 pr-4">
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
      <div className={`pt-10 pr-4 ${burgerConstructorStyles.totalPrice}`}>
        <p className="pr-2 text text_type_digits-medium">{totalPrice}</p>
        <span className={`${burgerConstructorStyles.currency} pr-10`}>
          <CurrencyIcon type="primary" />
        </span>
        <Button
          onClick={showOrder}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
      {Boolean(order) && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;

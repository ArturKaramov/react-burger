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
import { BurgerContext } from "../../services/burgerContext";
import { api } from "../../utils/api";

function BurgerConstructor() {
  const ingridientList = React.useContext(BurgerContext);

  const bun = React.useMemo(
    () => ingridientList.data.find((ingr) => ingr.type === BUN),
    [ingridientList.data]
  );
  const products = React.useMemo(
    () => ingridientList.data.filter((ingr) => ingr.type !== BUN),
    [ingridientList.data]
  );
  const totalPrice = React.useMemo(
    () =>
      products
        .map((ingr) => ingr.price)
        .reduce((prevIngr, ingr) => ingr + prevIngr) +
      2 * bun.price,
    [ingridientList.data]
  );

  const getProductsList = () => {
    const res = products.map((item) => item._id);
    res.unshift(bun._id);
    res.push(bun._id);
    return res;
  };

  const [order, setOrder] = React.useState(null);

  const showOrder = () => {
    api
      .createOrder(getProductsList())
      .then((res) => setOrder(res.order.number))
      .catch((err) => console.error(err));
  };

  const hideOrder = () => {
    setOrder(null);
  };

  return (
    <section
      className={`pt-25 pl-4 ${burgerConstructorStyles.burgerConstructor}`}
    >
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
          <li
            key={i + 1}
            className={`pb-4 pr-2 ${burgerConstructorStyles.burgerElement}`}
          >
            <DragIcon type="primary" />
            <ConstructorElement
              text={ingr.name}
              price={ingr.price}
              thumbnail={ingr.image}
            />
          </li>
        ))}
      </ul>
      <div key={ingridientList.data.length + 1} className="pl-8 pr-4">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
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
      {order && (
        <Modal closeModal={hideOrder}>
          <OrderDetails order={order} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;

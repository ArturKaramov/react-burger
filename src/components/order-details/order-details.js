import orderDetailsStyle from "./order-details.module.css";
import firstLayer from "../../images/layer_1.svg";
import secondLayer from "../../images/layer_2.svg";
import thirdLayer from "../../images/layer_3.svg";
import doneicon from "../../images/doneIcon.svg";
import { useSelector } from "react-redux";

function OrderDetails() {
  const order = useSelector((state) => state.burger.order);
  return (
    <>
      <h2
        className={`${orderDetailsStyle.order} mt-20 mb-8 text text_type_digits-large`}
      >
        {order}
      </h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className={orderDetailsStyle.done}>
        <img
          className={orderDetailsStyle.rotate}
          alt="Заказ принят!"
          src={firstLayer}
        />
        <img
          className={orderDetailsStyle.rotateReverse}
          alt="Заказ принят!"
          src={secondLayer}
        />
        <img
          className={orderDetailsStyle.rotate}
          alt="Заказ принят!"
          src={thirdLayer}
        />
        <img
          className={orderDetailsStyle.doneIcon}
          alt="Заказ принят!"
          src={doneicon}
        />
      </div>
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали собирать
      </p>
      <p className="text text_type_main-default text_color_inactive mb-15 mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

export default OrderDetails;

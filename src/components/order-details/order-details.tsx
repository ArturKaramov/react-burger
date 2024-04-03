import styles from './order-details.module.css';
import firstLayer from '../../images/layer_1.svg';
import secondLayer from '../../images/layer_2.svg';
import thirdLayer from '../../images/layer_3.svg';
import doneicon from '../../images/doneIcon.svg';
import { useSelector } from '../../services/hooks';

function OrderDetails() {
  const order = useSelector((state) => state.burger.order);
  return (
    <>
      <h2 className={`${styles.order} mt-20 mb-8 text text_type_digits-large`}>{order}</h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className={styles.done}>
        <img className={styles.rotate} alt="Заказ принят!" src={firstLayer} />
        <img className={styles.rotateReverse} alt="Заказ принят!" src={secondLayer} />
        <img className={styles.rotate} alt="Заказ принят!" src={thirdLayer} />
        <img className={styles.doneIcon} alt="Заказ принят!" src={doneicon} />
      </div>
      <p className="text text_type_main-default mt-15">Ваш заказ начали собирать</p>
      <p className="text text_type_main-default text_color_inactive mb-15 mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

export default OrderDetails;

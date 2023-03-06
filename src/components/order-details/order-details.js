import orderDetailsStyle from './order-details.module.css'
import firstLayer from '../../layer_1.svg';
import secondLayer from '../../layer_2.svg';
import thirdLayer from '../../layer_3.svg';
import doneicon from '../../doneIcon.svg';
import PropTypes from 'prop-types';

function OrderDetails(props) {
  return (
    <>
      <h2 className={`${orderDetailsStyle.order} mt-20 mb-8 text text_type_digits-large`}>{props.order}</h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className={orderDetailsStyle.done}>
        <img className={orderDetailsStyle.rotate} alt='Заказ принят!' src={firstLayer} />
        <img className={orderDetailsStyle.rotateReverse} alt='Заказ принят!' src={secondLayer} />
        <img className={orderDetailsStyle.rotate} alt='Заказ принят!' src={thirdLayer} />
        <img className={orderDetailsStyle.doneIcon} alt='Заказ принят!' src={doneicon} />
      </div>
      <p className="text text_type_main-default mt-15">Ваш заказ начали собирать</p>
      <p className="text text_type_main-default text_color_inactive mb-15 mt-2">Дождитесь готовности на орбитальной станции</p>
    </>
  )
};

OrderDetails.propTypes = {
 order: PropTypes.number.isRequired
}

export default OrderDetails;
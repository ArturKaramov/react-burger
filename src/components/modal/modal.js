import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import propTypes from 'prop-types';

const Modal = (props) => {
  return (
    <div className={`pt-10 pb-15 ${modalStyles.modal}`}>
      <div onClick={props.closeModal} className={`mt-15 mr-10 ${modalStyles.close}`}>
        <CloseIcon type="primary" />
      </div>
      {props.children}
    </div>
  )
};

Modal.propTypes = {
  closeModal: propTypes.func,
  children: propTypes.element.isRequired
}

export default Modal;
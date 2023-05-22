import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import propTypes from "prop-types";

const Modal = (props) => {
  return (
    <ModalOverlay closeModal={props.closeModal}>
      <div className={`pt-10 pb-15 pr-10 pl-10 ${modalStyles.modal}`}>
        <div
          onClick={props.closeModal}
          className={`mt-15 mr-10 ${modalStyles.close}`}
        >
          <CloseIcon type="primary" />
        </div>
        {props.children}
      </div>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  closeModal: propTypes.func,
  children: propTypes.element.isRequired,
};

export default Modal;

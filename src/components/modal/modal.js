import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import propTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { SET_ORDER, SHOW_DETAILS } from "../../services/actions";

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const { details, order } = useSelector((state) => state.burger);

  const hideModal = () => {
    order
      ? dispatch({ type: SET_ORDER, order: "" })
      : dispatch({ type: SHOW_DETAILS, item: {} });
  };

  return (
    <ModalOverlay closeModal={hideModal}>
      <div className={`pt-10 pb-15 ${modalStyles.modal}`}>
        <div onClick={hideModal} className={`mt-15 mr-10 ${modalStyles.close}`}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  children: propTypes.element.isRequired,
};

export default Modal;

import styles from "./modal.module.css";
import { FC, PropsWithChildren } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import propTypes from "prop-types";

interface Props {
  closeModal: () => void;
}

const Modal: FC<Props & PropsWithChildren> = (props) => {
  return (
    <ModalOverlay closeModal={props.closeModal}>
      <div className={`pt-10 pb-15 pr-10 pl-10 ${styles.modal}`}>
        <div
          onClick={props.closeModal}
          className={`mt-15 mr-10 ${styles.close}`}
        >
          <CloseIcon type="primary" />
        </div>
        {props.children}
      </div>
    </ModalOverlay>
  );
};

export default Modal;

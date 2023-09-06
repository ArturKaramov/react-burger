import styles from "./modal-overlay.module.css";
import React, { FC, PropsWithChildren } from "react";

interface Props {
  closeModal: () => void;
}

const ModalOverlay: FC<Props & PropsWithChildren> = (props) => {
  const handleOverlayClose = (evt: React.MouseEvent) => {
    if (evt.target === evt.currentTarget) {
      props.closeModal();
    }
  };

  const handleEscClose = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      props.closeModal();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  return (
    <div onClick={handleOverlayClose} className={styles.modalOverlay}>
      {props.children}
    </div>
  );
};

export default ModalOverlay;

import modalOverlayStyles from './modal-overlay.module.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { modalRoot } from '../../utils/data';
import propTypes from 'prop-types';

const ModalOverlay = (props) => {
  const modalOverlay = React.useRef();
  
  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) { props.closeModal() }
  };

  const handleEscClose = (evt) => {
    if (evt.key === 'Escape') { props.closeModal() }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    modalOverlay.current.addEventListener('click', handleOverlayClose)
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [])

  return ReactDOM.createPortal(
    (
      <div ref={modalOverlay} className={modalOverlayStyles.modalOverlay}>
        {props.children}
      </div>
    ), modalRoot
  );
};

ModalOverlay.propTypes = {
  closeModal: propTypes.func,
  children: propTypes.element.isRequired
}

export default ModalOverlay
import css from './ModalImage.module.css';
import PropTypes from 'prop-types';

import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

function ModalImage({ imageURL, imageAlt, closeModal }) {
  const handleOverlayClick = event => {
    const { target, currentTarget } = event;
    if (target === currentTarget) {
      closeModal();
    }
  };

  const handleEscPressed = useCallback(
    event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEscPressed);

    return () => {
      window.removeEventListener('keydown', handleEscPressed);
    };
  }, [handleEscPressed]);

  return createPortal(
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <img src={imageURL} alt={imageAlt} />
      </div>
    </div>,
    modalRoot
  );
}

export default ModalImage;

// --------------------------- PropTypes ----------------------

ModalImage.propTypes = {
  imageURL: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

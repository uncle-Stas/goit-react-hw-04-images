import css from './ModalImage.module.css';

import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class ModalImage extends Component {
  handleOverlayClick = event => {
    const { target, currentTarget } = event;
    if (target === currentTarget) {
      this.props.closeModal();
    }
  };

  handleEscPressed = event => {
    if (event.key === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscPressed);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscPressed);
  }

  render() {
    const { imageURL, imageAlt } = this.props;

    return createPortal(
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>
          <img src={imageURL} alt={imageAlt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default ModalImage;

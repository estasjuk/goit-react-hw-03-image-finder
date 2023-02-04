import { Component } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModalWindow);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModalWindow);
  }

  closeModalWindow = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };
  render() {
    const { children } = this.props;

    const { closeModalWindow } = this;
    return createPortal(
      <div className={css.Overlay} onClick={closeModalWindow}>
        <div className={css.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

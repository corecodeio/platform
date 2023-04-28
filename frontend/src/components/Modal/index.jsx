import React from 'react';
import ReactDOM from 'react-dom';
//styles
import Styles from './Modal.module.css';

const Modal = ({ children, isShow = false }) => {
    return isShow
        ? ReactDOM.createPortal(
              <div className={Styles['modal']}>
                  {children}
              </div>,
              document.getElementById('modal')
          )
        : null;
};

export default Modal;

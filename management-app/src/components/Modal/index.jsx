import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './Modal.module.css';

const Modal = ({ isShown, element }) => {
    return isShown
        ? ReactDOM.createPortal(
              <div className={Styles[`main`]}>
                  <div className={Styles[`container`]}>{element}</div>
              </div>,
              document.getElementById('modal')
          )
        : null;
};

export default Modal;

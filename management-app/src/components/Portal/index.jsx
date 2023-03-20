import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './Portal.module.css';

const Portal = ({ isShown, element }) => {
    return isShown
        ? ReactDOM.createPortal(
              <div className={Styles[`main`]}>
                  <div className={Styles[`container`]}>{element}</div>
              </div>,
              document.getElementById('modal')
          )
        : null;
};

export default Portal;

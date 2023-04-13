import React from 'react';
import Styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={Styles[`main`]}>
            <div className={Styles[`footer`]}>
                <p>
                    <strong>Core Code © 2023</strong> | Todos los derechos reservados.
                </p>
                <p>
                    ¿Consultas y dudas? Escríbenos a <strong>admisiones@core-code.io</strong>
                </p>
            </div>
        </div>
    );
};

export default Footer;

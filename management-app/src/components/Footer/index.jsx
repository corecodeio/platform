import React from 'react';
import Styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={Styles[`main`]}>
            <div className={Styles[`footer`]}>
                <p>
                    <strong>Management</strong> powered by Core Code
                </p>
                <p>
                    For inquiries contact <strong>techlead@core-code.io</strong>
                </p>
            </div>
        </div>
    );
};

export default Footer;

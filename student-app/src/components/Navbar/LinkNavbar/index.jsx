import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
//styles
import Styles from './LinkNavbar.module.css';

const LinkNavbar = ({ to, text, close }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const handlerClicks = () => {
        navigate(`/dashboard/${to}`);
        if (close) {
            close();
        }
    };
    return (
        <button
            className={Styles[`link-${`/dashboard/${to}` === pathname ? '1' : '0'}`]}
            onClick={handlerClicks}
        >
            {text}
        </button>
    );
};

export default LinkNavbar;

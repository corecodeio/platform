import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Styles from './MainPage.module.css';
//components
import LogIn from './../../components/LogIn';

const MainPage = () => {
    const { isAuth } = useSelector((state) => state.auth);

    if (isAuth) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <>
            <div className={Styles[`container`]}>
                <div className={Styles[`details`]}>
                    <img src="/images/template.png" alt="template" />
                </div>
                <div className={Styles[`panel`]}>
                    <LogIn />
                </div>
            </div>
            <div className={Styles[`container-footer`]}>
                <div className={Styles[`footer`]}>
                    <img src="/images/logo.svg" alt="core code" />
                    <p>Core Code © 2023 | Todos los derechos reservados.</p>
                    <p>
                        ¿Consultas y dudas? Escríbenos a <strong>admisiones@core-code.io</strong>
                    </p>
                </div>
            </div>
        </>
    );
};

export default MainPage;

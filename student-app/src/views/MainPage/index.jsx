import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate, useNavigate, Outlet } from 'react-router-dom';
import Styles from './MainPage.module.css';

const MainPage = () => {
    const { isAuth } = useSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuth && location.pathname === '/') {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);
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
                    <Outlet />
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

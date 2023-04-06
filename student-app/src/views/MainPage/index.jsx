import React from 'react';
import Styles from './MainPage.module.css';
import { Navigate, Outlet } from 'react-router-dom';

const MainPage = () => {
    if (false) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <div className={Styles[`main`]}>
            <div className={Styles[`outlet`]}>
                <img className={Styles[`logo`]} src="/images/logo-app.png" alt="core code" />
                <Outlet />
                <img className={Styles[`logo-footer`]} src="/images/group-1.png" alt="core code" />
            </div>
            <div className={Styles[`background-0`]}></div>
        </div>
    );
};

export default MainPage;

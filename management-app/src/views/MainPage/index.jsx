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
        <div className={Styles[`main`]}>
            <div className={Styles[`outlet`]}>
                <LogIn />
            </div>
            <div className={Styles[`background`]}></div>
        </div>
    );
};

export default MainPage;

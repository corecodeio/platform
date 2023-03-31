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
            navigate('/log-in');
        }
        // eslint-disable-next-line
    }, []);
    if (isAuth) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <div className={Styles[`main`]}>
            <div className={Styles[`outlet`]}>
                <Outlet />
            </div>
            <div
                className={
                    Styles[
                        `background-${
                            location.pathname === '/' || location.pathname === '/log-in' ? '0' : '1'
                        }`
                    ]
                }
            ></div>
        </div>
    );
};

export default MainPage;

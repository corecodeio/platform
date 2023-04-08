import React, { useEffect } from 'react';
import Styles from './MainPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
//actions
import { logInRecoverAsync } from './../../redux/actions/auth';

const MainPage = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.auth);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('token');
        if (token) {
            dispatch(logInRecoverAsync(token));
        }
        // eslint-disable-next-line
    }, []);

    if (isAuth) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <div className={Styles[`main`]}>
            <div className={Styles[`outlet`]}>
                <img className={Styles[`logo`]} src="/images/logo-app.png" alt="core code" />
                <Outlet />
                <img className={Styles[`logo-footer`]} src="/images/group-1.png" alt="core code" />
            </div>
            <div
                className={Styles[`background-${location.pathname === '/log-in' ? '0' : '1'}`]}
            ></div>
        </div>
    );
};

export default MainPage;

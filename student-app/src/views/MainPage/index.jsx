import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
//styles
import Styles from './MainPage.module.css';
//components
import Footer from './../../components/Footer';
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
        <>
            <div className={Styles[`main`]}>
                <div className={Styles[`outlet`]}>
                    <img
                        className={Styles[`logo`]}
                        src="/images/logo-core-code.png"
                        alt="core code"
                    />
                    <Outlet />
                    <img
                        className={Styles[`logo-footer`]}
                        src="/images/group-1.png"
                        alt="core code"
                    />
                    <div className={Styles[`space`]}></div>
                </div>
                <div
                    className={
                        Styles[
                            `background-${
                                location.pathname === '/recover-password'
                                    ? '2'
                                    : location.pathname === '/sign-up'
                                    ? '1'
                                    : '0'
                            }`
                        ]
                    }
                ></div>
            </div>
            <Footer />
        </>
    );
};

export default MainPage;

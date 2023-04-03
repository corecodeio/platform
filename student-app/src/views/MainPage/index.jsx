import React from 'react';
import Styles from './MainPage.module.css';
import { StytchLogin } from '@stytch/react';
import { Products } from '@stytch/vanilla-js';
import { Navigate } from 'react-router-dom';
import { useStytchUser } from "@stytch/react";

const MainPage = () => {
    const { user } = useStytchUser();
    if (user) {
        return <Navigate to="/dashboard" />;
    }
    const styles = {
        container: {
            width: '100%'
        },
        buttons: {
            primary: {
                backgroundColor: '#4A37BE',
                borderColor: '#4A37BE'
            }
        }
    };
    const config = {
        products: [Products.emailMagicLinks, Products.oauth],
        emailMagicLinksOptions: {
            loginRedirectURL: 'http://localhost:3500',
            loginExpirationMinutes: 60,
            signupRedirectURL: 'http://localhost:3500',
            signupExpirationMinutes: 60
        },
        oauthOptions: {
            providers: [{ type: 'google' }],
            loginRedirectURL: 'http://localhost:3500',
            loginExpirationMinutes: 60,
            signupRedirectURL: 'http://localhost:3500',
            signupExpirationMinutes: 60
        }
    };
    return (
        <div className={Styles[`main`]}>
            <div className={Styles[`outlet`]}>
                <img className={Styles[`logo`]} src="/images/logo-app.png" alt="core code" />
                <StytchLogin config={config} styles={styles} />
                <img className={Styles[`logo-footer`]} src="/images/group-1.png" alt="core code" />
            </div>
            <div className={Styles[`background-0`]}></div>
        </div>
    );
};

export default MainPage;

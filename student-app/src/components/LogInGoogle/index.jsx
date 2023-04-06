import React from 'react';
import Styles from './LogInGoogle.module.css';

const LogInGoogle = () => {
    const handleGoogleLogin = () => {
        window.location = `https://test.stytch.com/v1/public/oauth/google/start?public_token=${process.env.REACT_APP_STYTCH_PUBLIC_TOKEN}`;
    };
    return (
        <button onClick={handleGoogleLogin} className={Styles[`title`]}>
            Google Login
        </button>
    );
};

export default LogInGoogle;

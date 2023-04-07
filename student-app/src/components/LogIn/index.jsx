import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Styles from './LogIn.module.css';
import { useDispatch } from 'react-redux';
//icons
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';
//actions
import { logInAsync } from './../../redux/actions/auth';

const LogIn = () => {
    const dispatch = useDispatch();
    const [hidden, setHidden] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        dispatch(logInAsync({ data, setError }));
    };
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError('');
    };
    const handleHidden = () => {
        setHidden(!hidden);
    };
    const validateEmail = (string) => {
        const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        return regex.test(string);
    };
    return (
        <form className={Styles[`form`]} onSubmit={handleSubmit}>
            <p className={Styles[`title`]}>Welcome back!</p>
            <div className="container-input">
                <input
                    className={Styles[`form-input`]}
                    style={
                        !validateEmail(data.email) && data.email !== ''
                            ? { border: '1px solid #D83341' }
                            : {}
                    }
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                {!validateEmail(data.email) && data.email !== '' && (
                    <p className={Styles[`form-input-error`]}>
                        <BiError />
                        Invalid email. Please try again.
                    </p>
                )}
            </div>
            <div className={Styles[`form-div-password`]}>
                <input
                    className={Styles[`form-input`]}
                    type={hidden ? 'text' : 'password'}
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                {hidden ? (
                    <AiOutlineEyeInvisible
                        className={Styles[`form-icon-eye`]}
                        onClick={handleHidden}
                    />
                ) : (
                    <AiOutlineEye className={Styles[`form-icon-eye`]} onClick={handleHidden} />
                )}
            </div>
            <button
                className={Styles[`form-button`]}
                disabled={!data.email || !data.password || !validateEmail(data.email)}
                type="submit"
            >
                Login
            </button>
            <div className={Styles[`additional-text`]}>
                <p className={Styles[`additional-text2`]}>
                    Don't have an account?{' '}
                    <Link to="/sign-up" className={Styles[`additional-link`]}>
                        Sign up now
                    </Link>
                </p>
                <p className={Styles[`additional-text2`]}>
                    Do you need to reset your password?{' '}
                    <Link to="/recover-password" className={Styles[`additional-link`]}>
                        recover
                    </Link>
                </p>
                {error && (
                    <p className={Styles[`form-error`]}>
                        <BiError className={Styles[`form-icon-error`]} />
                        {error}
                    </p>
                )}
            </div>
        </form>
    );
};

export default LogIn;

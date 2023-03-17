import React, { useState } from 'react';
import Styles from './LogIn.module.css';
import { useDispatch } from 'react-redux';
//actions
import { logInAsync } from './../../redux/actions/auth';
//icons
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';

const LogIn = () => {
    const dispatch = useDispatch();
    const [type, setType] = useState(false);
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
    const handleType = () => {
        setType(!type);
    };
    const validateEmail = (string) => {
        const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        return regex.test(string);
    };
    return (
        <div className={Styles[`main`]}>
            <img className={Styles[`logo`]} src="/images/logo-app.png" alt="core code" />
            <form className={Styles[`form`]} onSubmit={handleSubmit}>
                <p className={Styles[`title`]}>Welcome back!</p>
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
                <div className={Styles[`form-div-password`]}>
                    <input
                        className={Styles[`form-input`]}
                        type={type ? 'text' : 'password'}
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    {type ? (
                        <AiOutlineEyeInvisible
                            className={Styles[`form-icon-eye`]}
                            onClick={handleType}
                        />
                    ) : (
                        <AiOutlineEye className={Styles[`form-icon-eye`]} onClick={handleType} />
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
                    {error && (
                        <p className={Styles[`form-error`]}>
                            <BiError className={Styles[`form-icon-error`]} />
                            {error}
                        </p>
                    )}
                </div>
            </form>
            <img className={Styles[`logo-footer`]} src="/images/group-1.png" alt="core code" />
        </div>
    );
};

export default LogIn;

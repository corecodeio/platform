import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Styles from './SignUp.module.css';
import { useDispatch } from 'react-redux';
//actions
import { signUpAsync } from './../../redux/actions/auth';
//icons
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';

const LogIn = () => {
    const dispatch = useDispatch();
    const [hidden, setHidden] = useState(false);
    const [hiddenRepeat, setHiddenRepeat] = useState(false);
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_repeat: ''
    });
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        dispatch(signUpAsync({ data, setError }));
    };
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError('');
    };
    const handleHidden = () => {
        setHidden(!hidden);
    };
    const handleHiddenRepeat = () => {
        setHiddenRepeat(!hiddenRepeat);
    };
    const validateEmail = (string) => {
        const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        return regex.test(string);
    };
    return (
        <div className={Styles[`main`]}>
            <img className={Styles[`logo`]} src="/images/logo-app.png" alt="core code" />
            <form className={Styles[`form`]} onSubmit={handleSubmit}>
                <p className={Styles[`title`]}>Register to enter</p>
                <div className='container-input'>
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
                
                <div className={Styles[`full-name`]}>
                    <input
                        className={Styles[`form-input2`]}
                        type="text"
                        name="first_name"
                        value={data.first_name}
                        onChange={handleChange}
                        placeholder="First Name"
                    />
                    <input
                        className={Styles[`form-input2`]}
                        type="text"
                        name="last_name"
                        value={data.last_name}
                        onChange={handleChange}
                        placeholder="Last Name"
                    />
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
                <div className={Styles[`form-div-password`]}>
                    <input
                        className={Styles[`form-input`]}
                        type={hiddenRepeat ? 'text' : 'password'}
                        style={
                            data.password !== data.password_repeat &&
                            data.password_repeat !== '' &&
                            data.password !== ''
                                ? { border: '1px solid #D83341' }
                                : {}
                        }
                        name="password_repeat"
                        value={data.password_repeat}
                        onChange={handleChange}
                        placeholder="Repeat Password"
                    />
                    {hiddenRepeat ? (
                        <AiOutlineEyeInvisible
                            className={Styles[`form-icon-eye`]}
                            onClick={handleHiddenRepeat}
                        />
                    ) : (
                        <AiOutlineEye
                            className={Styles[`form-icon-eye`]}
                            onClick={handleHiddenRepeat}
                        />
                    )}
                    {data.password !== data.password_repeat &&
                        data.password !== '' &&
                        data.password_repeat !== '' && (
                            <p className={Styles[`form-error`]}>
                                <BiError className={Styles[`form-icon-error`]} />
                                password is not the same
                            </p>
                        )}
                </div>
                <button
                    className={Styles[`form-button`]}
                    disabled={
                        !data.email ||
                        !data.first_name ||
                        !data.last_name ||
                        !data.password ||
                        !data.password_repeat ||
                        data.password_repeat !== data.password ||
                        !validateEmail(data.email)
                    }
                    type="submit"
                >
                    Sign Up
                </button>
                <div className={Styles[`additional-text`]}>
                    <p className={Styles[`additional-text2`]}>
                        Already have an account?{' '}
                        <Link to="/log-in" className={Styles[`additional-link`]}>
                            Sign Up
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
            <img className={Styles[`logo-footer`]} src="/images/group-1.png" alt="core code" />
        </div>
    );
};

export default LogIn;

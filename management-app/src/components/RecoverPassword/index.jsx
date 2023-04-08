import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Styles from './RecoverPassword.module.css';
import axios from 'axios';
//icons
import { BiError } from 'react-icons/bi';
import { MdOutlineMarkEmailRead } from 'react-icons/md';

const RecoverPassword = () => {
    const [successful, setSuccessful] = useState('');
    const [data, setData] = useState({
        email: ''
    });
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('/api/management/user/recover-password', data);
            if (response.data.successful) {
                setSuccessful(response.data.message);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('server error');
        }
    };
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError('');
    };
    const validateEmail = (string) => {
        const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        return regex.test(string);
    };
    return (
        <form className={Styles[`form`]} onSubmit={handleSubmit}>
            <p className={Styles[`title`]}>Reset password</p>
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
            <button
                className={Styles[`form-button`]}
                disabled={!data.email || !validateEmail(data.email) || successful}
                type="submit"
            >
                Reset Password
            </button>
            <div className={Styles[`additional-text`]}>
                <p className={Styles[`additional-text2`]}>
                    Already have an account?{' '}
                    <Link to="/log-in" className={Styles[`additional-link`]}>
                        Login
                    </Link>
                </p>
                {error && !successful && (
                    <p className={Styles[`form-error`]}>
                        <BiError className={Styles[`form-icon-error`]} />
                        {error}
                    </p>
                )}
                {successful && (
                    <p className={Styles[`form-successful`]}>
                        <MdOutlineMarkEmailRead className={Styles[`form-icon-error`]} />
                        {successful}
                    </p>
                )}
            </div>
        </form>
    );
};

export default RecoverPassword;

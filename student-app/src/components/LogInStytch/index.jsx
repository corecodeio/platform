import React, { useState } from 'react';
import Styles from './LogInStych.module.css';
//import { useDispatch } from 'react-redux';
import axios from 'axios';
//actions
//import { logInAsync } from './../../redux/actions/auth';
//icons
import { BiError } from 'react-icons/bi';

const LogInStych = () => {
    //const dispatch = useDispatch();
    const [data, setData] = useState({
        email: ''
    });
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            try {
                const response = await axios.post('/api/student/user/log-in', data);
                if (response.data.successful) {
                    //window.localStorage.setItem('st_tk', response.data.token);
                    /*axios.defaults.headers.common[
                        'Authorization'
                    ] = `Bearer ${response.data.token}`;*/
                    console.log('good');
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('server error');
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
            <button
                className={Styles[`form-button`]}
                disabled={!data.email || !validateEmail(data.email)}
                type="submit"
            >
                Login
            </button>
            {error && (
                <div className={Styles[`additional-text`]}>
                    <p className={Styles[`form-error`]}>
                        <BiError className={Styles[`form-icon-error`]} />
                        {error}
                    </p>
                </div>
            )}
        </form>
    );
};

export default LogInStych;

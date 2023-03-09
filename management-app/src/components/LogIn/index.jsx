import React, { useState } from 'react';
import Styles from './LogIn.module.css';
import { useDispatch } from 'react-redux';
import { logIn } from './../../redux/authSlice';
import axios from 'axios';

const LogIn = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/management/staff/log-in', data);
            if (response.data.successful) {
                window.localStorage.setItem('mgmt_tk', `Bearer ${response.data.token}`);
                dispatch(logIn(response.data.user));
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError('');
    };
    return (
        <form className={Styles[`container`]} onSubmit={handleSubmit}>
            <img
                className={Styles[`logo`]}
                src="/images/logo-core-code-color.png"
                alt="core code"
            />
            <p className={Styles[`title`]}>¡Hola otra vez! 👋</p>
            <p>Continuá tu experiencia en Henry plataforma</p>
            <input
                className={Styles[`form-input`]}
                type="text"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                className={Styles[`form-input`]}
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Contraseña"
            />
            <button
                className={Styles[`form-button`]}
                disabled={!data.email || !data.password}
                type="submit"
            >
                Ingresar
            </button>
            {error && <p className={Styles[`form-error`]}>{error}</p>}
        </form>
    );
};

export default LogIn;

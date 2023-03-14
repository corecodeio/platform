import React, { useState } from 'react';
import Styles from './LogIn.module.css';
import { useDispatch } from 'react-redux';
//actions
import { logInAsync } from './../../redux/actions/auth';

const LogIn = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(logInAsync({ data, setError }));
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

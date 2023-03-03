import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
            const response = await axios.post('/api_student_v1/user/log-in', data);
            if (response.data.successful) {
                window.localStorage.setItem('core_code_tk', `Bearer ${response.data.token}`);
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
            <div className={Styles[`full-remember`]}>
                <Link className={Styles[`form-link`]} to="/forgot-password">
                    Olvidé mi contraseña
                </Link>
            </div>
            <button
                className={Styles[`form-button`]}
                disabled={!data.email || !data.password}
                type="submit"
            >
                Ingresar
            </button>
            {error && <p className={Styles[`form-error`]}>{error}</p>}
            <p>
                ¿Aún no tienes una cuenta?{' '}
                <Link className={Styles[`form-link`]} to="/sign-up">
                    Regístrate aquí
                </Link>
            </p>
        </form>
    );
};

export default LogIn;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Styles from './SignUp.module.css';
import countries from './countries';
import { useDispatch } from 'react-redux';
import { logIn } from './../../redux/authSlice';
import axios from 'axios';

const SignUp = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        country: 'Argentina',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api_student_v1/user/sign-up', data);
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
    };
    return (
        <form className={Styles[`container`]} onSubmit={handleSubmit}>
            <img
                className={Styles[`logo`]}
                src="/images/logo-core-code-color.png"
                alt="core code"
            />
            <p className={Styles[`title`]}>Despega tu futuro🚀</p>
            <p>Regístrate para ingresar a nuestra plataforma</p>
            <div className={Styles[`full-name`]}>
                <input
                    className={Styles[`form-input`]}
                    type="text"
                    name="first_name"
                    value={data.first_name}
                    onChange={handleChange}
                    placeholder="Nombre"
                />
                <input
                    className={Styles[`form-input`]}
                    type="text"
                    name="last_name"
                    value={data.last_name}
                    onChange={handleChange}
                    placeholder="Apellido"
                />
            </div>
            <select
                className={Styles[`form-input`]}
                onChange={handleChange}
                name="country"
                value={data.country}
            >
                {countries.map((country, index) => {
                    return (
                        <option key={index} value={country}>
                            {country}
                        </option>
                    );
                })}
            </select>
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
                disabled={
                    !data.email ||
                    !data.password ||
                    !data.first_name ||
                    !data.last_name ||
                    !data.country
                }
                className={Styles[`form-button`]}
                type="submit"
            >
                Registrarme
            </button>
            {error && <p className={Styles[`form-error`]}>{error}</p>}
            <p>
                ¿Ya tienes una cuenta?{' '}
                <Link className={Styles[`form-link`]} to="/log-in">
                    Ingresa aquí
                </Link>
            </p>
        </form>
    );
};

export default SignUp;

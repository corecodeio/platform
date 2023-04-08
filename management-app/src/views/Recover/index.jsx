import React, { useState, useEffect } from 'react';
import Styles from './LogIn.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Navigate, Link } from 'react-router-dom';
//icons
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';
//actions
import { resetPasswordAsync } from './../../redux/actions/auth';

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth } = useSelector((state) => state.auth);
    const [hidden, setHidden] = useState(false);
    const [data, setData] = useState({
        password: '',
        token: null
    });
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        dispatch(resetPasswordAsync({ data, setError }));
    };
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError('');
    };
    const handleHidden = () => {
        setHidden(!hidden);
    };
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('token');
        if (!token) {
            navigate('/');
        } else {
            setData({ ...data, token: token });
        }
        // eslint-disable-next-line
    }, []);

    if (isAuth) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <div className={Styles[`main`]}>
            <form className={Styles[`form`]} onSubmit={handleSubmit}>
                <p className={Styles[`title`]}>Reset password</p>
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
                <button className={Styles[`form-button`]} disabled={!data.password} type="submit">
                    Reset password
                </button>
                <div className={Styles[`additional-text`]}>
                    <p className={Styles[`additional-text2`]}>
                        Do you remember your password?{' '}
                        <Link to="/log-in" className={Styles[`additional-link`]}>
                            Home
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
        </div>
    );
};

export default LogIn;

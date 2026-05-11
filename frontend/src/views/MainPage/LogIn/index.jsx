import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//icons
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';
//actions
import { logInAsync } from './../../../redux/actions/auth';

const inputClass =
    'mt-2.5 mb-1.5 w-full rounded border border-[#cadbe3] bg-white px-4 py-3 font-["SourceSansPro-Regular"] text-lg text-[#335065] outline-none placeholder:text-[#7291a0] focus:border-[#6254ff]';
const invalidInputClass = 'border-[#d83341] focus:border-[#d83341]';
const errorClass =
    'flex items-center gap-1 font-["SourceSansPro-Regular"] text-sm text-[#d83341]';

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
    const isInvalidEmail = !validateEmail(data.email) && data.email !== '';

    return (
        <form
            className="flex w-[90%] flex-col md:w-[80%] xl:w-[68%]"
            onSubmit={handleSubmit}
        >
            <p className="mb-5 font-['Rubik-Bold'] text-[28px] leading-tight text-[#0d1e38]">
                ¡Hola otra vez! 👋
            </p>
            <div className="flex flex-col">
                <input
                    className={`${inputClass} ${isInvalidEmail ? invalidInputClass : ''}`}
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                {isInvalidEmail && (
                    <p className={errorClass}>
                        <BiError />
                        Invalid email. Please try again.
                    </p>
                )}
            </div>
            <div className="relative">
                <input
                    className={`${inputClass} pr-12`}
                    type={hidden ? 'text' : 'password'}
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button
                    aria-label={hidden ? 'Hide password' : 'Show password'}
                    className="absolute right-4 top-[22px] text-[#7291a0] transition hover:text-[#335065]"
                    type="button"
                    onClick={handleHidden}
                >
                    {hidden ? (
                        <AiOutlineEyeInvisible className="h-6 w-6" />
                    ) : (
                        <AiOutlineEye className="h-6 w-6" />
                    )}
                </button>
            </div>
            <p className="mb-5 w-full text-right font-['SourceSansPro-Regular'] text-sm">
                <Link
                    to="/recover-password"
                    className="font-['SourceSansPro-Bold'] text-[#2764ff] no-underline hover:underline"
                >
                    Olvidé mi contraseña
                </Link>
            </p>
            <button
                className="my-2.5 h-[47px] rounded border-0 bg-[#6254ff] font-['SourceSansPro-Regular'] text-base text-white transition enabled:hover:cursor-pointer enabled:hover:bg-[#5145e6] disabled:bg-[#f0f0f0] disabled:text-[#7291a0]"
                disabled={!data.email || !data.password || !validateEmail(data.email)}
                type="submit"
            >
                Login
            </button>
            <div className="h-auto w-full">
                <p className="mt-5 text-center font-['SourceSansPro-Regular'] text-sm">
                    ¿Aún no tienes una cuenta?{' '}
                    <Link
                        to="/sign-up"
                        className="font-['SourceSansPro-Bold'] text-[#2764ff] no-underline hover:underline"
                    >
                        Regístrate aquí
                    </Link>
                </p>
                {error && (
                    <p className={`${errorClass} mt-2.5 w-full text-[13px]`}>
                        <BiError className="h-5 w-5" />
                        {error}
                    </p>
                )}
            </div>
        </form>
    );
};

export default LogIn;

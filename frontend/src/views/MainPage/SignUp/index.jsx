import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//icons
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';
//actions
import { signUpAsync } from './../../../redux/actions/auth';

const SignUp = () => {
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
        dispatch(signUpAsync({ data, setError }));
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
    const emailInvalid = !validateEmail(data.email) && data.email !== '';

    const inputClasses = `mt-2 mb-1 w-full rounded border bg-white px-4 py-3 text-lg text-[#335065] outline-none transition focus:border-[#6254ff] focus:ring-2 focus:ring-[#6254ff]/20 ${
        emailInvalid ? 'border-[#D83341]' : 'border-[#cadbe3]'
    }`;

    return (
        <form className="flex w-[90%] flex-col md:w-4/5 xl:w-[68%]" onSubmit={handleSubmit}>
            <p className="mb-2 text-[28px] leading-tight text-[#0d1e38] [font-family:'Rubik-Bold',serif]">
                Despega tu futuro 🚀
            </p>
            <p className="mb-8 text-lg text-[#0d1e38] [font-family:'SourceSansPro-SemiBold',serif]">
                Regístrate para ingresar a nuestra plataforma
            </p>
            <div className="flex flex-col">
                <label className="sr-only" htmlFor="signup-email">
                    Email
                </label>
                <input
                    id="signup-email"
                    className={inputClasses}
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Email"
                    aria-invalid={emailInvalid}
                />
                {emailInvalid && (
                    <p className="flex items-center gap-1 text-sm text-[#D83341]">
                        <BiError aria-hidden="true" />
                        Invalid email. Please try again.
                    </p>
                )}
            </div>
            <div className="relative">
                <label className="sr-only" htmlFor="signup-password">
                    Password
                </label>
                <input
                    id="signup-password"
                    className="mt-2 mb-1 w-full rounded border border-[#cadbe3] bg-white py-3 pl-4 pr-12 text-lg text-[#335065] outline-none transition focus:border-[#6254ff] focus:ring-2 focus:ring-[#6254ff]/20"
                    type={hidden ? 'text' : 'password'}
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button
                    aria-label={hidden ? 'Hide password' : 'Show password'}
                    className="absolute right-4 top-[22px] text-2xl text-[#7291a0] transition hover:text-[#335065] focus:outline-none focus:ring-2 focus:ring-[#6254ff]/30"
                    type="button"
                    onClick={handleHidden}
                >
                    {hidden ? (
                        <AiOutlineEyeInvisible aria-hidden="true" />
                    ) : (
                        <AiOutlineEye aria-hidden="true" />
                    )}
                </button>
            </div>
            <button
                className="mb-3 mt-3 h-[47px] rounded border-0 bg-[#6254ff] text-base text-white transition hover:bg-[#5145d9] disabled:bg-[#f0f0f0] disabled:text-[#8f9aa3]"
                disabled={!data.email || !data.password || !validateEmail(data.email)}
                type="submit"
            >
                Registrarme
            </button>
            <div className="min-h-[76px] w-full">
                <p className="mt-6 text-center text-sm text-[#335065]">
                    ¿Ya tienes una cuenta?{' '}
                    <Link
                        to="/log-in"
                        className="font-semibold text-[#2764ff] no-underline transition hover:text-[#1d4ed8]"
                    >
                        Ingresa aquí
                    </Link>
                </p>
                {error && (
                    <p className="mt-3 flex w-full items-center rounded text-sm text-[#D83341]">
                        <BiError className="mr-1 h-5 w-5" aria-hidden="true" />
                        {error}
                    </p>
                )}
            </div>
        </form>
    );
};

export default SignUp;

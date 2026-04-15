import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';
import { signUpAsync } from './../../../redux/actions/auth';

const SignUp = () => {
    const dispatch = useDispatch();
    const [hidden, setHidden] = useState(false);
    const [data, setData] = useState({ email: '', password: '' });
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

    return (
        <div className="min-h-screen bg-transparent flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">
                    Despega tu futuro 🚀
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Regístrate para ingresar a nuestra plataforma
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 text-left">Email</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                        emailInvalid ? 'border-red-300 text-red-900' : 'border-gray-300'
                                    }`}
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                />
                                {emailInvalid && (
                                    <div className="mt-2 flex items-center text-sm text-red-600">
                                        <BiError className="mr-1" />
                                        Invalid email. Please try again.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 text-left">Password</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    type={hidden ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder="********"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={handleHidden}>
                                    {hidden ? <AiOutlineEyeInvisible className="h-5 w-5 text-gray-400" /> : <AiOutlineEye className="h-5 w-5 text-gray-400" />}
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={!data.email || !data.password || !validateEmail(data.email)}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                Registrarme
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">¿Ya tienes una cuenta?</span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link to="/log-in" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Ingresa aquí
                            </Link>
                        </div>
                        
                        {error && (
                            <div className="mt-4 p-2 bg-red-50 rounded-md flex items-center text-sm text-red-600 text-left">
                                <BiError className="mr-2 h-5 w-5 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

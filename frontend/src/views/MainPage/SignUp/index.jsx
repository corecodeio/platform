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

    const isEmailInvalid = !validateEmail(data.email) && data.email !== '';
    const isFormDisabled = !data.email || !data.password || !validateEmail(data.email);

    return (
        <form className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col space-y-6" onSubmit={handleSubmit}>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Despega tu futuro 🚀</h1>
                <p className="text-sm text-gray-500">Regístrate para ingresar a nuestra plataforma</p>
            </div>
            
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col w-full relative">
                    <input
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${isEmailInvalid ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'}`}
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    {isEmailInvalid && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <BiError className="text-lg" />
                            Invalid email. Please try again.
                        </p>
                    )}
                </div>
                
                <div className="flex flex-col w-full relative">
                    <input
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors pr-12"
                        type={hidden ? 'text' : 'password'}
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    <button 
                        type="button"
                        onClick={handleHidden}
                        className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {hidden ? (
                            <AiOutlineEyeInvisible className="text-xl" />
                        ) : (
                            <AiOutlineEye className="text-xl" />
                        )}
                    </button>
                </div>
            </div>

            <button
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${isFormDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
                disabled={isFormDisabled}
                type="submit"
            >
                Registrarme
            </button>
            
            <div className="flex flex-col items-center pt-2">
                <p className="text-sm text-gray-600">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/log-in" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors">
                        Ingresa aquí
                    </Link>
                </p>
                {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 w-full">
                        <BiError className="text-xl flex-shrink-0" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}
            </div>
        </form>
    );
};

export default SignUp;

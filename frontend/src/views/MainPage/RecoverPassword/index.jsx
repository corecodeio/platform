import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//icons
import { BiError } from 'react-icons/bi';
import { MdOutlineMarkEmailRead, MdOutlineArrowBack } from 'react-icons/md';

const inputClass =
    'mt-2.5 mb-1.5 w-full rounded border border-[#cadbe3] bg-white px-4 py-3 font-["SourceSansPro-Regular"] text-lg text-[#335065] outline-none placeholder:text-[#7291a0] focus:border-[#6254ff]';
const invalidInputClass = 'border-[#d83341] focus:border-[#d83341]';
const messageClass =
    'mt-2.5 flex w-full items-center gap-1 font-["SourceSansPro-Regular"] text-[13px]';

const RecoverPassword = () => {
    const navigate = useNavigate();
    const [successful, setSuccessful] = useState('');
    const [data, setData] = useState({
        email: ''
    });
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('/api/user/recover-password', data);
            if (response.data.successful) {
                setSuccessful(response.data.message);
            } else {
                setError(response.data.message);
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
    const isInvalidEmail = !validateEmail(data.email) && data.email !== '';

    return (
        <form
            className="flex w-[90%] flex-col md:w-[80%] xl:w-[68%]"
            onSubmit={handleSubmit}
        >
            <button
                className="mb-8 flex w-fit items-center text-[#0d1e38] transition hover:text-[#2764ff]"
                type="button"
                onClick={() => navigate('/log-in')}
            >
                <MdOutlineArrowBack className="h-6 w-6" />
                <span className="ml-2 font-['SourceSansPro-SemiBold'] text-lg">Volver</span>
            </button>
            <p className="mb-5 font-['Rubik-Bold'] text-[28px] leading-tight text-[#0d1e38]">
                Recuperar contraseña
            </p>
            <p className="mb-8 font-['SourceSansPro-SemiBold'] text-lg leading-snug text-[#0d1e38]">
                Escribí tu mail y te enviaremos un correo para crear una nueva contraseña.
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
                    <p className="flex items-center gap-1 font-['SourceSansPro-Regular'] text-sm text-[#d83341]">
                        <BiError />
                        Invalid email. Please try again.
                    </p>
                )}
            </div>
            <button
                className="my-2.5 h-[47px] rounded border-0 bg-[#6254ff] font-['SourceSansPro-Regular'] text-base text-white transition enabled:hover:cursor-pointer enabled:hover:bg-[#5145e6] disabled:bg-[#f0f0f0] disabled:text-[#7291a0]"
                disabled={!data.email || !validateEmail(data.email) || successful}
                type="submit"
            >
                Recuperar contraseña
            </button>
            <div className="h-auto w-full">
                {error && !successful && (
                    <p className={`${messageClass} text-[#d83341]`}>
                        <BiError className="h-5 w-5" />
                        {error}
                    </p>
                )}
                {successful && (
                    <p className={`${messageClass} text-[#0b790b]`}>
                        <MdOutlineMarkEmailRead className="h-5 w-5" />
                        {successful}
                    </p>
                )}
            </div>
        </form>
    );
};

export default RecoverPassword;

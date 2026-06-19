import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//icons
import { BiError } from 'react-icons/bi';
import { MdOutlineMarkEmailRead, MdOutlineArrowBack } from 'react-icons/md';

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

    const hasInvalidEmail = !validateEmail(data.email) && data.email !== '';

    return (
        <form
            className="flex w-[90%] max-w-md flex-col sm:w-4/5 xl:w-[68%]"
            onSubmit={handleSubmit}
        >
            <button
                type="button"
                className="mb-8 flex w-fit items-center text-[#0D1E38] transition hover:text-[#2764ff]"
                onClick={() => navigate('/log-in')}
            >
                <MdOutlineArrowBack className="h-6 w-6" />
                <span className="ml-2 font-['SourceSansPro-SemiBold'] text-lg">Volver</span>
            </button>
            <h1 className="mb-4 font-['Rubik-Bold'] text-[28px] leading-tight text-[#0d1e38]">
                Recuperar contraseña
            </h1>
            <p className="mb-8 font-['SourceSansPro-SemiBold'] text-lg leading-6 text-[#0d1e38]">
                Escribí tu mail y te enviaremos un correo para crear una nueva contraseña.
            </p>
            <div className="flex flex-col">
                <input
                    className={`mt-2 mb-1 w-full rounded border bg-white px-4 py-3 font-['SourceSansPro-Regular'] text-lg text-[#335065] outline-none transition placeholder:text-[#7291a0] focus:border-[#6254ff] ${
                        hasInvalidEmail ? 'border-[#D83341]' : 'border-[#cadbe3]'
                    }`}
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                {hasInvalidEmail && (
                    <p className="flex items-center font-['SourceSansPro-Regular'] text-sm text-[#d83341]">
                        <BiError className="mr-1 h-4 w-4 shrink-0" />
                        Invalid email. Please try again.
                    </p>
                )}
            </div>
            <button
                className="mt-5 mb-3 h-12 rounded bg-[#6254ff] px-4 font-['SourceSansPro-Regular'] text-base text-white transition enabled:hover:bg-[#5144d9] disabled:cursor-not-allowed disabled:bg-[#f0f0f0] disabled:text-[#9aa8b2]"
                disabled={!data.email || !validateEmail(data.email) || successful}
                type="submit"
            >
                Recuperar contraseña
            </button>
            <div className="min-h-[76px] w-full">
                {error && !successful && (
                    <p className="mt-2 flex items-start rounded bg-[#fff5f6] p-3 font-['SourceSansPro-Regular'] text-sm text-[#d83341]">
                        <BiError className="mr-2 mt-0.5 h-5 w-5 shrink-0" />
                        <span>{error}</span>
                    </p>
                )}
                {successful && (
                    <p className="mt-2 flex items-start rounded bg-[#f1fbf1] p-3 font-['SourceSansPro-Regular'] text-sm text-[#0b790b]">
                        <MdOutlineMarkEmailRead className="mr-2 mt-0.5 h-5 w-5 shrink-0" />
                        <span>{successful}</span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default RecoverPassword;

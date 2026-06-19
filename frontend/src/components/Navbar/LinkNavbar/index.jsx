import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LinkNavbar = ({ to, text, close, path = '' }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const active = `/${path}/${to}` === pathname;
    const handlerClicks = () => {
        navigate(`/${path}/${to}`);
        if (close) {
            close();
        }
    };
    return (
        <button
            className={`mr-8 flex items-start rounded-full border-0 px-2.5 py-2.5 text-sm text-white max-[800px]:ml-4 max-[800px]:mr-0 max-[800px]:p-[14.8px] max-[800px]:text-xl ${
                active ? 'bg-[#335065]' : 'bg-transparent'
            }`}
            onClick={handlerClicks}
            type="button"
        >
            {text}
        </button>
    );
};

export default LinkNavbar;

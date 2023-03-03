import React from 'react';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
    const navigate = useNavigate();
    return (
        <>
            <button onClick={() => navigate('/')}>Volver a Inicio</button>
        </>
    );
};

export default Authentication;

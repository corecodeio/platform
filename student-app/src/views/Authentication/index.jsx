import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from './../Loading';
import axios from 'axios';

const Authentication = () => {
    const [responseSuccessful, setResponseSuccessful] = useState(false);
    const [message, setMessage] = useState('');
    const { activate_token } = useParams();
    const navigate = useNavigate();

    const activateToken = async () => {
        try {
            const response = await axios.post(
                '/api_student_v1/user/validate-email',
                {},
                {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${activate_token}`
                    }
                }
            );
            if (response.data.successful) {
                navigate('/dashboard');
            } else {
                setResponseSuccessful(true);
                setMessage(response.data.message);
            }
        } catch (error) {
            navigate('/');
        }
    };

    useEffect(() => {
        activateToken();
    }, []);

    if (!responseSuccessful) {
        return <Loading />;
    }

    return (
        <>
            <p>{message}</p>
            <button onClick={() => navigate('/')}>Volver a Inicio</button>
        </>
    );
};

export default Authentication;

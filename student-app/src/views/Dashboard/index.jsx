import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
//components
import Navbar from '../../components/Navbar';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.surveyID && location.pathname === '/dashboard') {
            navigate('/dashboard/questions');
        }
        if (user.surveyID && location.pathname === '/dashboard') {
            navigate('/dashboard/postulation');
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default Dashboard;

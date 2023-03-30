import React from 'react';
import { Outlet } from 'react-router-dom';
//components
import Navbar from '../../components/Navbar';

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default Dashboard;

import React from 'react';
import { Outlet } from 'react-router-dom';
//styles
import Styles from './Dashboard.module.css';
//components
import Navbar from '../../components/Navbar';
import Footer from './../../components/Footer';

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <div className={Styles[`main`]}>
                <div className={Styles[`container`]}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;

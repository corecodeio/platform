import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
//styles
import Styles from './Admin.module.css';
//components
import Navbar from '../../components/Navbar';
import Footer from './../../components/Footer';
//icons
import { IoCloseCircleOutline } from 'react-icons/io5';

const Admin = () => {
    const { user } = useSelector((state) => state.auth);
    const [alert, setAlert] = useState(!user.first_name || !user.last_name);
    const options = [
        { to: 'statistics', text: 'Statistics', permissions: ['read:dashboard'] },
        { to: 'courses', text: 'Courses', permissions: ['read:dashboard', 'read:course'] },
        {
            to: 'permissions-and-roles',
            text: 'Roles and Permissions',
            permissions: ['read:dashboard', 'read:permission', 'read:role']
        },
        { to: 'events', text: 'Events', permissions: ['read:dashboard', 'read:event'] }
    ];
    return (
        <>
            <Navbar options={options} path="admin" />
            {alert && (
                <p className={Styles[`validate-information`]}>
                    <IoCloseCircleOutline
                        className={Styles[`validate-icon`]}
                        onClick={() => setAlert(false)}
                    />
                    Recuerda que para utilizar la plataforma es necesario completar algunos datos en
                    configuración y validar tu correo electrónico.
                </p>
            )}
            <div className={Styles[`main-${alert ? '0' : '1'}`]}>
                <div className={Styles[`container`]}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Admin;

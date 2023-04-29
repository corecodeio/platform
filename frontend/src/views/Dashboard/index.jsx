import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
//styles
import Styles from './Dashboard.module.css';
//components
import Navbar from '../../components/Navbar';
import Footer from './../../components/Footer';
//icons
import { IoCloseCircleOutline } from 'react-icons/io5';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [alert, setAlert] = useState(!user.first_name || !user.last_name);
    const options = [
        { to: 'my-courses', text: 'Mis Cursos', permissions: [] },
        { to: 'available-courses', text: 'Cursos Disponibles', permissions: [] },
        { to: 'postulations', text: 'Postulaciones', permissions: [] },
        { to: 'community', text: 'Comunidad', permissions: [] }
    ];
    return (
        <>
            <Navbar options={options} path="dashboard" />
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

export default Dashboard;

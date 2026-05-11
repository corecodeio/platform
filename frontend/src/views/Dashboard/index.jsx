import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
//components
import Navbar from '../../components/Navbar';
import Footer from './../../components/Footer';
//icons
import { IoCloseCircleOutline } from 'react-icons/io5';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [alert, setAlert] = useState(true);
    const needsAccountInfo = !user.first_name || !user.last_name;
    const showAccountAlert = needsAccountInfo && alert;
    const options = [
        { to: 'my-courses', text: 'Mis Cursos', permissions: [] },
        { to: 'available-courses', text: 'Cursos Disponibles', permissions: [] },
        { to: 'postulations', text: 'Postulaciones', permissions: [] },
        { to: 'community', text: 'Comunidad', permissions: [] }
    ];

    return (
        <>
            <Navbar options={options} path="dashboard" />
            {showAccountAlert && (
                <p className="mx-auto flex h-14 w-full items-center justify-center bg-[#d83341] px-3 text-center font-['SourceSansPro-SemiBold'] text-[13px] text-white sm:h-[30px] sm:text-sm">
                    <IoCloseCircleOutline
                        className="mr-1.5 h-[26px] w-[26px] shrink-0 cursor-pointer sm:h-5 sm:w-5"
                        onClick={() => setAlert(false)}
                    />
                    Recuerda que para utilizar la plataforma es necesario completar algunos datos en
                    configuración y validar tu correo electrónico.
                </p>
            )}
            <div
                className={
                    showAccountAlert
                        ? 'min-h-[calc(100%_-_164px)] w-full overflow-y-auto bg-white sm:min-h-[calc(100%_-_174px)]'
                        : 'min-h-[calc(100%_-_108px)] w-full overflow-y-auto bg-white sm:min-h-[calc(100%_-_144px)]'
                }
            >
                <div className="mx-auto h-full min-h-full w-[90%] max-w-[1236px] text-[#0f1f39]">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;

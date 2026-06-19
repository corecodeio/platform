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
    const showProfileAlert = (!user.first_name || !user.last_name) && alert;
    const options = [
        { to: 'my-courses', text: 'Mis Cursos', permissions: [] },
        { to: 'available-courses', text: 'Cursos Disponibles', permissions: [] },
        { to: 'postulations', text: 'Postulaciones', permissions: [] },
        { to: 'community', text: 'Comunidad', permissions: [] }
    ];
    return (
        <>
            <Navbar options={options} path="dashboard" />
            {showProfileAlert && (
                <p className="mx-auto flex h-[30px] w-full items-center justify-center bg-[#d83341] text-sm text-white [font-family:'SourceSansPro-SemiBold',serif] max-[800px]:h-14 max-[800px]:px-3 max-[800px]:text-[13px]">
                    <button
                        className="mr-1.5 border-0 bg-transparent p-0 text-white max-[800px]:mx-1.5"
                        onClick={() => setAlert(false)}
                        type="button"
                        aria-label="Cerrar alerta"
                    >
                        <IoCloseCircleOutline
                            className="h-5 w-5 max-[800px]:h-[26px] max-[800px]:w-[26px]"
                            aria-hidden="true"
                        />
                    </button>
                    Recuerda que para utilizar la plataforma es necesario completar algunos datos en
                    configuración y validar tu correo electrónico.
                </p>
            )}
            <div
                className={`w-full overflow-y-auto bg-white ${
                    showProfileAlert
                        ? 'min-h-[calc(100%_-_174px)] max-[800px]:min-h-[calc(100%_-_164px)]'
                        : 'min-h-[calc(100%_-_144px)] max-[800px]:min-h-[calc(100%_-_108px)]'
                }`}
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

import React, { useState } from 'react';
import Styles from './Dashboard.module.css';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
//components
import Navbar from './../../components/Navbar';
import Sidebar from './../../components/Sidebar';

const Dashboard = () => {
    const { mode } = useSelector((state) => state.auth);
    const [menu, setMenu] = useState(false);
    return (
        <>
            <Navbar setMenu={setMenu} />
            <div className={Styles[`container-main-${mode}`]}>
                <Sidebar menu={menu} setMenu={setMenu} />
                <div className={Styles[`container-component`]}>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Dashboard;

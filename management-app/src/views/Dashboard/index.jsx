import React, { useState } from 'react';
import Styles from './Dashboard.module.css';
import { Outlet } from 'react-router-dom';
//components
import Navbar from './../../components/Navbar';
import Sidebar from './../../components/Sidebar';
import Footer from './../../components/Footer';

const Dashboard = () => {
    const [menu, setMenu] = useState(false);
    return (
        <>
            <Navbar setMenu={setMenu} />
            <div className={Styles[`main`]}>
                <div className={Styles[`container`]}>
                    <Sidebar menu={menu} setMenu={setMenu} />
                    <div className={Styles[`container-component`]}>
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;

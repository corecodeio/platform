import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
//styles
import Styles from './Navbar.module.css';
//components
import LinkNavbar from './LinkNavbar';
import MenuNavbar from './MenuNavbar';
//actions
import { logOut } from './../../redux/actions/auth';
//icons
import { BiMenu } from 'react-icons/bi';
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
const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const [menu, setMenu] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogOut = () => {
        dispatch(logOut());
    };

    return (
        <>
            {menu && <MenuNavbar setMenu={setMenu} options={options} />}
            <div className={Styles[`main`]}>
                <div className={Styles[`navbar`]}>
                    <div className={Styles[`menu-left`]}>
                        <img
                            className={Styles[`logo`]}
                            src="/images/logo-app-dark.png"
                            alt="core code"
                            onClick={() => navigate('/dashboard')}
                        />
                        <div className={Styles[`menu-left-option`]}>
                            {options.map((link, index) =>
                                link.permissions.every((permission) =>
                                    user.permissions.includes(permission)
                                ) ? (
                                    <LinkNavbar
                                        to={link.to}
                                        text={link.text}
                                        key={`options-desk-${index}`}
                                    />
                                ) : null
                            )}
                        </div>
                    </div>
                    <div className={Styles[`menu-right`]}>
                        <Link className={Styles[`link`]} to="setting">
                            Configuración
                        </Link>
                        <p className={Styles[`logout`]} onClick={handleLogOut}>
                            Logout
                        </p>
                    </div>
                    <BiMenu className={Styles[`menu-mobile`]} onClick={() => setMenu(true)} />
                </div>
            </div>
        </>
    );
};

export default Navbar;

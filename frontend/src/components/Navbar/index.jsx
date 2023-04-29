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

const Navbar = ({ options = [], path = '' }) => {
    const { user } = useSelector((state) => state.auth);
    const [menu, setMenu] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogOut = () => {
        dispatch(logOut());
    };
    return (
        <>
            {menu && <MenuNavbar setMenu={setMenu} options={options} path={path} />}
            <div className={Styles[`main`]}>
                <div className={Styles[`navbar`]}>
                    <div className={Styles[`menu-left`]}>
                        <img
                            className={Styles[`logo`]}
                            src="/images/logo-core-code.png"
                            alt="core code"
                            onClick={() => navigate('/dashboard')}
                        />
                        <div className={Styles[`menu-left-option`]}>
                            {options.map((link, index) => {
                                return link.permissions.every((permission) =>
                                    user.permissions.includes(permission)
                                ) ? (
                                    <LinkNavbar
                                        path={path}
                                        to={link.to}
                                        text={link.text}
                                        key={`options-desk-${index}`}
                                    />
                                ) : null;
                            })}
                        </div>
                    </div>
                    <div className={Styles[`menu-right`]}>
                        {user.permissions &&
                            ['read:dashboard'].every((permission) =>
                                user.permissions.includes(permission)
                            ) && (
                                <Link className={Styles[`link`]} to="/admin">
                                    Admin
                                </Link>
                            )}
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

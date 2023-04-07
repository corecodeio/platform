import React from 'react';
import Styles from './Navbar.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//actions
import { logOut } from './../../redux/actions/auth';
//icons
import { BiMenu } from 'react-icons/bi';

const Navbar = ({ setMenu }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogOut = () => {
        dispatch(logOut());
    };
    return (
        <div className={Styles[`main`]}>
            <div className={Styles[`navbar`]}>
                <div className={Styles[`menu-left`]}>
                    <BiMenu className={Styles[`menu-mobile`]} onClick={() => setMenu(true)} />
                    <img
                        className={Styles[`logo`]}
                        src="/images/logo-app-dark.png"
                        alt="core code"
                        onClick={() => navigate('/dashboard')}
                    />
                </div>
                <div className={Styles[`menu-right`]}>
                    <p className={Styles[`logout`]} onClick={handleLogOut}>
                        Logout
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

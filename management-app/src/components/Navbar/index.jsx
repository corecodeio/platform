import React from 'react';
import Styles from './Navbar.module.css';
import { useDispatch } from 'react-redux';
import { logOut } from './../../redux/actions/auth';
import { useNavigate } from 'react-router-dom';
//icons
import { AiOutlineMail } from 'react-icons/ai';
import { IoNotificationsOutline } from 'react-icons/io5';
import { BsListCheck } from 'react-icons/bs';
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
                    <BiMenu className={Styles[`menu-mobile`]} onClick={()=>setMenu(true)}/>
                    <img
                        className={Styles[`logo`]}
                        src="/images/logo-app-dark.png"
                        alt="core code"
                        onClick={() => navigate('/dashboard')}
                    />
                </div>
                <div className={Styles[`menu-right`]}>
                    <div className={Styles[`container-icon`]}>
                        <IoNotificationsOutline className={Styles[`icon`]} />
                        <p className={Styles[`text-notifications`]}>5</p>
                    </div>
                    <div className={Styles[`container-icon`]}>
                        <BsListCheck className={Styles[`icon`]} />
                        <p className={Styles[`text-applications`]}>18</p>
                    </div>
                    <div className={Styles[`container-icon`]}>
                        <AiOutlineMail className={Styles[`icon`]} />
                        <p className={Styles[`text-messages`]}>100</p>
                    </div>
                    <p className={Styles[`logout`]} onClick={handleLogOut}>
                        Logout
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

import React from 'react';
import Styles from './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, logOut } from './../../redux/actions/auth';
import { useNavigate } from 'react-router-dom';
//icons
import { TbPointFilled } from 'react-icons/tb';
import { CgMenuGridR } from 'react-icons/cg';
import { AiOutlineMail } from 'react-icons/ai';
import { IoNotificationsOutline } from 'react-icons/io5';
import { BsListCheck } from 'react-icons/bs';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { BiMenu } from 'react-icons/bi';

const Navbar = ({ setMenu }) => {
    const { mode, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div className={Styles[`container-${mode}`]}>
            <div className={Styles[`menu-left-${mode}`]}>
                <BiMenu className={Styles[`menu-left-mobile`]} onClick={() => setMenu(true)} />
                <img
                    className={Styles[`logo`]}
                    src="/images/logo.png"
                    alt="logo"
                    onClick={() => navigate('/dashboard')}
                />
                <div className={Styles[`mode`]} onClick={() => dispatch(setMode())}>
                    <TbPointFilled className={Styles[`mode-icon-${mode}`]} />
                </div>
            </div>
            <div className={Styles[`menu-right`]}>
                <div className={Styles[`menu-right-container-${mode}`]}>
                    <IoNotificationsOutline className={Styles[`menu-right-container-icon`]} />
                    <p className={Styles[`menu-right-container-notifications`]}>5</p>
                </div>
                <div className={Styles[`menu-right-container-${mode}`]}>
                    <BsListCheck className={Styles[`menu-right-container-icon`]} />
                    <p className={Styles[`menu-right-container-applicants`]}>23</p>
                </div>
                <div className={Styles[`menu-right-container-${mode}`]}>
                    <AiOutlineMail className={Styles[`menu-right-container-icon`]} />
                    <p className={Styles[`menu-right-container-messages`]}>100</p>
                </div>
                <img
                    className={Styles[`menu-right-profile`]}
                    src="/profile/avatar-template.png"
                    alt="profile"
                />
                <p
                    className={Styles[`menu-right-name`]}
                >{`${user.first_name} ${user.last_name}`}</p>
                <div className={Styles[`menu-right-config`]}>
                    <CgMenuGridR className={Styles[`menu-right-config-icon-${mode}`]} />
                    <div className={Styles[`menu-right-config-options-${mode}`]}>
                        <p className={Styles[`menu-right-config-options-p`]}>
                            <FiSettings className={Styles[`menu-right-config-options-icon`]} />
                            Configuracion de cuenta
                        </p>
                        <p
                            className={Styles[`menu-right-config-options-p`]}
                            onClick={() => dispatch(logOut())}
                        >
                            <FiLogOut className={Styles[`menu-right-config-options-icon`]} />
                            Cerrar Session
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

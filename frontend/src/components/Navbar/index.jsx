import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
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
            <div className="flex h-24 w-full items-center justify-center bg-[#233d54] max-[800px]:h-[60px]">
                <div className="mb-4 mt-auto flex w-[90%] max-w-[1236px] items-center justify-between text-sm text-[#ebf3f7] [font-family:'SourceSansPro-Regular',serif] max-[800px]:m-auto">
                    <div className="flex items-center">
                        <button
                            className="mr-[54px] w-[132px] shrink-0 border-0 bg-transparent p-0"
                            onClick={() => navigate('/dashboard')}
                            type="button"
                            aria-label="Ir al dashboard"
                        >
                            <img
                                className="w-full select-none"
                                src="/images/logo-core-code.png"
                                alt="core code"
                            />
                        </button>
                        <div className="flex max-[800px]:hidden">
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
                    <div className="flex items-center justify-center max-[800px]:hidden">
                        {user.permissions &&
                            ['read:dashboard'].every((permission) =>
                                user.permissions.includes(permission)
                            ) && (
                                <Link className="mr-8 text-[#ebf3f7] no-underline" to="/admin">
                                    Admin
                                </Link>
                            )}
                        <Link className="mr-8 text-[#ebf3f7] no-underline" to="setting">
                            Configuración
                        </Link>
                        <button
                            className="border-0 bg-transparent p-0 text-[#ebf3f7]"
                            onClick={handleLogOut}
                            type="button"
                        >
                            Logout
                        </button>
                    </div>
                    <button
                        className="hidden border-0 bg-transparent p-0 text-[#ebf3f7] max-[800px]:block"
                        onClick={() => setMenu(true)}
                        type="button"
                        aria-label="Abrir menu"
                    >
                        <BiMenu className="h-[30px] w-[30px]" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Navbar;

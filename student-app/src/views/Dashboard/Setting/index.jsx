import React, { useState } from 'react';
import { useSelector } from 'react-redux';
//styles
import Styles from './Setting.module.css';
//icons
import { MdOutlineEdit, MdOutlineEditOff } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';

const Setting = () => {
    const { user } = useSelector((state) => state.auth);
    const [first_name, setFirst_name] = useState(false);
    const [last_name, setLast_name] = useState(false);
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({
        first_name: user.first_name,
        last_name: user.last_name
    });
    const handleChangeAccount = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleChangeProfile = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    };
    return (
        <>
            <form className={Styles[`main`]} onSubmit={handleSubmit}>
                <div className={Styles[`head`]}>
                    <p className={Styles[`title`]}>Información de cuenta</p>
                    <button
                        className={Styles[`form-button`]}
                        type="submit"
                        disabled={!first_name && !last_name}
                    >
                        Guardar
                    </button>
                </div>
                <div className={Styles[`row1`]}>
                    <div className={Styles[`form-data`]}>
                        <label htmlFor="first_name" className={Styles[`form-data-description`]}>
                            Nombre*:
                        </label>
                        <div className={Styles[`form-data-container`]}>
                            {first_name ? (
                                <>
                                    <input
                                        className={Styles[`form-input`]}
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        value={data.first_name}
                                        onChange={handleChangeAccount}
                                        placeholder="First name"
                                    />
                                    <MdOutlineEditOff
                                        className={Styles[`form-icon`]}
                                        onClick={() => {
                                            setData({ ...data, first_name: user.first_name });
                                            setFirst_name(false);
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <p>{data.first_name ? data.first_name : 'First name'}</p>
                                    <MdOutlineEdit
                                        className={Styles[`form-icon`]}
                                        onClick={() => setFirst_name(true)}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <div className={Styles[`form-data`]}>
                        <label htmlFor="last_name" className={Styles[`form-data-description`]}>
                            Apellido*:
                        </label>
                        <div className={Styles[`form-data-container`]}>
                            {last_name ? (
                                <>
                                    <input
                                        className={Styles[`form-input`]}
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={data.last_name}
                                        onChange={handleChangeAccount}
                                        placeholder="Last name"
                                    />
                                    <MdOutlineEditOff
                                        className={Styles[`form-icon`]}
                                        onClick={() => {
                                            setData({ ...data, last_name: user.last_name });
                                            setLast_name(false);
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <p>{data.last_name ? data.last_name : 'Last name'}</p>
                                    <MdOutlineEdit
                                        className={Styles[`form-icon`]}
                                        onClick={() => setLast_name(true)}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className={Styles[`row2`]}>
                    <div className={Styles[`form-data-2`]}>
                        <p className={Styles[`form-data-description`]}>Email:</p>
                        <div className={Styles[`form-data-container`]}>
                            <p>{user.email}</p>
                            {user.confirmed_email ? (
                                <>
                                    <AiOutlineCheck className={Styles[`form-check`]} />
                                    <p className={Styles[`form-text-check`]}>(Verificado)</p>
                                </>
                            ) : (
                                <button>confirmar email</button>
                            )}
                        </div>
                    </div>
                </div>
                <div className={Styles[`row1`]}>
                    <div className={Styles[`form-data-2`]}>
                        <p className={Styles[`form-data-description`]}>Telefono:</p>
                        <div className={Styles[`form-data-container`]}>
                            {user.phone ? user.phone : <button>Agregar Numero</button>}
                        </div>
                    </div>
                </div>
            </form>
            <form className={Styles[`main`]} onSubmit={handleSubmit}>
                <div className={Styles[`head`]}>
                    <p className={Styles[`title`]}>Detalles del perfil</p>
                    <div>
                        {edit ? (
                            <>
                                <button
                                    className={Styles[`form-button2`]}
                                    onClick={() => setEdit(false)}
                                >
                                    Cancelar
                                </button>
                                <button className={Styles[`form-button`]} type="submit">
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <button className={Styles[`form-button`]} onClick={() => setEdit(true)}>
                                Editar
                            </button>
                        )}
                    </div>
                </div>
                <div className={Styles[`row1`]}>
                    <input
                        className={Styles[`form-input`]}
                        type="text"
                        name="first_name"
                        value={data.first_name}
                        onChange={handleChangeProfile}
                        placeholder="First name"
                    />
                </div>
                <div className={Styles[`row2`]}>
                    <input
                        className={Styles[`form-input`]}
                        type="text"
                        name="first_name"
                        value={data.first_name}
                        onChange={handleChangeProfile}
                        placeholder="First name"
                    />
                </div>
                <div className={Styles[`row1`]}>
                    <p>{user.email}</p>
                </div>
                <div className={Styles[`row2`]}>
                    <input
                        className={Styles[`form-input`]}
                        type="text"
                        name="first_name"
                        value={data.first_name}
                        onChange={handleChangeProfile}
                        placeholder="First name"
                    />
                </div>
                <div className={Styles[`row1`]}>
                    <input
                        className={Styles[`form-input`]}
                        type="text"
                        name="first_name"
                        value={data.first_name}
                        onChange={handleChangeProfile}
                        placeholder="First name"
                    />
                </div>
                <div className={Styles[`row2`]}>
                    <input
                        className={Styles[`form-input`]}
                        type="text"
                        name="first_name"
                        value={data.first_name}
                        onChange={handleChangeProfile}
                        placeholder="First name"
                    />
                </div>
            </form>
        </>
    );
};

export default Setting;

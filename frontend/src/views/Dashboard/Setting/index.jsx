import React, { useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
//styles
import Styles from './Setting.module.css';
//actions
import { updateAccount, updateProfile, updatePhone } from './../../../redux/actions/auth';
//icons
import { MdOutlineEdit, MdOutlineEditOff } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
import { GiConfirmed, GiCancel } from 'react-icons/gi';
//components
import Modal from './../../../components/Modal';

const Setting = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [first_name, setFirst_name] = useState(false);
    const [modalPhone, setModalPhone] = useState(false);
    const [last_name, setLast_name] = useState(false);
    const [edit, setEdit] = useState(false);
    const [account, setAccount] = useState({
        first_name: '',
        last_name: ''
    });
    const [profile, setProfile] = useState({
        country: '',
        city: '',
        address: '',
        linkedin_url: ''
    });
    const [phone, setPhone] = useState(user.phone);
    const [editPhone, setEditPhone] = useState(false);
    const handleChangeAccount = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    };
    const handleChangeProfile = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };
    const handleSubmitAccount = async (e) => {
        e.preventDefault();
        try {
            const data = {
                first_name: first_name ? account.first_name : user.first_name,
                last_name: last_name ? account.last_name : user.last_name
            };
            const response = await axios.post('/api/user/update-account', data);
            if (response.data.successful) {
                dispatch(updateAccount(response.data.user));
                handleCancelAccount();
                enqueueSnackbar(response.data.message, { variant: 'success' });
            } else {
                enqueueSnackbar(response.data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('500 server error', { variant: 'error' });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    };
    const handleUpdateProfile = async (e) => {
        try {
            const response = await axios.post('/api/user/update-profile', profile);
            if (response.data.successful) {
                dispatch(updateProfile(response.data.user));
                handleCancelProfile();
                enqueueSnackbar(response.data.message, { variant: 'success' });
            } else {
                enqueueSnackbar(response.data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('500 server error', { variant: 'error' });
        }
    };
    const handlePhone = (e) => {
        setPhone(e.target.value);
    };
    const handleAddPhone = async () => {
        try {
            const data = {
                phone: phone
            };
            const response = await axios.post('/api/user/add-phone', data);
            if (response.data.successful) {
                dispatch(updatePhone(response.data.user));
                setEditPhone(false);
                enqueueSnackbar(response.data.message, { variant: 'success' });
            } else {
                enqueueSnackbar(response.data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('500 server error', { variant: 'error' });
        }
    };
    const handleOpenPhone = () => {
        setPhone('');
        setEditPhone(true);
    };
    const handleOpenProfile = () => {
        setProfile({
            country: user.country,
            city: user.city,
            address: user.address,
            linkedin_url: user.linkedin_url
        });
        setEdit(true);
    };
    const handleCancelProfile = () => {
        setEdit(false);
    };
    const handleOpenAccountFirstName = () => {
        setAccount({ ...account, first_name: user.first_name });
        setFirst_name(true);
    };
    const handleOpenAccountLastName = () => {
        setAccount({ ...account, last_name: user.last_name });
        setLast_name(true);
    };
    const handleCancelAccount = () => {
        setFirst_name(false);
        setLast_name(false);
    };
    useEffect(() => {
        setAccount({ ...account, first_name: user.first_name, last_name: user.last_name });
        setProfile({
            ...profile,
            country: user.country,
            city: user.city,
            address: user.address,
            linkedin_url: user.linkedin_url
        });
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Modal isShow={modalPhone}>
                <button onClick={() => setModalPhone(false)}>cerrar</button>
                <p>sssssssssssss</p>
            </Modal>
            <form className={Styles[`main`]} onSubmit={handleSubmit}>
                <div className={Styles[`head`]}>
                    <p className={Styles[`title`]}>Información de cuenta</p>
                    <button
                        className={Styles[`form-button`]}
                        type="submit"
                        onClick={handleSubmitAccount}
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
                                        value={account.first_name}
                                        onChange={handleChangeAccount}
                                        placeholder="First name"
                                    />
                                    <MdOutlineEditOff
                                        className={Styles[`form-icon`]}
                                        onClick={() => setFirst_name(false)}
                                    />
                                </>
                            ) : (
                                <>
                                    <p>{user.first_name ? user.first_name : 'First name'}</p>
                                    <MdOutlineEdit
                                        className={Styles[`form-icon`]}
                                        onClick={handleOpenAccountFirstName}
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
                                        value={account.last_name}
                                        onChange={handleChangeAccount}
                                        placeholder="Last name"
                                    />
                                    <MdOutlineEditOff
                                        className={Styles[`form-icon`]}
                                        onClick={() => setLast_name(false)}
                                    />
                                </>
                            ) : (
                                <>
                                    <p>{user.last_name ? user.last_name : 'Last name'}</p>
                                    <MdOutlineEdit
                                        className={Styles[`form-icon`]}
                                        onClick={handleOpenAccountLastName}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className={Styles[`row2`]}>
                    <div className={Styles[`form-data-2`]}>
                        <p className={Styles[`form-data-description`]}>Email*:</p>
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
                        <label htmlFor="phone" className={Styles[`form-data-description`]}>
                            Telefono:
                        </label>
                        <div className={Styles[`form-data-container`]}>
                            {user.phone ? (
                                <>
                                    <AiOutlineCheck className={Styles[`form-check`]} />
                                    <p className={Styles[`form-text-check`]}>(Verificado)</p>
                                    <button>eliminar</button>
                                </>
                            ) : (
                                <button onClick={handleOpenPhone}>Agregar Numero</button>
                            )}
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
                                    onClick={handleCancelProfile}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className={Styles[`form-button`]}
                                    onClick={handleUpdateProfile}
                                >
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <button
                                className={Styles[`form-button`]}
                                type="button"
                                onClick={handleOpenProfile}
                            >
                                Editar
                            </button>
                        )}
                    </div>
                </div>
                <div className={Styles[`row1`]}>
                    <div className={Styles[`form-data`]}>
                        <label htmlFor="country" className={Styles[`form-data-description`]}>
                            País:
                        </label>
                        <div className={Styles[`form-data-container`]}>
                            {edit ? (
                                <>
                                    <input
                                        className={Styles[`form-input`]}
                                        type="text"
                                        id="country"
                                        name="country"
                                        value={profile.country}
                                        onChange={handleChangeProfile}
                                        placeholder="País"
                                    />
                                </>
                            ) : (
                                <>
                                    <p>{user.country}</p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={Styles[`form-data`]}>
                        <label htmlFor="city" className={Styles[`form-data-description`]}>
                            Ciudad:
                        </label>
                        <div className={Styles[`form-data-container`]}>
                            {edit ? (
                                <>
                                    <input
                                        className={Styles[`form-input`]}
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={profile.city}
                                        onChange={handleChangeProfile}
                                        placeholder="Ciudad"
                                    />
                                </>
                            ) : (
                                <>
                                    <p>{user.city}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className={Styles[`row2`]}>
                    <div className={Styles[`form-data-2`]}>
                        <label htmlFor="city" className={Styles[`form-data-description`]}>
                            Dirección:
                        </label>
                        <div className={Styles[`form-data-container`]}>
                            {edit ? (
                                <>
                                    <input
                                        className={Styles[`form-input`]}
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={profile.address}
                                        onChange={handleChangeProfile}
                                        placeholder="Dirección"
                                    />
                                </>
                            ) : (
                                <>
                                    <p>{user.address}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className={Styles[`row1`]}>
                    <div className={Styles[`form-data-2`]}>
                        <label htmlFor="linkedin_url" className={Styles[`form-data-description`]}>
                            Linkedin:
                        </label>
                        <div className={Styles[`form-data-container`]}>
                            {edit ? (
                                <>
                                    <input
                                        className={Styles[`form-input`]}
                                        type="text"
                                        id="linkedin_url"
                                        name="linkedin_url"
                                        value={profile.linkedin_url}
                                        onChange={handleChangeProfile}
                                        placeholder="Linkedin"
                                    />
                                </>
                            ) : (
                                <>
                                    <p>{user.linkedin_url}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Setting;

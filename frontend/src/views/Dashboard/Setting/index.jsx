import React, { useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
//actions
import { updateAccount, updateProfile, updatePhone } from './../../../redux/actions/auth';
//icons
import { MdOutlineEdit, MdOutlineEditOff } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
//components
import Modal from './../../../components/Modal';

const sectionClassName = 'flex w-full flex-col';
const headerClassName =
    'mt-9 mb-[34px] flex w-full flex-col gap-4 bg-white sm:flex-row sm:items-center sm:justify-between';
const titleClassName = "font-['Rubik-SemiBold'] text-2xl text-[#0d1e38] sm:text-[32px]";
const primaryButtonClassName =
    "h-[47px] w-[131px] rounded border border-[#6254ff] bg-[#6254ff] font-['SourceSansPro-SemiBold'] text-lg text-white transition-colors enabled:hover:bg-[#5144e5] disabled:border-[#f0f0f0] disabled:bg-[#f0f0f0]";
const secondaryButtonClassName =
    "h-[47px] w-[131px] rounded border border-[#6254ff] bg-white font-['SourceSansPro-SemiBold'] text-lg text-[#6254ff] transition-colors hover:bg-[#f0efff]";
const rowClassName =
    'grid min-h-[75px] w-full grid-cols-1 gap-4 px-4 py-4 sm:px-[25px] md:grid-cols-2 md:items-center md:py-0';
const fullRowClassName =
    'grid min-h-[75px] w-full grid-cols-1 gap-4 px-4 py-4 sm:px-[25px] md:items-center md:py-0';
const fieldClassName = 'flex min-w-0 flex-col';
const labelClassName =
    "mb-1 font-['SourceSansPro-SemiBold'] text-sm text-[#0d1e38]";
const controlClassName =
    "flex min-h-[38px] min-w-0 flex-wrap items-center gap-x-1.5 gap-y-2 font-['SourceSansPro-Regular'] text-base text-[#335065]";
const inputClassName =
    "w-full rounded border border-[#cadbe3] bg-white px-2.5 py-2.5 font-['SourceSansPro-Regular'] text-base text-[#335065] outline-none placeholder:text-[#335065]/60";
const editIconClassName = 'h-[22px] w-[22px] shrink-0 cursor-pointer text-[#335065]';
const checkIconClassName = 'h-[22px] w-[22px] shrink-0 text-green-700';
const checkTextClassName =
    "select-none font-['SourceSansPro-Regular'] text-xs text-green-700";
const inlineButtonClassName =
    "rounded border border-[#6254ff] px-3 py-1.5 font-['SourceSansPro-SemiBold'] text-sm text-[#6254ff] transition-colors hover:bg-[#f0efff]";

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
        e.preventDefault();
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
                <button type="button" onClick={() => setModalPhone(false)}>
                    cerrar
                </button>
                <p>sssssssssssss</p>
            </Modal>
            <form className={sectionClassName} onSubmit={handleSubmit}>
                <div className={headerClassName}>
                    <p className={titleClassName}>Información de cuenta</p>
                    <button
                        className={primaryButtonClassName}
                        type="submit"
                        onClick={handleSubmitAccount}
                        disabled={!first_name && !last_name}
                    >
                        Guardar
                    </button>
                </div>
                <div className={`${rowClassName} bg-[#ebf3f7]`}>
                    <div className={fieldClassName}>
                        <label htmlFor="first_name" className={labelClassName}>
                            Nombre*:
                        </label>
                        <div className={controlClassName}>
                            {first_name ? (
                                <>
                                    <input
                                        className={inputClassName}
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        value={account.first_name}
                                        onChange={handleChangeAccount}
                                        placeholder="First name"
                                    />
                                    <MdOutlineEditOff
                                        className={editIconClassName}
                                        onClick={() => setFirst_name(false)}
                                    />
                                </>
                            ) : (
                                <>
                                    <p className="min-w-0 break-words">
                                        {user.first_name ? user.first_name : 'First name'}
                                    </p>
                                    <MdOutlineEdit
                                        className={editIconClassName}
                                        onClick={handleOpenAccountFirstName}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <div className={fieldClassName}>
                        <label htmlFor="last_name" className={labelClassName}>
                            Apellido*:
                        </label>
                        <div className={controlClassName}>
                            {last_name ? (
                                <>
                                    <input
                                        className={inputClassName}
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={account.last_name}
                                        onChange={handleChangeAccount}
                                        placeholder="Last name"
                                    />
                                    <MdOutlineEditOff
                                        className={editIconClassName}
                                        onClick={() => setLast_name(false)}
                                    />
                                </>
                            ) : (
                                <>
                                    <p className="min-w-0 break-words">
                                        {user.last_name ? user.last_name : 'Last name'}
                                    </p>
                                    <MdOutlineEdit
                                        className={editIconClassName}
                                        onClick={handleOpenAccountLastName}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className={`${fullRowClassName} bg-white`}>
                    <div className={fieldClassName}>
                        <p className={labelClassName}>Email*:</p>
                        <div className={controlClassName}>
                            <p className="min-w-0 break-all">{user.email}</p>
                            {user.confirmed_email ? (
                                <>
                                    <AiOutlineCheck className={checkIconClassName} />
                                    <p className={checkTextClassName}>(Verificado)</p>
                                </>
                            ) : (
                                <button type="button" className={inlineButtonClassName}>
                                    confirmar email
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className={`${fullRowClassName} bg-[#ebf3f7]`}>
                    <div className={fieldClassName}>
                        <label htmlFor="phone" className={labelClassName}>
                            Telefono:
                        </label>
                        <div className={controlClassName}>
                            {user.phone ? (
                                <>
                                    <AiOutlineCheck className={checkIconClassName} />
                                    <p className={checkTextClassName}>(Verificado)</p>
                                    <button type="button" className={inlineButtonClassName}>
                                        eliminar
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    className={inlineButtonClassName}
                                    onClick={handleOpenPhone}
                                >
                                    Agregar Numero
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
            <form className={sectionClassName} onSubmit={handleSubmit}>
                <div className={headerClassName}>
                    <p className={titleClassName}>Detalles del perfil</p>
                    <div className="flex flex-wrap gap-3 sm:justify-end">
                        {edit ? (
                            <>
                                <button
                                    type="button"
                                    className={secondaryButtonClassName}
                                    onClick={handleCancelProfile}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className={primaryButtonClassName}
                                    onClick={handleUpdateProfile}
                                >
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <button
                                className={primaryButtonClassName}
                                type="button"
                                onClick={handleOpenProfile}
                            >
                                Editar
                            </button>
                        )}
                    </div>
                </div>
                <div className={`${rowClassName} bg-[#ebf3f7]`}>
                    <div className={fieldClassName}>
                        <label htmlFor="country" className={labelClassName}>
                            País:
                        </label>
                        <div className={controlClassName}>
                            {edit ? (
                                <input
                                    className={inputClassName}
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={profile.country}
                                    onChange={handleChangeProfile}
                                    placeholder="País"
                                />
                            ) : (
                                <p className="min-w-0 break-words">{user.country}</p>
                            )}
                        </div>
                    </div>
                    <div className={fieldClassName}>
                        <label htmlFor="city" className={labelClassName}>
                            Ciudad:
                        </label>
                        <div className={controlClassName}>
                            {edit ? (
                                <input
                                    className={inputClassName}
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={profile.city}
                                    onChange={handleChangeProfile}
                                    placeholder="Ciudad"
                                />
                            ) : (
                                <p className="min-w-0 break-words">{user.city}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className={`${fullRowClassName} bg-white`}>
                    <div className={fieldClassName}>
                        <label htmlFor="address" className={labelClassName}>
                            Dirección:
                        </label>
                        <div className={controlClassName}>
                            {edit ? (
                                <input
                                    className={inputClassName}
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={profile.address}
                                    onChange={handleChangeProfile}
                                    placeholder="Dirección"
                                />
                            ) : (
                                <p className="min-w-0 break-words">{user.address}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className={`${fullRowClassName} bg-[#ebf3f7]`}>
                    <div className={fieldClassName}>
                        <label htmlFor="linkedin_url" className={labelClassName}>
                            Linkedin:
                        </label>
                        <div className={controlClassName}>
                            {edit ? (
                                <input
                                    className={inputClassName}
                                    type="text"
                                    id="linkedin_url"
                                    name="linkedin_url"
                                    value={profile.linkedin_url}
                                    onChange={handleChangeProfile}
                                    placeholder="Linkedin"
                                />
                            ) : (
                                <p className="min-w-0 break-all">{user.linkedin_url}</p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Setting;

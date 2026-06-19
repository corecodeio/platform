import React, { useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
//actions
import { updateAccount, updateProfile, updatePhone } from './../../../redux/actions/auth';
//icons
import { MdOutlineEdit, MdOutlineEditOff } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';

const primaryButton =
    'rounded border border-[#6254ff] bg-[#6254ff] px-6 py-3 text-lg text-white transition hover:bg-[#5145d9] disabled:border-[#f0f0f0] disabled:bg-[#f0f0f0] disabled:text-[#9aa6ad]';
const secondaryButton =
    'rounded border border-[#6254ff] bg-white px-6 py-3 text-lg text-[#6254ff] transition hover:bg-[#6254ff]/10';
const rowBase = 'grid w-full gap-4 px-4 py-4 md:px-6 md:py-5';
const rowMuted = `${rowBase} bg-[#ebf3f7]`;
const rowPair = `${rowMuted} md:grid-cols-2`;
const rowFull = `${rowBase} bg-white`;
const fieldBlock = 'flex min-w-0 flex-col';
const labelClass = "mb-1 text-sm text-[#0d1e38] [font-family:'SourceSansPro-SemiBold',serif]";
const fieldShell = 'flex min-h-[38px] min-w-0 items-center gap-2 text-[#335065]';
const inputClass =
    'min-h-[42px] w-full min-w-0 rounded border border-[#cadbe3] bg-white px-3 py-2 text-base text-[#335065] outline-none focus:border-[#6254ff]';
const iconButton =
    'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded text-[#335065] transition hover:bg-[#cadbe3]/60';
const sectionTitle = "text-2xl text-[#0d1e38] [font-family:'Rubik-SemiBold',serif] md:text-[32px]";

const Setting = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [first_name, setFirst_name] = useState(false);
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
    const handleSubmit = (e) => {
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
    const handleCancelPhone = () => {
        setPhone(user.phone || '');
        setEditPhone(false);
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
            <form className="flex w-full flex-col" onSubmit={handleSubmit}>
                <div className="mt-9 mb-8 flex w-full flex-col gap-4 bg-white md:flex-row md:items-center md:justify-between">
                    <p className={sectionTitle}>Información de cuenta</p>
                    <button
                        className={primaryButton}
                        type="submit"
                        onClick={handleSubmitAccount}
                        disabled={!first_name && !last_name}
                    >
                        Guardar
                    </button>
                </div>
                <div className={rowPair}>
                    <div className={fieldBlock}>
                        <label htmlFor="first_name" className={labelClass}>
                            Nombre*:
                        </label>
                        <div className={fieldShell}>
                            {first_name ? (
                                <>
                                    <input
                                        className={inputClass}
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        value={account.first_name}
                                        onChange={handleChangeAccount}
                                        placeholder="First name"
                                    />
                                    <button
                                        className={iconButton}
                                        onClick={() => setFirst_name(false)}
                                        type="button"
                                        aria-label="Cancelar edición de nombre"
                                    >
                                        <MdOutlineEditOff className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p className="min-w-0 truncate">
                                        {user.first_name ? user.first_name : 'First name'}
                                    </p>
                                    <button
                                        className={iconButton}
                                        onClick={handleOpenAccountFirstName}
                                        type="button"
                                        aria-label="Editar nombre"
                                    >
                                        <MdOutlineEdit className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={fieldBlock}>
                        <label htmlFor="last_name" className={labelClass}>
                            Apellido*:
                        </label>
                        <div className={fieldShell}>
                            {last_name ? (
                                <>
                                    <input
                                        className={inputClass}
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={account.last_name}
                                        onChange={handleChangeAccount}
                                        placeholder="Last name"
                                    />
                                    <button
                                        className={iconButton}
                                        onClick={() => setLast_name(false)}
                                        type="button"
                                        aria-label="Cancelar edición de apellido"
                                    >
                                        <MdOutlineEditOff className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p className="min-w-0 truncate">
                                        {user.last_name ? user.last_name : 'Last name'}
                                    </p>
                                    <button
                                        className={iconButton}
                                        onClick={handleOpenAccountLastName}
                                        type="button"
                                        aria-label="Editar apellido"
                                    >
                                        <MdOutlineEdit className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className={rowFull}>
                    <div className={fieldBlock}>
                        <p className={labelClass}>Email*:</p>
                        <div className={`${fieldShell} flex-wrap`}>
                            <p className="min-w-0 break-all">{user.email}</p>
                            {user.confirmed_email ? (
                                <>
                                    <AiOutlineCheck
                                        className="h-5 w-5 shrink-0 text-green-700"
                                        aria-hidden="true"
                                    />
                                    <p className="text-xs text-green-700">(Verificado)</p>
                                </>
                            ) : (
                                <button className={secondaryButton} type="button">
                                    confirmar email
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className={rowMuted}>
                    <div className={fieldBlock}>
                        <label htmlFor="phone" className={labelClass}>
                            Telefono:
                        </label>
                        <div className={`${fieldShell} flex-wrap`}>
                            {editPhone ? (
                                <>
                                    <input
                                        className={inputClass}
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={phone || ''}
                                        onChange={handlePhone}
                                        placeholder="Agregar Numero"
                                    />
                                    <button
                                        className={secondaryButton}
                                        onClick={handleCancelPhone}
                                        type="button"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className={primaryButton}
                                        onClick={handleAddPhone}
                                        type="button"
                                        disabled={!phone}
                                    >
                                        Guardar
                                    </button>
                                </>
                            ) : user.phone ? (
                                <>
                                    <p className="min-w-0 break-all">{user.phone}</p>
                                    <AiOutlineCheck
                                        className="h-5 w-5 shrink-0 text-green-700"
                                        aria-hidden="true"
                                    />
                                    <p className="text-xs text-green-700">(Verificado)</p>
                                    <button className={secondaryButton} type="button">
                                        eliminar
                                    </button>
                                </>
                            ) : (
                                <button
                                    className={secondaryButton}
                                    onClick={handleOpenPhone}
                                    type="button"
                                >
                                    Agregar Numero
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
            <form className="flex w-full flex-col" onSubmit={handleSubmit}>
                <div className="mt-9 mb-8 flex w-full flex-col gap-4 bg-white md:flex-row md:items-center md:justify-between">
                    <p className={sectionTitle}>Detalles del perfil</p>
                    <div className="flex flex-wrap gap-3">
                        {edit ? (
                            <>
                                <button
                                    className={secondaryButton}
                                    onClick={handleCancelProfile}
                                    type="button"
                                >
                                    Cancelar
                                </button>
                                <button
                                    className={primaryButton}
                                    onClick={handleUpdateProfile}
                                    type="submit"
                                >
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <button
                                className={primaryButton}
                                type="button"
                                onClick={handleOpenProfile}
                            >
                                Editar
                            </button>
                        )}
                    </div>
                </div>
                <div className={rowPair}>
                    <div className={fieldBlock}>
                        <label htmlFor="country" className={labelClass}>
                            País:
                        </label>
                        <div className={fieldShell}>
                            {edit ? (
                                <>
                                    <input
                                        className={inputClass}
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
                                    <p className="min-w-0 truncate">{user.country}</p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={fieldBlock}>
                        <label htmlFor="city" className={labelClass}>
                            Ciudad:
                        </label>
                        <div className={fieldShell}>
                            {edit ? (
                                <>
                                    <input
                                        className={inputClass}
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
                                    <p className="min-w-0 truncate">{user.city}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className={rowFull}>
                    <div className={fieldBlock}>
                        <label htmlFor="address" className={labelClass}>
                            Dirección:
                        </label>
                        <div className={fieldShell}>
                            {edit ? (
                                <>
                                    <input
                                        className={inputClass}
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
                                    <p className="min-w-0 break-words">{user.address}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className={rowMuted}>
                    <div className={fieldBlock}>
                        <label htmlFor="linkedin_url" className={labelClass}>
                            Linkedin:
                        </label>
                        <div className={fieldShell}>
                            {edit ? (
                                <>
                                    <input
                                        className={inputClass}
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
                                    <p className="min-w-0 break-all">{user.linkedin_url}</p>
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

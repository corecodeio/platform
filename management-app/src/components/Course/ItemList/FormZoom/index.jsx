import React, { useState } from 'react';
import Styles from './FormZoom.module.css';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
//components
import Portal from './../../../Portal';
//icons
import { BiSave } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

const FormZoom = ({ item, setOpenZoom, searchList, type }) => {
    const [inputZoom, setInputZoom] = useState(
        type === 'zoom_url'
            ? item.zoom_url
                ? item.zoom_url
                : ''
            : item.zoom_code
            ? item.zoom_code
            : ''
    );
    const [portalZoom, setPortalZoom] = useState(false);
    const handleZoom = (e) => {
        setInputZoom(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setPortalZoom(true);
    };
    const handleSaveZoom = async () => {
        try {
            const token = window.localStorage.getItem('mgmt_tk');
            const response = await axios.put(
                '/api/management/course/',
                {
                    id: item.id,
                    [type]: inputZoom
                },
                {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: token
                    }
                }
            );
            if (response.data.successful) {
                enqueueSnackbar('successfully edited course', { variant: 'success' });
                searchList();
                setOpenZoom(false);
            } else {
                enqueueSnackbar(response.data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('500 server error', { variant: 'error' });
        }
        setPortalZoom(false);
    };
    return (
        <>
            <form className={Styles[`zoom-${type}`]} onSubmit={handleSubmit}>
                <input
                    className={Styles[`input-zoom`]}
                    type="text"
                    name="input_zoom"
                    value={inputZoom}
                    onChange={handleZoom}
                    placeholder={`zoom ${type === 'zoom_url' ? 'link' : 'code'}`}
                />
                <BiSave className={Styles[`icon-zoom`]} onClick={handleSubmit} />
                <RxCross2 className={Styles[`icon-zoom`]} onClick={() => setOpenZoom(false)} />
            </form>
            <Portal
                isShown={portalZoom}
                element={
                    <div className={Styles[`notification`]}>
                        <RxCross2
                            className={Styles[`notification-close`]}
                            onClick={() => setPortalZoom(false)}
                        />
                        <p className={Styles[`notification-title`]}>Confirm change</p>
                        <div className={Styles[`notification-container`]}>
                            <p>
                                <strong>{item.name}</strong>
                                <br />
                                {`confirm that you want to save the zoom ${
                                    type === 'zoom_url' ? 'link' : 'code'
                                } change`}
                            </p>
                            <p className={Styles[`notification-strong`]}>{inputZoom}</p>
                        </div>
                        <div className={Styles[`options-button-zoom`]}>
                            <button className={Styles[`button-zoom`]} onClick={handleSaveZoom}>
                                Accept
                            </button>
                            <button
                                className={Styles[`button-zoom`]}
                                onClick={() => setPortalZoom(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                }
            />
        </>
    );
};

export default FormZoom;

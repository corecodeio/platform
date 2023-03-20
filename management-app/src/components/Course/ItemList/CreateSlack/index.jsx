import React, { useState } from 'react';
import Styles from './CreateSlack.module.css';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
//components
import Portal from './../../../Portal';
//icons
import { BiSave } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

const CreateSlack = ({ item, setOpenCreateSlack, searchList }) => {
    const structureName = (string) => {
        let name = string;
        name = name.toLowerCase();
        name = name.split(' ').join('-');
        name = name.split('.').join('-');
        return name;
    };
    const [inputChannelSlack, setInputChannelSlack] = useState(structureName(item.name));
    const [portal, setPortal] = useState(false);
    const handleChange = (e) => {
        setInputChannelSlack(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setPortal(true);
    };
    const handleSave = async () => {
        try {
            const token = window.localStorage.getItem('mgmt_tk');
            const response = await axios.post(
                '/api/management/course/slack',
                {
                    id: item.id,
                    slack_name: inputChannelSlack
                },
                {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: token
                    }
                }
            );
            if (response.data.successful) {
                enqueueSnackbar('channel created successfully', { variant: 'success' });
                searchList();
                setOpenCreateSlack(false);
            } else {
                enqueueSnackbar(response.data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('500 server error', { variant: 'error' });
        }
        setPortal(false);
    };
    return (
        <>
            <form className={Styles[`form-slack`]} onSubmit={handleSubmit}>
                <input
                    className={Styles[`input-slack`]}
                    type="text"
                    name="channel_slack"
                    value={inputChannelSlack}
                    onChange={handleChange}
                    placeholder="slack name"
                />
                <BiSave className={Styles[`icon-slack`]} onClick={handleSubmit} />
                <RxCross2
                    className={Styles[`icon-slack`]}
                    onClick={() => setOpenCreateSlack(false)}
                />
            </form>
            <Portal
                isShown={portal}
                element={
                    <div className={Styles[`notification`]}>
                        <RxCross2
                            className={Styles[`notification-close`]}
                            onClick={() => setPortal(false)}
                        />
                        <p className={Styles[`notification-title`]}>Confirm change</p>
                        <div className={Styles[`notification-container`]}>
                            <p>
                                <strong>{item.name}</strong>
                                <br />
                                you want to confirm the slack name channel
                            </p>
                            <p className={Styles[`notification-strong`]}>{inputChannelSlack}</p>
                        </div>
                        <div className={Styles[`options-button-slack`]}>
                            <button className={Styles[`button-slack`]} onClick={handleSave}>
                                Accept
                            </button>
                            <button
                                className={Styles[`button-slack`]}
                                onClick={() => setPortal(false)}
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

export default CreateSlack;

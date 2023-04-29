import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
//styles
import Styles from './CreateSlack.module.css';
//icons
import { RxCross2 } from 'react-icons/rx';
//components
import Modal from './../../../../../../components/Modal';

const CreateSlack = ({ slackID, courseData }) => {
    const { user } = useSelector((state) => state.auth);
    const [modal, setModal] = useState(false);
    const [error, setError] = useState('');
    const [send, setSend] = useState(false);
    const [data, setData] = useState({
        slack_name: '',
        courseID: courseData.id
    });
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSend(true);
        try {
            const response = await axios.post('/api/course/slack', data);
            if (response.data.successful) {
                enqueueSnackbar('course created successfully', { variant: 'success' });
            } else {
                enqueueSnackbar(response.data.message, { variant: 'error' });
                setError(response.data.message);
            }
        } catch (error) {
            console.log(error);
            setError('500 server error');
        }
        setSend(false);
    };

    return slackID ? (
        <p>{slackID}</p>
    ) : ['write:course'].every((permission) => user.permissions.includes(permission)) ? (
        <>
            <Modal
                isShown={modal}
                element={
                    <div className={Styles[`main`]}>
                        <div className={Styles[`container`]}>
                            <RxCross2
                                className={Styles[`container-icon`]}
                                onClick={() => setModal(false)}
                            />
                            <p className={Styles[`container-title`]}>{courseData.name}</p>
                            <form className={Styles[`form`]} onSubmit={handleSubmit}>
                                <label htmlFor="slack_name">Slack channel name:</label>
                                <input
                                    className={Styles[`form-input`]}
                                    id="slack_name"
                                    type="text"
                                    name="slack_name"
                                    value={data.slack_name}
                                    onChange={handleChange}
                                    placeholder="Slack channel name..."
                                />
                                <button type="submit" disabled={send}>
                                    {!send ? 'Create' : 'Processing...'}
                                </button>
                                {error && <p>{error}</p>}
                            </form>
                        </div>
                    </div>
                }
            />
            <button className={Styles[`create-slack`]} onClick={() => setModal(true)}>
                create
            </button>
        </>
    ) : (
        <p>null</p>
    );
};

export default CreateSlack;

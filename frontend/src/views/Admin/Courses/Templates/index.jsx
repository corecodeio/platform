import React, { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
//styles
import Styles from './Templates.module.css';

const Templates = () => {
    const [error, setError] = useState('');
    const [send, setSend] = useState(false);
    const [data, setData] = useState({
        name: '',
        title: '',
        title_second: '',
        title_extra: '',
        type: '',
        duration: '',
        level: 1,
        technologies: '',
        price: '',
        minimum: 60,
        extra_alert: false
    });
    const handlechange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSend(true);
        try {
            const response = await axios.post('/api/template/', data);
            if (response.data.successful) {
                enqueueSnackbar('course created successfully', { variant: 'success' });
                setData({
                    ...data,
                    name: '',
                    title: '',
                    title_second: '',
                    title_extra: '',
                    type: '',
                    duration: '',
                    level: 1,
                    technologies: '',
                    price: '',
                    minimum: 60,
                    extra_alert: false,
                    templates: ''
                });
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
    return (
        <div className={Styles[`main`]}>
            <p className={Styles[`main-title`]}>New Template</p>
            <form onSubmit={handleSubmit} className={Styles[`form`]}>
                <div className={Styles[`form-input`]}>
                    <label htmlFor="name">Name*</label>
                    <input
                        onChange={handlechange}
                        id="name"
                        name="name"
                        type="text"
                        value={data.name}
                        placeholder="Name..."
                    />
                </div>
                <div className={Styles[`form-input`]}>
                    <label htmlFor="title">Title*</label>
                    <input
                        onChange={handlechange}
                        id="title"
                        name="title"
                        type="text"
                        value={data.title}
                        placeholder="Title..."
                    />
                </div>
                <div className={Styles[`form-input`]}>
                    <label htmlFor="title_second">Title Second</label>
                    <input
                        onChange={handlechange}
                        id="title_second"
                        name="title_second"
                        type="text"
                        value={data.title_second}
                        placeholder="Title Second..."
                    />
                </div>
                <div className={Styles[`form-input`]}>
                    <label htmlFor="title_extra">Title Extra</label>
                    <input
                        onChange={handlechange}
                        id="title_extra"
                        name="title_extra"
                        type="text"
                        value={data.title_extra}
                        placeholder="Title Extra..."
                    />
                </div>
                <div className={Styles[`form-input`]}>
                    <label htmlFor="type">Type*</label>
                    <input
                        onChange={handlechange}
                        id="type"
                        name="type"
                        type="text"
                        value={data.type}
                        placeholder="Title..."
                    />
                </div>
                <div className={Styles[`form-input`]}>
                    <label htmlFor="duration">Duration*</label>
                    <input
                        onChange={handlechange}
                        id="duration"
                        name="duration"
                        type="text"
                        value={data.duration}
                        placeholder="Duration..."
                    />
                </div>
                <div className={Styles[`form-input`]}>
                    <label htmlFor="level">Level*</label>
                    <input
                        onChange={handlechange}
                        id="level"
                        name="level"
                        type="number"
                        value={data.level}
                        placeholder="Level..."
                    />
                </div>
                <div className={Styles[`form-input`]}>
                    <label htmlFor="technologies">Technologies*</label>
                    <input
                        onChange={handlechange}
                        id="technologies"
                        name="technologies"
                        type="text"
                        value={data.technologies}
                        placeholder="Title..."
                    />
                </div>
                <div className={Styles[`form-input`]}>
                    <label htmlFor="price">Price*</label>
                    <input
                        onChange={handlechange}
                        id="price"
                        name="price"
                        type="text"
                        value={data.price}
                        placeholder="Title..."
                    />
                </div>
                <div className={Styles[`form-input`]}>
                    <label htmlFor="minimum">Minimum*</label>
                    <input
                        onChange={handlechange}
                        id="minimum"
                        name="minimum"
                        type="number"
                        value={data.minimum}
                        placeholder="Title..."
                    />
                </div>
                <button
                    type="submit"
                    className={Styles[`form-button`]}
                    disabled={
                        !data.name ||
                        !data.title ||
                        !data.type ||
                        !data.duration ||
                        !data.level ||
                        !data.technologies ||
                        !data.price ||
                        !data.minimum ||
                        send
                    }
                >
                    {!send ? 'Create template' : 'Processing...'}
                </button>
            </form>
        </div>
    );
};

export default Templates;

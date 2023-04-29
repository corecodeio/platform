import React, { useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
//styles
import Styles from './NewCourse.module.css';
//components
import CourseCard from './CourseCard';

const NewCourse = () => {
    const [error, setError] = useState('');
    const [templates, setTemplates] = useState([]);
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
        extra_alert: false,
        templates: ''
    });
    const handlechange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSend(true);
        try {
            const response = await axios.post('/api/course', data);
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
    const handleTemplate = (e) => {
        let newData = templates.filter((template) => template.name === e.target.value)[0];
        setData({
            ...data,
            templates: e.target.value,
            title: newData.title,
            title_second: newData.title_second,
            title_extra: newData.title_extra,
            type: newData.type,
            duration: newData.duration,
            level: newData.level,
            technologies: newData.technologies,
            price: newData.price,
            minimum: newData.minimum
        });
    };
    const getTemplates = async () => {
        try {
            const response = await axios.get('/api/template');
            if (response.data.successful) {
                setTemplates(response.data.list);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getTemplates();
    }, []);
    return (
        <div className={Styles[`main`]}>
            <p className={Styles[`main-title`]}>New Course</p>
            <form onSubmit={handleSubmit} className={Styles[`form`]}>
                <div className={Styles[`form-input2`]}>
                    <label htmlFor="templates">Course template*</label>
                    <select
                        onChange={handleTemplate}
                        id="templates"
                        name="templates"
                        value={data.templates}
                    >
                        <option value="" disabled hidden>
                            course template...
                        </option>
                        {templates.map((item) => {
                            return (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
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
                    {!send ? 'Create course' : 'Processing...'}
                </button>
            </form>
            {error && <p>{error}</p>}
            <p className={Styles[`main-title`]}>Preview</p>
            <div className={Styles[`card`]}>
                <CourseCard data={data} text="apliy" subscribed={true} />
            </div>
        </div>
    );
};

export default NewCourse;

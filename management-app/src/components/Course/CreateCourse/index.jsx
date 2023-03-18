import React, { useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import Styles from './CreateCourse.module.css';
import axios from 'axios';
//icons
import { BiError } from 'react-icons/bi';

const CreateCourse = () => {
    const [options, setOptions] = useState([]);
    const [error, setError] = useState('');
    const [send, setSend] = useState(false);
    const [data, setData] = useState({
        name_bootcamp: '',
        type: '',
        zoom_url: '',
        zoom_code: ''
    });
    const handlechange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSend(true);
        try {
            const token = window.localStorage.getItem('mgmt_tk');
            if (token) {
                const response = await axios.post('/api/management/course/', data, {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: token
                    }
                });
                if (response.data.successful) {
                    enqueueSnackbar('course created successfully', { variant: 'success' });
                    setData({ ...data, name_bootcamp: '', zoom_url: '', zoom_code: '' });
                } else {
                    enqueueSnackbar(response.data.message, { variant: 'error' });
                    setError(response.data.message);
                }
                setSend(false);
            }
        } catch (error) {
            console.log(error);
            setError('500 server error');
        }
    };
    const getCourseType = async () => {
        try {
            const token = window.localStorage.getItem('mgmt_tk');
            if (token) {
                const response = await axios.get('/api/management/course-type/', {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: token
                    }
                });
                if (response.data.successful) {
                    setOptions(response.data.list);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getCourseType();
        // eslint-disable-next-line
    }, []);
    return (
        <form onSubmit={handleSubmit} className={Styles[`form`]}>
            <div className={Styles[`form-input`]}>
                <label htmlFor="course_name">Name*</label>
                <input
                    onChange={handlechange}
                    id="course_name"
                    name="name_bootcamp"
                    type="text"
                    value={data.name_bootcamp}
                    placeholder="Name bootcamp..."
                />
            </div>
            <div className={Styles[`form-input`]}>
                <label htmlFor="course_type">Course template*</label>
                <select onChange={handlechange} id="course_type" name="type" value={data.type}>
                    <option value="" disabled hidden>
                        course template...
                    </option>
                    {options.map((item) => {
                        return (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className={Styles[`form-input`]}>
                <label htmlFor="course_zoom_url">Zoom Link</label>
                <input
                    onChange={handlechange}
                    id="course_zoom_url"
                    name="zoom_url"
                    type="text"
                    value={data.zoom_url}
                    placeholder="zoom link..."
                />
            </div>
            <div className={Styles[`form-input`]}>
                <label htmlFor="course_zoom_code">Zoom Code</label>
                <input
                    onChange={handlechange}
                    id="course_zoom_code"
                    name="zoom_code"
                    type="text"
                    value={data.zoom_code}
                    placeholder="zoom code..."
                />
            </div>
            <button disabled={!data.name_bootcamp || !data.type || send} type="submit">
                {!send ? 'Create Course' : 'Processing...'}
            </button>
            {error && (
                <p className={Styles[`form-error`]}>
                    <BiError className={Styles[`form-icon-error`]} />
                    {error}
                </p>
            )}
        </form>
    );
};

export default CreateCourse;

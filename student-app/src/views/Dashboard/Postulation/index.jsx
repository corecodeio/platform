import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
//styles
import Styles from './Postulation.module.css';

const Postulation = () => {
    let { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const [postulationData, setPostulationData] = useState();
    const [course, setCourse] = useState({});
    const [data, setData] = useState({
        text: ''
    });
    const getData = async () => {
        try {
            const response = await axios.get(`/api/student/postulation/details/${id}`);
            if (response.data.successful) {
                setPostulationData(response.data.data);
                setCourse(response.data.course);
            }
        } catch (error) {
            // dispatch(logOut());
            console.log(error);
        }
    };
    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/student/message/send`, {
                postulation_id: id,
                text: data.text
            });
            if (response.data.successful) {
                setData({ text: '' });
                getData();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    return postulationData ? (
        <div className={Styles[`main`]}>
            <p className={Styles[`title`]}>{course.name}</p>
            <div className={Styles[`data`]}>
                <div className={Styles[`items`]}>
                    <p>{course.type}</p>
                    <p>{course.duration}</p>
                    <p>Nivel {course.level}</p>
                </div>
                <p className={Styles[`text`]}>
                    <strong>Dominarás:</strong> {course.technologies}
                </p>
                <p className={Styles[`text`]}>
                    <strong>Precio:</strong> {course.price}
                </p>
                <p className={Styles[`text`]}>
                    <strong>Inicia:</strong> Al llegar a {course.minimum} aplicaciones daremos
                    fecha.
                </p>
                <p className={Styles[`status-${postulationData.status}`]}>
                    {postulationData.status}
                </p>
            </div>
            {postulationData.messages &&
                postulationData.messages.map((message) => {
                    return (
                        <div key={message.id} className={Styles[`message`]}>
                            <p className={Styles[`message-author`]}>
                                {message.author
                                    ? `${user.first_name} ${user.last_name}`
                                    : 'core code:'}
                            </p>
                            <p>{message.text}</p>
                            <p className={Styles[`message-date`]}>
                                {new Date(message.createdAt).toLocaleDateString('en-US')}
                            </p>
                        </div>
                    );
                })}
            <form className={Styles[`form`]} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="text"
                    value={data.text}
                    onChange={handleChange}
                    placeholder="Message..."
                />
                <button type="submit">Responder</button>
            </form>
        </div>
    ) : null;
};

export default Postulation;

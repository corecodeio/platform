import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Postulation = () => {
    let { id } = useParams();
    const [postulationData, setPostulationData] = useState({});
    const [course, setCourse] = useState({});
    useEffect(() => {
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
        getData();
    }, []);
    return (
        <div>
            <p>{postulationData.id}</p>
            <p>{course.name}</p>
            {postulationData.messages &&
                postulationData.messages.map((message) => {
                    return <p key={message.id}>{message.text}</p>;
                })}
        </div>
    );
};

export default Postulation;

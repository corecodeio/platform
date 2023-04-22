import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
//styles
import Styles from './Postulations.module.css';
//actions
import { logOut } from './../../../redux/actions/auth';
//icons
import { BiCircle, BiCheckCircle } from 'react-icons/bi';
import { TfiMore } from 'react-icons/tfi';

const Postulations = () => {
    const [postulations, setPostulations] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('/api/student/postulation');
                if (response.data.successful) {
                    setPostulations(response.data.data);
                }
            } catch (error) {
               // dispatch(logOut());
               console.log(error)
            }
        };
        getData();
    }, []);
    return (
        <>
            <div className={Styles[`main`]}>
                <p>Postulaciones</p>
                <button onClick={() => navigate('/dashboard/available-courses')}>
                    Nueva postulacion
                </button>
            </div>
            <div className={Styles[`postulations`]}>
                {postulations.map((postulation) => {
                    return (
                        <div key={postulation.id} className={Styles[`postulation`]}>
                            {postulation.status === 'Pending' ? (
                                <BiCircle className={Styles[`postulation-circle`]} />
                            ) : (
                                <BiCheckCircle className={Styles[`postulation-circle`]} />
                            )}
                            <div className={Styles[`postulation-text`]}>
                                <p className={Styles[`postulation-name`]}>
                                    {postulation.course_name}
                                </p>
                                <p className={Styles[`postulation-technologies`]}>
                                    {postulation.course_technologies}
                                </p>
                            </div>
                            <div className={Styles[`postulation-status`]}>
                                <p className={Styles[`postulation-status-${postulation.status}`]}>
                                    {postulation.status}
                                </p>
                            </div>
                            <p>{new Date(postulation.createdAt).toLocaleDateString('en-US')}</p>
                            <TfiMore
                                className={Styles[`postulation-chat`]}
                                onClick={() => navigate(`/dashboard/postulation/${postulation.id}`)}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Postulations;

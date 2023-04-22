import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
//styles
import Styles from './../Grid.module.css';
//actions
import { logOut } from './../../../redux/actions/auth';
//components
import CourseCard from './../CourseCard';

const AvailableCourses = () => {
    const dispatch = useDispatch();
    const [listCourses, setListCourses] = useState([]);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('/api/student/course/available-courses');
                if (response.data.successful) {
                    setListCourses(response.data.data);
                }
            } catch (error) {
                dispatch(logOut());
            }
        };
        getData();
    }, []);

    return (
        <>
            <Outlet />
            <div className={Styles[`main`]}>
                {listCourses.map((course) => {
                    return (
                        <div key={course.id} className={Styles[`course`]}>
                            <CourseCard
                                data={course}
                                text="Aplica"
                                url={`/dashboard/available-courses/apply/${course.id}`}
                                text2="Mas Info"
                                url2={`/dashboard/details/${course.id}`}
                                subscribed={
                                    !course.subscribed && !(!user.first_name || !user.last_name)
                                }
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default AvailableCourses;

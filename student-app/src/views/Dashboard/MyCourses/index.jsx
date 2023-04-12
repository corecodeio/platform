import React, { useState, useEffect } from 'react';
import axios from 'axios';
//components
import Interface, { Block } from './../../../components/Interface';
import CourseCard from './../CourseCard';

const MyCourses = () => {
    const [listCourses, setListCourses] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('/api/student/course/my-courses');
                if (response.data.successful) {
                    setListCourses(response.data.data);
                }
            } catch (error) {}
        };
        getData();
    }, []);
    return (
        <Interface>
            {listCourses.map((course) => {
                return (
                    <Block space={2} key={course.id}>
                        <CourseCard
                            data={course}
                            text="Ver Curso"
                            url={`/dashboard/course-detail/${course.id}`}
                        />
                    </Block>
                );
            })}
        </Interface>
    );
};

export default MyCourses;
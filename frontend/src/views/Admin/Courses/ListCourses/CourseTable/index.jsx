import React from 'react';
import { useSelector } from 'react-redux';
//styles
import Styles from './CourseTable.module.css';
//components
import CreateSlack from './CreateSlack';
import CreateCalendar from './CreateCalendar';

const CourseTable = () => {
    const { courses } = useSelector((state) => state.dashboard);
    const emptyRows = () => {
        const elements = [];
        for (let i = courses.length; i < 10; i += 1) {
            elements.push(
                <tr key={i} className={Styles[`tr`]}>
                    <td colSpan={6}></td>
                </tr>
            );
        }
        return <>{elements}</>;
    };
    return (
        <table className={Styles[`table`]}>
            <thead className={Styles[`thead`]}>
                <tr className={Styles[`tr`]}>
                    <th className={Styles[`td`]}>Name</th>
                    <th className={Styles[`td`]}>Create Date</th>
                    <th className={Styles[`td`]}>Slack</th>
                    <th className={Styles[`td`]}>Calendar</th>
                    <th className={Styles[`td`]}>Status</th>
                    <th className={Styles[`td`]}>Details</th>
                </tr>
            </thead>
            <tbody className={Styles[`tbody`]}>
                {courses.map((item) => {
                    return (
                        <tr key={item.id} className={Styles[`tr`]}>
                            <th className={Styles[`td`]}>{item.name}</th>
                            <th className={Styles[`td`]}>
                                {new Date(item.createdAt).toLocaleDateString('en-US')}
                            </th>
                            <th className={Styles[`td`]}>
                                <CreateSlack slackID={item.slack_id} courseData={item} />
                            </th>
                            <th className={Styles[`td`]}>
                                <CreateCalendar
                                    calendarID={item.google_calendar_id}
                                    courseData={item}
                                />
                            </th>
                            <th className={Styles[`td`]}>{item.status}</th>

                            <th className={Styles[`td`]}>More...</th>
                        </tr>
                    );
                })}
                {emptyRows()}
            </tbody>
        </table>
    );
};

export default CourseTable;

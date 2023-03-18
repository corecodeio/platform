import React from 'react';
import Styles from './CourseList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Thead, Tbody, Tr, Td } from './../../Interface';
//actions
import { getCoursesAsync } from './../../../redux/actions/dashboard';
//icons
import { AiFillEdit } from 'react-icons/ai';
import {
    MdOutlineWifiProtectedSetup,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight
} from 'react-icons/md';

const CourseList = () => {
    const dispatch = useDispatch();
    const { page, courses, totalPage } = useSelector((state) => state.dashboard);
    return (
        <>
            <Table>
                <Thead
                    elements={[
                        { element: <p>Name</p> },
                        { element: <p>Slack Name</p> },
                        { element: <p>Calendar Name</p> },
                        { element: <p>Zoom Link</p> },
                        { element: <p>Zoom Code</p> },
                        { element: <p>Status</p> },
                        { element: <p>More</p> }
                    ]}
                />
                <Tbody>
                    {courses.map((item, index) => {
                        return (
                            <Tr key={index}>
                                <Td>{item.name}</Td>
                                <Td>
                                    {item.slack_name ? (
                                        item.slack_name
                                    ) : (
                                        <button className={Styles[`button-create-slack`]}>
                                            Create Slack
                                            <MdOutlineWifiProtectedSetup
                                                className={Styles[`button-create-slack-icon`]}
                                            />
                                        </button>
                                    )}
                                </Td>
                                <Td>
                                    {item.google_calendar_name ? (
                                        item.google_calendar_name
                                    ) : (
                                        <button className={Styles[`button-create-slack`]}>
                                            Create Calendar
                                            <MdOutlineWifiProtectedSetup
                                                className={Styles[`button-create-slack-icon`]}
                                            />
                                        </button>
                                    )}
                                </Td>
                                <Td>
                                    <div className={Styles[`edit`]}>
                                        {item.zoom_url ? item.zoom_url : 'null'}
                                        <AiFillEdit className={Styles[`edit-icon`]} />
                                    </div>
                                </Td>
                                <Td>
                                    <div className={Styles[`edit`]}>
                                        {item.zoom_code ? item.zoom_code : 'null'}
                                        <AiFillEdit className={Styles[`edit-icon`]} />
                                    </div>
                                </Td>
                                <Td>{item.status}</Td>
                                <Td>
                                    <p className={Styles[`detail`]}>Detail</p>
                                </Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
            {totalPage >= 2 && (
                <div className={Styles[`pagination`]}>
                    <button
                        className={Styles[`button-pagination`]}
                        disabled={page === 1}
                        onClick={() => dispatch(getCoursesAsync({ page: page - 1 }))}
                    >
                        <MdKeyboardDoubleArrowLeft />
                    </button>
                    <div>{totalPage}</div>
                    <button
                        className={Styles[`button-pagination`]}
                        disabled={false}
                        onClick={() => dispatch(getCoursesAsync({ page: page + 1 }))}
                    >
                        <MdKeyboardDoubleArrowRight />
                    </button>
                </div>
            )}
        </>
    );
};

export default CourseList;

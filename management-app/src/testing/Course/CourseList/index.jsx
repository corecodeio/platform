import React from 'react';
import { useSelector } from 'react-redux';
//components
import { Table, Thead, Tbody, Tr, Td } from './../../Interface';
import ItemList from './../ItemList';

const CourseList = ({ searchList }) => {
    const { courses } = useSelector((state) => state.dashboard);
    const emptyRows = () => {
        const elements = [];
        for (let i = courses.length; i < 10; i += 1) {
            elements.push(
                <Tr key={i}>
                    <Td colspan={7}></Td>
                </Tr>
            );
        }
        return <>{elements}</>;
    };
    return (
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
                {courses.map((item) => {
                    return <ItemList key={item.id} item={item} searchList={searchList} />;
                })}
                {emptyRows()}
            </Tbody>
        </Table>
    );
};

export default CourseList;

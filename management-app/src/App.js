import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
//actions
import { setLoading, logIn } from './redux/authSlice';
//views
import MainPage from './views/MainPage';
import Dashboard from './views/Dashboard';
import NotFound from './views/NotFound';
import Loading from './views/Loading';
//components
import ProtectedRoutes from './components/ProtectedRoutes';
import Statistics from './components/Statistics';

const App = () => {
    const { isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const checkToken = async () => {
        try {
            const token = window.localStorage.getItem('mgmt_tk');
            if (token) {
                const response = await axios.post(
                    '/api/management/staff/check-token',
                    {},
                    {
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: token
                        }
                    }
                );
                if (response.data.successful) {
                    dispatch(logIn(response.data.user));
                } else {
                    window.localStorage.removeItem('mgmt_tk');
                }
                dispatch(setLoading(false));
            } else {
                dispatch(setLoading(false));
            }
        } catch (error) {
            window.localStorage.removeItem('mgmt_tk');
            dispatch(setLoading(false));
        }
    };
    useEffect(() => {
        checkToken();
        // eslint-disable-next-line
    }, []);
    if (isLoading) {
        return <Loading />;
    }
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoutes>
                        <Dashboard />
                    </ProtectedRoutes>
                }
            >
                <Route index element={<Statistics />} />
                <Route path="users" element={<p>users</p>} />
                <Route path="users/applicants" element={<p>applicants</p>} />
                <Route path="users/chats" element={<p>chats</p>} />
                <Route path="users/contracts" element={<p>contracts</p>} />
                <Route path="staff" element={<p>staff</p>} />
                <Route path="staff/send-invitation" element={<p>send-invitation</p>} />
                <Route path="staff/staff-list" element={<p>staff-list</p>} />
                <Route path="courses" element={<p>courses</p>} />
                <Route path="courses/create-course" element={<p>create-course</p>} />
                <Route path="courses/course-list" element={<p>course-list</p>} />
                <Route path="permissions-and-roles" element={<p>permissions and roles</p>} />
                <Route
                    path="permissions-and-roles/administer-powers"
                    element={<p>administer-powers</p>}
                />
                <Route path="permissions-and-roles/roles" element={<p>roles</p>} />
                <Route path="permissions-and-roles/permissions" element={<p>permissions</p>} />
                <Route path="automatic-invitations" element={<p>automatic invitations</p>} />
                <Route path="automatic-invitations/slack" element={<p>slack</p>} />
                <Route
                    path="automatic-invitations/google-calendar"
                    element={<p>google-calendar</p>}
                />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;

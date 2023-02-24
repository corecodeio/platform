import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
//actions
import { changeLoading, logIn } from './redux/authSlice';
//views
import MainPage from './views/MainPage';
import NotFound from './views/NotFound';
import Loading from './views/Loading';
import Dashboard from './views/Dashboard';
import Authentication from './views/Authentication';
//components
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import ProtectedRoutes from './components/ProtectedRoutes';

const App = () => {
    const { isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const checkToken = async () => {
        const token = localStorage.getItem('core_code_tk');
        if (token) {
            const response = await axios.post(
                '/api_student_v1/user/checkToken',
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
                localStorage.removeItem('core_code_tk');
            }
            dispatch(changeLoading(false));
        } else {
            dispatch(changeLoading(false));
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
            <Route path="/" element={<MainPage />}>
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
            <Route path="/validate-email/:activate_token" element={<Authentication />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoutes>
                        <Dashboard />
                    </ProtectedRoutes>
                }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;

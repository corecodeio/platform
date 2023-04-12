import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//actions
import { checkTokenAsync } from './redux/actions/auth';
//views
import MainPage from './views/MainPage';
import NotFound from './views/NotFound';
import Loading from './views/Loading';
import Dashboard from './views/Dashboard';
import Recover from './views/Recover';
//components
import ProtectedRoutes from './components/ProtectedRoutes';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import RecoverPassword from './components/RecoverPassword';
import MyCourses from './views/Dashboard/MyCourses';
import AvailableCourses from './views/Dashboard/AvailableCourses';

const App = () => {
    const { isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkTokenAsync());
        // eslint-disable-next-line
    }, []);
    if (isLoading) {
        return <Loading />;
    }
    return (
        <Routes>
            <Route path="/" element={<MainPage />}>
                <Route index element={<Navigate to="log-in" />} />
                <Route path="log-in" element={<LogIn />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="recover-password" element={<RecoverPassword />} />
            </Route>
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoutes>
                        <Dashboard />
                    </ProtectedRoutes>
                }
            >
                <Route index element={<Navigate to="my-courses" />} />
                <Route path="my-courses" element={<MyCourses />} />
                <Route path="available-courses" element={<AvailableCourses/>} />
                <Route path="applications" element={<p>Postulaciones</p>} />
                <Route path="community" element={<p>Comunidad</p>} />
                <Route path="setting" element={<p>Configuración</p>} />
            </Route>

            <Route path="/recover" element={<Recover />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;

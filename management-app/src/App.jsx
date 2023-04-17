import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//actions
import { checkTokenAsync } from './redux/actions/auth';
//views
import MainPage from './views/MainPage';
import Dashboard from './views/Dashboard';
import NotFound from './views/NotFound';
import Loading from './views/Loading';
import Recover from './views/Recover';
//components
import ProtectedRoutes from './components/ProtectedRoutes';
import ProtectedPermission from './components/ProtectedPermission';
import Statistics from './views/Dashboard/Statistics';
import Courses from './views/Dashboard/Courses';
import PermissionsAndRoles from './views/Dashboard/PermissionsAndRoles';
import Events from './views/Dashboard/Events';
import LogIn from './views/MainPage/LogIn';
import SignUp from './views/MainPage/SignUp';
import RecoverPassword from './views/MainPage/RecoverPassword';

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
                <Route index element={<Navigate to="statistics" />} />
                <Route
                    path="statistics"
                    element={
                        <ProtectedPermission permissions={['read:dashboard']}>
                            <Statistics />
                        </ProtectedPermission>
                    }
                />
                <Route
                    path="courses"
                    element={
                        <ProtectedPermission permissions={['read:dashboard', 'read:course']}>
                            <Courses />
                        </ProtectedPermission>
                    }
                />
                <Route
                    path="permissions-and-roles"
                    element={
                        <ProtectedPermission
                            permissions={['read:dashboard', 'read:role', 'read:permission']}
                        >
                            <PermissionsAndRoles />
                        </ProtectedPermission>
                    }
                />
                <Route
                    path="events"
                    element={
                        <ProtectedPermission permissions={['read:dashboard', 'read:event']}>
                            <Events />
                        </ProtectedPermission>
                    }
                />
            </Route>
            <Route path="/recover" element={<Recover />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;

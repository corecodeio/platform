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
import Admin from './views/Admin';
//components
import ProtectedRoutes from './components/ProtectedRoutes';
import ProtectedPermission from './components/ProtectedPermission';
import LogIn from './views/MainPage/LogIn';
import SignUp from './views/MainPage/SignUp';
import RecoverPassword from './views/MainPage/RecoverPassword';
import MyCourses from './views/Dashboard/MyCourses';
import AvailableCourses from './views/Dashboard/AvailableCourses';
import Setting from './views/Dashboard/Setting';
import Apply from './views/Dashboard/AvailableCourses/Apply';
import Postulations from './views/Dashboard/Postulations';
import Postulation from './views/Dashboard/Postulation';
import Statistics from './views/Admin/Statistics';
import Courses from './views/Admin/Courses';
import ListCourses from './views/Admin/Courses/ListCourses';
import NewCourse from './views/Admin/Courses/NewCourse';
import Templates from './views/Admin/Courses/Templates';
import PermissionsAndRoles from './views/Admin/PermissionsAndRoles';
import Events from './views/Admin/Events';

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
                <Route path="available-courses" element={<AvailableCourses />}>
                    <Route path="apply/:id" element={<Apply />} />
                </Route>
                <Route path="postulations" element={<Postulations />} />
                <Route path="postulation/:id" element={<Postulation />} />
                <Route path="community" element={<p>Comunidad</p>} />
                <Route path="setting" element={<Setting />} />
            </Route>
            <Route
                path="/admin"
                element={
                    <ProtectedRoutes>
                        <ProtectedPermission permissions={['read:dashboard']} element={<Admin />} />
                    </ProtectedRoutes>
                }
            >
                <Route index element={<Navigate to="statistics" />} />
                <Route path="statistics" element={<Statistics />} />
                <Route
                    path="courses"
                    element={
                        <ProtectedPermission permissions={['read:course']} element={<Courses />} />
                    }
                >
                    <Route index element={<p>courses</p>} />
                    <Route
                        path="list"
                        element={
                            <ProtectedPermission
                                permissions={['read:course']}
                                element={<ListCourses />}
                            />
                        }
                    />
                    <Route
                        path="new-course"
                        element={
                            <ProtectedPermission
                                permissions={['write:course']}
                                element={<NewCourse />}
                            />
                        }
                    />
                    <Route
                        path="templates"
                        element={
                            <ProtectedPermission
                                permissions={['read:course']}
                                element={<Templates />}
                            />
                        }
                    />
                </Route>
                <Route
                    path="permissions-and-roles"
                    element={
                        <ProtectedPermission
                            permissions={['read:role', 'read:permission']}
                            element={<PermissionsAndRoles />}
                        />
                    }
                />
                <Route
                    path="events"
                    element={
                        <ProtectedPermission permissions={['read:event']} element={<Events />} />
                    }
                />
                <Route path="setting" element={<Setting />} />
            </Route>
            <Route path="/recover" element={<Recover />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;

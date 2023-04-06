import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//actions
import { checkTokenAsync } from './redux/actions/auth';
//views
import MainPage from './views/MainPage';
import NotFound from './views/NotFound';
import Loading from './views/Loading';
import Dashboard from './views/Dashboard';
import Authentication from './views/Authentication';
//components
import ProtectedRoutes from './components/ProtectedRoutes';
import LogInStytch from './components/LogInStytch';

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
                <Route index element={<LogInStytch />} />
            </Route>
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoutes>
                        <Dashboard />
                    </ProtectedRoutes>
                }
            ></Route>
            <Route path="/validate-email/:activate_token" element={<Authentication />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './reducers/auth';
import dashboardSlice from './reducers/dashboard';

const reducer = combineReducers({
    auth: authSlice,
    dashboard: dashboardSlice
});

export const store = configureStore({
    reducer
});

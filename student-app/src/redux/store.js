import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './reducers/auth';

const reducer = combineReducers({
    auth: authSlice
});

export const store = configureStore({
    reducer
});

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';

const reducer = combineReducers({
    auth: authSlice
});

export const store = configureStore({
    reducer
});

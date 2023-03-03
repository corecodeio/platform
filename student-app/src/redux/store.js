import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import postulationSlice from './postulationSlice';
import bootcampSlice from './bootcampSlice';

const reducer = combineReducers({
    auth: authSlice,
    postulation: postulationSlice,
    bootcamp: bootcampSlice
});

export const store = configureStore({
    reducer
});

import { createSlice } from '@reduxjs/toolkit';
//actions
import {
    logInAsync,
    checkTokenAsync,
    logOut,
    updateAccount,
    updateProfile,
    updatePhone
} from './../actions/auth';

const initialState = {
    isAuth: false,
    isLoading: true,
    user: {}
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logInAsync.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(checkTokenAsync.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuth = true;
                state.isLoading = false;
            })
            .addCase(checkTokenAsync.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(logOut, (state, action) => {
                state.isAuth = false;
                state.user = {};
            })
            .addCase(updateAccount, (state, action) => {
                const { payload } = action;
                state.user = {
                    ...state.user,
                    first_name: payload.first_name,
                    last_name: payload.last_name
                };
            })
            .addCase(updateProfile, (state, action) => {
                const { payload } = action;
                state.user = {
                    ...state.user,
                    country: payload.country,
                    city: payload.city,
                    address: payload.address,
                    linkedin_url: payload.linkedin_url
                };
            })
            .addCase(updatePhone, (state, action) => {
                const { payload } = action;
                state.user = {
                    ...state.user,
                    phone: payload.phone,
                    confirmed_phone: false
                };
            });
    }
});

export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
//actions
import { logInAsync, checkTokenAsync, logOut, setMode } from './../actions/auth';

const mode = window.localStorage.getItem('mgmt_mode');
const initialState = {
    isAuth: false,
    isLoading: true,
    mode: mode ? mode : 'light',
    user: {}
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logInAsync.fulfilled, (state, action) => {
                const { user } = action.payload;
                state.user = user;
                state.isAuth = true;
            })
            .addCase(checkTokenAsync.fulfilled, (state, action) => {
                const { user } = action.payload;
                state.user = user;
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
            .addCase(setMode, (state, action) => {
                state.mode = action.payload;
            });
    }
});

export default authSlice.reducer;

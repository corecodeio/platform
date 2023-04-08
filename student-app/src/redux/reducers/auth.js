import { createSlice } from '@reduxjs/toolkit';
//actions
import { logInAsync, checkTokenAsync, logOut } from './../actions/auth';

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
            });
    }
});

export default authSlice.reducer;

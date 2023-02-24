import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    isLoading: true,
    user: {}
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logIn: (state, action) => {
            const { payload } = action;
            state.user = payload;
            state.isAuth = true;
        },
        logOut: (state, action) => {
            localStorage.removeItem('core_code_tk');
            state.isAuth = false;
            state.user = {};
        },
        changeLoading: (state, action) => {
            const { payload } = action;
            state.isLoading = payload;
        }
    }
});

export const { logIn, changeLoading, logOut } = authSlice.actions;

export default authSlice.reducer;

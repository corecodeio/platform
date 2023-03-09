import { createSlice } from '@reduxjs/toolkit';

const mode = window.localStorage.getItem('mgmt_mode')
    ? window.localStorage.getItem('mgmt_mode')
    : 'light';
const initialState = {
    isAuth: false,
    isLoading: true,
    mode: mode,
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
            window.localStorage.removeItem('mgmt_tk');
            state.isAuth = false;
            state.user = {};
        },
        setLoading: (state, action) => {
            const { payload } = action;
            state.isLoading = payload;
        },
        setMode: (state, action) => {
            const { payload } = action;
            state.mode = payload;
        }
    }
});

export const { logIn, setLoading, logOut, setMode } = authSlice.actions;

export default authSlice.reducer;

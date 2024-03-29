import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import config from './../../config';

export const logInAsync = createAsyncThunk(
    'auth/logInAsync',
    async ({ data, setError }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/user/log-in', data);
            if (response.data.successful) {
                window.localStorage.setItem(config.tokenName, response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                return response.data.user;
            } else {
                setError(response.data.message);
                return rejectWithValue();
            }
        } catch (error) {
            setError('server error');
            return rejectWithValue();
        }
    }
);

export const signUpAsync = createAsyncThunk(
    'auth/logInAsync',
    async ({ data, setError }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/user/sign-up', data);
            if (response.data.successful) {
                window.localStorage.setItem(config.tokenName, response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                return response.data.user;
            } else {
                setError(response.data.message);
                return rejectWithValue();
            }
        } catch (error) {
            setError('server error');
            return rejectWithValue();
        }
    }
);
export const resetPasswordAsync = createAsyncThunk(
    'auth/logInAsync',
    async ({ data, setError }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/user/validate-email', data);
            console.log(response);
            if (response.data.successful) {
                window.localStorage.setItem(config.tokenName, response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                return response.data.user;
            } else {
                setError(response.data.message);
                return rejectWithValue();
            }
        } catch (error) {
            console.log(error);
            setError('server error');
            return rejectWithValue();
        }
    }
);

export const logInRecoverAsync = createAsyncThunk(
    'auth/checkTokenAsync',
    async (token, { rejectWithValue }) => {
        try {
            if (token) {
                const response = await axios.post('/api/user/magic-links', { token });
                if (response.data.successful) {
                    window.localStorage.setItem(config.tokenName, response.data.token);
                    axios.defaults.headers.common[
                        'Authorization'
                    ] = `Bearer ${response.data.token}`;
                    return response.data.user;
                } else {
                    return rejectWithValue();
                }
            } else {
                return rejectWithValue();
            }
        } catch (error) {
            return rejectWithValue();
        }
    }
);

export const checkTokenAsync = createAsyncThunk(
    'auth/checkTokenAsync',
    async (data, { rejectWithValue }) => {
        const token = window.localStorage.getItem(config.tokenName);
        try {
            if (token) {
                const response = await axios.post(
                    '/api/user/check-token',
                    {},
                    {
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (response.data.successful) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    return response.data.user;
                } else {
                    window.localStorage.removeItem(config.tokenName);
                    return rejectWithValue();
                }
            } else {
                return rejectWithValue();
            }
        } catch (error) {
            window.localStorage.removeItem(config.tokenName);
            return rejectWithValue();
        }
    }
);

export const logOut = createAction('auth/logOut', () => {
    delete axios.defaults.headers.common['Authorization'];
    window.localStorage.removeItem(config.tokenName);
    return {};
});

export const updateProfile = createAction('auth/updateProfile', (data) => {
    return {
        payload: data
    };
});

export const updateAccount = createAction('auth/updateAccount', (data) => {
    return {
        payload: data
    };
});

export const updatePhone = createAction('auth/updatePhone', (data) => {
    return {
        payload: data
    };
});

import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const logInAsync = createAsyncThunk(
    'auth/logInAsync',
    async ({ data, setError }, { rejectWithValue }) => {
        try {
            try {
                const response = await axios.post('/api/management/staff/log-in', data);
                if (response.data.successful) {
                    window.localStorage.setItem('mgmt_tk', `Bearer ${response.data.token}`);
                    //dispatch(logIn(response.data.user));
                    return { user: response.data.user };
                } else {
                    setError(response.data.message);
                    return rejectWithValue();
                }
            } catch (error) {
                setError('server error');
                return rejectWithValue();
            }
        } catch (error) {
            setError('server error');
            return rejectWithValue();
        }
    }
);

export const checkTokenAsync = createAsyncThunk(
    'auth/checkTokenAsync',
    async (data, { rejectWithValue }) => {
        const token = window.localStorage.getItem('mgmt_tk');
        try {
            if (token) {
                const response = await axios.post(
                    '/api/management/staff/check-token',
                    {},
                    {
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: token
                        }
                    }
                );
                if (response.data.successful) {
                    return { user: response.data.user };
                } else {
                    window.localStorage.removeItem('mgmt_tk');
                    return rejectWithValue();
                }
            } else {
                return rejectWithValue();
            }
        } catch (error) {
            window.localStorage.removeItem('mgmt_tk');
            return rejectWithValue();
        }
    }
);

export const logOut = createAction('auth/logOut', () => {
    window.localStorage.removeItem('mgmt_tk');
    return {};
});
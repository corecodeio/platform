import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCoursesAsync = createAsyncThunk(
    'dashboard/getCoursesAsync',
    async ({ page }, { rejectWithValue }) => {
        const token = window.localStorage.getItem('mgmt_tk');
        try {
            if (token) {
                const response = await axios.get(
                    `/api/management/course/?page=${page}`,

                    {
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: token
                        }
                    }
                );
                if (response.data.successful) {
                    return {
                        courses: response.data.list,
                        page: Number(response.data.page),
                        totalPage: Number(response.data.totalPage)
                    };
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

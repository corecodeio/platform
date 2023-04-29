import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCoursesAsync = createAsyncThunk(
    'dashboard/getCoursesAsync',
    async ({ page }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/course/?page=${page}`);
            if (response.data.successful) {
                return {
                    courses: response.data.list,
                    page: Number(response.data.page),
                    totalPage: Number(response.data.totalPage)
                };
            } else {
                return rejectWithValue();
            }
        } catch (error) {
            return rejectWithValue();
        }
    }
);
export const setPage = createAction('dashboard/setPage', (page) => {
    return { payload: page };
});

import { createSlice } from '@reduxjs/toolkit';
//actions
import { getCoursesAsync, setPage } from './../actions/dashboard';

const initialState = {
    courses: [],
    page: 1,
    totalPage: 1
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCoursesAsync.fulfilled, (state, action) => {
                const { courses, page, totalPage } = action.payload;
                state.courses = courses;
                state.page = page;
                state.totalPage = totalPage;
            })
            .addCase(setPage, (state, action) => {
                state.page = action.payload;
            });
    }
});

export default dashboardSlice.reducer;

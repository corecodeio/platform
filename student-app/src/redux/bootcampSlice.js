import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: []
};

export const bootcampSlice = createSlice({
    name: 'bootcamp',
    initialState: initialState,
    reducers: {}
});

export default bootcampSlice.reducer;

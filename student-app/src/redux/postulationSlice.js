import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: []
};

export const postulationSlice = createSlice({
    name: 'postulation',
    initialState: initialState,
    reducers: {}
});

export default postulationSlice.reducer;

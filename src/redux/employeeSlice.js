import { createSlice } from '@reduxjs/toolkit'
import { mockData } from '../data/mockData';

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
      list: [...mockData]
    },
    reducers: {
        add: (state, action) => {
            state.list = [...state.list, action.payload]
        }
    }
});

export const {add} = employeeSlice.actions;
export default employeeSlice.reducer;
import { createSlice } from '@reduxjs/toolkit'

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
      list: []
    },
    reducers: {
        add: (state, action) => {
            state.list = [...state.list, action.payload]
        }
    }
});

export const {add} = employeeSlice.actions;
export default employeeSlice.reducer;
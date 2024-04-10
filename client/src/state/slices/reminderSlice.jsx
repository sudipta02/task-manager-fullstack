import { createSlice } from "@reduxjs/toolkit";

export const reminderSlice = createSlice({
    initialState: [],
    name: "reminder",
    reducers: {
        addReminder: (state) => {
            state.push({note: "hello world"});
        }
    }
})

export const { addReminder } = reminderSlice.actions;
export default reminderSlice.reducer;
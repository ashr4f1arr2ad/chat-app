import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        userMessage: [],
        inputMessages: '',
        usersActive: []
    },
    reducers: {
        userMessage: (state, action) => {
            state.userMessage = action.payload;
        },
        inputMessages:(state, action) => {
            state.inputMessages = action.payload;
        },
        activeUsers:(state, action) => {
            state.usersActive = action;
            state.usersActive = action.payload;
        }
    }
})

//This is for dispatch
export const { userMessage, inputMessages, activeUsers } = messageSlice.actions;

//this is for configureStore
export default messageSlice.reducer;
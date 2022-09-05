import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        userMessage: [],
        inputMessages: '',
        usersActive: [],
        user:"",
        leave:""
    },
    reducers: {
        userMessage: (state, action) => {
            state.userMessage = action.payload;
        },
        inputMessages:(state, action) => {
            state.inputMessages = action.payload;
        },
        activeUsers:(state, action) => {
            // state.usersActive = action;
            state.usersActive = action.payload;
        },
        activeUser:(state, action) => {
            // state.usersActive = action;
            state.user = action.payload;
        },
        leaveUser:(state, action) => {
            // state.usersActive = action;
            state.leave = action.payload;
        }
    }
})

//This is for dispatch
export const { userMessage, inputMessages, activeUsers, activeUser, leaveUser } = messageSlice.actions;

//this is for configureStore
export default messageSlice.reducer;
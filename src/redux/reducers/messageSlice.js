import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        userMessage: [],
        inputMessages: '',
    },
    reducers: {
        userMessage: (state, action) => {
            state.userMessage = action.payload;
        },
        inputMessages:(state, action) => {
            state.inputMessages = action.payload;
        }
    }
})

//This is for dispatch
export const { userMessage, inputMessages } = messageSlice.actions;

//this is for configureStore
export default messageSlice.reducer;
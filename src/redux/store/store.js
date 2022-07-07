import { configureStore } from '@reduxjs/toolkit';
import messageReducer from '../reducers/messageSlice';

const store = configureStore({
    reducer: {
        message: messageReducer,
    },
});

export default store;
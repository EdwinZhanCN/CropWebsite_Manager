import { configureStore } from '@reduxjs/toolkit';
import connectionReducer from './connectionSlice';

const store = configureStore({
    reducer: {
        connection: connectionReducer,
    },
});

export default store;

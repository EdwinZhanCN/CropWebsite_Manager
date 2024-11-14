import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    SPRING_BACKEND_URL: '',
    AZURE_STORAGE_ACCOUNT_NAME: '',
    AZURE_STORAGE_ACCOUNT_KEY: '',
    GITHUB_ISSUE_TOKEN: '',
    SPRING_BACKEND_CONNECTION: false,
};

const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        setServerUrl: (state, action) => {
            state.SPRING_BACKEND_URL = action.payload;
        },
        setToken: (state, action) => {
            state.GITHUB_ISSUE_TOKEN = action.payload;
        },
        setAzureStorageAccountName: (state, action) => {
            state.AZURE_STORAGE_ACCOUNT_NAME = action.payload;
        },
        setAzureStorageAccountKey: (state, action) => {
            state.AZURE_STORAGE_ACCOUNT_KEY = action.payload;
        },
        setServerConnection: (state, action) => {
            state.SPRING_BACKEND_CONNECTION = action.payload;
        }
    },
});

export const checkServerConnection = createAsyncThunk(
    'connection/checkServerConnection',
    async (_, { getState, dispatch }) => {
        const { SPRING_BACKEND_URL } = getState();
        try {
            const response = await fetch(`${SPRING_BACKEND_URL}`);
            if (response.ok) {
                dispatch(setServerConnection(true));
            } else {
                dispatch(setServerConnection(false));
            }
        } catch (error) {
            dispatch(setServerConnection(false));
        }
    }
);

export const {
    setServerUrl,
    setToken ,
    setAzureStorageAccountName,
    setAzureStorageAccountKey,
    setServerConnection
} = connectionSlice.actions;
export default connectionSlice.reducer;

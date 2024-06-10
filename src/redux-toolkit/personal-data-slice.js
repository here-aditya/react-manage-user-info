import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../components/middleware/axios-middleware';

const initialState = {
    loading: false,
    error: null,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    addresses: [],
};

// Thunk for login
export const setFormData = createAsyncThunk('api/users', async (formData, thunkAPI) => {
    try {
        const userData = {...formData};
        const addressArr = userData.addresses;
        delete userData.addresses;
        
        const response = await axiosInstance.post('api/users', userData);

        // concat userID to address
        const updatedAddresses = addressArr.map(address => ({
            ...address,
            userId: response.data.user.id
        }))
        await axiosInstance.post('api/addresses', updatedAddresses);
        return formData;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
});

const personalDataReducer = createSlice({
    name: 'personalDataForm',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(setFormData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(setFormData.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
                state.loading = false;
            })
            .addCase(setFormData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default personalDataReducer.reducer;

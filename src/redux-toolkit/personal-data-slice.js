import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    addresses: [],
};

const personalDataReducer = createSlice({
    name: 'personalDataForm',
    initialState,
    reducers: {
        setFormData(state, action) {
            console.log(action.payload)
            return { ...state, ...action.payload };
        }
        // addAddress(state, action) {
        //   state.addresses.push(action.payload);
        // },
        // removeAddress(state, action) {
        //   state.addresses.splice(action.payload, 1);
        // },
    },
});

export const { setFormData } = personalDataReducer.actions;
export default personalDataReducer.reducer;

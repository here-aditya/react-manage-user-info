import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux-toolkit/auth-slice';
import personalDataReducer from '../redux-toolkit/personal-data-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    personalData: personalDataReducer
  },
});

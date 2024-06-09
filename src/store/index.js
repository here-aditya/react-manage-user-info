import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux-toolkit/auth-slice';
import personalDataReducer from '../redux-toolkit/personal-data-slice';
import { axiosMiddleware } from '../components/middleware/axios-middleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    personalData: personalDataReducer
  },
});

// Apply axios interceptors middleware
axiosMiddleware(store);
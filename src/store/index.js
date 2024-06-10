import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux-toolkit/auth-slice';
import personalDataReducer from '../redux-toolkit/personal-data-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    personalData: personalDataReducer
  }
});

export default store;
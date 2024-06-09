import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  redirectUrl: '/'
};

// Thunk for login
export const loginAction = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
  try {
    // const response = await axios.post('/api/login', { username, password });
    // const { accessToken, refreshToken } = // response.data;
    const { accessToken, refreshToken } = {accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', 
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    } 
    const user = jwtDecode(accessToken);
    return { user, accessToken, refreshToken };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (refreshToken) => {
  try {
    const response = await axios.post('/api/refresh-token', { refreshToken });
    const { accessToken } = response.data;
    const user = jwtDecode(accessToken);
    return { user, accessToken };
  } catch (error) {
    return error.response.data;
  }
});

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.redirectUrl = '/';
    },
    setRedirectUrl: (state, action) => {
      state.redirectUrl = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = action.payload;
      });
  }
});

export const { logout, setRedirectUrl } = authReducer.actions;
export default authReducer.reducer;

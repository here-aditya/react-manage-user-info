import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import axiosInstance from '../components/middleware/axios-middleware';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  redirectUrl: '/'
};

// Thunk for login
export const loginAction = createAsyncThunk('api/login', async ({ username, password }, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/api/login', { username, password });
    const { accessToken, refreshToken } = response.data;
    const user = jwtDecode(accessToken);
    return { user, accessToken, refreshToken };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
});

export const regenerateToken = createAsyncThunk('api/refresh-token', async (refreshToken, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/api/refresh-token', { refreshToken });
    const { accessToken } = response.data;
    const user = jwtDecode(accessToken);
    return { user, accessToken };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error);
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
      .addCase(regenerateToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(regenerateToken.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = action.payload;
      });
  }
});

export const { logout, setRedirectUrl } = authReducer.actions;
export default authReducer.reducer;

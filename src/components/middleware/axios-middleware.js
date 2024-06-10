import axios from 'axios';
import { logout, regenerateToken } from '../../redux-toolkit/auth-slice';

let store;

export const injectStore = _store => {
  store = _store
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().auth;
    if (accessToken) {
      config.headers['authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest.url.includes('/login') && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { refreshToken } = store.getState().auth;
        await store.dispatch(regenerateToken(refreshToken));
        const { accessToken } = store.getState().auth;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

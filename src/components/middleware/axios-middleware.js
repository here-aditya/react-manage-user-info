import axios from 'axios';
import { logout, refreshToken } from '../../redux-toolkit/auth-slice';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // backend URL
});

// Middleware function to attach to the store
export const axiosMiddleware = (store) => {
  // Request interceptor to add auth header
  axiosInstance.interceptors.request.use(
    (config) => {
      const { accessToken } = store.getState().auth;
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle 401 errors
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await store.dispatch(refreshToken());
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
};

export default axiosInstance;

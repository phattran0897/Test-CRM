import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    // withCredentials will make sure the HttpOnly cookie is sent with every request
    withCredentials: true,
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // Catch 401 Unauthorized errors and attempt to refresh the token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await axios.post(
                    `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );
                // Retry the original request after successful refresh
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Refresh token failed or expired -> log the user out
                useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

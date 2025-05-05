import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const api = axios.create({
    baseURL: "https://learning-app-1ll5.onrender.com/api",
});

api.interceptors.request.use((request) => {
    const token = useAuthStore.getState().token;
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (axios.isAxiosError(error)) {
            const originalRequest = error.config;
            const status = error.response?.status;

            console.log("API Error:", {
                status: status,
                data: error.response?.data,
                url: originalRequest?.url
            });

            if (status === 401) {
                await useAuthStore.getState().setToken(null);
            }
        }

        return Promise.reject(error);
    }
);
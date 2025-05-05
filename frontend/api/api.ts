import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    HttpStatusCode,
    InternalAxiosRequestConfig
} from "axios";
import { useAuthStore } from "../store/authStore";

interface RefreshTokenResponse {
    accessToken: string;
}

interface RetryConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export const api: AxiosInstance = axios.create({
    baseURL: "https://learning-app-1ll5.onrender.com/api",
});

const refreshApi: AxiosInstance = axios.create({
    baseURL: "https://learning-app-1ll5.onrender.com/api",
});

api.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        request.headers = request.headers || {};
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        if (!axios.isAxiosError(error)) {
            return Promise.reject(error);
        }

        const originalRequest = error.config as RetryConfig;
        const status = error.response?.status;

        console.log("API Error:", {
            status: status,
            data: error.response?.data,
            url: originalRequest?.url
        });

        if (status === HttpStatusCode.Unauthorized) {
            try {
                if (originalRequest && !originalRequest._retry) {
                    originalRequest._retry = true;

                    const refreshToken = useAuthStore.getState().refreshToken;
                    if (!refreshToken) throw new Error("No refresh token");

                    const { data } = await refreshApi.post<RefreshTokenResponse>(
                        "/auth/refresh",
                        { refreshToken }
                    );

                    await useAuthStore.getState().setAccessToken(data.accessToken);

                    return api({
                        ...originalRequest,
                        headers: {
                            ...originalRequest.headers,
                            Authorization: `Bearer ${data.accessToken}`
                        }
                    });
                }
            } catch (refreshError) {
                await useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            }
            await useAuthStore.getState().logout();
        }

        return Promise.reject(error);
    }
);
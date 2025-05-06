import {api} from "./api";
import axios, {AxiosError} from "axios";

export type LoginResponseDto = {
    accessToken: string | null;
    refreshToken: string | null;
    errors: {
        username?: string;
        password?: string;
    };
};

export async function login(
    username: string,
    password: string
): Promise<LoginResponseDto> {
    try {
        const response = await api.post("/auth/login", {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        if (!axios.isAxiosError(error)) {
            return { accessToken: null, refreshToken: null, errors: {} };
        }

        const axiosError = error as AxiosError<ErrorResponse>;

        if (!axiosError.response?.data?.error) {
            return { accessToken: null, refreshToken: null, errors: {} };
        }

        const { error: apiError } = axiosError.response.data;

        if (apiError.type === "VALIDATION_ERROR") {
            return {
                accessToken: null,
                refreshToken: null,
                errors: apiError.data || {},
            };
        }

        return { accessToken: null, refreshToken: null, errors: {} };
    }
}

export async function logout(
    refreshToken: string
): Promise<void> {
    await api.post("/auth/logout", {
        refreshToken: refreshToken,
    })
}

export async function logoutAll(
    refreshToken: string
): Promise<void> {
    await api.post("/auth/logout/all", {
        refreshToken: refreshToken,
    })
}
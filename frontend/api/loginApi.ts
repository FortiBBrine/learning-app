import {api} from "./api";
import axios, {AxiosError} from "axios";

export type LoginResponseDto = {
    token: string | null;
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
            return { token: null, errors: {} };
        }

        const axiosError = error as AxiosError<ErrorResponse>;

        if (!axiosError.response?.data?.error) {
            return { token: null, errors: {} };
        }

        const { error: apiError } = axiosError.response.data;

        if (apiError.type === "VALIDATION_ERROR") {
            return {
                token: null,
                errors: apiError.data || {},
            };
        }

        return { token: null, errors: {} };
    }
}
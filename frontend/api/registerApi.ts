
import {api} from "./api";
import axios, {AxiosError} from "axios";

export type RegisterResponseDto = {
    token: string | null;
    errors: {
        email?: string;
        name?: string;
        username?: string;
        password?: string;
    };
};

export async function register(
    email: string,
    name: string,
    username: string,
    password: string,
): Promise<RegisterResponseDto> {
    try {
        const response = await api.post("/auth/register", {
            name: name,
            username: username,
            email: email,
            password: password,
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

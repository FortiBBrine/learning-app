
import {api} from "./api";
import axios from "axios";

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

        if (!error.response) {
            return { token: null, errors: {} };
        }

        const { data, status } = error.response;

        if (data.message === "VALIDATION_ERROR") {
            return {
                token: null,
                errors: data.errors || {},
            };
        }

        return {
            token: null,
            errors: {},
        };
    }
}

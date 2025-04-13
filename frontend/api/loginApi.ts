import {api} from "./api";
import axios from "axios";

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

        /*
        let errors = {};
        if (status === 401) {
            errors = { password: data.message };
        } else if (status === 404) {
            errors = { username: data.message }; */

        return {
            token: null,
            errors: {},
        };
    }
}
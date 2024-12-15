import {api} from "./api";

export type LoginResponseDto = {
    result: {
        username: string | undefined,
        password: string | undefined
    },
    token: null
}

export async function login(username: string, password: string): Promise<LoginResponseDto> {
    const response = await api.post("/auth/login", {
        username: username,
        password: password
    });
    return response.data;
}

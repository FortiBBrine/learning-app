import {api} from "./api";
import {UserDto} from "./relationApi";

export async function getProfile(): Promise<UserDto> {
    const response = await api.get<UserDto>("/profile");
    return response.data;
}

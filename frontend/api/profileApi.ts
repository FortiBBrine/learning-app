import {api} from "./api";
import {UserDto} from "./relationApi";
import {usePeopleStore} from "../store/peopleStore";

export type SettingUserDto = {
    name?: string,
    email?: string,
    subjects?: string[],
    role?: string
};

export async function getProfile(): Promise<UserDto> {
    const response = await api.get<UserDto>("/profile");
    return response.data;
}

export async function settingProfile(payload: SettingUserDto): Promise<void> {
    const response = await api.post<SettingUserDto>("/profile/setting", payload);

    usePeopleStore.getState().setProfile(await getProfile())
}